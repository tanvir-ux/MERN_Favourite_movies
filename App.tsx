import * as React from 'react';
import axios from "axios";
import './style.css';




export default function App() {
  const {useState, useEffect} = React;
  const [counter, setCounter] = useState(0);
  const [randomUserDataJSON, setRandomUserDataJSON] = useState('');
  const [userInfos, setUserInfos] = useState<any>([]);

  interface UserName {
    first: string;
    last: string;
    title: string;
  }

  interface UserPicture {
    thumbnail: string;
  }

  interface UserInfo {
    name: UserName;
    picture: UserPicture;
  }


 

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
      return data;
    })
    .catch( (error) => {
      // handle error
      console.error(error);
    })
  }

  const getFullUserName = (userInfo: UserInfo) => {
    const {name: {first, last, title}} = userInfo;
    return `${title} ${first} ${last}`;
  }

  useEffect(() => {
    fetchRandomData().then(response => {
      setRandomUserDataJSON(JSON.stringify(response, null, 2) || 'Nothing found ');
      setUserInfos(response.results)
      
    })
  }, [])

  return (
    <div>
      <h1>Counter: {counter}</h1>
      <button onClick={increase}>Increase Counter</button><br/>
      <button onClick={fetchRandomData}>Fetch Random Data</button>
      {
        userInfos.map((userInfo: UserInfo, idx: number) => (
          <div key = {idx}>
            <p> {getFullUserName(userInfo)} </p>
            <img src={userInfo.picture.thumbnail}/>
          </div>
        ))
      }

      <pre>
        {randomUserDataJSON}
      </pre>
      <p>{randomUserDataJSON} </p>
    </div>
  );
}
