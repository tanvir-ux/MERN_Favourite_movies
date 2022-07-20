import * as React from 'react';
import axios from "axios";
import './style.css';




export default function App() {
  const {useState, useEffect} = React;
  const [counter, setCounter] = useState(0);
  const [randomUserDataJSON, setRandomUserDataJSON] = useState('');

 

  const increase = () => {
    setCounter(counter + 1);
  }

  const url = 'https://randomuser.me/api/';

  const fetchRandomData = () => {
    return axios
    .get(url)
    .then(({data}) => {
      // handle success
      console.log(data);
      return JSON.stringify(data, null, 2);
    })
    .catch( (error) => {
      // handle error
      console.error(error);
    })
  }

  useEffect(() => {
    fetchRandomData().then(response => {
      setRandomUserDataJSON(response || 'Nothing found ');
      
    })
  }, [])

  return (
    <div>
      <h1>Counter: {counter}</h1>
      <button onClick={increase}>Increase Counter</button><br/>
      <button onClick={fetchRandomData}>Fetch Random Data</button>
      <pre>
        {randomUserDataJSON}
      </pre>
      <p>{randomUserDataJSON} </p>
    </div>
  );
}
