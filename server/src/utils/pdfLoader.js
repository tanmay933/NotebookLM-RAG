import pdf from "pdf-parse";

const loadPDF = async (buffer) => {
  const data = await pdf(buffer);

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