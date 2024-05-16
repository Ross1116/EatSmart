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

//   const testBinData = [
// 	{ name: "Bin 1001", latitude: "-37.83127299", longitude: "144.9065052" },
// 	{ name: "Bin 1002", latitude: "-37.80246428", longitude: "144.9948886" },
// 	{ name: "Bin 1003", latitude: "-37.8134003", longitude: "144.9965632" },
// 	{ name: "Bin 1004", latitude: "-37.82006708", longitude: "144.9808397" },
// 	{ name: "Bin 1005", latitude: "-37.84219907", longitude: "144.9304614" },
// 	{ name: "Bin 1006", latitude: "-37.84220027", longitude: "144.9097672" },
// 	{ name: "Bin 1007", latitude: "-37.84709582", longitude: "144.9684233" },
// 	{ name: "Bin 1008", latitude: "-37.80669119", longitude: "144.9440152" },
// 	{ name: "Bin 1009", latitude: "-37.81994425", longitude: "144.9122038" },
// 	{ name: "Bin 1010", latitude: "-37.81459637", longitude: "144.9495177" },
// 	{ name: "Bin 1011", latitude: "-37.84897078", longitude: "144.9034389" },
// 	{ name: "Bin 1012", latitude: "-37.80150451", longitude: "144.990932" },
// 	{ name: "Bin 1013", latitude: "-37.80837787", longitude: "144.925878" },
// 	{ name: "Bin 1014", latitude: "-37.83938304", longitude: "144.9662522" },
// 	{ name: "Bin 1015", latitude: "-37.84090875", longitude: "144.9311711" },
// 	{ name: "Bin 1016", latitude: "-37.84082977", longitude: "144.9520068" },
// 	{ name: "Bin 1017", latitude: "-37.83478789", longitude: "144.954671" },
// 	{ name: "Bin 1018", latitude: "-37.82376218", longitude: "144.9184854" },
// 	{ name: "Bin 1019", latitude: "-37.82840275", longitude: "144.9969585" },
// 	{ name: "Bin 1020", latitude: "-37.83543854", longitude: "144.9775133" },
// 	{ name: "Bin 1021", latitude: "-37.81940736", longitude: "144.9939499" },
// 	{ name: "Bin 1022", latitude: "-37.84302531", longitude: "144.9894827" },
// 	{ name: "Bin 1023", latitude: "-37.83539277", longitude: "144.95979" },
// 	{ name: "Bin 1024", latitude: "-37.83168191", longitude: "144.9921874" },
// 	{ name: "Bin 1025", latitude: "-37.8271965", longitude: "144.9088493" },
// 	{ name: "Bin 1026", latitude: "-37.8107412", longitude: "144.9195983" },
// 	{ name: "Bin 1027", latitude: "-37.84001631", longitude: "144.9045227" },
// 	{ name: "Bin 1028", latitude: "-37.82428828", longitude: "144.932533" },
// 	{ name: "Bin 1029", latitude: "-37.82037927", longitude: "144.9388677" },
// 	{ name: "Bin 1030", latitude: "-37.84767748", longitude: "144.9271349" },
// 	{ name: "Bin 1031", latitude: "-37.81962276", longitude: "144.9828738" },
// 	{ name: "Bin 1032", latitude: "-37.84147379", longitude: "144.9356753" },
// 	{ name: "Bin 1033", latitude: "-37.85785982", longitude: "144.8016566" },
// 	{ name: "Bin 1034", latitude: "-37.81859559", longitude: "145.0446384" },
// 	{ name: "Bin 1035", latitude: "-37.87886137", longitude: "145.0120572" },
// 	{ name: "Bin 1036", latitude: "-37.77967045", longitude: "145.0187022" },
// 	{ name: "Bin 1037", latitude: "-37.8888174", longitude: "145.0313811" },
// 	{ name: "Bin 1038", latitude: "-37.75196696", longitude: "144.8222134" },
// 	{ name: "Bin 1039", latitude: "-37.78416328", longitude: "144.9075397" },
// 	{ name: "Bin 1040", latitude: "-37.87019265", longitude: "144.8347607" },
//   ];

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

	// const markers = testBinData.map((bin) => ({
	// 	position: {
	// 	  lat: parseFloat(bin.latitude),
	// 	  lng: parseFloat(bin.longitude),
	// 	},
	// 	label: bin.name,
	//   }));
	//   setBinMarkers(markers);
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
      zoom: 11,
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
      {/* <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center group-hover:visible bg-black-500 z-20 invisible bg-opacity-5 opacity-35 text-3xl font-medium">
        Ctrl + scroll to zoom
      </div> */}
      <Map
        ref={mapRef}
        mapboxAccessToken={mapboxToken}
        mapStyle="mapbox://styles/mapbox/dark-v11"
        initialViewState={{
          latitude: -37.840935,
          longitude: 144.946457,
          zoom: 10,
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
