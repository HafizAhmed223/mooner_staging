import * as React from "react";
import Dialog from "@material-ui/core/Dialog";
const ImageModal = ({ classes, path, styleJx }) => {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <img
        src={path}
        className={classes}
        style={styleJx}
        onClick={handleClickOpen}
      />
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <img src={path} />
      </Dialog>
    </>
  );
};
export default ImageModal;
