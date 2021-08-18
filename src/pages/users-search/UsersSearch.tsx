import React, {useState, useCallback, useRef} from 'react';
import styled from 'styled-components';

import searchIcon from '../../assets/magnifying-glass-search.svg';

import { GradientSpinner } from '../../components/spinner';
import { User, UserAvatar, UserWithAvatar } from './utils';
import UserTile from './User';

const usersApiUri = "https://jsonplaceholder.typicode.com/users";
const userAvatarsApiUri = "https://jsonplaceholder.typicode.com/photos";

const fetchUsersWithAvatarsByName = async (name: string) => {
  const res = await fetch(usersApiUri + "/?name_like=" + name);
  const usersData: User[] = await res.json();
  const usersWithAvatars: UserWithAvatar[] = [];
  for (let user of usersData) {             
    const res = await fetch(userAvatarsApiUri + "/" + user.id);
    const avatar: UserAvatar = await res.json();  
    usersWithAvatars.push({...user, avatar});
  }
  return usersWithAvatars;
}

export default () => { 

  const [loading, setIsLoading] = useState<boolean>();
  const [users, setUsers] = useState<UserWithAvatar[]>([]);

  const [searchStr, setSearchStr] = useState('');
  const lastRequest = useRef('');

  const [selectedUser, setSelectedUser] = useState<UserWithAvatar>();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const name = e.currentTarget.value;
    setSelectedUser(undefined);
    setSearchStr(name);
    setIsLoading(true);
    lastRequest.current = name;
    fetchUsersWithAvatarsByName(name).then(usersWithAvatars => {
      if (lastRequest.current === name) {
        setIsLoading(false);
        setUsers(usersWithAvatars);
      }
    });
  }

  const getUserById = useCallback((id: string) => {
    setSelectedUser(users.find(user => user.id === id));
  } , [users]);

  return(
    <Styles>
      <div className="container input-block">
        <div className="image-container">
          <img src={searchIcon} alt="Magnifying glass"/>
        </div>
        <input 
          onChange={handleInputChange}
          value={selectedUser?.name ?? searchStr}
          placeholder="Search"
        />
      </div>
    
      <div className="users-list">
        {loading && <div className="spinner-overlay"> <GradientSpinner /> </div>}
        {!loading && !selectedUser && <>
          {users.map((user) => 
            <UserTile 
              key={user.id} 
              {...user}  
              onClick={getUserById}
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
