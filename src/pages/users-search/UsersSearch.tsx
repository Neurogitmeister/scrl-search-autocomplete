import React, {useState, useEffect} from 'react'
import styled from 'styled-components';

import searchIcon from '../../assets/magnifying-glass-search.svg';

import { GradientSpinner } from '../../components/spinner'
import { User, UserAvatar, UserWithAvatar } from './utils';
import UserTile from './User';

const usersApiUri = "https://jsonplaceholder.typicode.com/users"
const userAvatarsApiUri = "https://jsonplaceholder.typicode.com/photos"

export default () => { 

  const [loading, setIsLoading] = useState(true);
  const [users, setUsers] = useState<UserWithAvatar[]>([]);

  const [filteredUsers, setFilteredUsers] = useState<UserWithAvatar[]>([]);
  const [searchStr, setSearchStr] = useState('');

  useEffect(() => {
    fetch(usersApiUri).then(res => {
      res.json().then((usersData: User[]) => {
        fetch(userAvatarsApiUri).then(res => {
          res.json().then((avatarsData: UserAvatar[]) => {
            setTimeout(() => {
              setUsers(usersData.map((user, i) => ({...user, avatar: avatarsData[i] })));
              setIsLoading(false);
            }, 3000);
          });
        });
      });
    });
  }, []);

  useEffect(() => {
    searchStr.length ? setFilteredUsers(users.filter(user => user.name.toLowerCase().search(searchStr.toLowerCase()) !== -1) ?? []) : setFilteredUsers(users);
  }, [searchStr, users])

  return(
    <Styles>
      <div className="container input-block">
        <div className="image-container">
          <img src={searchIcon} alt="Magnifying glass"/>
        </div>
        <input 
          onChange={it => setSearchStr(it.currentTarget.value)} 
          value={searchStr}
          placeholder="Search"
        />
      </div>
    
      <div className="users-list">
        {loading && <div className="spinner-overlay"> <GradientSpinner /> </div>}
        {!loading && <>
          {filteredUsers.map((user) => 
            <UserTile 
              key={user.id} 
              {...user}  
              onClick={setSearchStr}
            />
            )}
        </>}
      </div>

    </Styles>
  )
}

const Styles = styled.div`
  min-height: 100vh;
  height: 100%;
  display: flex;
  flex-direction: column;
  .input-block {
    background: #eee;
    display: flex;
    align-items: center;
    height: 70px;
    border-bottom: 1px solid black;
    img {
      height: 26px;
      display: block;
    }
    .image-container {
      width: 50px;
      height: 26px;
    }
    input {
      outline: none;
      border: none;
      background: transparent;
      width: calc(100% - 80px);
      &::placeholder {
        color: #bbb;
      }
    }
  }
  .users-list {
    flex-grow:1;
    height: 100%;
    padding-top: 20px;
    padding-bottom: 20px;
    position: relative;
    .spinner-overlay {
      display: flex;
      align-items: center;
      justify-content: center;

      position: absolute;
      top: 0;
      left: 0;
      height: 100%;
      width: 100%;
    }
    > * {
      margin-bottom: 6px;
      &:last-child {
        margin-bottom: 0;
      }
    }
  }

`
