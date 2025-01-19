import {
  Box,
  Checkbox,
  CircularProgress,
  FormControlLabel,
  Grid,
  LinearProgress,
  Switch,
  Typography,
} from "@material-ui/core";
import { Skeleton } from "@material-ui/lab";
import React from "react";
import {
  useLocation,
  useParams,
} from "react-router-dom/cjs/react-router-dom.min";

const PermissionProvider = ({
  page,
  options,
  changeHandler,
  setFieldValue,
  permission,
  setPermission,
  subAdminPermissions,
  renderPermission,
}) => {
  const params = useLocation();
  const removePage = params?.pathname?.includes("add_permissions");
  const createPage = params?.pathname?.includes("create_sub_admin");
  const createRole = params?.pathname?.includes("create_role");

  const [checked, setChecked] = React.useState(true);
  const handleChange = (event) => {
    console.log("checkedd", event.target.checked);
    const switchOn = event.target.checked;
    //("checkedd", switchOn);
    if (removePage) {
      const removeAllPermissionOfThisPage = permission;
      // console.log(
      //   "removeAllPermissionOfThisPage",
      //   removeAllPermissionOfThisPage
      // );
      // if (!switchOn) {
      //   console.log("off");
      //   options?.map((item) => {
      //     removeAllPermissionOfThisPage.push(item?.id);
      //   });
      //   setPermission(removeAllPermissionOfThisPage);
      // }

      if (!switchOn) {
        console.log("off");
        const original = permission;
        // //("testing", original, options);
        var removed = original.filter((i) => !options.find((f) => f.id === i));
        // //("removed", removed);
        setPermission(removed);
      }
    }
    setChecked(event.target.checked);
  };
  const handlePermissions = (e, id) => {
    if (e.target.checked) {
      setPermission([...permission, id]);
    } else {
      const filtered = permission.filter((item) => item !== id);
      // setPermission(filtered);
      setPermission(filtered);
    }
  };
  function titleCase(str) {
    //("str", str);
    if (str == "spservices") {
      return "Service Provider";
    } else if (str == "change spservices") {
      return "Edit Service Provider";
    } else if (str == "view spservices") {
      return "View  Service Provider";
    } else if (str.includes("categoryquestions")) {
      const x = str.replaceAll("categoryquestions", "Category Questions");
      return x.charAt(0).toUpperCase() + x.slice(1);
    } else if (str.includes("admintransactionlist")) {
      const x = str.replaceAll(
        "admintransactionlist",
        "Admin Transaction List"
      );
      return x.charAt(0).toUpperCase() + x.slice(1);
    } else if (str.includes("faqs")) {
      const x = str.replaceAll("faqs", "FAQS");
      return x.charAt(0).toUpperCase() + x.slice(1);
    } else if (str.includes("role")) {
      const x = str.replaceAll("role", "");
      return x.charAt(0).toUpperCase() + x.slice(1);
    } else if (str.includes("categorykyc")) {
      const x = str.replaceAll("categorykyc", "Category KYC");
      return x.charAt(0).toUpperCase() + x.slice(1);
    } else if (str.includes("privacypolicy")) {
      const x = str.replaceAll("privacypolicy", "");
      return x.charAt(0).toUpperCase() + x.slice(1);
    } else if (str == "Category kyc") {
      return "Category KYC";
    } else if (str == "faqs") {
      return "FAQS";
    } else if (str == "mln") {
      return "MLN Margin";
    } else if (str == "change referral") {
      return "Change MLN Margin";
    } else if (str == "view referral") {
      return "View MLN Margin";
    } else if (str == "add referral") {
      return "Add MLN Margin";
    } else if (str === "add document") {
      return "Add KYC Document";
    } else if (str === "change document") {
      return "Change Status";
    } else if (str == "questioner") {
      return "Questionnaire";
    } else if (str == "change spservices") {
      return "Change Password";
    } else if (str == "change user") {
      return "Edit User";
    } else if (str == "view user") {
      return "View User Management";
    } else if (str == "delete spservices") {
      return "Delete Service Provider";
    } else if (str == "change dispute") {
      return "Change Status";
    } else if (str == "change userprofile") {
      return "Change Password";
    }

    // default
    else {
      var splitStr = str.toLowerCase().split(" ");
      for (var i = 0; i < splitStr.length; i++) {
        // You do not need to check if i is larger than splitStr length, as your for does that for you
        // Assign it back to the array
        splitStr[i] =
          splitStr[i].charAt(0).toUpperCase() + splitStr[i].substring(1);
      }
      // Directly return the joined string
      return splitStr.join(" ");
    }
  }
  const textToShow = (item, status) => {
    //("textToShow", item);
    const option = item?.codename;
    if (status) {
      if (
        option === "add_user" ||
        option === "view_user" ||
        option === "delete_user"
      ) {
        return "";
      }
    }
    if (
      option === "delete_referral" ||
      // option === "add_referral" ||
      option === "add_admintransactionlist" ||
      option === "change_admintransactionlist" ||
      option === "delete_admintransactionlist" ||
      option === "delete_dispute" ||
      option === "add_spservices" ||
      option === "add_dispute" ||
      option === "delete_tickets" ||
      option === "delete_privacypolicy" ||
      option === "add_user" ||
      option === "delete_category" ||
      option === "delete_categorykyc" ||
      option === "delete_role" ||
      option === "delete_spservices" ||
      option === "add_userprofile" ||
      option === "view_userprofile" ||
      option === "delete_userprofile" ||
      option === "delete_banners" ||
      option === "change_banners" ||
      option === "add_tickets" ||
      option === "delete_user"
    ) {
      return "";
    }

    //default
    else {
      return option;
    }
  };

  const showPerm = () => {
    let render = false;
    if (removePage) {
      if (checked && renderPermission) {
        render = true;
      }
    } else if (createRole) {
      if (checked && options?.length > 0) {
        render = true;
      }
    }
    return render;
  };
  // console.log("permission", permission);
  return (
    <Grid
      container
      alignItems="center"
      // justifyContent="center"
    >
      {options?.length > 0 && (
        <Grid item xs={2}>
          <Typography>{titleCase(page?.replaceAll("_", " "))}</Typography>
        </Grid>
      )}
      {options?.length > 0 && (
        <Grid item xs={2}>
          <Switch
            checked={checked}
            onChange={handleChange}
            inputProps={{ "aria-label": "controlled" }}
          />
        </Grid>
      )}
      {showPerm() ? (
        options?.map(
          (item, ind) =>
            textToShow(item, page == "change_password" ? true : false) !==
              "" && (
              <Grid item xs={2}>
                <FormControlLabel
                  label={titleCase(item?.codename?.replaceAll("_", " "))}
                  name={`permissions`}
                  onChange={(e) => handlePermissions(e, item?.id)}
                  control={
                    <Checkbox
                      // checked={false}
                      //   onChange={changeHandler}
                      defaultValue={false}
                      defaultChecked={
                        permission?.includes(item?.id) ? true : false
                      }
                    />
                  }
                />
              </Grid>
            )
        )
      ) : (
        <Skeleton width={"50%"} />
      )}
    </Grid>
  );
};

export default PermissionProvider;
// : "No Permissions Granted!"
