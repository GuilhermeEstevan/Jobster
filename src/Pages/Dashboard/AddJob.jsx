import { useEffect } from "react"
import { FormRow, FormRowSelect } from "../../Components"
import { useJobContext } from "../../Features/Job/JobContext"
import { useUserContext } from "../../Features/User/UserContext"
import Wrapper from "../../assets/wrappers/DashboardFormPage"
import { toast } from 'react-toastify'

const AddJob = () => {

  const { job, setJob, clearJob, createJob, isLoading, isEditing, editJob } = useJobContext()
  const { user } = useUserContext()
  const {
    position,
    company,
    jobLocation,
    jobTypeOptions,
    jobType,
    statusOptions,
    status,
    editJobId
  } = job

  const handleSubmit = (e) => {
    e.preventDefault()

    if (!position || !company || !jobLocation) {
      toast.error("Please fill out all fields")
      return
    }
    if (isEditing) {
      editJob({
        position,
        company,
        jobLocation,
        jobType,
        status,
        editJobId
      })
      return
    }

    createJob({
      position,
      company,
      jobLocation,
      jobType,
      status
    })
  }

  const handleJobInput = (e) => {
    const name = e.target.name
    const value = e.target.value
    setJob({
      ...job, [name]: value
    })
  }


  useEffect(() => {
    if (!isEditing) {
      setJob({
        ...job, jobLocation: user.location
      })
    }
  }, [isEditing])




  return (
    <Wrapper>
      <form className="form">
        <h3>{isEditing ? 'edit job' : 'add job'}</h3>
        <div className="form-center">
          <FormRow
            type='text'
            name='position'
            value={position}
            handleChange={handleJobInput} />

          <FormRow
            type='text'
            name='company'
            value={company}
            handleChange={handleJobInput} />

          <FormRow
            type='text'
            name='jobLocation'
            labelText='Job Location'
            value={jobLocation}
            handleChange={handleJobInput} />

          <FormRowSelect
            name='status'
            value={status}
            handleChange={handleJobInput}
            list={statusOptions} />

          <FormRowSelect
            name='jobType'
            labelText='Job Type'
            value={jobType}
            handleChange={handleJobInput}
            list={jobTypeOptions} />

          <div className="btn-container">
            <button
              type="button"
              className="btn btn-block clear-btn"
              onClick={clearJob}>
              Clear
            </button>
            <button
              type="submit"
              className="btn btn-block submit-btn"
              onClick={handleSubmit}
              disabled={isLoading}>
              submit
            </button>
          </div>
        </div>
      </form>
    </Wrapper>
  )
}
export default AddJob