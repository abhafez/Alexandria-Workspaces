import React, { Component } from "react";
import { Map, InfoWindow, Marker, GoogleApiWrapper } from "google-maps-react";

export class MapContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showingInfoWindow: true,
      activeMarker: {},
      selectedPlace: {},
      iconSize: 64,
      mapSize: 13,
      mouseEnter: true,
      currentPlace: null
    };
  }

  // Map size responsive design purpose
  componentDidMount() {
    window.addEventListener("load", this.fitMapSize);
    window.addEventListener("resize", this.fitMapSize);
    window.gm_authFailure = this.gm_authFailure;
    window.addEventListener("unhandledrejection", function(event) {
      console.warn(
        "WARNING: Unhandled promise rejection. Shame on you! Reason: " +
          event.reason
      );
    });

    document.querySelectorAll("li").forEach(li =>
      li.addEventListener("click", () =>
        this.setState({ selectedPlace: {}, showingInfoWindow: false })
      )
    );
  }

  onMarkerClick = (props, marker, e) => {
    let clientID = "2EDBBXP0TYVB5GKNTS4SOXIY4UNKOA0Q2DQAF4ZR2K5LRY03";
    let clientSecret = "QA1ER5FS53NOKMUUKUC4TRO4UXTVA53CBE2VNSKWOFJGH4WH";
    let foursquare = `https://api.foursquare.com/v2/venues/search?client_id=${clientID}&client_secret=${clientSecret}&v=20180323&ll=${props.position.lat},${props.position.lng}&limit=1`
    this.storeNewData(props, marker, e);
    fetch(foursquare)
          .then(response => response.json())
          .then(place => this.setState({currentPlace: place}))
          .catch(err => console.log('Something Wrong With Foursquare data', err))
  };


  onMouseoverMarker = (props, marker, e) => {
      this.storeNewData(props, marker, e)
  }

  storeNewData = (props, marker, e) => {
    console.log(props);
    this.setState({
      selectedPlace: props,
      activeMarker: marker,
      placeToBounce: [props],
      showingInfoWindow: true,
      mouseEnter: true
    })
    this.props.setCurrentMarkerId(props.id)
    this.props.updateSelectedId(props.id)
  };

  onMapClicked = props => {
    this.setState({
      showingInfoWindow: false,
      activeMarker: null,
      placeToBounce: [{}],
      mouseEnter: true
    })
    this.props.setCurrentMarkerId(null)
    this.props.updateSelectedId(null)
  }

  // responsive purpose
  fitMapSize = () => {
    let screenSize = window.innerWidth;
    screenSize <= 411
      ? this.setState({ mapSize: 12, iconSize: 32 })
      : screenSize >= 1200
        ? this.setState({ mapSize: 13, iconSize: 64 })
        : this.setState({ mapSize: 13, iconSize: 32 });
  };

  // handle gm_authFailure
  gm_authFailure() {
    window.alert("Google Maps error!");
    document.getElementById("map").context("Google Maps Error!");
  }

  findMarkerIndex = (id, markers) => {
    for (let i = markers.length; i--; ) {
      if (markers[i].id === id) {
        return i;
      }
    }
    return null;
  };

  render() {
    //This style is used for the <Map></Map> inside only
    const { workspaces, google, currBasicMarkerData } = this.props;
    const {
      currentPlace,
      selectedPlace,
      showingInfoWindow,
      activeMarker,
      mapSize,
      iconSize
    } = this.state;

    const style = {
      width: "100%",
      height: "100%"
    };
    const locationInfo = {} //object
      if (selectedPlace && currentPlace && selectedPlace.id === currentPlace.id) {
        locationInfo.name = currentPlace.name ? currentPlace.name : undefined
      }

    const basicMarkerData = currBasicMarkerData;

    const blueIcon = {
      url: `./images/cl${iconSize}.png`
    };
    const redIcon = {
      url: `./images/rl${iconSize}.png`
    };

    const infoWindow =
      basicMarkerData && basicMarkerData.id !== selectedPlace.id ? (
        <InfoWindow marker={activeMarker} visible={showingInfoWindow}>
          <div className="infoWindow" tabIndex="2">
            <h3 className="info-title" tabIndex="2">
              {selectedPlace.name}
            </h3>
            <p className="info-address" tabIndex="2">
              <i className="material-icons">location_on</i>
              {selectedPlace.address}
            </p>
            <p className="info-phone" tabIndex="2">
              <i className="material-icons">phone</i>
              {selectedPlace.phone}
            </p>
            <img
              className="info-img"
              src={selectedPlace.image}
              tabIndex="2"
              alt={selectedPlace.name}
            />
            <div className="info-link">
              <a
                className="info-link"
                href={selectedPlace.page}
                tabIndex="2"
                target="_blank"
              >
                Visit page
              </a>
            </div>
          </div>
        </InfoWindow>
      ) : (
        // Markers are 'mouseEntered' or clicked
        <InfoWindow marker={activeMarker} visible={showingInfoWindow}>
          <div className="infoWindow" tabIndex="2">
            <h3 className="info-title" tabIndex="2">
              {selectedPlace.name}
            </h3>
            <p className="info-address" tabIndex="2">
              <i className="material-icons">location_on</i>
              {selectedPlace.address}
            </p>
            <p className="info-phone" tabIndex="2">
              <i className="material-icons">phone</i>
              {selectedPlace.phone}
            </p>
            <img
              className="info-img"
              src={selectedPlace.image}
              tabIndex="2"
              alt={selectedPlace.name}
            />
            <div className="info-link">
              <a
                className="info-link"
                href={selectedPlace.link}
                tabIndex="2"
                target="_blank"
              >
                Visit page
              </a>
            </div>
          </div>
        </InfoWindow>
      );

    return (
      <Map
        google={google}
        initialCenter={{
          lat: 31.22,
          lng: 29.95
        }}
        style={style}
        zoom={mapSize}
        onClick={this.onMapClicked}
      >
        {workspaces.map(location => (
          <Marker
            ref={this.onMarkerMounted}
            key={location.name}
            id={location.id}
            onClick={this.onMarkerClick}
            animation={
              this.props.currentSelectedListId === location.id
                ? google.maps.Animation.BOUNCE
                : undefined
            }
            onMouseover={
              this.state.selectedPlace.id !== location.id
                ? this.onMouseoverMarker
                : undefined
            }
            title={location.name}
            name={location.name}
            phone={location.phone}
            address={location.address}
            link={location.page}
            image={location.image}
            icon={
              selectedPlace.id !== location.id ? blueIcon : redIcon
            }
            position={{ lat: location.lat, lng: location.lng }}
          />
        ))}
        {infoWindow}
      </Map>
    );
  }
}

const LoadingContainer = props => <main className="loader" />;

export default GoogleApiWrapper({
  apiKey: "AIzaSyCA1Ssnu1-w0jQV3YceDhfcxMuTTr9oSlQ",
  LoadingContainer: LoadingContainer
})(MapContainer);
