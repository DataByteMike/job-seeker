// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";

import formidable from "formidable";
import pdf from "pdf-parse";
import fs from "fs";

import { extractText } from "@/functions";

export const config = {
  api: {
    bodyParser: false,
  },
};

type FormidableType = {
  fields: formidable.Fields;
  files: formidable.Files;
};

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  // Check the method being requested (Only accepts POST)
  switch (req.method) {
    case "POST":
      const { fields, files }: FormidableType = await new Promise((resolve, reject) => {
        const form = new formidable.IncomingForm({ keepExtensions: true });
        form.parse(req, (err, fields, files) => {
          if (err) return reject(err);
          resolve({ fields, files });
        });
      });

      // //
      // if (!files.resume) {
      //   res.status(400).json("Nothing was submitted");
      // }

      // Parses the pdf and extract the needed information
      return pdf((files.resume as any).filepath).then((result) => {
        const info = extractText(result.text);
        res.send(info);
      });

      break;

    default:
      res.status(200).json({ message: "Welcome the Rest API. Only POST method is accepted" });
  }
}
