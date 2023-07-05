import { FormRow } from "../../Components"
import Wrapper from "../../assets/wrappers/DashboardFormPage"
import { toast } from 'react-toastify'
import { useState } from "react"
import { useUserContext } from "../../Features/User/UserContext"

const Profile = () => {

  const { isLoading, user, updateUser } = useUserContext()
  const [userData, setUserData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    lastName: user?.lastName || '',
    location: user?.location || ''
  })



  const handleSubmit = (e) => {
    e.preventDefault()
    const { name, email, lastName, location } = userData
    if (!name || !email || !lastName || !location) {
      toast.error('Please fill out all fields')
      return
    }
    updateUser({ name, email, lastName, location })
  }
  const handleChange = (e) => {
    const name = e.target.name
    const value = e.target.value
    setUserData({
      ...userData, [name]: value
    })
  }

  return (
    <Wrapper>
      <h3>profile</h3>
      <div className="form-center">
        <FormRow
          type='text'
          name='name'
          value={userData.name}
          handleChange={handleChange} />
        <FormRow
          type='text'
          name='lastName'
          labelText='last name'
          value={userData.lastName}
          handleChange={handleChange} />
        <FormRow
          type='email'
          name='email'
          value={userData.email}
          handleChange={handleChange} />
        <FormRow
          type='text'
          name='location'
          value={userData.location}
          handleChange={handleChange} />
        <button
          type="subtmit"
          className="btn btn-block"
          disabled={isLoading}
          onClick={handleSubmit}>
          {isLoading ? 'Please Wait' : 'Save Changes'}
        </button>
      </div>
    </Wrapper>
  )
}
export default Profile