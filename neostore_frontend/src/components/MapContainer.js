import {Map, InfoWindow, Marker, GoogleApiWrapper} from 'google-maps-react';
import { Component } from 'react';
export class MapContainer extends Component {
  render() {
    return (
      <>
      <Map google={this.props.google} zoom={14}>
 
        <Marker onClick={this.onMarkerClick}
                name={'Current location'} />
 
        <InfoWindow onClose={this.onInfoWindowClose}>
             
        </InfoWindow>
      </Map>

      </>
    );
  }
}
 
export default GoogleApiWrapper({
  apiKey: ('AIzaSyD58tu7ms8SWCeMQiQMMuA7zhirg0qlQPw')
})(MapContainer)