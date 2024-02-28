import styled from "styled-components";
import PostTweetForm from "../components/post-tweet-form";
import Timeline from "../components/timeline";
import { useState } from "react";

const Wrapper = styled.div`
  display: grid;
  gap:50px;
  overflow-y: scroll;
  grid-template-rows: 1fr 5fr;
  ::-webkit-scrollbar {
    display: none;
  }
  -ms-overflow-style: none;
  scrollbar-width: none;
`


export default function Home() {
  const [counter, setCounter] = useState(0)
  const onRefresh = () => {
    setCounter(cur => cur+1)
    console.log(counter)
    
  }
  return (
    <Wrapper>
      <PostTweetForm refresh={onRefresh}></PostTweetForm>
      <Timeline></Timeline>
    </Wrapper>
  )
}