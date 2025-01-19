import React, { useState, useEffect } from "react";
import {
  Grid,
  makeStyles,
  Typography,
  TextField,
  Button,
} from "@material-ui/core";
import { connect } from "react-redux";
import TableLeftArrow from "../../assets/svg/tableLeftArrow.svg";
import TableRightArrow from "../../assets/svg/tableRightArrow.svg";
import { setErrors } from "../../utils/global.actions";
import { MyCustomStyle } from "../../assets/styles/MyStyles";

const useStyles = makeStyles((mainTheme) => ({
  root: {
    [mainTheme.breakpoints.up("sm")]: {
      display: "flex",
    },
    [mainTheme.breakpoints.only("xs")]: {
      flexGrow: 1,
    },
  },
  navigation: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
  },
  disableGoArrow: {
    cursor: "not-allowed",
    opacity: 0.3,
  },
  goArrow: {
    cursor: "pointer",
  },
  handler: {
    height: "12px",
  },
  text: {
    color: "#20253b",
    fontWeight: 600,
    cursor: "pointer",
  },
  disabldText: {
    color: "#20253b",
    fontWeight: 600,
    opacity: 0.3,
    cursor: "not-allowed",
  },
  pageInfo: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-around",
  },
  genralText: {
    color: "#20253b",
    fontWeight: 600,
  },
  paginationLinkActive: {
    backgroundColor: "#20253b",
  },
  paginationLink: {
    cursor: "pointer",
    marginLeft: "10px",
    marginRight: "10px",
    color: "white",
    padding: "5px 10px 5px 10px",
    borderRadius: "50%",
    marginTop: -"6px",
    fontWeight: "bold",
  },
  jumpToRoot: {
    display: "flex",
    [mainTheme.breakpoints.only("xs")]: {
      marginTop: mainTheme.spacing(5),
    },
  },
  jumpContainer: {
    display: "flex",
    justifyContent: "flex-end",
  },

  field: {
    backgroundColor: "#fff",
    marginTop: mainTheme.spacing(-1.5),
    fontSize: "14px",
    [mainTheme.breakpoints.only("xl")]: {
      width: "35%",
      height: "50px",
    },
    "& .MuiInputBase-input": {
      padding: "5px 3px 0px 3px",
    },
    "& .MuiOutlinedInput-input": {
      [mainTheme.breakpoints.only("xl")]: {
        width: "95%",
        height: "40px",
        fontSize: "18px",
      },
      [mainTheme.breakpoints.only("lg")]: {
        // padding: "15.5px 15px",
        padding: "10.5px 5px 15.5px 10px",
        fontSize: "16px",
      },
      [mainTheme.breakpoints.down("md")]: {
        padding: "10px 5px 5px 10px",
        fontSize: "16px",
      },
    },
    [mainTheme.breakpoints.only("lg")]: {
      width: "90%",
      height: "40px",
    },
    [mainTheme.breakpoints.down("md")]: {
      width: "35%",
      height: "40px",
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
  blueBtn: {
    fontSize: "15px",
    borderRadius: "7px",
    color: "white",
    marginLeft: mainTheme.spacing(1),
    marginTop: mainTheme.spacing(-1.5),
    [mainTheme.breakpoints.only("lg")]: {
      height: "35px",
    },
    [mainTheme.breakpoints.down("md")]: {
      height: "40px",
      marginRight: mainTheme.spacing(2),
    },
  },
  spacing: {
    [mainTheme.breakpoints.down("sx")]: {
      display: "none",
    },
  },
}));

const TablePagination = ({
  getPageDataAction,
  totalPages,
  count,
  setErrors,
  id,
  searchPaginationAction,
  searchString,
  currentPage,
  setCurrentPage,
}) => {
  // const [currentPage, setCurrentPage] = useState(1);
  const [jump, setjump] = useState(null);
  const classes = useStyles();

  const goToFirstPage = () => {
    if (currentPage === 1) {
      return;
    } else {
      if (searchString) {
        setCurrentPage(1);
        searchPaginationAction(1, searchString);
        return;
      }
      if (id) {
        setCurrentPage(1);
        getPageDataAction(id, 1);
        return;
      }
      setCurrentPage(1);
      getPageDataAction(1);
    }
  };
  const handleNextPage = () => {
    //("clickedd");
    if (currentPage < totalPages) {
      if (searchString) {
        setCurrentPage((prev) => prev + 1);
        searchPaginationAction(currentPage + 1, searchString);
        return;
      }
      if (id) {
        setCurrentPage(currentPage + 1);
        getPageDataAction(id, currentPage + 1);
        return;
      }
      setCurrentPage(currentPage + 1);
      getPageDataAction(currentPage + 1);
    }
  };

  const handlePreviousPage = () => {
    // debugger;
    if (currentPage - 1 < 1) {
      return;
    }
    if (currentPage > 1) {
      if (searchString) {
        setCurrentPage(currentPage - 1);
        searchPaginationAction(currentPage - 1, searchString);
        return;
      }
      if (id) {
        setCurrentPage(currentPage - 1);
        getPageDataAction(id, currentPage - 1);
        return;
      }
      setCurrentPage(currentPage - 1);
      getPageDataAction(currentPage - 1);
    }
  };

  const handleNumberFields = (e) => {
    if (
      (e.keyCode < 48 || e.keyCode > 57) &&
      e.keyCode != 8 &&
      e.keyCode != 38 &&
      e.keyCode != 40
    ) {
      return e.preventDefault();
    }
  };

  const handleJumpChange = (e) => {
    setjump(parseInt(e.target.value));
  };

  const goToJump = (e) => {
    e.preventDefault();
    if (jump > totalPages) {
      setErrors("page not found", "error");
      return;
    }
    if (jump <= 0) {
      setErrors("page not found", "error");
      return;
    }
    if (jump <= totalPages) {
      if (searchString) {
        setCurrentPage(jump);
        searchPaginationAction(jump, searchString);
        return;
      }
      if (id) {
        setCurrentPage(jump);
        getPageDataAction(id, jump);
        return;
      }
      setCurrentPage(jump);
      getPageDataAction(jump);
    }
  };

  const goToLastPage = () => {
    if (currentPage === totalPages) {
      return;
    } else {
      if (searchString) {
        setCurrentPage(totalPages);
        searchPaginationAction(totalPages, searchString);
        return;
      }
      if (id) {
        setCurrentPage(totalPages);
        getPageDataAction(id, totalPages);
        return;
      }
      setCurrentPage(totalPages);
      getPageDataAction(totalPages);
    }
  };
  return (
    <>
      <br />
      <Grid maxWidth="xl" className={classes.root}>
        <Grid item xs={12} sm={6} md={6} lg={7} xl={7}>
          <div className={classes.navigation}>
            <div
              className={
                currentPage === 1 ? classes.disableGoArrow : classes.goArrow
              }
              onClick={goToFirstPage}
            >
              <img src={TableLeftArrow} className={classes.handler} />
              <img src={TableLeftArrow} className={classes.handler} />
            </div>
            <div
              className={currentPage > 1 ? classes.text : classes.disabldText}
              onClick={handlePreviousPage}
            >
              Pre
            </div>
            <div
              className={
                currentPage < totalPages ? classes.text : classes.disabldText
              }
              onClick={handleNextPage}
            >
              Next
            </div>
            <div
              className={
                currentPage === totalPages
                  ? classes.disableGoArrow
                  : classes.goArrow
              }
              onClick={goToLastPage}
            >
              <img src={TableRightArrow} className={classes.handler} />
              <img src={TableRightArrow} className={classes.handler} />
            </div>

            <div className={classes.pageInfo}>
              <div className={classes.genralText}> Page &nbsp; </div>
              <div
                className={`${classes.paginationLinkActive} ${classes.paginationLink}`}
              >
                {" "}
                {currentPage}{" "}
              </div>
              <div className={classes.genralText}>
                {" "}
                &nbsp; of &nbsp; &nbsp; {totalPages}{" "}
              </div>
            </div>
          </div>
        </Grid>
        <Grid item xs={1} sm={1} md={1} lg={1} xl={1} spacing></Grid>
        <Grid
          item
          xs={12}
          sm={5}
          md={5}
          lg={4}
          xl={4}
          className={classes.jumpToRoot}
        >
          <form style={{ display: "contents" }}>
            <div className={classes.jumpContainer}>
              <div className={classes.genralText}> jump to page </div> &nbsp;
              &nbsp;
              <TextField
                type="number"
                id="outlined-basic"
                variant="outlined"
                placeholder="page"
                className={[classes.field, classes.removeOutline]}
                // onKeyDown={ e => handleNumberFields(e) }
                InputProps={{ inputProps: { min: 1 } }}
                onChange={handleJumpChange}
              />
            </div>
            <Button
              variant="contained"
              type="submit"
              color="primary"
              size="small"
              onClick={goToJump}
              className={classes.blueBtn}
            >
              Go
            </Button>
          </form>
        </Grid>
      </Grid>
      <br />
    </>
  );
};

const mapStateToProps = ({}) => {
  return {};
};
export default connect(mapStateToProps, {
  setErrors,
})(TablePagination);
