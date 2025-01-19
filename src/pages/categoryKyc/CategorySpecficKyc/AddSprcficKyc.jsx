import React, { useEffect, useState } from "react";
import {
  Grid,
  Container,
  Typography,
  Button,
  FormControl,
  Select,
  FormControlLabel,
  RadioGroup,
  MenuItem,
  Radio,
  TextField,
  InputLabel,
} from "@material-ui/core";
import { connect } from "react-redux";
import Topbar from "../../topbar";
import { MyCustomStyle } from "../../../assets/styles/MyStyles";
import Delete from ".././../../assets/svg/delete.svg";
import {
  createCategorSpecficyKyc,
  getAllCommonKycFor,
} from "../../../redux/actions/categoryKyc/categoryKyc.actions";
import {
  getAllCategoriesAction,
  getCategoriesByIdAction,
  getSubcategoryChildAction,
} from "../../../redux/actions/category/category.action";
import { Autocomplete } from "@material-ui/lab";
import Permissions from "../../subAdmin/Permissions";

const AddSpecficKyc = ({
  categoryData,
  getAllCategories,
  getCategoryByIb,
  categoryByIdData,
  subCategoryChilds,
  getSubcategoryChild,
  createCategorSpecficyKyc,
  getAllCommonKycFor,
  commonQuestions,
}) => {
  const [catagories, setCatagories] = useState("");
  const [subCatagories, setSubCatagories] = useState("");
  const [subCatagoriesChild, setSubCatagoriesChild] = useState("");
  const [catagoriesList, setCatagoriesList] = useState([]);
  const [subCatagoriesList, setSubCatagoriesList] = useState([]);
  const [subChildList, setSubChildList] = useState([]);
  const [catagoryError, setCategoryError] = useState(false);
  const [subCategoryError, setsubCategoryError] = useState(false);
  const [subCategoryChildError, setSubcategoryChildError] = useState(false);
  const DocumentTemplete = {
    label: "",
    doc_type: "Private",
    category_kyc_type: "Specific",
    doc_file_type: "Image",
    question_type: "Mandatory",
    expiration_date_required: "false",
    doc_for: "SP",
    common_questions: [],
  };
  const [documents, setDocuments] = useState([DocumentTemplete]);
  const classes = MyCustomStyle();
  useEffect(() => {
    getAllCommonKycFor();
  }, []);
  useEffect(() => {
    getAllCategories();
  }, []);
  useEffect(() => {
    getCatagories();
  }, [categoryData]);
  useEffect(() => {
    getSubCatagories();
  }, [categoryByIdData]);

  useEffect(() => {
    getSubcategoryChilds();
  }, [subCategoryChilds]);

  const getCatagories = () => {
    let items = categoryData
      .filter((Allcategories) => Allcategories.behaviour === "Default")
      .map((res, i) => {
        return { value: res.id, label: res.name };
      });
    setCatagoriesList(items && items.length > 0 ? items : "");
  };
  const getSubCatagories = () => {
    let item =
      categoryByIdData &&
      categoryByIdData.map((res, i) => {
        return { value: res.id, label: res.name };
      });
    setSubCatagoriesList(item && item.length > 0 ? item : "");
  };
  const getSubcategoryChilds = () => {
    let item =
      subCategoryChilds &&
      subCategoryChilds.map((res, i) => {
        return { value: res.id, label: res.name };
      });
    setSubChildList(item && item.length > 0 ? item : "");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (catagories === "") {
      setCategoryError(true);
      return;
    }
    if (subCatagoriesList && subCatagories === "") {
      setsubCategoryError(true);
      return;
    }
    if (subChildList && subCatagoriesChild === "") {
      setSubcategoryChildError(true);
      return;
    }
    const newarr = documents.map((v) => ({
      ...v,
      category: catagories,
      sub_category: !subCatagories ? null : subCatagories,
      sub_category_child: subCatagoriesChild ? subCatagoriesChild : null,
    }));
    createCategorSpecficyKyc(newarr);
    //("newarr", newarr);
  };
  const onChange = (e, index) => {
    const updateDocuments = documents.map((document, i) =>
      index == i
        ? Object.assign(document, { [e.target.name]: e.target.value })
        : document
    );
    setDocuments(updateDocuments);
  };
  const handleChangeCategories = (event) => {
    setCatagories(event.target.value);
    setSubCatagoriesList([]);
    setSubCatagoriesChild("");
    setSubCatagories("");
    setCategoryError(false);
    let formData = new FormData();
    formData.append("tn_parent", event.target.value);
    getCategoryByIb(formData);
  };

  const handleChangeSubCategories = (event) => {
    setSubCatagories(event.target.value);
    setsubCategoryError(false);
    setSubChildList([]);
    setSubCatagoriesChild("");
    let formData = new FormData();
    formData.append("tn_parent", event.target.value);
    getSubcategoryChild(formData);
  };

  const handleSubCategoriesChilds = (event) => {
    setSubCatagoriesChild(event.target.value);
    setSubcategoryChildError(false);
  };

  const addQuestions = () => {
    setDocuments([...documents, DocumentTemplete]);
  };
  const removeQuestion = (index) => {
    const filterDocuments = [...documents];
    filterDocuments.splice(index, 1);
    setDocuments(filterDocuments);
  };

  return (
    <form onSubmit={handleSubmit} autoComplete="off">
      <Container maxWidth="xl">
        <Permissions page={"add_categorykyc"} />
        <Grid container spacing={2}>
          <Grid item sm={12}>
            <Topbar
              module="Category KYC"
              item="Create"
              bckLink="/mooner/details/category_specfic_kyc"
            />
          </Grid>
        </Grid>
        <div className={classes.root}>
          <Typography className={classes.Title} gutterBottom>
            Category Specific Documents
          </Typography>
          <Grid container className={classes.mainContainer}>
            <Grid container className={classes.mainContainer}>
              <Grid
                item
                xs={12}
                sm={4}
                md={4}
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
                    labelId="demo-simple-select-outlined-label"
                    id="demo-simple-select-outlined"
                    value={catagories}
                    onChange={handleChangeCategories}
                    label="categories"
                    className={classes.textStyle}
                    MenuProps={{
                      anchorOrigin: {
                        vertical: "bottom",
                        horizontal: "left",
                      },
                      transformOrigin: {
                        vertical: "top",
                        horizontal: "left",
                      },
                      getContentAnchorEl: null,
                    }}
                  >
                    {catagoriesList &&
                      catagoriesList.map((res, index) => (
                        <MenuItem
                          key={index}
                          className={classes.dropdownMenuStyle}
                          value={res.value}
                        >
                          {res.label}
                        </MenuItem>
                      ))}
                  </Select>
                </FormControl>
                {catagoryError && (
                  <div className="error">* Category is required </div>
                )}
              </Grid>
              {subCatagoriesList && subCatagoriesList.length > 0 && (
                <Grid
                  item
                  xs={12}
                  sm={4}
                  md={4}
                  lg={4}
                  xl={4}
                  className={classes.mainRow}
                >
                  <Typography className={classes.label} gutterBottom>
                    Subcategories
                  </Typography>
                  <FormControl
                    variant="outlined"
                    className={[classes.field, classes.removeOutline]}
                  >
                    <InputLabel id="demo-simple-select-outlined-label"></InputLabel>
                    <Select
                      labelId="demo-simple-select-outlined-label"
                      id="demo-simple-select-outlined"
                      value={subCatagories}
                      onChange={handleChangeSubCategories}
                      label="subCategories"
                      className={classes.textStyle}
                      MenuProps={{
                        anchorOrigin: {
                          vertical: "bottom",
                          horizontal: "left",
                        },
                        transformOrigin: {
                          vertical: "top",
                          horizontal: "left",
                        },
                        getContentAnchorEl: null,
                      }}
                    >
                      {subCatagoriesList &&
                        subCatagoriesList.map((res, index) => (
                          <MenuItem
                            key={index}
                            className={classes.dropdownMenuStyle}
                            value={res.value}
                          >
                            {res.label}
                          </MenuItem>
                        ))}
                    </Select>
                  </FormControl>
                  {subCategoryError && (
                    <div className="error">* Subcategory is required </div>
                  )}
                </Grid>
              )}
              {/* ? subCategoryChild Select */}
              {subChildList && subChildList.length > 0 && (
                <Grid
                  item
                  xs={12}
                  sm={4}
                  md={4}
                  lg={4}
                  xl={4}
                  className={classes.mainRow}
                >
                  <Typography className={classes.label} gutterBottom>
                    Subchild
                  </Typography>
                  <FormControl
                    variant="outlined"
                    className={[classes.field, classes.removeOutline]}
                  >
                    <InputLabel id="demo-simple-select-outlined-label"></InputLabel>
                    <Select
                      labelId="demo-simple-select-outlined-label"
                      id="demo-simple-select-outlined"
                      value={subCatagoriesChild}
                      onChange={handleSubCategoriesChilds}
                      label="subCategories"
                      className={classes.textStyle}
                      MenuProps={{
                        anchorOrigin: {
                          vertical: "bottom",
                          horizontal: "left",
                        },
                        transformOrigin: {
                          vertical: "top",
                          horizontal: "left",
                        },
                        getContentAnchorEl: null,
                      }}
                    >
                      {subChildList &&
                        subChildList.map((res, index) => (
                          <MenuItem
                            key={index}
                            className={classes.dropdownMenuStyle}
                            value={res.value}
                          >
                            {res.label}
                          </MenuItem>
                        ))}
                    </Select>
                  </FormControl>
                  {subCategoryChildError && (
                    <div className="error">* Subchild is required </div>
                  )}
                </Grid>
              )}
              {/* //? End------------// */}
            </Grid>
          </Grid>

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
                          type="text"
                          inputProps={{ maxLength: 255 }}
                          onChange={(e) => onChange(e, index)}
                          value={document.label}
                          name="label"
                          id="outlined-basic"
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
                        xs={12}
                        sm={6}
                        md={6}
                        lg={4}
                        xl={4}
                        className={classes.mainRow}
                      >
                        <Typography className={classes.label} gutterBottom>
                          Current Common Documents
                        </Typography>
                        <Autocomplete
                          id="common_questions"
                          options={commonQuestions}
                          getOptionLabel={(option) => option.label}
                          style={{ width: 300 }}
                          renderInput={(params) => (
                            <TextField
                              {...params}
                              variant="outlined"
                              placeholder="Select Document"
                              SelectProps={{ value: document.common_questions }}
                            />
                          )}
                          className={[classes.field, classes.removeOutline]}
                          onChange={(e) => onChange(e, index)}
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
                            onChange={(e) => onChange(e, index)}
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
                            onChange={(e) => onChange(e, index)}
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
                            onChange={(e) => onChange(e, index)}
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
                            onChange={(e) => onChange(e, index)}
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

const mapStateToProps = ({ categoryKycData, category }) => {
  return {
    commonQuestions: categoryKycData.commonQuestions,
    categoryData: category.data,
    categoryByIdData: category.questionCatagory,
    subCategoryChilds: category.questionSubCategoryChild,
  };
};
export default connect(mapStateToProps, {
  createCategorSpecficyKyc,
  getAllCommonKycFor,
  getAllCategories: getAllCategoriesAction,
  getCategoryByIb: getCategoriesByIdAction,
  getSubcategoryChild: getSubcategoryChildAction,
})(AddSpecficKyc);
