import React from 'react'
import type {RootState} from './redux/store'
import {useSelector, useDispatch} from 'react-redux'
import {decrement, increment} from './redux/CounterSlice'
import {loadModules} from "esri-loader";

const Counter = () => {
    const count = useSelector((state: RootState) => state.counter.value)
    const mapApi = useSelector((state: RootState) => state.map.mapApi);

    console.log('mapApi', mapApi)

    const dispatch = useDispatch()

    const clickInc = (e: any) => {
        e.stopPropagation();
        e.preventDefault()
        console.log('hi')
    }

    const applyGraphich = () => {
        loadModules(['esri/Map', 'esri/views/MapView', 'esri/Graphic'], { version: '4.28', css: true }) .then(([ArcGISMap, MapView, Graphic]) => {
            const polygon = {
                type: "polygon", // autocasts as new Polygon()
                rings: [
                    [-64.78, 32.3],
                    [-66.07, 18.45],
                    [-80.21, 25.78],
                    [-64.78, 32.3]
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

            mapApi.graphics.add(graphic);
        })
    }

    return (
        <div onMouseDown={(e) => e.stopPropagation()}>
            <div>

                <button
                    aria-label="Increment value"
                    onClick={() => dispatch(increment())}
                >
                    Increment
                </button>
                <span>{count}</span>
                <button
                    aria-label="Decrement value"
                    onClick={() => dispatch(decrement())}
                >
                    Decrement
                </button>

                <button onClick={applyGraphich}>Apply Graphic</button>
            </div>
        </div>
    );
}

export default Counter;