import styled from "styled-components"
import { auth } from "../components/firebase"
import { useState } from "react"

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  gap: 20px;

`

const AvatarUpload = styled.label`
  width: 80px;
  overflow: hidden;
  height: 80px;
  border-radius: 50%;
  background-color: #1d9bf0;
  cursor: pointer;
  display: flex;
  align-items : center;
  justify-content: center;

  svg {
    width: 50px;
  }
`

const AvatarImg = styled.img`
  width: 100%
`

const AvatarInput = styled.input`
  display: none;

`

const Name = styled.span`
  font-size: 22px;
`

export default function Profile() {
  const user = auth.currentUser
  const [avatar, setAvatar] = useState(user?.photoURL)
  return (
    <Wrapper>
      <AvatarUpload htmlFor="avatar">
        {avatar ? (
          <AvatarImg src={avatar}></AvatarImg>
        ) : (
          <svg fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
            <path clipRule="evenodd" fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" />
          </svg>
        )}
      </AvatarUpload>
      <AvatarInput id='avatar' type='file' accept='image/*'></AvatarInput>
      <Name>
        {user?.displayName ?? "Anonymous"}
      </Name>
    </Wrapper>)
}