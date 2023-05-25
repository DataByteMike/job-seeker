export const extractText = (resumeText: string) => {
  const name = /^[a-zA-Z-'. ]+$\n/m;
  const phone = /^\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}/m;
  const email = /([a-zA-Z0-9._+-]+@[a-zA-Z0-9._-]+\.[a-zA-Z0-9._-]+)/;

  const obj = {
    nn: name.exec(resumeText)?.[0].replace("\n", ""),
    pp: phone.exec(resumeText)?.[0],
    ee: email.exec(resumeText)?.[0],
  };

  return obj;
};
