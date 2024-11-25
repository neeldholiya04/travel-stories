import React, { useCallback, useState } from 'react';
import { GoogleMap, Marker, useJsApiLoader } from '@react-google-maps/api';
import { mapStyles } from '../utils/mapStyles';
import MapControls from './MapControls';
import { useGeolocation } from '../hooks/useGeolocation';
import LoadingSpinner from './LoadingSpinner';

const containerStyle = {
  width: '100%',
  height: '100%',
};

const defaultCenter = {
  lat: 40.7128,
  lng: -74.0060,
};

export default function Map({
  markers,
  tempMarker,
  highlightedMarkerId,
  onMapClick,
  onMarkerClick,
}) {
  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY,
    libraries: ['places', 'visualization'],
  });

  const [map, setMap] = useState(null);
  const [mapStyle, setMapStyle] = useState('default');
  const [showMarkers, setShowMarkers] = useState(true);
  const { location: userLocation } = useGeolocation();

  const handleMapLoad = useCallback((map) => {
    setMap(map);
  }, []);

  const handleLocate = useCallback(() => {
    if (userLocation && map) {
      map.panTo(userLocation);
      map.setZoom(20);
    }
  }, [userLocation, map]);

  const handleStyleChange = useCallback((style) => {
    setMapStyle(style);
  }, []);

  if (!isLoaded) return <LoadingSpinner/>;

  return (
    <div className="relative h-full">
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={tempMarker || userLocation || defaultCenter}
        zoom={10}
        onClick={(e) =>
          onMapClick({
            lat: e.latLng.lat(),
            lng: e.latLng.lng(),
          })
        }
        onLoad={handleMapLoad}
        options={{
          styles: mapStyles[mapStyle],
          disableDefaultUI: true,
          zoomControl: true,
          mapTypeControl: true,
        }}
      >
        {tempMarker && (
          <Marker
            position={tempMarker}
            icon={{
              url: 'http://maps.google.com/mapfiles/ms/icons/green-dot.png',
            }}
          />
        )}
{markers.map((marker) => (
  showMarkers && (
    <Marker
      key={marker.id}
      position={{ lat: marker.lat, lng: marker.lng }}
      icon={{
        url:
          marker.id === highlightedMarkerId
            ? 'http://maps.google.com/mapfiles/ms/icons/blue-dot.png'
            : 'http://maps.google.com/mapfiles/ms/icons/red-dot.png',
      }}
      animation={
        marker.id === highlightedMarkerId
          ? google.maps.Animation.BOUNCE
          : null
      }
      onClick={() => onMarkerClick(marker.lat, marker.lng)}
    />
  )
))}

      </GoogleMap>

      <MapControls
        onLocate={handleLocate}
        onStyleChange={handleStyleChange}
        onMarkerToggle={setShowMarkers}
        showMarkers={showMarkers}
      />
    </div>
  );
}
