import React, { useState } from "react";
import {
  Grid,
  Container,
  TextField,
  Typography,
  Button,
  FormControl,
  Select,
  MenuItem,
  InputLabel,
  makeStyles,
  TextareaAutosize
} from "@material-ui/core";

import Topbar from "../topbar";
import {useHistory} from 'react-router-dom';
import { MyCustomStyle } from "../../assets/styles/MyStyles";


// const myStyle = makeStyles((mainTheme) => ({
//     root: {
//       flexGrow: 1,
//       backgroundColor: "#F0F3F8",
//       height: "auto",
//       [mainTheme.breakpoints.only("xl")]:{
//         height: '100vh'
//       },
//       [mainTheme.breakpoints.only("lg")]:{
//         height: '100vh'
//       }
//     },
// }));
const CreateTicket = () => {
  const classes = MyCustomStyle();
  // const partialStyle = myStyle();
  const history = useHistory();
  const [category, setCategory] = useState("");
  const [status, setStatus] = useState("");
  const [dept, setDept] = useState("");

  const handleChangeCategory = (event) => {
    setCategory(event.target.value);
  };

  const handleChangeStatus = (event) => {
    setStatus(event.target.value);
  };

  const handleChangeDept = (event) => {
    setDept(event.target.value)
  }
  
  return (
    <>
      <Container maxWidth="xl">
        <Grid container spacing={2}>
          <Grid item sm={12}>
            <Topbar module=" Ticket Management " item=" Create Ticket " bckLink="/mooner/details/ticket_management" />
          </Grid>
        </Grid>
        <div className={classes.root}>
          <Typography className={classes.Title} gutterBottom>
            Ticket Details
          </Typography>
          <Grid container spacing={2} className={classes.mainContainer}>
            <Grid xs={12}>
              {/* <form className={classes.form} noValidate autoComplete="off"> */}
              <Grid Container spacing={2} className={classes.mainContainer}>
                <Grid
                  item
                  xs={12}
                  sm={6}
                  md={6}
                  lg={4}
                  xl={4}
                  className={classes.mainRow}
                >
                    <Typography className={classes.label} gutterBottom>
                        Category
                    </Typography>
                    <FormControl
                      variant="outlined"
                      className={[classes.field, classes.removeOutline]}
                    >
                      <InputLabel id="demo-simple-select-outlined-label"></InputLabel>
                      <Select
                        onChange={handleChangeCategory}
                        value={category}
                        name="userType"
                        labelId="demo-simple-select-outlined-label"
                        id="demo-simple-select-outlined"
                        label="subCategories"
                        className={classes.textStyle}
                        MenuProps={{
                          anchorOrigin: {
                            vertical: "bottom",
                            horizontal: "left"
                          },
                          transformOrigin: {
                            vertical: "top",
                            horizontal: "left"
                          },
                          getContentAnchorEl: null
                        }}
                      >
                        <MenuItem className={classes.dropdownMenuStyle} value={"global"}>
                          Food
                        </MenuItem>
                        <MenuItem className={classes.dropdownMenuStyle} value={"regional"}>
                          Driver
                        </MenuItem>
                        <MenuItem className={classes.dropdownMenuStyle} value={"local"}>
                          Hair Style
                        </MenuItem>
                      </Select>
                    </FormControl>
                </Grid>
              </Grid>
              <Grid container spacing={2} className={classes.mainContainer}>
                <Grid
                  item
                  xs={12}
                  sm={6}
                  md={6}
                  lg={4}
                  xl={4}
                  className={classes.mainRow}
                >
                    <Typography className={classes.label} gutterBottom>
                        Status
                    </Typography>
                    <FormControl
                      variant="outlined"
                      className={[classes.field, classes.removeOutline]}
                    >
                        <InputLabel id="demo-simple-select-outlined-label"></InputLabel>
                        <Select
                            labelId="demo-simple-select-outlined-label"
                            id="demo-simple-select-outlined"
                            value={status}
                            onChange={handleChangeStatus}
                            label="staus"
                            className={
                                status === "active"
                                ? classes.changeColor
                                : classes.changeColorRed
                            }
                            MenuProps={{
                              anchorOrigin: {
                                vertical: "bottom",
                                horizontal: "left"
                              },
                              transformOrigin: {
                                vertical: "top",
                                horizontal: "left"
                              },
                              getContentAnchorEl: null
                            }}
                        >
                            <MenuItem style={{ color: "green" }} value={"active"}>
                                Active
                            </MenuItem>
                            <MenuItem style={{ color: "red" }} value={"Inactive"}>
                                InActive
                            </MenuItem>
                        </Select>
                    </FormControl>
                </Grid>
                <Grid
                  item
                  xs={12}
                  sm={6}
                  md={6}
                  lg={4}
                  xl={4}
                  className={classes.mainRow}
                >
                    <Typography className={classes.label} gutterBottom>
                        Department
                    </Typography>
                    <FormControl
                      variant="outlined"
                      className={[classes.field, classes.removeOutline]}
                    >
                      <InputLabel id="demo-simple-select-outlined-label"></InputLabel>
                      <Select
                        onChange={handleChangeDept}
                        value={dept}
                        name="userType"
                        labelId="demo-simple-select-outlined-label"
                        id="demo-simple-select-outlined"
                        label="subCategories"
                        className={classes.textStyle}
                        MenuProps={{
                          anchorOrigin: {
                            vertical: "bottom",
                            horizontal: "left"
                          },
                          transformOrigin: {
                            vertical: "top",
                            horizontal: "left"
                          },
                          getContentAnchorEl: null
                        }}
                      >
                        <MenuItem className={classes.dropdownMenuStyle} value={"global"}>
                          Dept A
                        </MenuItem>
                        <MenuItem className={classes.dropdownMenuStyle} value={"regional"}>
                          Dept B
                        </MenuItem>
                        <MenuItem className={classes.dropdownMenuStyle} value={"local"}>
                          Dept C
                        </MenuItem>
                      </Select>
                    </FormControl>
                </Grid>
              </Grid>
              <Grid container spacing={2} className={classes.mainContainer}>
                <Grid
                  item
                  xs={11}
                  sm={12}
                  md={12}
                  lg={8}
                  xl={8}
                  className={classes.mainRow}
                >
                    <Typography className={classes.label} gutterBottom>
                        Comment
                    </Typography>
                    <TextareaAutosize
                        name="Content"
                        aria-label="minimum height"
                        rowsMin={8}
                        placeholder="comment"
                        className={classes.textArea}
                    />
                </Grid>
              </Grid>
              
                <Button
                    variant="contained"
                    color="secondary"
                    size="large"
                    className={classes.button}
                    // onClick={handleChangeBack}
                >
                  Create
                </Button>
              {/* </form> */}
            </Grid>
          </Grid>
        </div>
      </Container>
    </>
  );
};

export default CreateTicket;
