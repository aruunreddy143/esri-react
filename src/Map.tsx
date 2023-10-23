import React, { useEffect, useRef } from 'react';
import { loadModules } from 'esri-loader';

const MapComponent = () => {
    const mapRef = useRef<any>();

    useEffect(
        () => {
            // lazy load the required ArcGIS API for JavaScript modules and CSS
            loadModules(['esri/Map', 'esri/views/MapView'], { version: '4.28', css: true })
                .then(([ArcGISMap, MapView]) => {
                    const map = new ArcGISMap({
                        basemap: 'topo-vector'
                    });

                    // load the map view at the ref's DOM node
                    const view = new MapView({
                        container: mapRef.current,
                        map: map,
                        center: [-118, 34],
                        zoom: 8
                    });

                    return () => {
                        if (view) {
                            // destroy the map view
                            view.container = null;
                        }
                    };
                });
        }
    );

    return <div className="webmap" style={{height: '100%', width: '100%'}} ref={mapRef} />;
};

export default MapComponent