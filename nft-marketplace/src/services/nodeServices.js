import axios from "axios";
import * as helpers from "./serviceHelpers";

const signIn = () => {
  const config = {
    method: "GET",
    url: `${helpers.API_NODE_HOST_PREFIX}/login`,
    crossdomain: true,
    headers: { "Content-Type": "application/json" },
  };

  return axios(config)
    .then(helpers.onGlobalSuccess)
    .catch(helpers.onGlobalError);
};

const getNFtCollection = (wallet) => {
  const config = {
    method: "GET",
    url: `${helpers.API_NODE_HOST_PREFIX}/nft-collection/${wallet}`,
    crossdomain: true,
    headers: { "Content-Type": "application/json" },
  };

  return axios(config)
    .then(helpers.onGlobalSuccess)
    .catch(helpers.onGlobalError);
};

const mintNFT = (data) => {
  const config = {
    method: "POST",
    url: `${helpers.API_NODE_HOST_PREFIX}/mint-nft`,
    data,
    crossdomain: true,
    headers: { "Content-Type": "application/json" },
  };

  return axios(config)
    .then(helpers.onGlobalSuccess)
    .catch(helpers.onGlobalError);
};

const getIPFSData = (nftURI) => {
  const config = {
    method: "POST",
    url: `${helpers.API_NODE_HOST_PREFIX}/nft-data`,
    crossdomain: true,
    data: { nftURI },
    headers: { "Content-Type": "application/json" },
  };

  return axios(config)
    .then(helpers.onGlobalSuccess)
    .catch(helpers.onGlobalError);
};

const postImage = (image) => {
  const config = {
    method: "POST",
    url: `${helpers.API_NODE_HOST_PREFIX}/image-ipfs`,
    crossdomain: true,
    data: image,
    headers: { "Content-Type": "application/json" },
  };

  return axios(config)
    .then(helpers.onGlobalSuccess)
    .catch(helpers.onGlobalError);
};

const getMintingFee = () => {
  const config = {
    method: "GET",
    url: `${helpers.API_NODE_HOST_PREFIX}/current-fee`,
    crossdomain: true,

    headers: { "Content-Type": "application/json" },
  };

  return axios(config)
    .then(helpers.onGlobalSuccess)
    .catch(helpers.onGlobalError);
};

export {
  signIn,
  getNFtCollection,
  getIPFSData,
  postImage,
  mintNFT,
  getMintingFee,
};
