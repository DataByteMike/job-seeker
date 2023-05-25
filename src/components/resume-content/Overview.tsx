import { useEffect, useState } from "react";

export default function Overview() {
  const [currentFile, setCurrentFile] = useState<File>();

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const existingFiles = e.currentTarget.files as FileList;

    if (existingFiles.length) {
      setCurrentFile(existingFiles[0]);
    }
  };

  useEffect(() => {
    const uploadFile = async () => {
      const formData = new FormData();
      formData.append("resume", currentFile as File);

      await fetch("/api/parser", {
        method: "POST",
        body: formData,
      })
        .then((response) => response.json())
        .then((data) => console.log(data))
        .catch((err) => console.log(err));
    };

    if (currentFile) {
      uploadFile();
    }
  }, [currentFile]);

  return <input type="file" onChange={handleFileInput} />;
}
