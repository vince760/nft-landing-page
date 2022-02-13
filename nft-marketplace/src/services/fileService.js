import { NFTStorage, File } from "nft.storage";
import axios from "axios";
import * as helpers from "./serviceHelpers";

const apiKey = process.env.REACT_APP_NFT_STORAGE_API_KEY;
const client = new NFTStorage({ token: apiKey });

async function uploadData(data) {
  console.log("IMAGE DETAILS", data);
  const metadata = await client.store({
    name: data.title,
    description: data.description,
    offerForSale: data.offerForSale,
    price: data.price,
    downloadContent: data.downloadContent,
    image: new File([data.imgData.src], data.imgData.title, {
      type: data.imgData.fileType,
    }),
  });
  const ipfsUrl = metadata.url;
  const nftData = {
    ipfs: ipfsUrl,
    userToken: window.localStorage.getItem("user_token"),
  };

  const mint = await mintNFT(nftData);
  
  return "complete";
}

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

export { uploadData };
