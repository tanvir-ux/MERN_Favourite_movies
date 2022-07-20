import * as React from 'react';
import axios from "axios";
import './style.css';




export default function App() {
  const {useState, useEffect} = React;
  const [counter, setCounter] = useState(1);
  const [randomUserDataJSON, setRandomUserDataJSON] = useState('');
  const [userInfos, setUserInfos] = useState<any>([]);
  const [nextPageNumber, setNextPageNumber] = useState(1);

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

  const url = 'https://randomuser.me/api';

  const fetchRandomData = (nextPageNumber) => {
    return axios
    .get(`${url}?page=${nextPageNumber}`)
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

  const fetchNextUser = () => {
    fetchRandomData(nextPageNumber).then(response => {
      setRandomUserDataJSON(JSON.stringify(response, null, 2) || 'Nothing found ');
      if(response === undefined) return;
      const newUserInfos = [
        ...userInfos,
        ...response.results,
      ]
      setCounter(newUserInfos.length);
      setUserInfos(newUserInfos.reverse());
      setNextPageNumber(response.info.page + 1);
      
    });
  }

  useEffect(() => {
    fetchNextUser();
  }, [])

  return (
    <div>
      <h1>Total Users: {counter}</h1>
      
      <button onClick={fetchNextUser}>Fetch Next User</button>

      {
        userInfos.map((userInfo: UserInfo, idx: number) => (
          <div key = {idx}>
            <p> {getFullUserName(userInfo)} </p>
            <img src={userInfo.picture.thumbnail}/>
          </div>
        ))
      }

      
    </div>
  );
}
