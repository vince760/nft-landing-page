import axios from "axios";
import * as helpers from "./serviceHelpers";

const getIPFSData = (ipfs) => {
  const config = {
    method: "GET",
    url: `https://ipfs.io/ipfs/${ipfs}`,
    crossdomain: true,
    headers: { "Content-Type": "application/json" },
  };

  return axios(config)
    .then(helpers.onGlobalSuccess)
    .catch(helpers.onGlobalError);
};

export { getIPFSData };