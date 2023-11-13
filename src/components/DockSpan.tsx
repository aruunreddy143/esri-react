import {DockManager} from "dock-spawn-ts/lib/js/DockManager";
import "dock-spawn-ts/lib/css/dock-manager.css";
import "dock-spawn-ts/lib/css/dock-manager-style.css";

import {PanelContainer} from "dock-spawn-ts/lib/js/PanelContainer";
import {useEffect} from "react";
import MapComponent from "../Map";


const DockSpan = () => {

    let dockManager1:any
    useEffect(() => {
        let divDockContainer1 = document.getElementById('dock_div1');

        let divDockManager1 = document.getElementById('my_dock_manager1');
        // @ts-ignore
        dockManager1 = new DockManager(divDockManager1, {moveOnlyWithinDockConatiner: true});

        dockManager1.initialize();

        // @ts-ignore
        dockManager1.resize(divDockContainer1.clientWidth, divDockContainer1.clientHeight);
        // @ts-ignore
        let editor1_1 = new PanelContainer(document.getElementById("edt1_1"), dockManager1);
        editor1_1.hideCloseButton(true);
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

        // @ts-ignore
        let infovis1 = new PanelContainer(document.getElementById("dock_div2"), dockManager1, "panel2"); // invisible Dialog has no size, so size it manually
        infovis1.width = 300;
        infovis1.height = 300;
        dockManager1.floatDialog(infovis1, 300, 400)


    }, []);

    function loadData() {
        // @ts-ignore
        let infovis = new PanelContainer(document.getElementById("dock_div2"), dockManager1); // invisible Dialog has no size, so size it manually
        infovis.width = 300;
        infovis.height = 300;
        dockManager1.floatDialog(infovis, 300, 300)
    }

    return (
        <>
            <div onClick={loadData}>Load Data</div>
            <div id="dock_div" style={{"height": "500px", position: "absolute"}}>
               This is panel 1
            </div>

            <div id="dock_div2" style={{"height": "500px", position: "absolute"}}>
               Panel test 2
            </div>
            <div id="dock_div1" >
                <div id="my_dock_manager1" className="my-dock-manager"
                     style={{"position": "absolute", width: '100%', height: '100%', "left": "0"}}></div>
                <div id="edt1_1" data-panel-caption="Map"><MapComponent/></div>
                <div id="edt2_1" data-panel-caption="Steering.cpp" style={{"background": "lightgoldenrodyellow"}}></div>
            </div>


        </>
    )
}

export default DockSpan