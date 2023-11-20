import React from 'react'

const CounterNoRedux = () => {

    const inc = () => {
        console.log('hi')
    }

    return (
        <div onMouseDown={(e) => e.stopPropagation()}>
            <div>

                <button
                    aria-label="Increment value"
                    onClick={() => inc()}
                >
                    Increment
                </button>
                <span>{1}</span>
                <button
                    aria-label="Decrement value"
                    onClick={() => inc()}
                >
                    Decrement
                </button>
            </div>
        </div>
    );
}

export default CounterNoRedux;