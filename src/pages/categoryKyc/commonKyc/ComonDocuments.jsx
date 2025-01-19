import React, { useState } from "react";
import {
  Grid,
  Container,
  Typography,
  Button,
  FormControl,
  FormControlLabel,
  RadioGroup,
  Radio,
  TextField,
} from "@material-ui/core";
import { connect } from "react-redux";
import Topbar from "../../topbar";
import { MyCustomStyle } from "../../../assets/styles/MyStyles";
import Delete from ".././../../assets/svg/delete.svg";
import { createCommonCategoryKyc } from "../../../redux/actions/categoryKyc/categoryKyc.actions";
import Permissions from "../../subAdmin/Permissions";

const PostCommonDocs = ({ createCommonCategoryKyc }) => {
  const DocumentTemplete = {
    label: "",
    doc_type: "Private",
    category_kyc_type: "Common",
    doc_file_type: "Image",
    question_type: "Mandatory",
    expiration_date_required: "false",
  };
  const [documents, setDocuments] = useState([DocumentTemplete]);
  const classes = MyCustomStyle();
  const handleSubmit = (e) => {
    e.preventDefault();
    createCommonCategoryKyc(documents);
  };
  const handleDoc = (e, index) => {
    const updateDocuments = documents.map((doc, i) =>
      index == i ? { ...doc, [e.target.name]: e.target.value } : doc
    );
    setDocuments(updateDocuments);
  };

  const addQuestions = () => {
    setDocuments([...documents, DocumentTemplete]);
  };
  const removeQuestion = (index) => {
    const filterDocuments = [...documents];
    filterDocuments.splice(index, 1);
    setDocuments(filterDocuments);
  };
  //("documents", documents);
  return (
    <form onSubmit={handleSubmit} autoComplete="off">
      <Container maxWidth="xl">
        <Permissions page="add_categorykyc" />
        <Grid container spacing={2}>
          <Grid item sm={12}>
            <Topbar
              module="Category KYC"
              item="Create"
              bckLink="/mooner/details/common_category_kyc"
            />
          </Grid>
        </Grid>
        <div className={classes.root}>
          <Typography className={classes.Title} gutterBottom>
            Common Documents
          </Typography>
          <Grid container className={classes.mainContainer}>
            {documents.map((document, index) => {
              return (
                <>
                  <Grid container xs={12} sm={12} md={12} lg={12} xl={12}>
                    <Grid container className={classes.mainContainer}>
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
                          Label
                        </Typography>
                        <TextField
                          inputProps={{ maxLength: 255 }}
                          type="text"
                          onChange={(e) => handleDoc(e, index)}
                          value={document.label}
                          name="label"
                          id="label"
                          placeholder="kyc label"
                          variant="outlined"
                          className={[classes.field, classes.removeOutline]}
                          required
                        />
                      </Grid>
                    </Grid>
                    <Grid container className={classes.mainContainer}>
                      <Grid
                        item
                        xs={11}
                        sm={6}
                        md={6}
                        lg={8}
                        xl={4}
                        className={classes.mainRow}
                      >
                        <Typography className={classes.subtitle}>
                          {" "}
                          File type{" "}
                        </Typography>
                        <FormControl component="fieldset">
                          <RadioGroup
                            className={classes.typeContainer}
                            aria-label="type"
                            name="doc_file_type"
                            value={document.doc_file_type}
                            onChange={(e) => handleDoc(e, index)}
                          >
                            <FormControlLabel
                              value="Image"
                              control={<Radio />}
                              label="Image"
                            />
                            <FormControlLabel
                              value="File"
                              control={<Radio />}
                              label="File"
                            />
                          </RadioGroup>
                        </FormControl>
                      </Grid>
                    </Grid>
                    <Grid container className={classes.mainContainer}>
                      <Grid
                        item
                        xs={11}
                        sm={6}
                        md={6}
                        lg={8}
                        xl={4}
                        className={classes.mainRow}
                      >
                        <Typography className={classes.subtitle}>
                          {" "}
                          Expiration Date{" "}
                        </Typography>
                        <FormControl component="fieldset">
                          <RadioGroup
                            className={classes.typeContainer}
                            aria-label="type"
                            name="expiration_date_required"
                            value={document.expiration_date_required}
                            onChange={(e) => handleDoc(e, index)}
                          >
                            <FormControlLabel
                              value="false"
                              control={<Radio />}
                              label="Not Required"
                            />
                            <FormControlLabel
                              value="true"
                              control={<Radio />}
                              label="Required"
                            />
                          </RadioGroup>
                        </FormControl>
                      </Grid>
                    </Grid>
                    <Grid container className={classes.mainContainer}>
                      <Grid
                        item
                        xs={11}
                        sm={6}
                        md={6}
                        lg={8}
                        xl={4}
                        className={classes.mainRow}
                      >
                        <Typography className={classes.subtitle}>
                          {" "}
                          Question type{" "}
                        </Typography>
                        <FormControl component="fieldset">
                          <RadioGroup
                            className={classes.typeContainer}
                            aria-label="type"
                            name="question_type"
                            value={document.question_type}
                            onChange={(e) => handleDoc(e, index)}
                          >
                            <FormControlLabel
                              value="Mandatory"
                              control={<Radio />}
                              label="Mandatory"
                            />
                            <FormControlLabel
                              value="Optional"
                              control={<Radio />}
                              label="Optional"
                            />
                          </RadioGroup>
                        </FormControl>
                      </Grid>
                    </Grid>
                    <Grid container className={classes.mainContainer}>
                      <Grid
                        item
                        xs={11}
                        sm={6}
                        md={6}
                        lg={8}
                        xl={4}
                        className={classes.mainRow}
                      >
                        <Typography className={classes.subtitle}>
                          {" "}
                          Document type{" "}
                        </Typography>
                        <FormControl component="fieldset">
                          <RadioGroup
                            className={classes.typeContainer}
                            aria-label="type"
                            name="doc_type"
                            value={document.doc_type}
                            onChange={(e) => handleDoc(e, index)}
                          >
                            <FormControlLabel
                              value="Private"
                              control={<Radio />}
                              label="Private"
                            />
                            <FormControlLabel
                              value="Public"
                              control={<Radio />}
                              label="Public"
                            />
                          </RadioGroup>
                        </FormControl>
                      </Grid>
                      {index && index >= 0 ? (
                        <Grid item xs={1} sm={2} md={2} lg={2} xl={2}>
                          <img
                            src={Delete}
                            style={{ marginTop: "60px", cursor: "pointer" }}
                            onClick={() => removeQuestion(index)}
                          />
                        </Grid>
                      ) : (
                        ""
                      )}
                    </Grid>
                  </Grid>
                </>
              );
            })}
            <Button
              type="submit"
              variant="contained"
              color="secondary"
              size="large"
              className={classes.button}
            >
              Save
            </Button>
            <Button
              onClick={addQuestions}
              variant="contained"
              color="primary"
              size="large"
              className={classes.button}
            >
              Add More
            </Button>
          </Grid>
        </div>
      </Container>
    </form>
  );
};

const mapStateToProps = ({}) => {
  return {};
};
export default connect(mapStateToProps, {
  createCommonCategoryKyc,
})(PostCommonDocs);
