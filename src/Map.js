import React from 'react'
import { GoogleMap, useJsApiLoader, Marker } from '@react-google-maps/api';
import { useState } from 'react'

const containerStyle = {
    width: '500px',
    height: '500px'
  };
  
  const center = {
    lat: -31.953512,
    lng: 115.857048
  };

function MapComponent() {
    const { isLoaded } = useJsApiLoader({
        id: 'google-map-script',
        googleMapsApiKey: "AIzaSyBFta32WIl9K6yLEcY4oRK6MoZx7rqDu10",
        libraries: ['places']
      })

      const [map, setMap] = React.useState(null)

      const onLoad = React.useCallback(function callback(map) {
        const bounds = new window.google.maps.LatLngBounds(center);
        map.fitBounds(bounds);
        setMap(map)
      }, [])
    
      const onUnmount = React.useCallback(function callback(map) {
        setMap(null)
      }, [])
    
      return isLoaded ? (
          <GoogleMap
            mapContainerStyle={containerStyle}
            center={center}
            zoom={0}
            onLoad={onLoad}
            onUnmount={onUnmount}
          >
            { /* Child components, such as markers, info windows, etc. */ }
            <></>
            <Marker />
          </GoogleMap>
      ) : <></>
    }
    
    export default React.memo(MapComponent)