import React from 'react'
import type {RootState} from './redux/store'
import {useSelector, useDispatch} from 'react-redux'
import {decrement, increment} from './redux/CounterSlice'

const Counter = () => {
    const count = useSelector((state: RootState) => state.counter.value)
    const dispatch = useDispatch()

    const clickInc = (e: any) => {
        e.stopPropagation();
        e.preventDefault()
        console.log('hi')
    }

    return (
        <div onMouseDown={(e) => e.stopPropagation()}>
            <div>

                <button
                    aria-label="Increment value"
                    onClick={() => dispatch(increment())}
                >
                    Increment
                </button>
                <span>{count}</span>
                <button
                    aria-label="Decrement value"
                    onClick={() => dispatch(decrement())}
                >
                    Decrement
                </button>
            </div>
        </div>
    );
}

export default Counter;