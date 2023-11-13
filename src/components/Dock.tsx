import * as React from 'react';
import * as ReactDOM from 'react-dom';
import {DockLayout, DockContextType} from 'rc-dock';
import "rc-dock/dist/rc-dock.css";
import MapComponent from "../Map";
import {useRef, useState} from "react";



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
          {panelData.parent.mode === 'maximize' ? '▬' : '▣'}
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
                          onClick={() => context.dockMove(panelData, null, 'remove')}>
          X
        </span>
                )
                return <div>{buttons}</div>
            }
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
        title: 'Map',
        content: (
            <MapComponent />)
    };

    let count = 0;
    let floatTab = {
        id: 'float1',
        title: 'New Window',
        content: (
            <div>
                <p>Right click on the max button ⇗</p>
            </div>
        )
    };
    let floatTab1 = {
        id: 'float2',
        title: 'New Window1',
        content: (
            <div>
                <p>Right click on the max button ⇗</p>
            </div>
        )
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
                            tabs: [{...MapTab, id: 't1'}],
                        }
                    ]
                }

            ]
        },
        floatbox: {
            mode: 'float',
            children: [
                {
                    tabs: [floatTab],
                    x: 60, y: 60, w: 320, h: 300
                }

            ]
        }
    };

    const [layout, setLayout] = useState(box)
    const addWindow = (e: any) => {
        e.preventDefault()
        let obj = {
            ...box,
        }
        obj.floatbox = {
                mode: 'float',
                children: [
                    {
                        tabs: [floatTab],
                        x: 60, y: 60, w: 320, h: 300
                    }

                ]
        }
        //obj.floatbox.children[0].tabs.push(floatTab1)
        setLayout(obj)

        //dockRef.loadLayout(newTab, 'my_panel', 'middle');

    }
    const loadTab = (data:  {     id: any;     group: string;     title: string;     content: JSX.Element;     closable?: undefined; }) => {
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
    // @ts-ignore
    return (
        <>
            <a href="#" onClick={(e) =>addWindow(e)}>Click to add new window</a>
        <DockLayout ref={dockRef} layout={layout}  groups={groups}
                    style={{position: 'absolute', left: 0, top: 40, right: 0, bottom: 0}}/>
        </>
    );
}

export default DockApp

