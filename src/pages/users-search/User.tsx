import React from 'react'
import { UserWithAvatar } from './utils'
import styled from 'styled-components';


export default (props: UserWithAvatar & {onClick: (name: string) => void}) => {
  return(
    <Styles onClick={() => props.onClick(props.name)}>
      <img src={props.avatar.thumbnailUrl} alt={`${props.name}`} />
      <div>
        <span className="name">{props.name}</span>
        <span className="username">{"@" + props.username}</span>
      </div>
    </Styles>
  )
}

const Styles = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  cursor: pointer;
  img {
    height: 80px;
    width: 80px;
    margin-right: 20px;
    border-radius: 50%;
  }
  > div {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    .name {
      margin-bottom: 10px;
      font-weight: 600;
    }
    .username {
      color: #999;
    }
  }
`