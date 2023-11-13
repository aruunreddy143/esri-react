import React, { Suspense } from 'react';
import './App.css';
import MapComponent from "./Map";
import {useSelector} from "react-redux";
import type { RootState } from './redux/store'
import Counter from "./Counter";
import DockSpan from "./components/DockSpan";
const Header = React.lazy(() => import('./common/header/Header'));

function App() {
  // @ts-ignore
    return (
    <div className="App">
        <Header />
        <DockSpan />


    </div>
  );
}

export default App;
