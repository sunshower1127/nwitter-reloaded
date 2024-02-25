import styled from "styled-components";
import { ITweet } from "./timeline";
import { auth, db, storage } from "./firebase";
import { deleteDoc, doc } from "firebase/firestore";
import { deleteObject, getDownloadURL, ref } from "firebase/storage";
import { useEffect, useState } from "react";

const Wrapper = styled.div`
  display: grid;
  grid-template-columns: 3fr 1fr;
  padding: 20px;
  margin: 10px 0;
  border: 1px solid rgba(255, 255, 255, 0.5);
  border-radius: 15px;
`

const User = styled.div`
  display:flex;
  gap: 6px;
  align-items : center;
`

const UserAvatar = styled.span`
  width:20px;
  height: 20px;
  overflow: hidden;
  border-radius: 50%;
  background-color: #1d9bf0;
  display: flex;
  align-items: center;
  justify-content: center;
  svg {
    width: 14px;
  }
`

const UserAvatarImg = styled.img`
  width: 100%;
`

const Column = styled.div`
  
`

const Photo = styled.img`
  width: 100px;
  height: 100px;
  border-radius: 15px;
`

const Username = styled.span`
  font-weight: 600;
  font-size: 16px;

`

const Payload = styled.p`
  margin: 10px 0px;
  font-size: 16px;
`

const DeleteButton = styled.button`
  background-color: tomato;
  color: white;
  font-weight: 600;
  border: 0;
  font-size: 12px;
  padding: 5px 10px;
  text-transform: uppercase;
  border-radius: 5px;
  cursor: pointer;
`

export default function Tweet({ username, photo, tweet, userId, id }: ITweet) {
  const [avatar, setAvatar] = useState<string | null>(null)
  const onDelete = async () => {
    const ok = confirm('Are you sure you want to delete this tweet?')
    if (!ok || auth.currentUser?.uid !== userId) return
    try {
      await deleteDoc(doc(db, 'tweets', id))
      if (photo) {
        const photoRef = ref(storage, `tweets/${userId}/${id}`)
        await deleteObject(photoRef)
      }
    } catch (error) {
      console.log(error)
    } finally {

    }
  }

  useEffect(() => {
    const getAvatar = async () => {
      try {
        const locationRef = ref(storage, `avatars/${userId}`)
        const avatarUrl = await getDownloadURL(locationRef)
        setAvatar(avatarUrl)
      } catch(error) {
      }
    }
    getAvatar()
  }, [])
  
  return (
    <Wrapper>
      <Column>
        <User>
          <UserAvatar>
            {avatar ? (
              <UserAvatarImg src={avatar}></UserAvatarImg>
            ) : (
              <svg fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                <path clipRule="evenodd" fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" />
              </svg>
            )}
          </UserAvatar>
          <Username>{username}</Username>
        </User>
        <Payload>{tweet}</Payload>
        {auth.currentUser?.uid === userId ? <DeleteButton onClick={onDelete}>Delete</DeleteButton> : null}
      </Column>
      <Column>
        {photo ? (<Photo src={photo}></Photo>) : null}
      </Column>
    </Wrapper>
  )
}