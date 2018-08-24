import React, { Component } from 'react'
import { Map, InfoWindow, Marker, GoogleApiWrapper } from 'google-maps-react'


export class MapContainer extends Component {
  state = {
    showingInfoWindow: false,
    activeMarker: {},
    selectedPlace: {},
    placeToBounce: [{}],
    mapSize : 13,
    iconName: 'cl',
    currentLocationAdress: ''
  };

  onMarkerClick = (props, marker, e) => {
    let clientID = '2EDBBXP0TYVB5GKNTS4SOXIY4UNKOA0Q2DQAF4ZR2K5LRY03';
    let clientSecret = 'QA1ER5FS53NOKMUUKUC4TRO4UXTVA53CBE2VNSKWOFJGH4WH';
    console.log(props.position.lat);
    fetch(`https://api.foursquare.com/v2/venues/search?client_id=${clientID}&client_secret=${clientSecret}&v=20180323&ll=${props.position.lat},${props.position.lng}&limit=1`)
    .then((response) => {
      if (response.status === 200) {
        console.log(response)
      }
      response.json().then((data) => {
        console.log(data.response.venues[0].location.address);
        document.querySelector('.info-address').innerHTML = data.response.venues[0].location.address
        // it works but I don't need it (Our places are not rich with data on foursquare)
        });
      }
    ).catch((err) => {
        console.log("Something Wrong");
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
    if (this.state.showingInfoWindow) {
      this.setState({
        showingInfoWindow: false,
        activeMarker: null,
        placeToBounce: [{}],
        iconSize : 64
      })
    }
  };
  
  componentWillReceiveProps(nextProps) {
      this.setState({
        placeToBounce: nextProps.selectedWorkspace,
      })
  }
  
  // Map size responsive design purpose
  componentDidMount() {
    window.addEventListener('resize', this.fitMapSize, false)
    window.addEventListener('load', this.fitMapSize, false)
    window.gm_authFailure = this.gm_authFailure
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
  render() {
    //This style is used for the <Map></Map> inside only
    const style = {
      width: '100%',
      height: '100%'
    }
    
    const { workspaces, google} = this.props
    const { placeToBounce, selectedPlace, showingInfoWindow, activeMarker, mapSize, iconSize} = this.state
    
    const defaultIcon = {
        url: `./images/cl${iconSize}.png`,
    };
     const highlightedIcon = {
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
            onClick={this.onMarkerClick}
            key={location.name}
            animation={(placeToBounce[0]['name'] === location.name)
              && google.maps.Animation.BOUNCE}
            title={'The markers title will appear as a tooltip.'}
            name={location.name}
            phone={location.phone}
            address={location.address}
            link={location.page}
            photo={location.image}
            icon={
              placeToBounce[0]['name'] !== location.name?
              defaultIcon : highlightedIcon
            }
            position={{ lat: location.lat, lng: location.lng }}  />
        ))}
        {/* for UX the same icon included 64 & 32 */}
        {/* NOTE: the last comment crashes code when included inside the Marker tag*/}
        <InfoWindow
          marker={activeMarker}
          visible={showingInfoWindow}>
            <div className="infoWindow">
              <h3 className ="info-title">{selectedPlace.name}</h3>
              <p className= "info-address"><i className="material-icons">location_on</i>{selectedPlace.address}</p>
              <p className="info-phone"><i className="material-icons">phone</i>{selectedPlace.phone}</p>
              <img className="info-img" src={selectedPlace.photo} alt={selectedPlace.name} />
              <div className="info-link">
                <a className="info-link" href='{selectedPlace.link}'>Visit page</a>
              </div>
            </div>
        </InfoWindow>
      </Map>
    )
  }
}

export default GoogleApiWrapper({
  apiKey: ('AIzaSyCA1Ssnu1-w0jQV3YceDhfcxMuTTr9oSlQ')
})(MapContainer)
