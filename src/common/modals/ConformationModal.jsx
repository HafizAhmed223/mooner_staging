import React from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((mainTheme) => ({
  blueBtn: {
    fontSize: "15px",
    borderRadius: "7px",
    color: "white",
    padding: "8px 35px",
  },
  dialougContainer: {
    "& .MuiDialog-paperWidthSm": {
      height: "173px",
      borderRadius: "20px",
      padding: "20px",
    },
  },
  content: {
    padding: "8px 24px",
  },
  modalactions: {
    // padding: "20px 20px 20px 20px",
    alignItems: "center",
    justifyContent: "center",
  },
  simplebtn: {
    fontSize: "15px",
    borderRadius: "7px",
    padding: "8px 35px",
  },
}));

export default function ConformationModal(props) {
  const classes = useStyles();
  const { isVisible, onClose, actionName, id } = props;
  //("checking", id);

  const handleDelete = () => {
    if (id) {
      actionName(id);
    }
    onClose();
  };
  return (
    <div>
      <Dialog
        open={isVisible}
        onClose={onClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        className={classes.dialougContainer}
      >
        <DialogTitle id="alert-dialog-title"></DialogTitle>
        <DialogContent className={classes.content}>
          <DialogContentText
            id="alert-dialog-description"
            className={classes.tagLine}
          >
            Are you sure you want to delete?
          </DialogContentText>
        </DialogContent>
        <DialogActions className={classes.modalactions}>
          <Button
            onClick={handleDelete}
            variant="contained"
            color="primary"
            size="large"
            className={classes.blueBtn}
          >
            Yes
          </Button>
          <Button
            onClick={onClose}
            variant="outlined"
            color="primary"
            size="large"
            className={classes.simplebtn}
          >
            No
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
