import React, {useEffect, useRef, useState} from 'react';
import { loadModules } from 'esri-loader';
import {useDispatch} from "react-redux";
import {updateMap} from "./redux/MapSlice";

const MapComponent = () => {
    const mapRef = useRef<any>();
    const dispatch = useDispatch()

    useEffect(
        () => {
            // lazy load the required ArcGIS API for JavaScript modules and CSS
            loadModules(['esri/Map', 'esri/views/MapView', 'esri/Graphic'], { version: '4.28', css: true })
                .then(([ArcGISMap, MapView, Graphic]) => {
                    const map = new ArcGISMap({
                        basemap: 'topo-vector'
                    });

                    // load the map view at the ref's DOM node
                    const view = new MapView({
                        container: mapRef.current,
                        map: map,
                        center: [-118, 34],
                        zoom: 3
                    });

                    dispatch(updateMap(view))

                    const polygon = {
                        type: "polygon", // autocasts as new Polygon()
                        rings: [
                            [-34.78, 32.3],
                            [-36.07, 18.45],
                            [-40.21, 25.78],
                            [-34.78, 32.3]
                        ]
                    };

                    const fillSymbol = {
                        type: "simple-fill", // autocasts as new SimpleFillSymbol()
                        color: [227, 139, 79, 0.8],
                        outline: { // autocasts as new SimpleLineSymbol()
                            color: [255, 255, 255],
                            width: 1
                        }
                    };

                    const graphic = new Graphic({
                        geometry: polygon,
                        symbol: fillSymbol
                    });

                    view.graphics.add(graphic);
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