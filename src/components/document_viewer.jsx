import { PDFViewer } from "@react-pdf/renderer";
import React, { useState } from "react";
import { Document, Page } from "@react-pdf/renderer";
// import pdf from "../../public/files/test.pdf"

function ViewPDF() {
  return (
    <PDFViewer>
      <Document
        file={
          "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf"
        }
      />
    </PDFViewer>
  );
}

export default ViewPDF;
