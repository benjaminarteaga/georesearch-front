import React, { useState, useEffect } from 'react';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';
import MarkerBancos from './icons/marker-b.png'
import MarkerFarmacias from './icons/marker-f.png'
import MarkerRestaurantes from './icons/marker-r.png'
import MarkerSupermercados from './icons/marker-s.png'
import MarkerCafeterias from './icons/marker-c.png'
import MarkerAlmacenes from './icons/marker-a.png'

const containerStyle = {
  width: '100%',
  height: '100%',
};

const markers = {
  'bancos': MarkerBancos,
  'farmacias': MarkerFarmacias,
  'restaurantes': MarkerRestaurantes,
  'supermercados': MarkerSupermercados,
  'cafeterias': MarkerCafeterias,
  'almacenes': MarkerAlmacenes
}

function GoogleMaps({ data, checkValues, center, mainLocation }) {
  const [group, setGroup] = useState(null);

  const mainMarker = mainLocation;

  const filterData = (data, checkValues) => {
    const groupData =
      checkValues.length ?
        data.filter(x => {
          return checkValues.includes(x.category_name);
        }) :
        data

    setGroup(groupData);
  };

  useEffect(() => {
    filterData(data, checkValues);
  }, [data, checkValues]);

  return (
    <LoadScript googleMapsApiKey="AIzaSyDjoWMwdrCTbw9WpTTkY4lCsbFPsJFzRLk">
      <GoogleMap mapContainerStyle={containerStyle} center={center} zoom={17.5}>
        <Marker position={mainMarker} />
        {group?.map((item, i) => (
          <Marker
            position={{
              lat: parseFloat(item.latitude),
              lng: parseFloat(item.longitude),
            }}
            key={item.id}
            icon={markers[item.category_name.split(" ", 1)[0].toLowerCase()]}
          />
        ))}
      </GoogleMap>
    </LoadScript>
  );
}

export default React.memo(GoogleMaps);
