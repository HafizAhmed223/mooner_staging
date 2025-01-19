import React from "react";
import Pdf from "react-to-pdf";

// import "./styles.css";
const ref = React.createRef();

function PdfButton() {
  return (
    <div className="App">
      <Pdf targetRef={ref} filename="code-example.pdf">
        {({ toPdf }) => (
          <button
            style={{
              textDecoration: "none",
              // padding: "13px",
              color: "#000000",
              margin: "auto",
              // backgroundColor: "#f2f2f2",
              // border: "1px solid #4a4a4a"
            }}
            onClick={toPdf}
          >
            Generate Pdf
          </button>
        )}
      </Pdf>
      <div
        ref={ref}
        //   style={{ visibility: "hidden" }}
      >
        <h1>Hello CodeSandbox</h1>
        <h2>Start editing to see some magic happen!</h2>
      </div>
    </div>
  );
}
export default PdfButton;
