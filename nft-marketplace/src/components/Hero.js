import React, { useEffect, useState } from "react";
import "../styles/Hero.css";
import { useNavigate } from "react-router-dom";
import Header from "./Header";
import { Modal, ModalBody, ModalFooter, ModalHeader, Button } from "reactstrap";
import { Formik, Form, Field } from "formik";
import * as nftSchema from "./nftSchema";
import { GLTFModel, AmbientLight, DirectionLight } from "react-3d-viewer";
import { Document, Page } from "react-pdf";
import { SpinnerDotted } from "spinners-react";
import * as nodeService from "../services/nodeServices";
import Swal from "sweetalert2";

const styles = {
  padding: "5px",
  fontFamily: "Comic Sans MS, Comic Sans, cursive",
};

const Hero = (props) => {
  const [uploadDetails, setUploadDetails] = useState(null);
  const [isSubmitting, setSubmitting] = useState(false);
  const [stateValue, setValue] = useState({
    title: "",
    desc: "",
    offerForSale: false,
    downloadableContent: false,
    price: 0,
    downloadContent: "",
    directSell: false,
    receiverAddress: "",
  });
  const [uploadPreview, setPreview] = useState({
    src: "",
    fileType: "",
    title: "",
    price: 0,
    downloadContent: "",
    directSell: false,
    receiverAddress: "",
  });
  const [numPages, setNumPages] = useState(null);
  let navigate = useNavigate();

  useEffect(() => {
    props.socket.on("xumm-nftMint", (response) => {
      console.log("XUMM NFT MINT RESPONSE", response);
      setSubmitting(false);
    });
  }, []);

  const goExplore = () => {
    navigate("/explore");
  };

  async function submitNFT() {
    setSubmitting(true);
    const formData = new FormData();
    formData.append("file", uploadDetails);
    nodeService
      .postImage(formData)
      .then((res) => {
        const fileData = {
          description: stateValue.desc,
          price: stateValue.price,
          title: stateValue.title,
          offerForSale: stateValue.offerForSale,
          downloadContent: stateValue.downloadContent,
          imageIPFS: res.IpfsHash,
          userToken: window.localStorage.getItem("user_token"),
        };
        nodeService
          .mintNFT(fileData)
          .then(() => {
            Swal.fire({
              icon: "success",
              title:
                "NFT has been sent to the ledger for minting. Please check your phone to sign the transaction!",
            });
            setValue({
              title: "",
              desc: "",
              offerForSale: false,
              downloadableContent: false,
              price: 0,
              downloadContent: "",
              directSell: false,
              receiverAddress: "",
            });
            setPreview({
              src: "",
              fileType: "",
              title: "",
              price: 0,
              downloadContent: "",
              directSell: false,
              receiverAddress: "",
            });
            setSubmitting(false);
          })
          .catch((err) => console.log(err));
      })
      .catch((err) => console.log(err));
  }

  const fileUpload = (e) => {
    setUploadDetails(e.target.files[0]);
    console.log(e.target.files[0]);
    const file = e.target.files[0];

    const reader = new FileReader();
    const url = reader.readAsDataURL(file);
    reader.onload = function (e) {
      setPreview({ src: reader.result, fileType: file.type, title: file.name });
    };
  };

  const returnFilePreview = () => {
    if (
      uploadPreview.fileType === "image/png" ||
      uploadPreview.fileType === "image/jpeg" ||
      uploadPreview.fileType === "image/JPG" ||
      uploadPreview.fileType === "image/GIF" ||
      uploadPreview.fileType === "image/TIFF" ||
      uploadPreview.fileType === "image/PSD"
    ) {
      return (
        <img
          style={{ height: "40%", width: "40%" }}
          className="text-center"
          src={uploadPreview.src}
        />
      );
    } else if (uploadPreview.fileType === "application/pdf") {
      debugger;
      return (
        <Document
          file={uploadPreview.src}
          onLoadSuccess={onDocumentLoadSuccess}
          // onLoadSuccess={onDocumentLoadSuccess}
        >
          <Page pageNumber={1} />
        </Document>
      );
    } else {
      return (
        <GLTFModel
          width="1106"
          height="250"
          position={{ x: 0.2, y: -0.07, z: 0.3 }}
          className="text-center"
          src={uploadPreview.src}
        >
          <AmbientLight color={0xffffff} />
          <DirectionLight
            color={0xffffff}
            position={{ x: 100, y: 200, z: 100 }}
          />
          <DirectionLight
            color={0xffffff}
            position={{ x: -100, y: 200, z: -100 }}
          />
        </GLTFModel>
      );
    }
  };

  const onDocumentLoadSuccess = (numPages) => {
    console.log(numPages);
    setNumPages(numPages);
  };

  return (
    <div id="hero">
      <Modal centered={true} size="xl" isOpen={props.nftModal}>
        <ModalHeader
          cssModule={{ "modal-title": "w-100 text-center" }}
          style={{
            fontWeight: "bold",
            fontFamily: "Rock Salt",
            fontSize: "32px",
          }}
        >
          Create New NFT
        </ModalHeader>
        {isSubmitting ? (
          <div className="d-flex justify-content-center">
            <SpinnerDotted size={250} enabled={isSubmitting} />
          </div>
        ) : (
          <ModalBody className="text-center">
            <Formik
              initialValues={nftSchema.nftInitialValues}
              validationSchema={nftSchema.createNftSchema}
            >
              {({
                values,
                errors,
                touched,
                // handleChange,
                handleBlur,
                // handleSubmit,
                // isSubmitting,
                /* and other goodies */
              }) => (
                <Form>
                  <div className="text-center mb-3">
                    {uploadPreview.src !== "" ? (
                      <div className="col-12">{returnFilePreview()}</div>
                    ) : null}
                    <br />
                    <input
                      type="file"
                      accept="*"
                      placeholder="Upload"
                      onChange={fileUpload}
                    ></input>
                  </div>

                  <div className="pb-3">
                    <Field
                      name="title"
                      className="form-control"
                      type="title"
                      placeholder="Title"
                      value={values.title}
                      aria-label="Title"
                      autoComplete="off"
                      autoCorrect="off"
                      autoCapitalize="off"
                      spellCheck="false"
                      onBlur={(e) =>
                        setValue({ ...stateValue, title: e.target.value })
                      }
                      // onChange={(values) => setValue({ title: values.title })}
                    />

                    {errors.title && touched.title ? (
                      <div style={{ color: "red" }}>{errors.title}</div>
                    ) : null}
                  </div>
                  <div className="pb-3">
                    <Field
                      name="desc"
                      className="form-control 1"
                      component="textarea"
                      placeholder="Description"
                      value={values.desc}
                      aria-label="Description"
                      autoComplete="off"
                      autoCorrect="off"
                      autoCapitalize="off"
                      spellCheck="false"
                      onBlur={(e) =>
                        setValue({ ...stateValue, desc: e.target.value })
                      }
                    />
                    {errors.desc && touched.desc ? (
                      <div style={{ color: "red" }}>{errors.desc}</div>
                    ) : null}
                  </div>
                  <div className="col-12 row">
                    <div className="col-6">
                      <div style={styles}>
                        <label>Offer NFT for Sale?</label>{" "}
                        <Field
                          checked={values.forSale}
                          name="forSale"
                          type="checkbox"
                          placeholder="Offer For Sale?"
                          value={values.forSale}
                          aria-label="Offer For Sale?"
                          onClick={() =>
                            setValue({
                              ...stateValue,
                              offerForSale: !stateValue.offerForSale,
                            })
                          }
                        />
                      </div>
                      <div style={styles}>
                        <label>Do you have downloadable content?</label>{" "}
                        <Field
                          checked={values.downloadable}
                          name="downloadable"
                          // className="form-control 1"
                          type="checkbox"
                          placeholder="Downloadble?"
                          value={values.downloadable}
                          aria-label="Downloadble?"
                          onClick={() =>
                            setValue({
                              ...stateValue,
                              downloadableContent:
                                !stateValue.downloadableContent,
                            })
                          }
                        />
                      </div>
                      <div style={styles}>
                        <label>Sell directly?</label>{" "}
                        <Field
                          checked={values.sellDirect}
                          name="directSell"
                          // className="form-control 1"
                          type="checkbox"
                          placeholder="DirectSell?"
                          value={values.sellDirect}
                          aria-label="DirectSerll?"
                          onClick={() =>
                            setValue({
                              ...stateValue,
                              directSell: !stateValue.directSell,
                            })
                          }
                        />
                      </div>
                    </div>
                    <div className="col-6">
                      <div className="pb-3">
                        <Field
                          name="price"
                          className="form-control"
                          type="price"
                          placeholder="Price in XRP"
                          value={values.price}
                          aria-label="Price"
                          autoComplete="off"
                          autoCorrect="off"
                          autoCapitalize="off"
                          spellCheck="false"
                          onBlur={(e) =>
                            setValue({
                              ...stateValue,
                              price: parseInt(e.target.value),
                            })
                          }
                          // onChange={(values) => setValue({ title: values.title })}
                        />

                        {errors.title && touched.title ? (
                          <div style={{ color: "red" }}>{errors.title}</div>
                        ) : null}
                      </div>
                      {stateValue.downloadableContent ? (
                        <div className="pb-3">
                          <Field
                            name="downloadContent"
                            className="form-control"
                            type="text"
                            placeholder="Link to your downloadable content"
                            value={values.title}
                            aria-label="downloadContent"
                            autoComplete="off"
                            autoCorrect="off"
                            autoCapitalize="off"
                            spellCheck="false"
                            onBlur={(e) =>
                              setValue({
                                ...stateValue,
                                title: e.target.downloadContent,
                              })
                            }
                          />

                          {errors.title && touched.title ? (
                            <div style={{ color: "red" }}>{errors.title}</div>
                          ) : null}
                        </div>
                      ) : null}
                    </div>
                    {stateValue.directSell ? (
                      <div className="pb-3">
                        <Field
                          name="receiverAddress"
                          className="form-control"
                          type="text"
                          placeholder="Recieving user wallet address"
                          value={values.receiverAddress}
                          aria-label="receiverAddress"
                          autoComplete="off"
                          autoCorrect="off"
                          autoCapitalize="off"
                          spellCheck="false"
                          onBlur={(e) =>
                            setValue({
                              ...stateValue,
                              receiverAddress: e.target.value,
                            })
                          }
                        />

                        {errors.title && touched.title ? (
                          <div style={{ color: "red" }}>{errors.title}</div>
                        ) : null}
                      </div>
                    ) : null}
                  </div>
                </Form>
              )}
            </Formik>
          </ModalBody>
        )}

        <ModalFooter>
          <Button onClick={props.toggleNFTModal} className="btn btn-warning">
            Cancel
          </Button>
          <Button
            disabled={isSubmitting}
            onClick={submitNFT}
            className="btn btn-success"
          >
            Create NFT
          </Button>
        </ModalFooter>
      </Modal>
      {/* <img id='hero-background' src={list[0].src}/> */}

      {/* <Header
        toggleNFTModal={toggleNFTModal}
        logUserOut={props.logUserOut}
        setCurrentUser={props.setCurrentUser}
        socket={props.socket}
      /> */}

      <h1 id="header-text-first"> NFT </h1>
      <h1 id="header-text-second"> Galleria</h1>
      <h5 id="header-subtext">Minting on demand!</h5>

      <div id="hero-buttons">
        <button id="explore" onClick={goExplore}>
          Explore
        </button>
        {/* <button id="create">Create</button> */}
      </div>
    </div>
  );
};

export default Hero;
