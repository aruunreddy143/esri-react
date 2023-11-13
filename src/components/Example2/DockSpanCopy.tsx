import { DockManager } from "dock-spawn-ts/lib/js/DockManager";
import "dock-spawn-ts/lib/css/dock-manager.css";
import "dock-spawn-ts/lib/css/dock-manager-style.css";

import { PanelContainer } from "dock-spawn-ts/lib/js/PanelContainer";
import {useEffect} from "react";



const DockSpan = () => {

    useEffect(() => {
        let divDockContainer1 = document.getElementById('dock_div1');
        let divDockManager1 = document.getElementById('my_dock_manager1');
        // @ts-ignore
        let dockManager1 = new DockManager(divDockManager1, { moveOnlyWithinDockConatiner : true });

        //let divDockContainer2 = document.getElementById('dock_div2');
        //let divDockManager2 = document.getElementById('my_dock_manager2');
        // @ts-ignore
        //let dockManager2 = new DockManager(divDockManager2);

        dockManager1.initialize();
        //dockManager2.initialize();

        // @ts-ignore
        dockManager1.resize(divDockContainer1.clientWidth, divDockContainer1.clientHeight);
        // @ts-ignore
        //dockManager2.resize(divDockContainer2.clientWidth, divDockContainer2.clientHeight);

        // @ts-ignore
        let editor1_1 = new PanelContainer(document.getElementById("edt1_1"), dockManager1);
        // @ts-ignore
       let editor2_1 = new PanelContainer(document.getElementById("edt2_1"), dockManager1);
        let documentNode1 = dockManager1.context.model.documentManagerNode;
        dockManager1.dockFill(documentNode1, editor1_1);
        dockManager1.dockFill(documentNode1, editor2_1);
        let cont= {container: editor1_1, x: 300, y: 400}
        // @ts-ignore

        let infovis = new PanelContainer(document.getElementById("dock_div"), dockManager1); // invisible Dialog has no size, so size it manually
        infovis.width = 600;
        infovis.height = 400;
        dockManager1.floatDialog(infovis, 600, 400)

        // @ts-ignore
       // let editor1_2 = new PanelContainer(document.getElementById("edt1_2"), dockManager2);
        // @ts-ignore
       // let editor2_2 = new PanelContainer(document.getElementById("edt2_2"), dockManager2);
       // let documentNode2 = dockManager2.context.model.documentManagerNode;
       // dockManager2.dockFill(documentNode2, editor1_2);
       // dockManager2.dockFill(documentNode2, editor2_2);

    }, []);

   function loadData() {
       let divDockManager: any = document.querySelector('dock_div');
       let dockManager: any = new DockManager(document.querySelector('my_dock_manager') as any);

// Let the dock manager element fill in the entire screen


   }
    // Convert a div to a dock manager.  Panels can then be docked on to it
    //window.onresize(null);

// Convert existing elements on the page into "Panels".
// They can then be docked on to the dock manager
// Panels get a titlebar and a close button, and can also be
// converted to a floatingdialog box which can be dragged / resized
        return (
            <> <div onClick={loadData}>Load Data</div>
        <div id="dock_div" style={{"height": "500px"}}>
            hi
        </div>


                <div className="demo-header" id="header" style={{"width":"100%"}}>
                    <div className="demo-header-title">Dock Spawn Demo</div>
                </div>
                <div id="dock_div1" style={{"height":"100%","width":"100%","top":"150px", "left":"100px", position:"absolute"}}>
                    <div id="my_dock_manager1" className="my-dock-manager" style={{"position": "relative", width: '100%', height: '100%'}}></div>
                    <div id="edt1_1" data-panel-caption="Steering.h" style={{"background": "lightcoral"}}></div>
                    <div id="edt2_1" data-panel-caption="Steering.cpp" style={{"background": "lightgoldenrodyellow"}}></div>
                </div>

                {/*<div id="dock_div2"  style={{"height":"500px","width":"500px","top":"150px", "left":"700px", position:"absolute"}} >
                    <div id="my_dock_manager2" className="my-dock-manager" style={{"position": "relative"}}></div>
                    <div id="edt1_2" data-panel-caption="Steering.h" style={{"background": "lightblue"}}></div>
                    <div id="edt2_2" data-panel-caption="Steering.cpp" style={{"background": "lightgreen"}}></div>
                </div>*/}



            </>
    )
}

export default DockSpan