import React, { Component } from 'react'
import { Map, InfoWindow, Marker, GoogleApiWrapper } from 'google-maps-react'

export class MapContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      mapSize : 13,
      iconName: 'cl',
      activeMarker: {},
      selectedPlace: {},
      placeToBounce: [{}],
      showingInfoWindow: true,
      currentLocationAdress: '', // for foursquare updates
      markerObjects: []
    };
    this.onMarkerMounted = (element) => {
      this.setState(prevState => ({
        markerObjects: [...prevState.markerObjects, element.marker]
      }))
    };
  }

  onMarkerClick = (props, marker, e) => {
    let clientID = '2EDBBXP0TYVB5GKNTS4SOXIY4UNKOA0Q2DQAF4ZR2K5LRY03';
    let clientSecret = 'QA1ER5FS53NOKMUUKUC4TRO4UXTVA53CBE2VNSKWOFJGH4WH';
    fetch(`https://api.foursquare.com/v2/venues/search?client_id=${clientID}&client_secret=${clientSecret}&v=20180323&ll=${props.position.lat},${props.position.lng}&limit=1`)
    .then((response) => {
      if (response.status === 200) {
      }
      response.json().then((data) => {
        document.querySelector('.info-address').innerHTML = data.response.venues[0].location.address
        // it works but I don't need it (Our places are not rich with data on foursquare)
        });
      }
    ).catch((err) => {
        console.warn("Something Wrong With Foursquare data");
        // the included address in the json file will just appear
    });

    this.setState({
      selectedPlace: props,
      activeMarker: marker,
      placeToBounce: [props],
      showingInfoWindow: true
    })
  };

  onMapClicked = (props) => {
    this.setState({
      showingInfoWindow: false,
      activeMarker: null,
      placeToBounce: [{}],
    })
  };

  componentWillReceiveProps(nextProps) {
    this.state.markerObjects.forEach((marker) => {
      if (marker.link === nextProps.selectedWorkspace[0].page) {
        this.setState({
          activeMarker : marker,
          showingInfoWindow: true,
          selectedPlace: nextProps.selectedWorkspace[0],
          placeToBounce: nextProps.selectedWorkspace,
        })
      }
    })
  }

  // Map size responsive design purpose
  componentDidMount() {
    window.addEventListener('resize', this.fitMapSize, false)
    window.addEventListener('load', this.fitMapSize, false)
    window.gm_authFailure = this.gm_authFailure
    window.addEventListener("unhandledrejection", function (event) {
      console.warn("WARNING: Unhandled promise rejection. Shame on you! Reason: "+ event.reason);
    });
  }

  fitMapSize = () => {
    let screenSize = window.innerWidth;
    screenSize <= 411 ? this.setState({ mapSize: 12, iconSize: 32 }) :
    (screenSize >= 1200) ? this.setState({ mapSize: 13, iconSize: 64 }) :
      this.setState({ mapSize: 13, iconSize: 32})
  }

  gm_authFailure() {
    window.alert("Google Maps error!")
    document.getElementById('map').context('Google Maps Error!')
  }

  findMarkerIndex = (id, markers) => {
    for (let i = markers.length; i--; ) {
      if (markers[i].id === id) {
        return i;
      }
    }
    return null;
  }

  render() {
    //This style is used for the <Map></Map> inside only
    const style = {
      width: '100%',
      height: '100%'
    }

    const { workspaces, google} = this.props
    const { placeToBounce, selectedPlace, showingInfoWindow, activeMarker, mapSize, iconSize} = this.state

    const blueIcon = {
        url: `./images/cl${iconSize}.png`,
    };
     const redIcon = {
        url:  `./images/rl${iconSize}.png`,
    };


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
        {workspaces.map((location) => (
            <Marker
              ref={this.onMarkerMounted}
              key={location.name}
              onClick={this.onMarkerClick}
              animation={((placeToBounce[0]['id'] === location.id || selectedPlace.id === location.id) && google.maps.Animation.BOUNCE)}
              title={'The markers title will appear as a tooltip.'}
              name={location.name}
              phone={location.phone}
              address={location.address}
              link={location.page}
              image={location.image}
              icon={
                placeToBounce[0]['name'] !== location.name?
                blueIcon : redIcon
              }
              position={{ lat: location.lat, lng: location.lng }}
            />
          ))
        }
        {/* for UX the same icon included 64 & 32 */}
        {/* NOTE: the last comment crashes code when included inside the Marker tag*/}
        <InfoWindow
          marker={activeMarker}
          visible={showingInfoWindow}>
            <div className="infoWindow" tabIndex='2'>
              <h3 className ="info-title" tabIndex='2'>{selectedPlace.name}</h3>
              <p className= "info-address" tabIndex='2'><i className="material-icons">location_on</i>{selectedPlace.address}</p>
              <p className="info-phone" tabIndex='2'><i className="material-icons">phone</i>{selectedPlace.phone}</p>
              <img className="info-img" src={selectedPlace.image} tabIndex='2' alt={selectedPlace.name} />
              <div className="info-link">
                <a className="info-link" href={selectedPlace.link} tabIndex='2' target="_blank">Visit page</a>
              </div>
            </div>
        </InfoWindow>
      </Map>
    )
  }
}

const LoadingContainer = (props) => (
  <main className="loader"></main>
)

export default GoogleApiWrapper({
  apiKey: ('AIzaSyCA1Ssnu1-w0jQV3YceDhfcxMuTTr9oSlQ'),
  LoadingContainer: LoadingContainer
})(MapContainer)
