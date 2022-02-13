import React from "react";
import * as nodeService from "../services/nodeServices.js";
import store from "../redux/store";
import NFTCard from "../components/NFTCard.js";
import "../styles/CardList.css";
import Swal from "sweetalert2";
import CardList from "../components/CardList.js";
class Collection extends React.Component {
  state = {
    mappedNfts: [],
    nftInfo: [],
  };
  componentDidMount() {
    const wallet = window.localStorage.getItem("user_wallet");
    console.log("WALLET FROM COLLECTION", wallet);
    nodeService
      .getNFtCollection(wallet)
      .then(this.getAllNFTSuccess)
      .catch(this.getAllNFTError);
  }

  getAllNFTSuccess = (res) => {
    this.setState({
      mappedNfts: res.map(this.mapNftCard),
      nftInfo: res,
    });
  };

  getAllNFTError = (err) => {
    console.log(err);
    Swal.fire({
      icon: "warning",
      title:
        "You currently have no NFT's in your wallet. Feel free to mint some, or checkout the BAZAAR!",
    });
  };

  mapNftCard = (nft) => {
    console.log(nft);
    return <NFTCard component={"collection"} nftSrc={nft} key={nft.TokenID} />;
  };
  render() {
    return (
      <div id='explore'>
        <h1>Collections</h1>
        <div id='card-list'>
          {this.state.mappedNfts}
          {/* {this.state.nftInfo.map((item, index) => (
            <NFTCard nftSrc={item} key={index} />
          ))} */}
        </div>
      </div>
    );
  }
}

export default Collection;
