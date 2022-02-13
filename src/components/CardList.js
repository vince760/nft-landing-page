import React, { useEffect, useState } from "react";
import NFTCard from "./NFTCard";
import "../styles/CardList.css";
import { exploreList } from "../constants/MockupData";

class CardList extends React.Component {
  state = {
    nftObjects: {},
    mappedNfts: [],
  };
  componentDidMount() {
    // this.props.socket.on("xumm-nft-page", (res) => {
    //   const nftObjectResponse = res.nftPage.result.account_nfts;
    //   console.log(nftObjectResponse);
    //   this.setState({
    //     nftObjects: nftObjectResponse,
    //     mappedNfts: nftObjectResponse.map(this.mapNftCards),
    //   });
    // });
  }

  mapNftCards = (nft) => {
    return <NFTCard nftSrc={nft} key={nft.TokenID} />;
  };
  render() {
    return (
      <div id="card-list">
        {/* {this.state.mappedNfts !== [] ? this.state.mappedNfts : null} */}
      </div>
      // <div id="card-list">
      //   {this.props.list.map((item, index) => (
      //     <NFTCard nftSrc={item.src} key={index} />
      //   ))}
      // </div>
    );
  }
}

export default CardList;
