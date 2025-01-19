import React, { useRef } from "react";
import { useState } from "react";
import upload from "../../assets/images/upload.png";
import cross from "../../assets/images/cross.png";
import { useDispatch } from "react-redux";
import { Box, CircularProgress } from "@material-ui/core";
import { setSnackbar } from "../../utils/global.actions";
import { base_url_auto } from "../../utils/global";
import axios from "axios";
import { baseURL } from "../../api";
import { useEffect } from "react";
const MultiImagesUpload = ({
  maxSize,
  //   accept,
  name,
  defaultImages,
  maxFiles,
  onChange,
  setReRender,
  reRender,
  component,
}) => {
  const [files, setFiles] = useState([]);
  const [error, setError] = useState("");

  const [previewsArray, setPreviewsArray] = useState([]);
  const [DefaultImgs, setDefaultImgs] = useState([]);
  const [deleteLoading, setDeleteLoading] = useState(false);
  const [tobeDeleted, setTobeDeleted] = useState(null);

  useEffect(() => {

    const DefImgs = [];
    defaultImages?.map((img) => {
      DefImgs.push({
        src: `${base_url_auto}${img?.faqs_image}`,
        faq_id: img?.faq_id,
        id: img?.id,
        typeError: "",
        sizeError: "",
        name: "",
      });
    });
    //("DefImgs", DefImgs);
    setDefaultImgs(DefImgs);
    if (component == "edit") {
      setPreviewsArray(DefImgs);
    }
  }, [defaultImages, reRender]);

  //("DefaultImgs", DefaultImgs);
  const ref = useRef();
  const dispatch = useDispatch();
  const handleChange = (e) => {
    const Files = [e.target.files];
    //("Files", Files);
    const FILES = [];
    console.log(Files, '11111111111')
    Files.map((fileList, ind) => {
      const getArray = Object.values(fileList);
      getArray?.map((file) => {
        let typeError = "",
          sizeError = "";

        // if (file.type !== accept) {
        //   typeError = `Invalid format`;
        // }
        // if (file.size / 1024 / 1024 > maxSize) {
        //   sizeError = `Size Limit: 2MB `;
        // }

        FILES.push({
          file: file,
          typeError: typeError,
          sizeError: sizeError,
          name: file.name,
        });
      });
    });
    const totalFiles = [...files, ...FILES].length + defaultImages.length;
    // if ([...files, ...FILES].length + defaultImages.length > maxFiles) {
    //   dispatch(setSnackbar(`Maximum ${maxFiles} files are allowed`, "warning"));
    //   // setError(`Maximum ${maxFiles} files are allowed`);
    //   setFiles([...files, ...FILES].slice(0, maxFiles));
    // } else {
    //   setFiles([...files, ...FILES]);
    //   setError("");
    // }
    if (totalFiles > maxFiles) {
      setError(`Maximum ${maxFiles} files are allowed`);
      return;
    }

    if (totalFiles > 5) {
      setError(`Maximum 5 files are allowed`);
      return;
    }
    setFiles([...files, ...FILES]);
    setError("");
    //Setting Previews

    const previews =
      [...files, ...FILES].length > maxFiles
        ? [...files, ...FILES].slice(0, maxFiles)
        : [...files, ...FILES];

    //("previews", previews);
    const urlsArray = [];
    previews?.length > 0 &&
      previews.map((file) => {
        urlsArray.push({
          src: URL.createObjectURL(file?.file),
          typeError: file?.typeError,
          sizeError: file?.sizeError,
          name: file?.name,
        });
        //
      });



    if (urlsArray.length + defaultImages.length > maxFiles) {
      let slicedUrls = urlsArray.slice(0, maxFiles - DefaultImgs.length);
      //("slicedUrls", slicedUrls);

      setPreviewsArray([...DefaultImgs, ...slicedUrls]);
    } else {
      setPreviewsArray([...DefaultImgs, ...urlsArray]);
    }
    // console.log("previews", previewsArray)
    // console.log("default", DefaultImgs)

    // return [...files, FILES];
    // console.log("defaultImages", defaultImages, [...files, ...FILES]);
    onChange(
      [...files, ...FILES].length + defaultImages?.length > maxFiles
        ? [...files, ...FILES].slice(0, maxFiles - defaultImages?.length)
        : [...files, ...FILES], false
    );
  };
  //("previewsArray", previewsArray);
  const handleClick = (e) => {
    ref.current.click();
  };
  //    AUNTHENTICATION
  const token = localStorage.getItem("authToken");
  const config = {
    headers: { Authorization: `Bearer ${token}` },

  };
  //..................//
  const filterFile = async (file) => {
    console.log("filetofilter", file?.id);
    setTobeDeleted(file?.id);
    if (file?.faq_id == undefined) {
      const Previews = previewsArray;
      const filtered = Previews.filter((item) => {
        return item?.src !== file.src;
      });
      setPreviewsArray(filtered);
      //Now change the Files Array
      const Files = files;
      const filteredFiles = Files.filter((item) => {
        return item.name !== file.name;
      });
      setFiles([...filteredFiles]);
      onChange([...filteredFiles], false);
      if ([...filteredFiles].length <= maxFiles) {
        setError("");
      }
    } else {
      setDeleteLoading(true);
      //("...delete with api...");
      try {
        let removeImg = new FormData();
        removeImg.append('del_file', file?.src.split('https://mooner-staging-files.s3-us-west-2.amazonaws.com/pop_up_image/')[1]);
        const res = await axios.post(
          `${baseURL}delete_file/`,
          removeImg,
          config
        );
        if (res?.data?.status) {
          setTimeout(() => {
            dispatch(setSnackbar(res?.data?.message, "success"));
          }, 1500);
          const Previews = previewsArray;
          const filtered = Previews.filter((item) => {
            return item?.src !== file.src;
          });
          setPreviewsArray(filtered);
          let list =[];
          list.push(file)
          console.log(file)
          onChange([...files,...list], true);
          // setPreviewsArray(list)

          // defaultImages(list)
          // previewsArray
        }
        setReRender((prev) => !prev);
      } catch (error) { }
      setTimeout(() => {
        setDeleteLoading(false);
      }, 1500);
    }
  };
  return (
    <Box sx={{ width: { md: "45vw", lg: "40vw" } }}>
      <div
        style={{
          marginTop: "5vh",
          display: "flex",
          justifyContent: "center",
        }}
      >
        <div
          style={{
            width: "100%",
            minHeight: "auto",
            // border: "1px dashed black",
            boxShadow: " 0 3px 10px rgb(0 0 0 / 0.2)",
            padding: "30px",
          }}
        >
          <div
            onClick={handleClick}
            style={{
              width: "auto",
              height: "auto",
              margin: "20px",
              border: "2px dashed gray",
              borderRadius: "10px",
              color: "orange",
              cursor: "pointer",
              textAlign: "center",
            }}
          >
            <h3>Upload Files</h3>
            {/* <h5>Click to Upload</h5> */}
            <img src={upload} width="100px" height="100px" />
          </div>
          <input
            name={name}
            ref={ref}
            type="file"
            onChange={(e) => handleChange(e)}
            multiple
            hidden
          />
          <div style={{ display: "flex", justifyContent: "space-evenly" }}>
            {
              // deleteLoading == false ? (
              previewsArray?.map((src, index) => {
                console.log(
                  "condition",
                  deleteLoading == false && src?.id != tobeDeleted
                );

                return (
                  <div key={index}>
                    <div style={{ position: "relative" }}>
                      <>
                        {deleteLoading == false || src?.id != tobeDeleted ? (
                          <img
                            src={cross}
                            width="20px"
                            height="20px"
                            style={{
                              position: "absolute",
                              right: "-8px",
                              top: "-6px",
                              cursor: "pointer",
                            }}
                            onClick={() => filterFile(src)}
                          />
                        ) : (
                          <div
                            style={{
                              width: "20px",
                              height: "20px",
                              // background: "red",
                              position: "absolute",
                              right: "-8px",
                              top: "-6px",
                            }}
                          >
                            <CircularProgress disableShrink size={20} />
                          </div>
                        )}
                        <img
                          src={src && src?.src}
                          width="100px"
                          height="100px"
                          alt="dkj"
                        // style={{ padding: "0px 20px" }}
                        />
                      </>
                    </div>
                    <div style={{ color: "red" }}>{src?.typeError}</div>
                    <div style={{ color: "red" }}>{src?.sizeError}</div>
                  </div>
                );
              })
              // ) : (
              //   <CircularProgress />
              // )
            }
          </div>
        </div>
      </div>
      <div style={{ color: "red" }}>{error}</div>
    </Box>
  );
};

export default MultiImagesUpload;
