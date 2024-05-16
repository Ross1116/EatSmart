"use client";

import Map, {
  Marker,
  Popup,
  NavigationControl,
  GeolocateControl,
} from "react-map-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import { useState, useRef, useEffect, MouseEvent } from "react";
import { HeartHandshake, Trash2 } from "lucide-react";
import { getBins, getCharities } from "@/lib/callAPI";

export default function MapBoxComp({ session }: any) {
  const mapboxToken = process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN;
  const [charityMarkers, setCharityMarkers] = useState([]);
  const [binMarkers, setBinMarkers] = useState([]);
  const [selectedMarker, setSelectedMarker] = useState(null);
  const mapRef = useRef(null);

  useEffect(() => {
    if (session) {
      const options = {
        id_token: session.id_token,
      };

      getCharities(options).then((res) => {
        const { data } = res;
        const markers = data.map((charity: any) => ({
          position: {
            lat: parseFloat(charity.latitude),
            lng: parseFloat(charity.longitude),
          },
          label: charity.name,
        }));
        setCharityMarkers(markers);
      });

      getBins(options).then((res) => {
        const { data } = res;
        const markers = data.map((bin: any) => ({
          position: {
            lat: parseFloat(bin.latitude),
            lng: parseFloat(bin.longitude),
          },
          label: bin.name,
        }));
        setBinMarkers(markers);
      });
    }
  }, [session]);

  const zoomToSelectedLoc = (
    e: any,
    marker: { position: { lng: any; lat: any } },
    index: number
  ) => {
    e.stopPropagation();
    setSelectedMarker({ marker, index });
    mapRef.current.flyTo({
      center: [marker.position.lng, marker.position.lat],
      zoom: 12,
    });
  };

  const handleWheel = (event: any) => {
    if (!event.originalEvent.ctrlKey) {
      // Prevent zooming if Ctrl key is not pressed
      event.preventDefault();
    }
  };

  return (
    <main className="h-full w-full group relative">
      <Map
        ref={mapRef}
        mapboxAccessToken={mapboxToken}
        mapStyle="mapbox://styles/mapbox/dark-v11"
        initialViewState={{
          latitude: -37.840935,
          longitude: 144.946457,
          zoom: 11,
        }}
        maxZoom={20}
        minZoom={3}
        onWheel={handleWheel}
      >
        <GeolocateControl position="top-left" />
        <NavigationControl position="top-left" />
        {charityMarkers.map((marker, index) => (
          <Marker
            key={index}
            longitude={marker.position.lng}
            latitude={marker.position.lat}
          >
            <button
              type="button"
              className="cursor-pointer"
              onClick={(e) => zoomToSelectedLoc(e, marker, index)}
            >
              <HeartHandshake size={30} fill="tomato" color="black" />
            </button>
          </Marker>
        ))}
        {binMarkers.map((marker, index) => (
          <Marker
            key={index}
            longitude={marker.position.lng}
            latitude={marker.position.lat}
          >
            <button
              type="button"
              className="cursor-pointer"
              onClick={(e) => zoomToSelectedLoc(e, marker, index)}
            >
              <Trash2 size={30} fill="blue" color="black" />
            </button>
          </Marker>
        ))}
        {selectedMarker ? (
          <Popup
            offset={25}
            latitude={selectedMarker.marker.position.lat}
            longitude={selectedMarker.marker.position.lng}
            onClose={() => {
              setSelectedMarker(null);
            }}
            closeButton={false}
          >
            <div className="bg-background-50 p-4 rounded shadow">
              <h3 className="text-lg font-bold mb-2">
                {selectedMarker.marker.label ? (
                  selectedMarker.marker.label
                ) : (
                  <span>Fogo Bin</span>
                )}
              </h3>
              <div className="space-y-1">
                <div>
                  <label className="font-semibold">Latitude: </label>
                  <span>{selectedMarker.marker.position.lat}</span>
                </div>
                <div>
                  <label className="font-semibold">Longitude: </label>
                  <span>{selectedMarker.marker.position.lng}</span>
                </div>
              </div>
            </div>
          </Popup>
        ) : null}
      </Map>
    </main>
  );
}
