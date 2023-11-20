import {DockManager} from "dock-spawn-ts/lib/js/DockManager";
import "dock-spawn-ts/lib/css/dock-manager.css";
import "dock-spawn-ts/lib/css/dock-manager-style.css";

import {PanelContainer} from "dock-spawn-ts/lib/js/PanelContainer";
import { renderToString, renderToStaticMarkup } from 'react-dom/server'
import DOMPurify from 'isomorphic-dompurify';
import React, {useEffect, useRef} from "react";
import MapComponent from "../Map";
import Counter from "../Counter";
import App from "../App";
import CounterNoRedux from "./CounterNoRedux";

let dialogObj = {
    counter: Counter
}


const DockSpan = () => {
    const containerRef= useRef(null);
    let dockManager1:any
    let divDockContainer1: any
    if (containerRef.current) {
        for (let i = 0; i < 365; i++) {
           // containerRef.current.insertadjacenthtml('beforeend', `<div id="box></div>`);
        }
    }

    let counterNew = React.createElement(Counter);
    useEffect(() => {

        divDockContainer1 = document.getElementById('dock_div1');


        let divDockManager1 = document.getElementById('my_dock_manager1');
        // @ts-ignore
        dockManager1 = new DockManager(divDockManager1, {moveOnlyWithinDockConatiner: true});

        dockManager1.initialize();

        // @ts-ignore
        dockManager1.resize(divDockContainer1.clientWidth, divDockContainer1.clientHeight);
        // @ts-ignore
        let editor1_1 = new PanelContainer(document.getElementById("edt1_1"), dockManager1);
        editor1_1.hideCloseButton(true);
        editor1_1.canUndock(true);
        // @ts-ignore
        let editor2_1 = new PanelContainer(document.getElementById("edt2_1"), dockManager1);

        let documentNode1 = dockManager1.context.model.documentManagerNode;
        dockManager1.dockFill(documentNode1, editor1_1);

        dockManager1.dockFill(documentNode1, editor2_1);
        let cont = {container: editor1_1, x: 300, y: 400}
        // @ts-ignore

        let infovis = new PanelContainer(document.getElementById("dock_div"), dockManager1, "test"); // invisible Dialog has no size, so size it manually
        infovis.width = 600;
        infovis.height = 400;

        dockManager1.floatDialog(infovis, 600, 400)
        infovis.eventListeners.forEach((listener) => {
            console.log('first', listener)
        });


        // @ts-ignore
        let infovis1 = new PanelContainer(document.getElementById("dock_div2"), dockManager1, "panel2"); // invisible Dialog has no size, so size it manually
        infovis1.width = 300;
        infovis1.height = 300;
        dockManager1.floatDialog(infovis1, 300, 400)
        let doc_div2 = document.getElementById("dock_div");
        doc_div2?.insertAdjacentHTML("beforeend", `<div onclick="alert('hi')">hi121</div>sada${renderToString(<CounterNoRedux />)}`)

        const positionSelect = document.querySelector("#position");





        dockManager1.addLayoutListener({
            onClosePanel: (dockManager: any, panel: any) => {
                console.log('onClosePanel: ', dockManager, panel);
               // localStorage.setItem(storeKey, dockManager.saveState());
            }
        });


    }, []);
    useEffect(() => {
        function handleResize() {
            dockManager1.resize(divDockContainer1.clientWidth, divDockContainer1.clientHeight);

        }

        window.addEventListener('resize', handleResize)

        return () => {
            window.removeEventListener('resize', handleResize)

        }
    })


    function loadData() {
        // @ts-ignore
        let infovis = new PanelContainer(document.getElementById("dock_div2"), dockManager1); // invisible Dialog has no size, so size it manually
        infovis.width = 300;
        infovis.height = 300;
        dockManager1.floatDialog(infovis, 300, 300)
    }

    function myFun() {
        alert('hi')
    }

    // @ts-ignore
    return (
        <>  <Counter />
            <div id="dock_div" style={{"height": "500px", position: "absolute"}}>dsfsdf
            </div>

            <div id="dock_div2" style={{"height": "500px", position: "absolute"}} onMouseDown={e => e.stopPropagation()}>
               <Counter />
                new
                {counterNew}
                <div onClick={myFun}>Click me myfunc </div>
            </div>
            <div id="dock_div1">
                <div id="my_dock_manager1" className="my-dock-manager"
                     style={{"position": "absolute", width: '100%', height: '100%', "left": "0"}}></div>
                <div id="edt1_1" data-panel-caption="Map"><MapComponent/></div>
                <div id="edt2_1" data-panel-caption="Steering.cpp" style={{"background": "lightgoldenrodyellow"}}><div onClick={myFun}>Click me myfunc </div></div>
            </div>


        </>
    )
}

export default DockSpan