import React from "react";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

import imag from "../../assets/images/moonerfooter.png";
import { Button, makeStyles, Typography } from "@material-ui/core";
const useStyles = makeStyles((mainTheme) => ({
  button: {
    width: "100%",
    borderRadius: "24px",
    fontSize: "15px",
    textTransform: "Capitalize",
    marginTop: mainTheme.spacing(0),
    marginBottom: mainTheme.spacing(4),
  },
}));
export default function Download() {
  const classes = useStyles();
  const generatePDF = ({ data }) => {
    //("data", data);
    var doc = new jsPDF("p", "pt");

    // doc.text(100, 40, `Total Number of Users:`);
    // doc.addFont("helvetica", "normal");
    // doc.text(100, 80, `Total number of service providers:`);
    // doc.text(100, 120, `Total number of Bookings:`);
    // doc.text(100, 160, `Total amount earned on app`);
    // doc.text(100, 180, `(Total MNR top up + Total completed jobs amount):`);
    // doc.text(100, 220, `Total amount of paid out MNR's:`);
    // doc.text(100, 260, `Total numbers of complaints:`);
    // doc.text(100, 300, `Pending:`);
    // doc.text(100, 340, `Completed:`);
    doc.text(200, 50, `Report Management`);
    autoTable(doc, {
      //   head: [["Name", "Email", "Country"]],
      theme: "grid",
      startY: 100,
      styles: { fontSize: 15 },
      columnStyles: {
        0: { cellWidth: "50%", minCellHeight: 40 },
        1: { cellWidth: 100, minCellHeight: 40 },
      },

      body: [
        ["Total Number of Users:", 0],
        ["Total number of service providers:", 0],
        ["Total number of Bookings:", 0],
        ["Total amount earned on app", 0],
        ["Total amount of paid out MNR's:", 0],
        ["Total numbers of complaints:", 0],
        ["Pending:", 0],
        ["Completed:", 0],
      ],
    });
    var img = new Image();
    img.src = imag;
    doc.addImage(img, "png", 270, 500, 70, 70);
    doc.save("report.pdf");
  };

  return (
    <div>
      <Button
        onClick={generatePDF}
        className={classes.button}
        variant="contained"
        color="secondary"
        size="large"
        style={{
          textTransform: "none !important",
        }}
      >
        Download PDF
      </Button>
    </div>
  );
}
