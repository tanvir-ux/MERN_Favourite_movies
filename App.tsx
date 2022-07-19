import * as React from 'react';
import './style.css';

export default function App() {
  const {useState} = React;
  const [counter, setCounter] = useState(0);

  const increase = () => {
    setCounter(counter + 1);
  }

  return (
    <div>
      <h1>Counter: {counter}</h1>
      <button onClick={increase}>Increase Counter</button>
    </div>
  );
}
