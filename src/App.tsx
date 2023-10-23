import React from 'react';
import './App.css';
import MapComponent from "./Map";
import {useSelector} from "react-redux";
import type { RootState } from './redux/store'
import Counter from "./Counter";

function App() {
  // @ts-ignore
    return (
    <div className="App">
      <MapComponent />

    </div>
  );
}

export default App;
