import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import  Graph  from "../../assets/svg/graph.svg";

const useStyles = makeStyles ((mainTheme) => ({
  root: {
    width: "20%",
    height: "250px",
    borderRadius: mainTheme.spacing(4),
    marginTop: mainTheme.spacing(3),
    boxShadow: "0px 4px 8px rgba(51, 51, 51, 0.16)",
    [mainTheme.breakpoints.down("lg")]:{
      width: "30%",
    },
    [mainTheme.breakpoints.down("xs")]:{
      width: "95%",
    }
  },
  
  title: {
    fontWeight: "bold",
    color: '#333333',
    fontSize: mainTheme.spacing(3),
    marginLeft: mainTheme.spacing(3),
    [mainTheme.breakpoints.down("lg")]:{
      marginLeft: mainTheme.spacing(1),
    }
  },
  btn: {
    color:"#9E6DC9",
    marginLeft: mainTheme.spacing(3),
    textTransform: "capitalize",
    marginTop: mainTheme.spacing(10),
    [mainTheme.breakpoints.down("lg")]:{
      marginLeft: mainTheme.spacing(1),
    }
  },
  price: {
    fontWeight: "bold",
    color: '#333333',
    fontSize: mainTheme.spacing(3),
    marginLeft: mainTheme.spacing(3),
    [mainTheme.breakpoints.down("lg")]:{
      marginLeft: mainTheme.spacing(1),
    }
  },
}));

export default function GraphCard() {
  const classes = useStyles();

  return (
    <Card className={classes.root} variant="outlined">
      <CardContent>
        <Typography className={classes.title}>
          MNR BEP20
        </Typography>
        <img src={Graph} />
        <Typography className={classes.price}>
          $50
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small" className={classes.btn}> <u>Change Price</u> </Button>
      </CardActions>
    </Card>
  );
}
