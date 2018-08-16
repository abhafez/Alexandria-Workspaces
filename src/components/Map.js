import React, { Component } from 'react';
import GoogleMapReact from 'google-map-react';

const AnyReactComponent = ({ text }) => <div>{text}</div>;

class Map extends Component {
  static defaultProps = {
    center: {
      lat: 31.21564,
      lng: 29.95527
    },
    zoom: 13
  };

  render() {
    return (
      // Important! Always set the container height explicitly
      <main className="map" id="map">
        <GoogleMapReact
          bootstrapURLKeys={{ key: 'AIzaSyAHU00QUEXigecU9sB3QrG1hl7kfT97lXg' }}
          defaultCenter={this.props.center}
          defaultZoom={this.props.zoom}
        >
        </GoogleMapReact>
      </main>
    );
  }
}

export default Map;