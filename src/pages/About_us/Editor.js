import React, { useEffect } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import QuillToolbar, { modules, formats } from "./CustomToolBar";
import {
    Button,
} from "@material-ui/core";

import { MyCustomStyle } from "../../assets/styles/MyStyles";

const Editor = ({ from, actionName, id, value }) => {
    const classes = MyCustomStyle();
    const [state, setState] = React.useState({ value: null });

    useEffect(() => {
        setState({ value })
    }, []);

    const handleChange = value => {
        setState({ value });
    };
    const handlesubmit = () => {
        if (from === "privicyPolicy") {
            const payload = {
                policy_content: state.value,
            }
            actionName(payload, id);
        }
        if (from === "terms & Conditions") {
            const payload = {
                terms_and_condition: state.value,
            }
            actionName(payload, id);
        }
        if (from === "about us") {
            const payload = {
                about_content: state.value,
            }
            actionName(payload, id);
        }
    }

    return (
        <>
            <div className="text-editor">
                <QuillToolbar />
                <ReactQuill
                    theme="snow"
                    value={state.value}
                    onChange={handleChange}
                    placeholder={"Write something awesome..."}
                    modules={modules}
                    formats={formats}
                />
            </div>
            <Button
                onClick={handlesubmit}
                variant="contained"
                color="secondary"
                size="large"
                className={classes.button}
            >
                Save
            </Button>
        </>
    );
};

export default Editor;
