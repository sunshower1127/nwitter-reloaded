import { useState } from "react"
import styled from "styled-components"

const Wrapper = styled.div`

`

const Title = styled.h1`
  
`

const Form = styled.form`
  
`

const Input = styled.input`
  
`

export default function CreateAccount() {
  const [isLoading, setLoading] = useState(false)
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { target: {name, value} } = e
    if (name === "name") {
      setName(value)
    } else if (name === "password") {
      setPassword(value)
    } else if (name === "email") {
      setEmail(value)
    }
  }
  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    console.log(name, email, password);
    try {

    } catch(e) {

    } finally {
      setLoading(false)
    }
  }

  return <Wrapper>
    <Title>Log into X</Title>
    <Form onSubmit={onSubmit}>
      <Input onChange={onChange} name="name" value={name} placeholder="Name" type="text" required />
      <Input onChange={onChange} name="email" value={email} placeholder="Email" type="email" required />
      <Input onChange={onChange} name="password" value={password} placeholder="Password" type="password" required />
      <Input onChange={onChange} type="submit" value={isLoading ? "Loading" : "Create Account"} />
    </Form>
  </Wrapper>
}