import React from 'react';
import {
    Typography,
    makeStyles,
    Container,
  } from "@material-ui/core";

  import Pagenotfount from "../assets/svg/pagenotfound.svg"

const useStyles = makeStyles ((mainTheme) => ({
    container:{
        marginTop: mainTheme.spacing(15),
        height: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: "center",
        flexDirection: 'column'
    },
    textStyle:{
        fontSize: "48px",
        lineHeight: "56px",
        textTransform: "uppercase",
        fontWeight: '600'
    }
}));

export default function PageNotFound() {
  const classes = useStyles();

  return (
    <Container>
        <div className={classes.container}>
            <img src={Pagenotfount} className={classes.img} />
            <Typography className={classes.textStyle}>
                OPPS!
            </Typography>
            <Typography className={classes.textStyle}>
                The page you were looking for 
                does not exist
            </Typography>
        </div>
    </Container>
  );
}
