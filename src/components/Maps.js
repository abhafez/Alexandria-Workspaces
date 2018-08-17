import React, { Component } from 'react'
import { Map, InfoWindow, Marker, GoogleApiWrapper } from 'google-maps-react';

export class MapContainer extends Component {
  state = {
    showingInfoWindow: false,
    activeMarker: {},
    selectedPlace: {},
  };

  onMarkerClick = (props, marker, e) =>
    this.setState({
      selectedPlace: props,
      activeMarker: marker,
      showingInfoWindow: true
    });

  onMapClicked = (props) => {
    if (this.state.showingInfoWindow) {
      this.setState({
        showingInfoWindow: false,
        activeMarker: null
      })
    }
  };

  render() {
    const style = {
      width: '100%',
      height: '100%'
    }
    return (
      <Map
        google={this.props.google}
        initialCenter={{
          lat: 31.22,
          lng: 29.95
        }}
        style={style}
        icon={{
          url: "../images/location24.png"
        }}
      >
        {console.log(this.props.workspaces)}
        {this.props.workspaces.map((location) => (
          <Marker
            onClick={this.onMarkerClick}
            title={'The marker`s title will appear as a tooltip.'}
            name={location.name}
            image={location.image}
            icon={{
              // url: "../images/location16.png"
              // anchor: new google.maps.Point(32,32),
              // scaledSize: new google.maps.Size(64,64)
            }}
            position={{ lat: location.lat, lng: location.lng }}  />
          
        ))}
        <InfoWindow
          marker={this.state.activeMarker}
          visible={this.state.showingInfoWindow}>
          <div>
            <p>{this.state.selectedPlace.name}</p>
            <img src={this.state.selectedPlace.image} alt=""/>
          </div>
        </InfoWindow>
      </Map>
    )
  }
}

// {this.props.workspaces.map((location) => (
//   <div>
//     <Marker
//       onClick={this.onMarkerClick}
//       title={'The marker`s title will appear as a tooltip.'}
//       name={location.name}
//       position={{ lat: location.lat, lng: location.lng }} />
//     <InfoWindow
//       marker={this.state.activeMarker}
//       visible={this.state.showingInfoWindow}>
//       <div>
//         <p>{this.state.selectedPlace.name}</p>
//       </div>
//     </InfoWindow>
//   </div>
// ))}

export default GoogleApiWrapper({
  apiKey: ('AIzaSyAHU00QUEXigecU9sB3QrG1hl7kfT97lXg')
})(MapContainer)