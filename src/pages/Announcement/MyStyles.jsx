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
    [mainTheme.breakpoints.down("lg")]: {
      marginLeft: mainTheme.spacing(2.5),
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
  },
  form: {
    "& > *": {
      marginTop: mainTheme.spacing(2),
      flez: 1,
    },
  },
  disableField: {
    width: "100%",
    borderRadius: "24px",
    height: "55px",
    backgroundColor: "#fff",
    marginBottom: mainTheme.spacing(2),
    fontSize: "14px",
    cursor: "not-allowed",
    "& .MuiOutlinedInput-input": {
      [mainTheme.breakpoints.down("lg")]: {
        padding: "15.5px 15px",
      },
    },
    [mainTheme.breakpoints.down("lg")]: {
      width: "100%",
      height: "54px",
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
        padding: "15.5px 15px",
      },
    },
    [mainTheme.breakpoints.down("lg")]: {
      width: "90%",
      height: "54px",
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
    },
  },
  changeColorRed: {
    "& .MuiInputBase-input": {
      color: "red",
    },
  },
  changeColorYellow: {
    "& .MuiInputBase-input": {
      color: "#F2994A",
      fontSize: "14px",
      lineHeight: "19px",
      letterSpacing: "0.2em",
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
  },
  disableTextStyle: {
    "& .MuiInputBase-input": {
      fontSize: "16px",
      lineHeight: "19px",
      letterSpacing: "0.2em",
      color: "#20253B",
      opacity: "0.8",
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
    },
  },
  button: {
    width: "20%",
    height: "55px",
    borderRadius: "24px",
    fontSize: "15px",
    textTransform: "Capitalize",
    marginLeft: mainTheme.spacing(6),
    marginTop: mainTheme.spacing(5),
    marginBottom: mainTheme.spacing(5),
    [mainTheme.breakpoints.down("lg")]: {
      width: "22%",
      height: "50px",
      marginLeft: mainTheme.spacing(3),
    },
  },
  blueBtn: {
    width: "20%",
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
    [mainTheme.breakpoints.down("lg")]: {
      width: "22%",
      height: "50px",
      marginLeft: mainTheme.spacing(3),
    },
  },
  mainRow: {
    width: "100%",
  },
  inputImage: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    width: "80%",
    borderRadius: "24px",
    backgroundColor: "#fff",
    marginTop: mainTheme.spacing(0.5),
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
    marginTop: mainTheme.spacing(3),
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
    height: "240px",
    width: "97%",
    marginLeft: mainTheme.spacing(5),
    marginBottom: mainTheme.spacing(4),
    [mainTheme.breakpoints.down("lg")]: {
      width: "100%",
      marginLeft: mainTheme.spacing(5),
    },
  },
  bannerAvatarD: {
    height: "240px",
    width: "95%",
    marginLeft: "8px",
    marginBottom: mainTheme.spacing(4),
    [mainTheme.breakpoints.down("lg")]: {
      width: "95%",
      marginLeft: "8px",
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
}));
