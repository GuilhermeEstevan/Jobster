import { toast } from 'react-toastify'
import customFetch from '../../Utils/Axios';
import { useUserContext } from '../User/UserContext';
import { createContext, useContext, useState } from 'react';

const JobContext = createContext()

export const JobProvider = ({ children }) => {

    const { user, logoutUser } = useUserContext()
    const [isLoading, setIsLoading] = useState(false)
    const [isEditing, setIsEditing] = useState(false)
    const [job, setJob] = useState({
        position: '',
        company: '',
        jobLocation: '',
        jobTypeOptions: ['full-time', 'part-time', 'remote', 'internship'],
        jobType: 'full-time',
        statusOptions: ['interview', 'declined', 'pending'],
        status: 'pending',
        editJobId: ''
    })


    const createJob = async (newJob) => {
        try {
            setIsLoading(true)
            const response = await customFetch.post('/jobs', newJob, {
                headers: {
                    Authorization: `Bearer ${user.token}`
                }
            })
            console.log(response);
            console.log(response.data.job);
            toast.success("Job Created")
            clearJob()
            setIsLoading(false)
        } catch (error) {
            if (error.response.status === 401) {
                toast.error('Unauthorized! Logging Out...')
                logoutUser()
                return
            }
            toast.error(error.response.data.msg)
            setIsLoading(false)
        }

    }

    const clearJob = () => {
        setJob({
            position: '',
            company: '',
            jobLocation: user.location,
            jobTypeOptions: ['full-time', 'part-time', 'remote', 'internship'],
            jobType: 'full-time',
            statusOptions: ['interview', 'declined', 'pending'],
            status: 'pending',
            editJobId: ''
        })
        setIsEditing(false)
    }


    const setEditJob = (jobInfo) => {
        const { _id, position, company, jobLocation, jobType, status } = jobInfo
        setIsEditing(true)
        setJob({
            ...job,
            editJobId: _id,
            position: position,
            company: company,
            jobLocation: jobLocation,
            jobType: jobType,
            status: status
        })
    }

    const editJob = async (newJob) => {
        const { editJobId } = newJob
        try {
            const response = await customFetch.patch(`/jobs/${editJobId}`, newJob, {
                headers: {
                    Authorization: `Bearer ${user.token}`
                }
            })
            toast.success("Job Modified...")
            clearJob()
        } catch (error) {
            toast.error(error.response.data.msg)
        }
    }

    return (
        <JobContext.Provider value={{
            job,
            setJob,
            clearJob,
            createJob,
            isLoading,
            isEditing,
            setEditJob,
            editJob
        }}>
            {children}
        </JobContext.Provider>
    )
}

export const useJobContext = () => {
    return useContext(JobContext)
}