import * as React from 'react';
import {DockLayout} from 'rc-dock';
import "rc-dock/dist/rc-dock.css";
import MapComponent from "../Map";
import {useRef} from "react";
import Counter from "../Counter";
import LayerManager from "./layermanager/LayerManager";


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
          {panelData.parent.mode === 'maximize' ? '-' : '+'}
          </span>
                    )
                    buttons.push(
                        <span className='my-panel-extra-btn' key='new-window' title='Open in new window'
                              onClick={() => context.dockMove(panelData, null, 'new-window')}>
          ⇪
          </span>
                    )
                }
                buttons.push(
                    <span className='my-panel-extra-btn' key='close' title='Close'
                          onClick={(e) => {
                              console.log(e)
                              context.dockMove(panelData, null, 'remove')
                          }}>
          X
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
            floatable: true,
            tabLocked: false,
        }
    };

    let MapTab = {
        id: 'MapTab',
        title: 'Map',
        content: (
            <MapComponent/>),
        group: 'locked',
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

    function getTab(tabName: any) {

        const sharedTabObj = {
            title: tabName,
            id: tabName,
            mode: 'float',
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

    const addWindow = (e: any, tabName: any) => {
        e.preventDefault()
        console.log(e, dockRef.current.getDockId())
        let newTab = getTab(tabName)
        dockRef.current.dockMove(newTab, null, 'new-window');
    }
    console.log('dockRef', dockRef)

    const onLayoutChange =(e: any) => {
        console.log(e)
    }
    // @ts-ignore
    return (
        <>
            <a href="#" onClick={(e) => addWindow(e, 'layer')}>Click layer</a>
            <a href="#" onClick={(e) => addWindow(e, 'Bookmark')}>Click Bookmark</a>
            <DockLayout ref={dockRef} defaultLayout={box} groups={groups} onLayoutChange={(e) => onLayoutChange(e)}
                        style={{position: 'absolute', left: 0, top: 40, right: 0, bottom: 0}}/>
        </>
    );
}

export default DockApp

