import React, { useEffect, useState } from "react";
import {
  GoogleMap,
  useJsApiLoader,
  Marker,
  Circle,
} from "@react-google-maps/api";

const containerStyle = {
  width: "400px",
  height: "300px",
};

const center = {
  lat: 51.107883,
  lng: 17.038538,
};

function MapLocationPicker({ mapLocation, setMapLocation, found = true }) {
  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
  });

  const [map, setMap] = useState(null);
  const [markerPosition, setMarkerPosition] = useState(center);

  const onLoad = React.useCallback(function callback(map) {
    setMap(map);
  }, []);

  const onUnmount = React.useCallback(function callback(map) {
    setMap(null);
  }, []);

  const onMapClick = React.useCallback(
    (event) => {
      const newPosition = {
        lat: event.latLng.lat(),
        lng: event.latLng.lng(),
      };
      setMarkerPosition(newPosition);
      setMapLocation(newPosition);
    },
    [setMapLocation]
  );

  const options = {
    componentRestrictions: { country: "pl" }, // restricts Autocomplete search to Poland
  };

  useEffect(() => {
    if (isLoaded && map !== null) {
      const autocomplete = new window.google.maps.places.Autocomplete(
        map.getDiv(),
        options
      );

      autocomplete.addListener("place_changed", () => {
        const place = autocomplete.getPlace();

        // Update your state with the selected place.
        setMapLocation(place.formatted_address);
        setMarkerPosition({
          lat: place.geometry.location.lat(),
          lng: place.geometry.location.lng(),
        });
      });
    }
  }, [isLoaded, map, setMapLocation]);

  return isLoaded ? (
    <GoogleMap
      mapContainerStyle={containerStyle}
      center={center}
      zoom={12}
      onLoad={onLoad}
      onUnmount={onUnmount}
      onClick={onMapClick}
    >
      {found ? (
        <Circle
          center={markerPosition}
          radius={500} // 800 meters
          options={{
            strokeColor: "#FF0000",
            strokeOpacity: 0.8,
            strokeWeight: 2,
            fillColor: "#FF0000",
            fillOpacity: 0.35,
          }}
        />
      ) : (
        markerPosition && <Marker position={markerPosition} />
      )}
    </GoogleMap>
  ) : (
    <></>
  );
}

export default React.memo(MapLocationPicker);
