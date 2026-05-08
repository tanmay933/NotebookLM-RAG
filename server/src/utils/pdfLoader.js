import pdfParse from "pdf-parse/lib/pdf-parse.js";

const loadPDF = async (buffer) => {
  const data = await pdfParse(buffer);

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