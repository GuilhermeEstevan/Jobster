import { useEffect, useState } from "react"
import { Logo, FormRow } from "../Components"
import Wrapper from "../assets/wrappers/RegisterPage"
import { toast } from 'react-toastify'
import { useUserContext } from "../Features/User/UserContext"
import { useNavigate } from "react-router-dom"

const Register = () => {

  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [isMember, setIsMember] = useState(true)
  const { isLoading, user, loginUser, registerUser } = useUserContext()
  const navigate = useNavigate()

  const handleName = (e) => {
    setName(e.target.value)
  }
  const handleEmail = (e) => {
    setEmail(e.target.value)
  }
  const handlePassword = (e) => {
    setPassword(e.target.value)
  }
  const toggleMember = () => {
    setIsMember(!isMember)
  }

  // Submit
  const handleSubmit = (e) => {
    e.preventDefault()
    if (!email || !password || (!isMember && !name)) {
      toast.error('Please fill out all fields')
      return
    }
    if (isMember) {
      loginUser({ email, password })
      return
    }
    registerUser({ name, email, password })
  }

  useEffect(() => {
    if (user) {
      setTimeout(() => {
        navigate('/')
      }, 2000);
    }
  }, [user])


  return (
    <Wrapper className="full-page">
      <form className="form" onSubmit={handleSubmit}>
        <Logo />
        <h3>{isMember ? 'Login' : 'Register'}</h3>
        {/* NAME FIELD */}
        {!isMember && (<FormRow
          type='text'
          name='name'
          value={name}
          handleChange={handleName} />)}
        {/* EMAIL FIELD */}
        <FormRow
          type='email'
          name='email'
          value={email}
          handleChange={handleEmail} />
        {/* PaSSWORD FIELD */}
        <FormRow
          type='password'
          name='password'
          value={password}
          handleChange={handlePassword} />
        <button
          type="submit"
          className="btn btn-block"
          disabled={isLoading}>
          {isLoading ? 'Loading...' : 'Submit'}
        </button>
        <p>
          {isMember ? 'Not a member yet?' : 'Already a member?'}
          <button
            type="button"
            onClick={toggleMember}
            className="member-btn">
            {isMember ? 'Register' : 'Login'}
          </button>
        </p>
      </form>
    </Wrapper>
  )
}
export default Register