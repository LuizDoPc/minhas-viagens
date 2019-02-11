import React, { Component } from "react";
import { Map, InfoWindow, Marker, GoogleApiWrapper } from "google-maps-react";
import firebase from "firebase";

import Modal from "react-responsive-modal";

import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";

export class Wrap extends Component {
  state = {
    selectedPlace: "",
    activeMarker: {},
    showingInfoWindow: false,
    cities: [],
    cityName: "",
    resultList: [],
    newMarkers: []
  };

  componentWillMount() {
    firebase
      .database()
      .ref("/Cidades")
      .once("value")
      .then(snapshot => {
        let cities = [];
        snapshot.val().forEach(cidade => {
          this.props.geoCoding(cidade.Nome).then(res => {
            if (res.status === "OK") {
              cities.push({
                name: cidade.Nome,
                lat: res.results[0].geometry.location.lat,
                lng: res.results[0].geometry.location.lng
              });
            }
            this.setState({ cities });
          });
        });
      });
  }

  onMarkerClick = (props, marker, e) => {
    this.setState({
      selectedPlace: props,
      activeMarker: marker,
      showingInfoWindow: true
    });
  };

  onMapClicked = props => {
    if (this.state.showingInfoWindow) {
      this.setState({
        showingInfoWindow: false,
        activeMarker: null
      });
    }
  };

  onCloseModal = () => {
    this.props.setModalVisible(false);
  };

  handleSubmit = e => {
    e.preventDefault();

    this.props.geoCoding(this.state.cityName).then(res => {
      this.setState({ resultList: res.results });
    });
  };

  addMarker = cidade => {
    this.state.cities.push({
      name: cidade.address_components[0].long_name,
      lat: cidade.geometry.location.lat,
      lng: cidade.geometry.location.lng
    });
    this.props.setModalVisible(false);
  };

  render() {
    const resultList = [];

    this.state.resultList.forEach(item => {
      resultList.push(
        <Card key={item}>
          <CardContent>
            <Typography variant="h5" component="h2">
              {item.formatted_address}
            </Typography>
            <Typography color="textSecondary">
              Latitude: {item.geometry.location.lat}
            </Typography>
            <Typography color="textSecondary">
              Longitude: {item.geometry.location.lng}
            </Typography>
          </CardContent>
          <CardActions>
            <Button size="small" onClick={() => this.addMarker(item)}>
              Escolher
            </Button>
          </CardActions>
        </Card>
      );
    });

    const markers = [];
    this.state.cities.forEach(cidade => {
      markers.push(
        <Marker
          key={cidade.lat + cidade.lng + cidade.name}
          onClick={this.onMarkerClick}
          name={cidade.name}
          position={{
            lat: cidade.lat,
            lng: cidade.lng
          }}
        />
      );
    });

    return (
      <div>
        <Map
          google={this.props.google}
          onClick={this.onMapClicked}
          zoom={4.45}
          initialCenter={{
            lat: -14.5401117,
            lng: -45.1187843
          }}
        >
          {markers}
          <InfoWindow
            marker={this.state.activeMarker}
            visible={this.state.showingInfoWindow}
          >
            <div>
              <h1>{this.state.selectedPlace.name}</h1>
            </div>
          </InfoWindow>
        </Map>
        <Modal
          open={this.props.modalVisible}
          onClose={this.onCloseModal.bind(this)}
          center
        >
          <h2>Adicionar nova Cidade</h2>

          <form onSubmit={this.handleSubmit}>
            <label>Nome da cidade: </label>
            <input
              value={this.state.cityName}
              onChange={e => {
                this.setState({ cityName: e.target.value });
              }}
            />
            <input type="submit" value="Enviar" />

            <div>{resultList}</div>
          </form>
        </Modal>
      </div>
    );
  }
}

export default GoogleApiWrapper({
  apiKey: "AIzaSyAxt-VCR6Hc3dCH8yt6hVpQwIub-vqQBMU"
})(Wrap);
