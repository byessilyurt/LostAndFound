import React, { useEffect, useRef, useState } from 'react';
import { GoogleMap, useJsApiLoader, Marker } from '@react-google-maps/api';

const containerStyle = {
  width: '400px',
  height: '300px'
};

function MapLocationPicker({ setLocation }) {
  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: "YOUR_GOOGLE_MAPS_API_KEY" // replace this with your Google Maps API Key
  })

  const [map, setMap] = useState(null);
  const [markerPosition, setMarkerPosition] = useState(null);

  const onLoad = React.useCallback(function callback(map) {
    const bounds = new window.google.maps.LatLngBounds();
    map.fitBounds(bounds);
    setMap(map)
  }, [])

  const onUnmount = React.useCallback(function callback(map) {
    setMap(null)
  }, [])

  const onMapClick = React.useCallback(event => {
    setMarkerPosition({
      lat: event.latLng.lat(),
      lng: event.latLng.lng()
    });
    setLocation({
      lat: event.latLng.lat(),
      lng: event.latLng.lng()
    });
  }, [setLocation]);

  const options = {
    
    componentRestrictions: { country: "pl" } // restricts Autocomplete search to the United States
  };

  useEffect(() => {
    if (isLoaded && map !== null) {
      const autocomplete = new window.google.maps.places.Autocomplete(map.getDiv(), options);

      autocomplete.addListener("place_changed", () => {
        const place = autocomplete.getPlace();

        // Update your state with the selected place.
        setLocation(place.formatted_address);
        setMarkerPosition({ lat: place.geometry.location.lat(), lng: place.geometry.location.lng() });
      });
    }
  }, [isLoaded, map, setLocation]);

  return isLoaded ? (
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={{ lat: 40.748817, lng: -73.985428 }} // New York as default location
        zoom={10}
        onLoad={onLoad}
        onUnmount={onUnmount}
        onClick={onMapClick}
      >
        {markerPosition && <Marker position={markerPosition} />}
      </GoogleMap>
  ) : <></>
}

export default React.memo(MapLocationPicker);
