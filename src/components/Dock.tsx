import * as React from 'react';
import * as ReactDOM from 'react-dom';
import {DockLayout, DockContextType, DragDropDiv,} from 'rc-dock';
import "rc-dock/dist/rc-dock.css";
import MapComponent from "../Map";
import {useRef, useState} from "react";
import Counter from "../Counter";


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

    let tab = {
        title: 'Tab',
        content: (
            <div>
                <p>Custom component can be added to panel's title bar.</p>
                <p>This panel has a custom maximize button and a close all button</p>
            </div>),
        group: 'close-all'
    };

    let MapTab = {
        id: 'MapTab',
        title: 'Map',
        content: (
            <MapComponent/>),
        group: 'locked',
    };

    let count = 0;
    let floatTab = {
        id: 'float1',
        title: 'New Window',
        content: (
            <div>
                <p>Right click on the max button ⇗</p>
                <Counter/>
            </div>
        ),
        group: 'close-all'
    };
    let floatTab1 = {
        id: 'float2',
        title: 'New Window1',
        content: (
            <div>
                <p>Right click on the max button ⇗</p>
            </div>
        ),
        group: 'allowWindow'
    };

    function newTab() {
        return {
            id: `newtab${++count}`,
            title: 'New Tab',
            mode: 'float',
            content: (
                <div>
                    <p>This panel has an 'add' button defined in panelLock</p>
                </div>)
        };
    }

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
        },
        floatbox: {
            mode: 'float',
            id: 'floatMain',
            children: [
                {
                    tabs: [floatTab],
                    x: 60, y: 60, w: 320, h: 300
                }

            ]
        }
    };

    function getTab(id: any, value: any, tabName: any) {
        if(tabName === 'layer') {
            return {
                id: tabName,
                title: tabName,
                content: (
                    <div>
                        This is layer name
                    </div>
                ),
                mode: 'float',
                group: 'close-all'
            }
        }
        return {
            id: tabName,
            content: (
                <div>
                    <p>It's easier to use React Context to update tab,<br/>
                        but in some use cases you might need to directly update the tab.</p>
                    {
                        id !== `tab${value}` ?
                            <p>Only current active tab will be changed</p>
                            : null
                    }<Counter/>
                    value is {value}
                </div>
            ),
            title: tabName,
            mode: 'float',
            group: 'close-all'
        }
    }

    const [layout, setLayout] = useState(box)
    count = 1;
    const addWindow = (e: any, tabName: any) => {
        e.preventDefault()
        console.log(e, dockRef.current.getDockId())
        ++count;
        let newTab = getTab(`tab${count}`, count, tabName)
        dockRef.current.dockMove(newTab, null, 'new-window');

    }
    console.log('dockRef', dockRef)
    const loadTab = (data: { id: any; group: string; title: string; content: JSX.Element; closable?: undefined; }) => {
        let {id} = data;
        switch (id) {
            case 't0':
                return {...tab, id, group: 'card custom'};
            case 'protect1' :
                return {
                    id, title: 'Protect',
                    closable: true,
                    content: "<p>Removal of this tab will be rejected</p>",
                    group: 'card custom'
                };

        }

        return {
            id, title: id,
            content: "Tab Content",
            group: 'card custom'
        };
    };
    const onLayoutChange =(e: any) => {
        console.log(e)
    }
    // @ts-ignore
    // @ts-ignore
    return (
        <>
            <a href="#" onClick={(e) => addWindow(e, 'layer')}>Click layer</a>
            <a href="#" onClick={(e) => addWindow(e, 'Bookmark')}>Click Bookmark</a>
            <DockLayout ref={dockRef} defaultLayout={layout} groups={groups} onLayoutChange={(e) => onLayoutChange(e)}
                        style={{position: 'absolute', left: 0, top: 40, right: 0, bottom: 0}}/>
        </>
    );
}

export default DockApp

