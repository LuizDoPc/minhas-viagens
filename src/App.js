import React, { Component } from "react";

import Modal from "react-responsive-modal";

import Toolbar from "./components/Toolbar/Toolbar";
import SideDrawer from "./components/SideDrawer/SideDrawer";
import Backdrop from "./components/Backdrop/Backdrop";
import MapContainer from "./components/MapContainer/MapContainer";

import firebase from "@firebase/app";

class App extends Component {
  constructor(props) {
    super(props);
    var config = {
      apiKey: "AIzaSyCevUPMzUXYl9S63Zm6Wexy6CM0KSvgqp4",
      authDomain: "appdaana-89bcc.firebaseapp.com",
      databaseURL: "https://appdaana-89bcc.firebaseio.com",
      projectId: "appdaana-89bcc",
      storageBucket: "appdaana-89bcc.appspot.com",
      messagingSenderId: "97719053670"
    };
    firebase.initializeApp(config);
  }

  state = {
    sideDrawerOpen: false,
    modalVisible: false
  };

  setModalVisible(visible) {
    this.setState({ modalVisible: visible });
  }

  onCloseModal() {
    this.setModalVisible(false);
  }

  drawerToggleClickHandler = () => {
    this.setState(prevState => {
      return { sideDrawerOpen: !prevState.sideDrawerOpen };
    });
  };

  backdropClickHandler = () => {
    this.setState({ sideDrawerOpen: false });
  };

  render() {
    const { modalVisible } = this.state;

    let backdrop;

    if (this.state.sideDrawerOpen) {
      backdrop = <Backdrop click={this.backdropClickHandler} />;
    }
    return (
      <div style={{ height: "100%" }}>
        <Toolbar drawerClickHandler={this.drawerToggleClickHandler} />
        <SideDrawer show={this.state.sideDrawerOpen} />
        {backdrop}
        <main style={{ marginTop: "64px" }}>
          <MapContainer />
        </main>
        <Modal open={modalVisible} onClose={this.onCloseModal} center>
          <h2>Simple centered modal</h2>
        </Modal>
      </div>
    );
  }
}

export default App;
