import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles ((mainTheme) => ({
  root: {
    width: "auto",
    height: "250px",
    borderRadius: mainTheme.spacing(4),
    marginTop: mainTheme.spacing(3),
    marginBottom: mainTheme.spacing(3),
    marginLeft: mainTheme.spacing(2),
    boxShadow: "0px 4px 8px rgba(51, 51, 51, 0.16)",
    [mainTheme.breakpoints.down("lg")]:{
      width: "auto%",
    },
    [mainTheme.breakpoints.only("md")]:{
      width: "32%",
    },
    [mainTheme.breakpoints.down("xs")]:{
      width: "95%",
      marginLeft: mainTheme.spacing(0),
    },
  },
  
  title: {
    fontWeight: "bold",
    color: '#20253B',
    fontSize: mainTheme.spacing(8),
    marginLeft: mainTheme.spacing(3),
    marginRight: mainTheme.spacing(3),
    [mainTheme.breakpoints.down("lg")]:{
      marginLeft: mainTheme.spacing(1),
      fontSize: mainTheme.spacing(5),
    }
  },
  subtitle: {
    color: '#20253B',
    fontSize: mainTheme.spacing(2),
    marginLeft: mainTheme.spacing(3),
    letterSpacing: "0.2em",
    [mainTheme.breakpoints.down("lg")]:{
      marginLeft: mainTheme.spacing(1),
    },
  },
  btn: {
    color:"#9E6DC9",
    marginLeft: mainTheme.spacing(3),
    textTransform: "capitalize",
    marginTop: mainTheme.spacing(5),
    [mainTheme.breakpoints.down("lg")]:{
      marginLeft: mainTheme.spacing(1),
      marginTop: mainTheme.spacing(8),
    }
  },
}));

export default function BudgetCard(props) {
  const classes = useStyles();
  return (
    <Card className={classes.root} variant="outlined">
      <CardContent>
        <Typography className={classes.title}>
            {props.title}
        </Typography>
        <Typography className={classes.subtitle}>
            {props.subtitle}
        </Typography>
      </CardContent>
      <CardActions>
        <Button 
          size="small"
          className={classes.btn}
          onClick={props && props.handleFunction && props.handleFunction}
        >
          <u>{props.btnText}</u>
        </Button>
      </CardActions>
    </Card>
  );
}
