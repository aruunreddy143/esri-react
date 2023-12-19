import * as React from 'react';
import {DockLayout} from 'rc-dock';
import "rc-dock/dist/rc-dock.css";
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import CloseIcon from '@mui/icons-material/Close';
import MapComponent from "../Map";
import {useRef} from "react";
import Counter from "../Counter";
import LayerManager from "./layermanager/LayerManager";
//const LayerManager = React.lazy(() => import("./layermanager/LayerManager"));


const DockApp = () => {
    const dockRef: any = useRef()
    let groups = {
        'close-all': {
            floatable: true,
            closable: true,
            panelExtra: (panelData: any, context: any) => {

                let buttons = [];
                if (panelData.parent.mode !== 'window') {
                    buttons.push(
                        <span className='my-panel-extra-btn' key='maximize'
                              title={panelData.parent.mode === 'maximize' ? 'Restore' : 'Maximize'}
                              onClick={() => context.dockMove(panelData, null, 'maximize')}>
          {panelData.parent.mode === 'maximize' ? <RemoveIcon fontSize={'small'} /> : <AddIcon fontSize={'small'} />}
          </span>
                    )
                    buttons.push(
                        <span className='my-panel-extra-btn' key='new-window' title='Open in new window'
                              onClick={() => context.dockMove(panelData, 'null', 'new-window')}>
          <OpenInNewIcon fontSize={'small'} />
          </span>
                    )
                }
                buttons.push(
                    <span className='my-panel-extra-btn' key='close' title='Close'
                          onClick={(e) => {
                              console.log(e)
                              context.dockMove(panelData, null, 'remove')
                          }}>
          <CloseIcon fontSize={'small'} />
        </span>
                )
                return <div>{buttons}</div>
            }
        },
        allowWindow: {
            floatable: true,
            newWindow: true,
            maximizable: true,
        },
        'locked': {
            floatable: false,
            tabLocked: false,
        }
    };

    let MapTab = {
        id: 'id1',
        title: 'Map',
        content: (
            <MapComponent/>),
        group: 'close-all',
    };

    let box: any = {
        dockbox: {
            mode: 'horizontal',
            children: [
                {
                    mode: 'vertical',
                    size: 500,
                    children: [
                        {
                            tabs: [{...MapTab}]
                        }
                    ]
                }

            ]
        }
    };
    let count=2;
    function getTab(tabName: any, id: any) {
        count++;

        const sharedTabObj = {
            title: tabName,
            id: id,
            mode: 'floatbox',
            group: 'close-all'
        }

        if(tabName === 'layer') {
            return {
                content: (<LayerManager />),
               ...sharedTabObj
            }
        }
        return {
            content: (
                <div>
                    <p>It's easier to use React Context to update tab,<br/>
                        but in some use cases you might need to directly update the tab.</p>
                    <Counter/>
                </div>
            ),
            ...sharedTabObj
        }
    }

    const addWindow = (e: any, tabName: any, id: any) => {
        e.preventDefault()
        console.log(e, dockRef.current.getDockId())
        let newTab = getTab(tabName, id)
        dockRef.current.dockMove(newTab, null, 'float');
    }
    const onLayoutChange =(e: any) => {
        console.log(e)
    }
    // @ts-ignore
    return (
        <>
            <a href="#" onClick={(e) => addWindow(e, 'layer', 'id2')}>Click layer</a>
            <a href="#" onClick={(e) => addWindow(e, 'Bookmark', 'id3')}>Click Bookmark</a>
            <DockLayout ref={dockRef} defaultLayout={box} groups={groups} onLayoutChange={(e) => onLayoutChange(e)}
                        style={{position: 'absolute', left: 0, top: 40, right: 0, bottom: 0}}/>
        </>
    );
}

export default DockApp

