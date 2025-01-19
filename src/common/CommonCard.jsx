import React from 'react'
import { useHistory } from "react-router";
import  { 
    
    makeStyles,
    Typography,
    Button,
 }  from '@material-ui/core';




const useStyles = makeStyles((mainTheme) => ({
    awardContainer:{
        // marginTop: mainTheme.spacing(3),
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        [mainTheme.breakpoints.down("md")]:{
            marginBottom: mainTheme.spacing(4),
            marginRight: mainTheme.spacing(2),
        }
    },
    awardContent:{
        marginTop: mainTheme.spacing(4),
        borderRadius: '24px',
        width: '90%',
        Height: '150px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#FCA19E',
        boxShadow: ' 0px 10px 10px rgba(32, 37, 59, 0.15)',
        [mainTheme.breakpoints.only("lg")]:{
            width: '100%',
            marginTop: mainTheme.spacing(1),
        }
    },
    awardDiscription:{
        marginTop: mainTheme.spacing(3),
        marginBottom: mainTheme.spacing(3),
        fontSize: "24px",
        lineHeight: "28px",
        color:  mainTheme && mainTheme.palette && mainTheme.palette.primary && mainTheme.palette.primary.main,
        textAlign: 'center',
        padding: mainTheme.spacing(1),
        [mainTheme.breakpoints.only("lg")]:{
            fontSize: "20px"
        }
    },
    editBtn:{
        width: '60%',
        // height: '50px',
        borderRadius: '24px',
        fontSize: "15px",
        textTransform: "Capitalize",
        marginTop: mainTheme.spacing(0),
        marginBottom: mainTheme.spacing(4),
    }

   

}));

const CommonCard = (props) => {
    const history = useHistory();
    const classes = useStyles();
    const handleClick = () => {
        history.push({
            pathname: props && props.link,
        })
    }
    return(
        <>
            <div className={classes.awardContainer}>
                <div className={classes.awardContent}>
                    <Typography className={classes.awardDiscription}>
                        {props.message}
                    </Typography>
                    <Button
                        variant="contained"
                        color= "secondary"
                        size="large"
                        className={classes.editBtn}
                        onClick={handleClick}
                    >
                        {props.btnText}
                    </Button>
                </div>
            </div>
        </>
    );
}
export default CommonCard;