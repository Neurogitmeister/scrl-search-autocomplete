export interface User {
  id: string;
  name: string;
  username: string;
}

export interface UserAvatar {
  id: string;
  url: string;
  thumbnailUrl: string;
}

export interface UserWithAvatar extends User {
  avatar: UserAvatar
}