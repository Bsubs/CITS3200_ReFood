import React, { useRef, useEffect } from 'react';
import ReactDOM from 'react-dom';
import mapboxgl from 'mapbox-gl';
import geoJson from "./chicago-parks.json";
import "./mapView.css"

//public token key
mapboxgl.accessToken = 'pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4M29iazA2Z2gycXA4N2pmbDZmangifQ.-g_vE53SD2WrJ6tFX7QHmA';

const Mapp = () => {
  const mapContainerRef = useRef(null);

  // Initialize map 
  useEffect(() => {
    const map = new mapboxgl.Map({
      container: mapContainerRef.current,
      style: "mapbox://styles/mapbox/streets-v11", //public style key
      center: [-87.65, 41.84],
      zoom: 10,
    });

    // Create default markers
    geoJson.features.map((feature) =>
      new mapboxgl.Marker().setLngLat(feature.geometry.coordinates).addTo(map)
    );

    // Add navigation control (the +/- zoom buttons)
    map.addControl(new mapboxgl.NavigationControl(), "top-right");

    // Clean up on unmount
    return () => map.remove();
  }, []);

  return <div className="map-container" ref={mapContainerRef} />;
};

export default Mapp;