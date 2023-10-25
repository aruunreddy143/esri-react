import * as React from 'react';
import * as ReactDOM from 'react-dom';
import {DockLayout, DockContextType} from 'rc-dock';
import "rc-dock/dist/rc-dock.css";
import MapComponent from "../Map";



const DockApp = () => {
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
            <MapComponent />),
        group: 'close-all'
    };

    let count = 0;

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
                        },
                        {
                            tabs: [newTab(), newTab()],
                            panelLock: {
                                minWidth: 200,
                                panelExtra: (panelData: any, context: any) => (
                                    <button className='btn'
                                            onClick={() => context.dockMove(newTab(), panelData, 'middle')}>
                                        add
                                    </button>
                                )
                            }
                        },
                    ]
                },
                {
                    size: 300,
                    tabs: [{...tab, id: 't5'}, {...tab, id: 't6'}],
                },
            ]
        }
    };

    return (
        <DockLayout defaultLayout={box} groups={groups}
                    style={{position: 'absolute', left: 10, top: 10, right: 10, bottom: 10}}/>
    );
}

export default DockApp

