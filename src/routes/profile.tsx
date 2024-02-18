import styled from "styled-components"
import { auth, storage } from "../components/firebase"
import React, { useState } from "react"
import { getDownloadURL, ref, uploadBytes } from "firebase/storage"
import { updateProfile } from "firebase/auth"

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
  const onAvatarChange = async (e:React.ChangeEvent<HTMLInputElement>) => {
    const {files} = e.target
    if (!user) return
    if (files && files.length === 1) {
      const file = files[0]
      const locationRef = ref(storage, `avatars/${user.uid}`)
      const result = await uploadBytes(locationRef, file)
      const avatarUrl = await getDownloadURL(result.ref)
      await updateProfile(user, { photoURL: avatarUrl })
    }
  }
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
      <AvatarInput onChange={onAvatarChange} id='avatar' type='file' accept='image/*'></AvatarInput>
      <Name>
        {user?.displayName ?? "Anonymous"}
      </Name>
    </Wrapper>)
}