import Wrapper from "../assets/wrappers/Job"
import { Link } from "react-router-dom"
import { FaLocationArrow, FaBriefcase, FaCalendarAlt } from 'react-icons/fa';
import JobInfo from "./JobInfo";
import moment from "moment/moment";
import { useAllJobsContext } from "../Features/Job/AllJobsContext";
import { useJobContext } from "../Features/Job/JobContext";

const Job = ({ _id, position, company, jobLocation, jobType, createdAt, status }) => {


  const date = moment(createdAt).format('MMM Do, YYYY')
  const { deleteJob } = useAllJobsContext()
  const { setEditJob } = useJobContext()
  const jobInfo = { _id, position, company, jobLocation, jobType, createdAt, status }


  return (
    <Wrapper>
      <header>
        <div className="main-icon">
          {position.charAt(0)}
        </div>
        <div className="info">
          <h5>{position}</h5>
          <p>{company}</p>
        </div>
      </header>
      <div className="content">
        <div className="content-center">
          <JobInfo icon={<FaLocationArrow />} text={jobLocation} />
          <JobInfo icon={<FaCalendarAlt />} text={date} />
          <JobInfo icon={<FaBriefcase />} text={jobType} />
          <div className={`status ${status}`}>
            {status}
          </div>
        </div>
        <footer>
          <div className="actions">
            <Link
              to='/addJob'
              className="btn edit-btn"
              onClick={() => { setEditJob(jobInfo) }}>
              Edit
            </Link>
            <button
              type="button"
              className="btn delete-btn"
              onClick={() => { deleteJob(_id) }}>
              Delete
            </button>
          </div>
        </footer>
      </div>
    </Wrapper>
  )
}
export default Job