import React, { useEffect, useState } from 'react';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';


const API_KEY = 'google_api_key';

type MapComponentProps = {
    onLocationSelect: (lat: number, lon: number) => void;
}

const MapComponent: React.FC<MapComponentProps> = ({ onLocationSelect }) => {
    const [markerPosition, setMarkerPosition] = useState<google.maps.LatLngLiteral | null>(null);

    const mapContainerStyle = {
        height: '400px',
        width: '100%',
    };

    const initialCenter = {
        lat: -6.2383,
        lng: 106.9756,
    };

    const handleMapClick = (event: google.maps.MapMouseEvent) => {
        if (event.latLng) {
            const lat = event.latLng.lat();
            const lon = event.latLng.lng();
            setMarkerPosition({ lat, lng: lon });
            onLocationSelect(lat, lon);
        }
    };

    return (
        <LoadScript googleMapsApiKey={API_KEY}>
            <GoogleMap
                mapContainerStyle={mapContainerStyle}
                zoom={13}
                center={markerPosition || initialCenter}
                onClick={handleMapClick}
            >
                {markerPosition && (
                    <Marker position={markerPosition} />
                )}
            </GoogleMap>
        </LoadScript>
    );
};

export default MapComponent;