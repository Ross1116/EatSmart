import React, { useEffect, useState } from 'react'
import { GoogleMap, Marker, useJsApiLoader } from '@react-google-maps/api';
import { getBins, getCharities } from '@/lib/callAPI';
import { useSession } from 'next-auth/react';

const containerStyle = {
  width: '100%',
  height: '100%'
};

const center = {
  lat: -37.840935,
  lng: 144.946457
};

function GMap() {
  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY as string
  })

  const { data: session, status } = useSession();
  const [map, setMap] = React.useState(null)
  const [markers, setMarkers] = useState([]);
  const [binMarkers, setBinMarkers] = useState([]);

  useEffect(() => {
    const options = {
      id_token: (session as any).id_token,
    };

    getCharities(options).then((res) => {
      const { data } = res;
      const markers = data.map((charity: any) => ({
        position: {
          lat: parseFloat(charity.latitude),
          lng: parseFloat(charity.longitude)
        },
        label: charity.name
      }));
      setMarkers(markers);
    });

    getBins(options).then((res) => {
        const { data } = res;
        const markers = data.map((charity: any) => ({
          position: {
            lat: parseFloat(charity.latitude),
            lng: parseFloat(charity.longitude)
          },
          label: charity.name
        }));
        setBinMarkers(markers);
      });
  }, [session]);

  return isLoaded ? (
    <GoogleMap
      mapContainerStyle={containerStyle}
      center={center}
      zoom={13}
    >
      {markers.map((marker, index) => (
        <Marker
          key={index}
          position={marker.position}
          label={marker.label}
        />
      ))}
    </GoogleMap>
  ) : <></>
}

export default React.memo(GMap)