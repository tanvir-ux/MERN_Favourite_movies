import * as React from 'react';
import axios from "axios";
import './style.css';




export default function App() {
  const {useState} = React;
  const [counter, setCounter] = useState(0);

  const increase = () => {
    setCounter(counter + 1);
  }

  const url = 'https://randomuser.me/api/';

  const fetchRandomData = () => {
    axios.get(url)
    .then((res) => {
      // handle success
      console.log(res);
      return res;
    })
    .catch( (error) => {
      // handle error
      console.error(error);
    })
  }

  return (
    <div>
      <h1>Counter: {counter}</h1>
      <button onClick={increase}>Increase Counter</button><br/>
      <button onClick={fetchRandomData}>Fetch Random Data</button>
    </div>
  );
}
