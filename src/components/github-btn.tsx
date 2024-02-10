import { GithubAuthProvider, signInWithPopup } from "firebase/auth"
import { styled } from "styled-components"
import { auth } from "./firebase"
import { useNavigate } from "react-router-dom"

const Button = styled.span`
  margin-top: 50px;
  background-color: white;
  font-weight: 500;
  width: 100%;
  color: black;
  padding: 10px 20px;
  border-radius: 50px;
  border: 0;
  display: flex;
  gap: 5px;
  align-items: center;
  justify-content: center;
  cursor: pointer;
`

const Logo = styled.img`
  height: 25px;
`

export default function GithubButton() {
  const navigate = useNavigate()
  const onClick = async() => {
    try {
      /* Github Auth 세팅
       * 1. Firebase Auth에 새 제공업체 추가 -> Github
       * 2. 클라이언트 ID, 보안 비밀번호를 입력해야하는데, 이건 github에서 생성해야함
       * 3. github - Settings - Developer Settings - New OAuth Application
       * 4. Application name, Homepage URL, Application description은 형식적인거라 대충 쓰면됨.
       * 5. 콜백 링크만 firebase에서 복사해서 넣어주면 ID, 보안 비밀번호 나오는데 그거 firebase에 넣으면 끝.
       */
      const provider = new GithubAuthProvider()
      await signInWithPopup(auth, provider)
      navigate('/')
    } catch(e) {
      console.log(e);
    }
  }
  return (
    <Button onClick={() => onClick()}>
      <Logo src="/github-mark.svg" />
      Continue with Github
    </Button>
  )
}