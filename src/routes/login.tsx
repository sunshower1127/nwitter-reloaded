import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { FirebaseError } from "firebase/app"
import { signInWithEmailAndPassword } from "firebase/auth"
import { auth } from "../components/firebase"
import { Wrapper, Title, Form, Input, Switcher, Error } from "../components/auth-components"



export default function Login() {
  const navigate = useNavigate()
  const [isLoading, setLoading] = useState(false)

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { target: {name, value} } = e
    if (name === "password") {
      setPassword(value)
    } else if (name === "email") {
      setEmail(value)
    }
  }
  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setError('')
    if (isLoading || email === "" || password === "") return
    try {
      setLoading(true)
      await signInWithEmailAndPassword(auth, email, password)
      navigate('/')
    } catch(e) {
      if (e instanceof FirebaseError) {
        setError(e.message)
      }
    } finally {
      setLoading(false)
    }
  }

  return <Wrapper>
    <Title>Log into X</Title>
    <Form onSubmit={onSubmit}>
      <Input onChange={onChange} name="email" value={email} placeholder="Email" type="email" required />
      <Input onChange={onChange} name="password" value={password} placeholder="Password" type="password" required />
      <Input onChange={onChange} type="submit" value={isLoading ? "Loading" : "Log in"} />
    </Form>
    { error !== "" ? <Error>{ error }</Error> : null }
    <Switcher>
      Don't have an account? <Link to="/create-account">Create one &rarr;</Link>
    </Switcher>
  </Wrapper>
}