import styled from "styled-components"
import { auth, db, storage } from "../components/firebase"
import React, { useState } from "react"
import { getDownloadURL, ref, uploadBytes } from "firebase/storage"
import { updateProfile } from "firebase/auth"
import { collection, getDocs, limit, orderBy, query, where } from "firebase/firestore"
import { ITweet } from "../components/timeline"
import Tweet from "../components/tweet"

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
  width: 100%;
`

const AvatarInput = styled.input`
  display: none;
`

const Name = styled.span`
  font-size: 22px;
`

const Tweets = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  width: 100%;
`

export default function Profile() {
  const user = auth.currentUser
  const [avatar, setAvatar] = useState(user?.photoURL)
  const [tweets, setTweets] = useState<ITweet[]>([])

  const onAvatarChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const { files } = e.target
    if (!user) return
    if (files && files.length === 1) {
      const file = files[0]
      const locationRef = ref(storage, `avatars/${user.uid}`)
      const result = await uploadBytes(locationRef, file)
      const avatarUrl = await getDownloadURL(result.ref)
      await updateProfile(user, { photoURL: avatarUrl })
      setAvatar(user.photoURL)
    }
  }

  const fetchTweets = async () => {
    // 복잡한 query 사용시 실행이 안되는 문제 -> 개발자도구 콘솔 들어가서 에러 링크를 시크릿모드로 들어가면 인덱스가 추가되고 해결됨. 
    const tweetQuery = query(collection(db, 'tweets'), where('userId', '==', user?.uid), orderBy('createdAt', 'desc'), limit(25))
    const snapshot = await getDocs(tweetQuery)
    const tweets = snapshot.docs.map(doc => {
      const {tweet, createdAt, userId, username, photo} = doc.data()
      return {tweet, createdAt, userId, username, photo, id: doc.id}
    })
    setTweets(tweets)
  }

  fetchTweets()

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
      <AvatarInput onChange={onAvatarChange} id='avatar' type='file' accept='image/*' />
      <Name>
        {user?.displayName ?? "Anonymous"}
      </Name>
      <Tweets>
          {tweets.map(tweet => <Tweet key={tweet.id} {...tweet}></Tweet>)}
      </Tweets>
    </Wrapper>
  )
}