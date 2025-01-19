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
    height: "auto",
    borderRadius: mainTheme.spacing(4),
    marginTop: mainTheme.spacing(3),
    marginBottom: mainTheme.spacing(3),
    marginLeft: mainTheme.spacing(2),
    boxShadow: "0px 4px 8px rgba(51, 51, 51, 0.16)",
    [mainTheme.breakpoints.down("lg")]:{
      width: "40%",
      height: "auto",
      marginLeft: mainTheme.spacing(2),
    },
    [mainTheme.breakpoints.down("xs")]:{
      width: "95%",
      height: "auto",
      marginLeft: mainTheme.spacing(0),
    }
  },
  
  title: {
    color: '#20253B',
    fontWeight: 600,
    fontSize: mainTheme.spacing(3),
    marginTop: mainTheme.spacing(1),
    marginLeft: mainTheme.spacing(3),
    marginRight: mainTheme.spacing(3),
    [mainTheme.breakpoints.down("lg")]:{
      marginLeft: mainTheme.spacing(1),
      fontSize: mainTheme.spacing(3),
    }
  },
  moonerCurrency: {
    color: '#9E6DC9',
    fontWeight: 'bold',
    fontSize: mainTheme.spacing(2),
    marginLeft: mainTheme.spacing(3),
    marginTop: mainTheme.spacing(2),
    [mainTheme.breakpoints.down("lg")]:{
      marginLeft: mainTheme.spacing(1),
    },
  },
  flatCurrency: {
    color: '#EE786C',
    fontWeight: 'bold',
    fontSize: mainTheme.spacing(2),
    marginLeft: mainTheme.spacing(3),
    marginTop: mainTheme.spacing(0),
    [mainTheme.breakpoints.down("lg")]:{
      marginLeft: mainTheme.spacing(1),
    },
  },
  cancellationFee:{
    fontSize: mainTheme.spacing(1.7),
    marginLeft: mainTheme.spacing(3),
    marginTop: mainTheme.spacing(3.5),
    [mainTheme.breakpoints.down("lg")]:{
      marginLeft: mainTheme.spacing(1),
    },
  },
  btn: {
    color:"#9E6DC9",
    marginLeft: mainTheme.spacing(3),
    textTransform: "capitalize",
    marginTop: mainTheme.spacing(0),
    [mainTheme.breakpoints.down("lg")]:{
      marginLeft: mainTheme.spacing(1),
      marginBottom: mainTheme.spacing(1),
    }
  },
}));

export default function ValueDistributionCard(props) {
  const classes = useStyles();
  const {title, title2, spAmount, ssAmount, title3, cancellationFee,  btnText} = props;
  return (
    <Card className={classes.root} variant="outlined">
      <CardContent>
        <Typography className={classes.title}>
            {title}
        </Typography>
        <Typography className={classes.moonerCurrency}>
          {title2} &nbsp; &nbsp; {spAmount}
        </Typography>
        <Typography className={classes.flatCurrency}>
          {title3} &nbsp; &nbsp; {ssAmount}
        </Typography>
        <Typography className={classes.cancellationFee}>
            <u>{cancellationFee}</u>
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small" className={classes.btn}> <u> {btnText} </u> </Button>
      </CardActions>
    </Card>
  );
}
