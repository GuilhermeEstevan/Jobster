import { useEffect } from "react"
import Wrapper from "../assets/wrappers/JobsContainer"
import { useAllJobsContext } from "../Features/Job/AllJobsContext"
import Job from "./Job"
import Loading from "./Loading"
import PageBtnContainer from "./PageBtnContainer"


const JobsContainer = () => {

  const { allJobs, isLoading, getAllJobs } = useAllJobsContext()
  const { jobs, page, totalJobs, numOfPages, search, searchStatus, searchType, sort } = allJobs

  useEffect(() => {
    getAllJobs()
  }, [page, search, searchStatus, searchType, sort])

  if (isLoading) {
    return (
      <Loading center />
    )
  }
  if (jobs.length === 0) {
    return (
      <Wrapper>
        <h2>No jobs to display...</h2>
      </Wrapper>
    )
  }

  const startJob = (page - 1) * 10 + 1
  const endJob = Math.min(page * 10, totalJobs)

  return (
    <Wrapper>
      <h5>{startJob} - {endJob} of {totalJobs} job{jobs.length > 1 && 's'} found</h5>
      <div className="jobs">
        {jobs.map((job) => {

          return <Job key={job._id} {...job} />
        })}
      </div>
      {numOfPages > 1 && <PageBtnContainer />}
    </Wrapper>
  )
}
export default JobsContainer