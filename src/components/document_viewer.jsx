import { PDFViewer } from "@react-pdf/renderer";
import React, { useState } from "react";
import { Document, Page } from "@react-pdf/renderer";
// import pdf from "../../public/files/test.pdf"

function ViewPDF() {
  const [numPages, setNumPages] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);

  function onDocumentLoadSuccess({ numPages }) {
    // console.log(numPages);
    setNumPages(numPages);
  }

  // const pdf = "/files/test.pdf";
  // console.log(pdf)

  return (
    <PDFViewer>
      <Document
        file={
          "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf"
        }
      />
    </PDFViewer>

    // <div>
    //   <Document
    //     file={pdf}
    //     onLoadSuccess={onDocumentLoadSuccess}
    //   >
    //     <Page pageNumber={pageNumber} />
    //   </Document>
    //   <p>Page {pageNumber} of {numPages}</p>
    // </div>
  );
}

export default ViewPDF;
