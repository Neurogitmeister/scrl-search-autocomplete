import React from 'react'
import { UserWithAvatar } from './utils'
import styled from 'styled-components';


export default (props: UserWithAvatar & {onClick: (id: string) => void}) => {
  return(
    <Styles onClick={() => props.onClick(props.id)} className="container">
      <img src={props.avatar.thumbnailUrl} alt={`${props.name}`} />
      <div>
        <span className="name">{props.name}</span>
        <span className="username">{"@" + props.username}</span>
      </div>
    </Styles>
  )
}

const Styles = styled.div`
  display: flex;
  align-items: center;
  cursor: pointer;
  padding-top: 8px;
  padding-bottom: 8px;
  &:hover {
    background: #eee;
  }
  &:focus {
    background: inherit;
  }
  img {
    height: 60px;
    width: 60px;
    margin-right: 16px;
    border-radius: 50%;
  }
  > div {
    display: flex;
    flex-direction: column;
    align-items: flex-start;

    .username {
      color: #999;
      font-size: calc(8px + 2vmin);
    }
  }
`