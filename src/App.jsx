import logo from "./logo.svg";
import "./App.css";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Create from "./pages/Create";
import Explore from "./pages/Explore";
import Collection from "./pages/Collection";
//dapp
import React from "react";
import io from "socket.io-client";
import Header from "./components/Header";
import store from "./redux/store";
import { LOGIN_USER } from "./redux/constants/action-types";
// const socket = io.connect("http://localhost:4000");
class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      uuid: "",
      loggedIn: false,
      nftModal: false,
    };
  }

  // componentDidMount() {
  //   if (window.localStorage.getItem("user_token")) {
  //     this.setState({ loggedIn: true });
  //     store.dispatch({
  //       type: LOGIN_USER,
  //       payload: {
  //         user_token: window.localStorage.getItem("user_token"),
  //         user_wallet: window.localStorage.getItem("user_wallet"),
  //       },
  //     });
  //   }
  // }

  // setCurrentUser = (userId) => {
  //   this.setState({ uuid: userId, loggedIn: true });
  // };

  // logUserOut = () => {
  //   this.setState({ uuid: "", loggedIn: false });
  // };
  // toggleNFTModal = () => {
  //   this.setState({ nftModal: !this.state.nftModal });
  // };
  render() {
    return (
      <React.Fragment>
        {/* <Header
        toggleNFTModal={this.toggleNFTModal}
        nftModal={this.state.nftModal}
        {...this.props}
        socket={socket}
        props={this.props}
        logUserOut={this.logUserOut}
        setCurrentUser={this.setCurrentUser}
        loggedIn={this.state.loggedIn}
        /> */}
        <Routes>
          <Route
            path='/'
            element={
              <Home
              // toggleNFTModal={this.toggleNFTModal}
              // nftModal={this.state.nftModal}
              // {...this.props}
              // socket={socket}
              // props={this.props}
              // logUserOut={this.logUserOut}
              // setCurrentUser={this.setCurrentUser}
              />
            }
          />
          {/* <Route path='/create' element={<Create />} />
          <Route path='/explore' element={<Explore socket={socket} />} />
          <Route
            path='/collection'
            element={
              <Collection
                toggleNFTModal={this.toggleNFTModal}
                nftModal={this.state.nftModal}
                loggedIn={this.state.loggedIn}
                {...this.props}
                socket={socket}
                props={this.props}
                logUserOut={this.logUserOut}
                setCurrentUser={this.setCurrentUser}
              />
            }
          /> */}
        </Routes>
      </React.Fragment>
    );
  }
}

export default App;
