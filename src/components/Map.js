import React, { Component } from 'react';
import GoogleMapReact from 'google-map-react';

const AnyReactComponent = ({ text }) => <div>{text}</div>;

class SimpleMap extends Component {
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
      <main className="map" style={{ height: '80vh', width: '100%' }}>
        <GoogleMapReact
          bootstrapURLKeys={{ key: 'AIzaSyAHU00QUEXigecU9sB3QrG1hl7kfT97lXg' }}
          defaultCenter={this.props.center}
          defaultZoom={this.props.zoom}
        >
          <AnyReactComponent
            lat={59.955413}
            lng={30.337844}
            text={'Alexandria'}
          />
        </GoogleMapReact>
      </main>
    );
  }
}

export default SimpleMap;