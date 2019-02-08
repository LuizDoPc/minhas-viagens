import React, { Component } from "react";
import { Map, InfoWindow, Marker, GoogleApiWrapper } from "google-maps-react";
import firebase from "firebase";

export class Wrap extends Component {
  state = {
    selectedPlace: "",
    activeMarker: {},
    showingInfoWindow: false,
    cities: []
  };

  async geoCoding(city) {
    return new Promise(async (resolve, reject) => {
      let geocode = await fetch(
        `https://maps.googleapis.com/maps/api/geocode/json?address=${city}&key=AIzaSyAxt-VCR6Hc3dCH8yt6hVpQwIub-vqQBMU`
      );
      geocode = geocode.json();
      resolve(geocode);
    });
  }

  componentWillMount() {
    firebase
      .database()
      .ref("/Cidades")
      .once("value")
      .then(snapshot => {
        let cities = [];
        snapshot.val().forEach(cidade => {
          this.geoCoding(cidade.Nome).then(res => {
            console.log(res);
            if (res.status === "OK") {
              cities.push({
                name: cidade.Nome,
                lat: res.results[0].geometry.location.lat,
                lng: res.results[0].geometry.location.lng
              });
            } else {
              console.log(cidade);
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

  render() {
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
    );
  }
}

export default GoogleApiWrapper({
  apiKey: "AIzaSyAxt-VCR6Hc3dCH8yt6hVpQwIub-vqQBMU"
})(Wrap);
