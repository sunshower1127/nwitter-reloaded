import { collection, getDocs, limit, orderBy, query } from "firebase/firestore";
import { useState } from "react";
import styled from "styled-components";
import { db } from "./firebase";
import Tweet from "./tweet";

export interface ITweet {
  id: string;
  photo?: string;
  tweet: string;
  userId: string;
  username: string;
  createdAt: number;
}

const Wrapper = styled.div`
  display: flex;
  gap: 10px;
  flex-direction: column;
`
// interface ITimeline {
//   toggle: boolean;
// }
// 

export default function Timeline() {
  const [tweets, setTweet] = useState<ITweet[]>([])

  const fetchTweets = async () => {
    const tweetsQuery = query(
      collection(db, 'tweets'),
      orderBy('createdAt', 'desc'),
      limit(25)
    )

    const snapshot = await getDocs(tweetsQuery)
    const tweets = snapshot.docs.map(doc => {
      const { tweet, createdAt, userId, username, photo } = doc.data()
      return { tweet, createdAt, userId, username, photo, id: doc.id }
    })
    setTweet(tweets)
  }

  fetchTweets()


  return (
    <Wrapper>
      {tweets.map(tweet => (
        <Tweet key={tweet.id} {...tweet}></Tweet>
      ))}
    </Wrapper>
  )
}