import { useState } from 'react';
import './Counter.css';

/**
 * Exercise 3: Counter Functional Component
 * Implements state management using useState hook.
 */
const Counter = () => {
    // Initialize state with default value 0
    const [count, setCount] = useState(0);

    // Handler for incrementing the counter
    const handleIncrement = () => {
        // Use state updater function for safe state updates
        setCount(prevCount => prevCount + 1);
    };

    // Handler for decrementing the counter
    const handleDecrement = () => {
        // Use state updater function for safe state updates
        setCount(prevCount => prevCount - 1);
    };

    return (
        <div className="counter-container">
            <span className="counter-title">Current Count</span>
            <h1 className="counter-display">{count}</h1>
            <div className="button-group">
                <button 
                    className="counter-button decrement" 
                    onClick={handleDecrement}
                    aria-label="Decrease count"
                >
                    —
                </button>
                <button 
                    className="counter-button increment" 
                    onClick={handleIncrement}
                    aria-label="Increase count"
                >
                    +
                </button>
            </div>
        </div>
    );
};

export default Counter;
