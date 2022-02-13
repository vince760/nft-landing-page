import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Modal, ModalBody, ModalFooter, ModalHeader, Button } from "reactstrap";
import * as nodeService from "../services/nodeServices";
import Swal from "sweetalert2";
import { connect } from "react-redux";
import store from "../redux/store";
import { LOGIN_USER } from "../redux/constants/action-types";
import { useNavigate } from "react-router-dom";

const Header = (props) => {
  const [initialState, setInitialState] = useState({
    loginModal: false,
    xummQrCode: "",
    loggedIn: false,
  });
  let navigate = useNavigate();

  // useEffect(() => {
  //   nodeService
  //     .getMintingFee()
  //     .then((res) => {
  //       console.log(res);
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //     });
  //   props.socket.on("xumm-signin", (response) => {
  //     console.log("XUMM SIGN IN RESPONSE", response);
  //     if (response.response.userToken.user_token) {
  //       window.localStorage.setItem(
  //         "user_token",
  //         response.response.userToken.user_token
  //       );
  //       window.localStorage.setItem("user_wallet", response.wallet);
  //       store.dispatch({
  //         type: LOGIN_USER,
  //         payload: {
  //           user_token: response.response.userToken.user_token,
  //           wallet_address: response.wallet,
  //         },
  //       });
  //       if (props.loggedIn === false) {
  //         props.setCurrentUser(response.response.userToken.user_token);
  //       }

  //       // this.setState({ loginModal: false, loggedIn: true });
  //       setInitialState({ ...initialState, loginModal: false, loggedIn: true });
  //       Swal.fire({
  //         position: "top-end",
  //         icon: "success",
  //         title: "Logged In!",
  //         showConfirmButton: false,
  //         timer: 1500,
  //       });
  //     }
  //   });
  // }, []);

  const viewMyNFT = () => {
    navigate("/collection");
  };

  const handleWallet = () => {
    // this.setState({ loginModal: !this.state.loginModal });
    nodeService.signIn().then(signInSuccess);
  };

  const signInSuccess = (res) => {
    setInitialState({
      ...initialState,
      xummQrCode: res.refs.qr_png,
      loginModal: true,
    });
    // this.setState({ xummQrCode: res.refs.qr_png, loginModal: true });
  };

  const onClickCloseModal = () => {
    // this.setState({ loginModal: false });
    setInitialState({ ...initialState, loginModal: false });
  };

  const createNewNFT = () => {
    props.toggleNFTModal();
  };

  const userLogOut = () => {
    // useNavigate("/");
    props.logUserOut();
    // this.setState({ loggedIn: false, xummQrCode: "" });
    setInitialState({ ...initialState, loggedIn: false, xummQrCode: "" });
    window.localStorage.clear();
    store.dispatch({
      type: LOGIN_USER,
      payload: {
        user_token: "",
        wallet_address: "",
      },
    });
    Swal.fire({
      position: "top-end",
      icon: "success",
      title: "Logged out...Well see you soon!",
      showConfirmButton: false,
      timer: 1500,
    });
  };

  return (
    <div id='header'>
      <Link to='/' id='logo'>
        NFT Galleria
      </Link>
      <Modal
        className='modal-content rounded-17 shadow'
        isOpen={initialState.loginModal}
      >
        <ModalHeader className='modal-header border-bottom-0 text-center'></ModalHeader>
        <ModalBody className='modal-body py-0 text-center'>
          <h2>Scan QR Code with Xumm App</h2>
          <img src={initialState.xummQrCode} alt='Xumm Sign In' />
        </ModalBody>
        <ModalFooter className='moda-footer flex-column border-top-0'>
          <Button
            onClick={onClickCloseModal}
            className='btn btn-lg btn-primary w-100 mx-0 mb-2'
          >
            Cancel
          </Button>
        </ModalFooter>
      </Modal>

      <div id='link-containers'>
        {/* <a>Start Hunting</a>
          <a>Dark NFTs</a>
          <a>Community</a>
          <a>Craft NFT</a> */}
        {props.loggedIn === true ? (
          <div>
            <button onClick={() => createNewNFT()} id='create'>
              Create NFT
            </button>
            <button onClick={() => viewMyNFT()} id='create'>
              My NFT's
            </button>
            <button to='/' id='connect-wallet' onClick={() => userLogOut()}>
              Log Out
            </button>
          </div>
        ) : (
          <button id='connect-wallet' onClick={() => handleWallet()}>
            Connect Wallet
          </button>
        )}
      </div>
    </div>
  );
};

export default connect()(Header);
