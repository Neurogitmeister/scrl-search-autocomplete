import React, {useState, useEffect} from 'react'
import styled from 'styled-components';

import { GradientSpinner } from '../../components/spinner'
import { User, UserAvatar, UserWithAvatar } from './utils';
import UserTile from './User';

const usersApiUri = "https://jsonplaceholder.typicode.com/users"
const userAvatarsApiUri = "https://jsonplaceholder.typicode.com/photos"

export default () => { 

  const [loading, setIsLoading] = useState(true);
  const [users, setUsers] = useState<UserWithAvatar[]>();

  // const [filteredUsers, setFilteredUsers] = useState([]);
  // const [searchStr, setSearchStr] = useState('');

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

  return(
    <Styles>
      <div className="users-list">
        {loading && <div className="spinner-overlay"> <GradientSpinner /> </div>}
        {!loading && <> 
          {users?.map((user) => <UserTile {...user} key={user.id} />)}
        </>}
      </div>
    </Styles>
  )
}

const Styles = styled.div`
  min-height: 100vh;
  height: 100%;
  padding: 0 50px;
  display: flex;
  flex-direction: column;
  .users-list {
    flex-grow:1;
    height: 100%;
    padding: 20px 0;
    position: relative;
    .spinner-overlay {
      display: flex;
      align-items: center;
      justify-content: center;

      position: absolute;
      height: calc(100% - 40px);
      width: 100%;
    }
    > * {
      margin-bottom: 20px;
      &:last-child {
        margin-bottom: 0;
      }
    }
  }

`
