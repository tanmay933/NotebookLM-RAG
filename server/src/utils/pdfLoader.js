import * as pdfParse from "pdf-parse";

const loadPDF = async (buffer) => {
  const parser = pdfParse.default || pdfParse;

  const data = await parser(buffer);

  return [
    {
      pageContent: data.text,
      metadata: {
        pages: data.numpages,
      },
    },
  ];
};

export default loadPDF;