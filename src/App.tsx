import React, { Suspense } from 'react';
import './App.css';
import MapComponent from "./Map";
import {useSelector} from "react-redux";
import type { RootState } from './redux/store'
import Counter from "./Counter";
import DockApp from "./components/Dock";
const Header = React.lazy(() => import('./common/header/Header'));

function App() {
  // @ts-ignore
    return (
    <div className="App">
        <Header />
        <DockApp />


    </div>
  );
}

export default App;
