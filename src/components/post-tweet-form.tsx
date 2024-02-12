import { addDoc, collection } from "firebase/firestore"
import { useState } from "react"
import styled from "styled-components"
import { auth, db } from "./firebase"

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 10px;

`

const TextArea = styled.textarea`
  border: 2px solid white;
  padding: 20px;
  border-radius: 20px;
  font-size: 16px;
  color: white;
  background-color: black;
  width: 100%;
  resize: none;
  font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
  &::placeholder {
    font-size: 16px;
  }
  &:focus {
    outline: none;
    border-color: #1d9bf0;
  }
`

const AttachFileButton = styled.label`
  padding: 10px 0px;
  color: #1d9bf0;
  text-align: center;
  border-radius : 20px;
  border: 1px solid #1d9bf0;
  font-size: 14px;
  font-weight: 600;
`

const AttachFileInput = styled.input`
  display: none;
`

const SubmitBtn = styled.input`
  background-color: #1d9bf0;
  color: white;
  border: none;
  padding: 10px 0px;
  border-radius: 20px;
  font-size: 16px;
  cursor: pointer;
  &:hover, &:active {
    opacity: 0.9;
  }
`

export default function PostTweetForm() {

  const [isLoading, setLoading] = useState(false)
  const [tweet, setTweet] = useState("")
  const [file, setFile] = useState<File | null>(null)

  const onChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setTweet(e.target.value)
  }

  const onFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const {files} = e.target
    if (files && files.length === 1) {
      setFile(files[0])
    }
  }

  /* Firebase에서 Firestore을 시작해야함.
   * 그리고 tweets라는 collection(폴더)를 만들어야하고,
   * Testmode로 해야함 -> 접근권한을 30일동안 모두 허용
   * js에서는 구조체에 그냥 tweet만 쓰면 -> tweet: tweet 과 같은 뜻임
   */
  const onSubmit = async(e: React.ChangeEvent<HTMLFormElement>) => {
    e.preventDefault()
    const user = auth.currentUser
    if (!user || isLoading || tweet == "" || tweet.length > 180) return
    try {
      setLoading(true)
      await addDoc(collection(db, "tweets"), {
        tweet,
        createdAt: Date.now(),
        username: user.displayName || "Anonymous",
        userId: user.uid
      })
    } catch(e) {
      console.log(e);
    } finally {
      setLoading(false)
    }
  }
  return (
    <Form onSubmit={onSubmit}>
      <TextArea
        value={tweet}
        onChange={onChange}
        placeholder="Type right here"
        rows={5}
        maxLength={180}
      ></TextArea>
      <AttachFileButton htmlFor="file-submit">
        {file? "Photo added V" : "Add photo"}
      </AttachFileButton>
      <AttachFileInput
        id="file-submit"
        type="file"
        accept="image/*"
        onChange={onFileChange}
      ></AttachFileInput>
      <SubmitBtn type="submit" value={isLoading? "Posting..." : "Post Tweet"}></SubmitBtn>
    </Form>
  )
}