/* eslint-disable max-len */
import * as yup from "yup";

const createNftSchema = yup.object().shape({
  title: yup.string().trim().required("Please enter a title for your NFT"),
  desc: yup.string().required("Please enter a short description for your NFT"),
  qty: yup.number().required("How many would you like to mint?"),
  forSale: yup
    .bool()
    .required("Would you like to offer this NFT for public sale?"),
});

const nftInitialValues = {
  title: "",
  desc: "",
  imageObj: {
    type: "",
    url: "",
  },
  qty: "",
  forSale: false,
  downloadable: false,
  downloadContent: "",
};

export { createNftSchema, nftInitialValues };
