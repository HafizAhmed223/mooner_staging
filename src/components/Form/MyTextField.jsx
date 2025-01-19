import React from "react";
import { useField } from "formik";
import { TextField, FormHelperText } from "@material-ui/core";

const MyTextField = ({ formikKey, ...props }) => {
  const [field, meta] = useField(formikKey);
  return (
    <>
      <TextField
        id={field.name}
        name={field.name}
        value={field.value}
        onChange={field.onChange}
        {...props}
      />
      {Boolean(meta.touched && meta.error) && (
        <FormHelperText
          style={{
            position: "relative",
            left: "10%",
            color: "red",
            marginTop: 0,
            marginBottom: 5,
          }}
        >
          {meta.touched ? meta.error : ""}
        </FormHelperText>
      )}
    </>
  );
};
export default MyTextField;
