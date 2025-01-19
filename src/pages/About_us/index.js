import React from "react";
import { Grid, Typography, makeStyles, Box } from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";
import ArrowRightIcon from "@material-ui/icons/ArrowRight";
import { useHistory } from "react-router-dom";

const useStyles = makeStyles((mainTheme) => ({
    root: {
        flexGrow: 1,
        marginTop: mainTheme.spacing(6),
        marginBottom: mainTheme.spacing(5),
    },
    addNewBtn: {
        marginLeft: mainTheme.spacing(2),
        width: "100px",
        height: "95px",
        backgroundColor:
            mainTheme &&
            mainTheme.palette &&
            mainTheme.palette.secondary &&
            mainTheme.palette.secondary.main,
        borderRadius: "30px",
        boxShadow: " 0px 10px 10px rgba(32, 37, 59, 0.15)",
        cursor: 'pointer'
    },
    iconWrapper: {
        textAlign: "center",
    },
    typogrid: {
        textAlign: "center",
        marginLeft: "15px",
        marginTop: "3px",
        color: "#000000",
        fontSize: "14px",
        fontWeight: '300',
        lineHeight: "22px",
        fontWeight: '600'
    },
    title: {
        fontSize: "24px",
        lineHeight: "28px",
        letterSpacing: "0.2em",
        color: "#000000",
        opacity: '0.5',
        marginLeft: mainTheme.spacing(2),
        marginRight: "7px",
        fontWeight: '700'
    },
    title2: {
        fontSize: "24px",
        lineHeight: "28px",
        letterSpacing: "0.2em",
        color: "#000000",
        marginLeft: "7px",
        fontWeight: '700',
    },
    categoryHeading: {
        marginBottom: mainTheme.spacing(5),
        display: "flex",
        //   direction: "row",
    },
    typodiv: {
        marginTop: "15px",
    },
    typography: {
        fontSize: "20px",
        fontWeight: 'bold',
        position: 'relative',
        top: '33px',
    }
}));

const MoonerManagement = () => {
    const classes = useStyles();
    const history = useHistory();
    const TermsCondition = () => {
        history.push({
            pathname: "/mooner/terms_conditions",
        });
    };
    const handlePrivicyPolicy = () => {
        history.push({
            pathname: "/mooner/privicy_policy",
        });
    };

    const handleBanner = () => {
        history.push({
            pathname: "/mooner/about_us",
        });
    }

    return (
        <>
            <div className={classes.root}>
                <Grid item className={classes.categoryHeading}>
                    <Typography className={classes.title}> Mooner Management </Typography>
                    <ArrowRightIcon />
                    <Typography className={classes.title2}> Types </Typography>
                </Grid>

                <Grid container spacing={3}>
                    <Grid item onClick={TermsCondition}>
                        <div className={classes.addNewBtn}>
                            <Box className={classes.iconWrapper}>
                                <Typography className={classes.typography}>
                                    T
                                </Typography>
                            </Box>
                        </div>
                        <div className={classes.typodiv}>
                            <Typography className={classes.typogrid}>Terms & Conditions</Typography>
                        </div>
                    </Grid>
                    <Grid item onClick={handlePrivicyPolicy}>
                        <div className={classes.addNewBtn}>
                            <Box className={classes.iconWrapper}>
                                <Typography className={classes.typography}>
                                    P
                                </Typography>
                            </Box>
                        </div>
                        <div className={classes.typodiv}>
                            <Typography className={classes.typogrid}> Privicy Policy </Typography>
                        </div>
                    </Grid>
                    <Grid item onClick={handleBanner}>
                        <div className={classes.addNewBtn}>
                            <Box className={classes.iconWrapper}>
                                <Typography className={classes.typography}>
                                    A
                                </Typography>
                            </Box>
                        </div>
                        <div className={classes.typodiv}>
                            <Typography className={classes.typogrid}> About Us </Typography>
                        </div>
                    </Grid>
                </Grid>
            </div>
        </>
    );
};
export default MoonerManagement;
