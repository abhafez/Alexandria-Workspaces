import React, { Component } from 'react'
import { Map, InfoWindow, Marker, GoogleApiWrapper } from 'google-maps-react'


export class MapContainer extends Component {
  state = {
    showingInfoWindow: false,
    activeMarker: {},
    selectedPlace: {},
    placeToBounce: [{}],
    mapSize : 13
  };

  onMarkerClick = (props, marker, e) => {
    this.setState({
      selectedPlace: props,
      activeMarker: marker,
      placeToBounce: [props],
      showingInfoWindow: true
    })
    console.log(props);
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
    let titleBarHeight = document.getElementById('title-bar').innerHeight
    console.log(titleBarHeight)
    let mapSecondDiv = document.getElementsByTagName('main');
    mapSecondDiv[0].childNodes[0].childNodes[0].style.height = `${window.innerHeight - 20*16}px`
    
    window.addEventListener('resize', this.fitMapSize, false)
    window.addEventListener('load', this.fitMapSize, false);
  }
  
  fitMapSize = () => {
    let screenSize = window.innerWidth;
    screenSize <= 411 ? this.setState({ mapSize: 12, iconSize: 32 }) :
    (screenSize >= 1200) ? this.setState({ mapSize: 13, iconSize: 64 }) :
      this.setState({ mapSize: 12, iconSize: 32})
  }
  render() {
    //This style is used for the <Map></Map> inside only
    const style = {
      width: '100%',
      height: '100%'
    }
    
    const { workspaces, google} = this.props
    const { placeToBounce, selectedPlace, showingInfoWindow, activeMarker, mapSize} = this.state
    

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
            animation={(placeToBounce[0]['name'] === location.name)
              && google.maps.Animation.BOUNCE}
            title={'The marker`s title will appear as a tooltip.'}
            name={location.name}
            phone={location.phone}
            address={location.address}
            link={location.page}
            photo={location.image}
            icon={{
              url: `./images/location${this.state.iconSize}.png`
            }}
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
              <img className="info-img" src={selectedPlace.photo} alt=""/>
              <div className="info-link"><a className="info-link" href={selectedPlace.link}>Visit page</a></div>
            </div>
        </InfoWindow>
      </Map>
    )
  }
}

export default GoogleApiWrapper({
  apiKey: ('AIzaSyAHU00QUEXigecU9sB3QrG1hl7kfT97lXg')
})(MapContainer)
