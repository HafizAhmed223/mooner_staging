import React from "react";
import { makeStyles } from "@material-ui/core";
export const MyCustomStyle = makeStyles((mainTheme) => ({
  root: {
    flexGrow: 1,
    backgroundColor: "#F0F3F8",
    height: "auto",
  },
  mainContainer: {
    display: "flex",
    flexDirection: "row",
    maxWidth: "100%",
    marginLeft: mainTheme.spacing(5),
    [mainTheme.breakpoints.only("lg")]: {
      marginLeft: mainTheme.spacing(2.5),
    },
    [mainTheme.breakpoints.down("md")]: {
      marginLeft: mainTheme.spacing(1),
    },
  },
  Title: {
    fontSize: "24px",
    lineHeight: "28px",
    letterSpacing: "0.2em",
    marginTop: mainTheme.spacing(5),
    marginBottom: mainTheme.spacing(4),
    marginLeft: mainTheme.spacing(10),
    color:
      mainTheme &&
      mainTheme.palette &&
      mainTheme.palette.primary &&
      mainTheme.palette.primary.main,
    fontWeight: "600",
    [mainTheme.breakpoints.down("lg")]: {
      fontSize: "17px",
      marginLeft: mainTheme.spacing(5),
    },
    [mainTheme.breakpoints.only("xs")]: {
      fontSize: "20px",
      marginLeft: mainTheme.spacing(1.8),
    },
  },
  form: {
    "& > *": {
      marginTop: mainTheme.spacing(2),
      flez: 1,
    },
  },
  disableField: {
    width: "85%",
    borderRadius: "24px",
    height: "55px",
    backgroundColor: "#fff",
    marginBottom: mainTheme.spacing(2),
    fontSize: "14px",
    cursor: "not-allowed",
    "& .MuiOutlinedInput-input": {
      [mainTheme.breakpoints.down("lg")]: {
        padding: "10.5px 5px 15.5px 10px",
        color: "#20253B",
        opacity: "0.7",
        fontSize: "16px",
      },
    },
    [mainTheme.breakpoints.down("lg")]: {
      width: "90%",
      height: "44px",
      borderRadius: "10px",
    },
  },
  disableRemoveOutline: {
    "& .MuiOutlinedInput-input": {
      cursor: "not-allowed",
    },
    "& .MuiOutlinedInput-root": {
      "&.Mui-focused fieldset": {
        border: 0,
      },
      "&:hover fieldset": {
        border: 0,
      },
      "& fieldset": {
        border: 0,
      },
    },
  },
  field: {
    width: "85%",
    borderRadius: "24px",
    height: "55px",
    backgroundColor: "#fff",
    marginBottom: mainTheme.spacing(2),
    fontSize: "14px",
    "& .MuiOutlinedInput-input": {
      [mainTheme.breakpoints.down("lg")]: {
        padding: "10.5px 5px 15.5px 10px",
        color: "#20253B",
        opacity: "0.8",
        fontSize: "16px",
      },
    },
    [mainTheme.breakpoints.down("lg")]: {
      width: "90%",
      height: "44px",
      borderRadius: "10px",
    },
  },
  removeOutline: {
    "& .MuiOutlinedInput-root": {
      "&.Mui-focused fieldset": {
        border: 0,
      },
      "&:hover fieldset": {
        border: 0,
      },
      "& fieldset": {
        border: 0,
      },
    },
  },
  changeColor: {
    "& .MuiInputBase-input": {
      color: "green",
      fontSize: "16px",
      lineHeight: "19px",
      letterSpacing: "0.2em",
      opacity: "0.8",
      backgroundColor: "#fff",
      borderRadius: "20px",
    },
  },
  disableChangeColor: {
    "& .MuiInputBase-input": {
      color: "green",
      fontSize: "16px",
      lineHeight: "19px",
      letterSpacing: "0.2em",
      opacity: "0.8",
      backgroundColor: "#fff",
      borderRadius: "20px",
      cursor: "not-allowed",
    },
  },
  changeColorRed: {
    "& .MuiInputBase-input": {
      color: "red",
      fontSize: "16px",
      lineHeight: "19px",
      letterSpacing: "0.2em",
      opacity: "0.8",
      backgroundColor: "#fff",
      borderRadius: "20px",
    },
  },
  disableChangeColorRed: {
    "& .MuiInputBase-input": {
      color: "red",
      fontSize: "16px",
      lineHeight: "19px",
      letterSpacing: "0.2em",
      opacity: "0.8",
      backgroundColor: "#fff",
      borderRadius: "20px",
    },
  },
  changeColorYellow: {
    "& .MuiInputBase-input": {
      color: "#F2994A",
      fontSize: "16px",
      lineHeight: "19px",
      letterSpacing: "0.2em",
      opacity: "0.8",
      backgroundColor: "#fff",
      borderRadius: "20px",
    },
  },
  label: {
    fontSize: "16px",
    lineHeight: "19px",
    letterSpacing: "0.2em",
    marginTop: mainTheme.spacing(1),
    marginLeft: mainTheme.spacing(),
    color:
      mainTheme &&
      mainTheme.palette &&
      mainTheme.palette.primary &&
      mainTheme.palette.primary.main,
  },
  blockTextArea: {
    outline: "none",
    borderStyle: "none",
    width: "90%",
    padding: "10px",
    fontSize: "16px",
    lineHeight: "19px",
    letterSpacing: "0.2em",
    color: "#20253B",
    opacity: "0.8",
    backgroundColor: "#fff",
    cursor: "not-allowed",
    borderRadius: "20px",
    [mainTheme.breakpoints.down("lg")]: {
      borderRadius: "10px",
    },
  },
  textArea: {
    outline: "none",
    borderStyle: "none",
    width: "90%",
    padding: "10px",
    fontSize: "16px",
    lineHeight: "19px",
    letterSpacing: "0.2em",
    color: "#20253B",
    opacity: "0.8",
    borderRadius: "20px",
    [mainTheme.breakpoints.down("lg")]: {
      borderRadius: "10px",
    },
  },
  disableTextStyle: {
    "& .MuiInputBase-input": {
      fontSize: "16px",
      lineHeight: "19px",
      letterSpacing: "0.2em",
      color: "#20253B",
      opacity: "0.7",
      cursor: "not-allowed",
    },
  },
  textStyle: {
    "& .MuiInputBase-input": {
      fontSize: "16px",
      lineHeight: "19px",
      letterSpacing: "0.2em",
      color: "#20253B",
      opacity: "0.8",
      backgroundColor: "#fff",
      borderRadius: "20px",
      // height: '5px',
    },
  },
  button: {
    width: "15%",
    height: "55px",
    borderRadius: "24px",
    fontSize: "15px",
    textTransform: "Capitalize",
    marginLeft: mainTheme.spacing(5),
    marginTop: mainTheme.spacing(5),
    marginBottom: mainTheme.spacing(5),
    [mainTheme.breakpoints.only("lg")]: {
      width: "22%",
      height: "50px",
      marginLeft: mainTheme.spacing(3),
      borderRadius: "10px",
    },
    [mainTheme.breakpoints.only("md")]: {
      width: "32%",
      height: "50px",
      marginLeft: mainTheme.spacing(3),
      borderRadius: "10px",
    },
    [mainTheme.breakpoints.only("sm")]: {
      width: "42%",
      height: "50px",
      marginLeft: mainTheme.spacing(3),
      borderRadius: "10px",
    },
    [mainTheme.breakpoints.down("xs")]: {
      width: "90%",
      height: "50px",
      marginLeft: mainTheme.spacing(1),
      borderRadius: "10px",
    },
  },
  blueBtn: {
    width: "15%",
    height: "55px",
    borderRadius: "24px",
    fontSize: "15px",
    color:
      mainTheme &&
      mainTheme.palette &&
      mainTheme.palette.secondary &&
      mainTheme.palette.secondary.main,
    textTransform: "Capitalize",
    marginLeft: mainTheme.spacing(5),
    marginTop: mainTheme.spacing(5),
    marginBottom: mainTheme.spacing(5),
    [mainTheme.breakpoints.only("lg")]: {
      width: "22%",
      height: "50px",
      marginLeft: mainTheme.spacing(3),
      borderRadius: "10px",
    },
    [mainTheme.breakpoints.only("md")]: {
      width: "32%",
      height: "50px",
      marginLeft: mainTheme.spacing(3),
      borderRadius: "10px",
    },
    [mainTheme.breakpoints.only("sm")]: {
      width: "42%",
      height: "50px",
      marginLeft: mainTheme.spacing(3),
      borderRadius: "10px",
    },
    [mainTheme.breakpoints.down("xs")]: {
      width: "90%",
      height: "50px",
      marginLeft: mainTheme.spacing(1),
      borderRadius: "10px",
    },
  },
  mainRow: {
    width: "100%",
  },
  inputImage: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    width: "84%",
    height: "60px",
    borderRadius: "24px",
    backgroundColor: "#fff",
    marginTop: mainTheme.spacing(0.5),
    [mainTheme.breakpoints.down("md")]: {
      width: "89%",
      height: "50px",
      borderRadius: "10px",
    },
  },
  inputImageDisable: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    width: "80%",
    borderRadius: "24px",
    backgroundColor: "#fff",
    cursor: "not-allowed",
    marginTop: mainTheme.spacing(0.5),
  },
  linkImage: {
    padding: "17px",
    cursor: "pointer",
  },
  linkImageBlocked: {
    padding: "17px",
    cursor: "not-allowed",
  },
  imageWrapper: {
    marginTop: mainTheme.spacing(0),
    // marginTop: mainTheme.spacing(3)
  },
  imageName: {
    padding: "20px",
    fontSize: "16px",
    lineHeight: "19px",
    letterSpacing: "0.2em",
    color: "#20253B",
    opacity: 0.8,
  },
  bannerContainer: {
    display: "flex",
    alignItems: "flex-start",
    justifyContent: "flex-start",
  },
  bannerAvatar: {
    height: "auto",
    // width: '90%',
    width: "auto",
    borderRadius: "10px",
    maxWidth: "200px",
    maxHeight: "200px",
    marginBottom: mainTheme.spacing(4),
    [mainTheme.breakpoints.up("xl")]: {
      marginLeft: mainTheme.spacing(10),
    },
    [mainTheme.breakpoints.only("lg")]: {
      // width: '100%',
      marginLeft: mainTheme.spacing(5),
    },
    [mainTheme.breakpoints.only("md")]: {
      // width: '80%',
      marginLeft: mainTheme.spacing(5),
    },
    [mainTheme.breakpoints.only("sm")]: {
      // width: '90%',
      marginLeft: mainTheme.spacing(5),
    },
    [mainTheme.breakpoints.down("xs")]: {
      // width: '90%',
      marginLeft: mainTheme.spacing(2.5),
    },
  },
  limitPayment: {
    ontSize: "14px",
    lineHeight: "19px",
    letterSpacing: "0.2em",
    color: "red",
    // opacity: '0.8',
    marginLeft: mainTheme.spacing(1),
  },
  subtitle: {
    fontSize: "16px",
    lineHeight: "28px",
    letterSpacing: "0.2em",
    marginTop: mainTheme.spacing(5),
    marginBottom: mainTheme.spacing(2),
    // marginLeft: mainTheme.spacing(1),
    color:
      mainTheme &&
      mainTheme.palette &&
      mainTheme.palette.primary &&
      mainTheme.palette.primary.main,
  },
  typeContainer: {
    display: "inline",
    fontSize: "10px",
    marginBottom: mainTheme.spacing(3),
    "& .MuiRadio-colorSecondary.Mui-checked": {
      color:
        mainTheme &&
        mainTheme.palette &&
        mainTheme.palette.primary &&
        mainTheme.palette.primary.main,
    },
  },
  secondTitle: {
    fontSize: "18px",
    lineHeight: "28px",
    letterSpacing: "0.2em",
    marginTop: mainTheme.spacing(5),
    marginBottom: mainTheme.spacing(4),
    marginLeft: mainTheme.spacing(5),
    color:
      mainTheme &&
      mainTheme.palette &&
      mainTheme.palette.primary &&
      mainTheme.palette.primary.main,
    fontWeight: "300",
    [mainTheme.breakpoints.down("lg")]: {
      fontSize: "17px",
      marginLeft: mainTheme.spacing(5),
    },
    [mainTheme.breakpoints.only("xs")]: {
      fontSize: "20px",
      marginLeft: mainTheme.spacing(1.8),
    },
  },
  optionhandler: {
    backgroundColor: "white",
    width: mainTheme.spacing(10),
    height: mainTheme.spacing(4),
    borderRadius: mainTheme.spacing(4),
    display: "flex",
    alignItems: "center",
    justifyContent: "space-around",
    float: "right",
  },
  remove: {
    cursor: "pointer",
    fontSize: mainTheme.spacing(3),
  },
  add: {
    cursor: "pointer",
    fontSize: mainTheme.spacing(3),
  },
  disableAddBtn: {
    cursor: "not-allowed",
    fontSize: mainTheme.spacing(3),
    // display: "none",
  },
  disableMore: {
    cursor: "not-allowed",
    fontSize: mainTheme.spacing(3),
  },
  multipleSelect: {
    "& .MuiInputBase-input": {
      fontSize: "16px",
      lineHeight: "19px",
      letterSpacing: "0.2em",
      borderStyle: "none",
      minWidth: "420px",
      color: "#20253B",
      // opacity: "0.8",
      backgroundColor: "#fff",
      borderRadius: "20px",
    },
  },
  Switch: {
    backgroundColor:'red'
  },
  
}));
