import { createContext, useContext, useEffect, useState } from 'react';
import { toast } from 'react-toastify'
import customFetch from '../../Utils/Axios';
import { useUserContext } from '../User/UserContext';
import { useJobContext } from './JobContext';


const AllJobsContext = createContext()

export const AllJobsProvider = ({ children }) => {


    const { user, logoutUser, checkForUnauthorizedResponse } = useUserContext()
    const { clearJob } = useJobContext()
    const [isLoading, setIsLoading] = useState(false)
    const initialFiltersState = {
        search: '',
        searchStatus: 'all',
        searchType: 'all',
        sort: 'latest',
        sortOptions: ['latest', 'oldest', 'a-z', 'z-a'],
    };
    const initialState = {
        jobs: [],
        totalJobs: 0,
        numOfPages: 1,
        page: 1,
        ...initialFiltersState,
    };
    const [allJobs, setAllJobs] = useState(initialState)
    const [jobStatus, setJobStatus] = useState({
        monthlyApplications: [],
        stats: {}
    })

    const getAllJobs = async () => {
        const { page, search, searchStatus, searchType, sort } = allJobs
        let url = `/jobs?status=${searchStatus}&jobType=${searchType}&sort=${sort}&page=${page}`
        if (search) {
            url = url + `&search=${search}`
        }
        try {
            setIsLoading(true)
            const response = await customFetch.get(url, {
                headers: {
                    Authorization: `Bearer ${user.token}`
                }
            })
            setIsLoading(false)
            setAllJobs({
                ...allJobs,
                jobs: response.data.jobs,
                numOfPages: response.data.numOfPages,
                totalJobs: response.data.totalJobs
            })
        } catch (error) {
            if (checkForUnauthorizedResponse(error)) {
                return
            }
            toast.error("There was an error")
            setIsLoading(false)
        }
    }

    const deleteJob = async (jobId) => {
        try {
            setIsLoading(true)
            const response = await customFetch.delete(`/jobs/${jobId}`, {
                headers: {
                    Authorization: `Bearer ${user.token}`
                }
            })
            getAllJobs()
            setIsLoading(false)
            toast.success(response.data.msg)
        } catch (error) {
            if (checkForUnauthorizedResponse(error)) {
                return
            }
            setIsLoading(false)
            toast.error(error.response.data.msg)
        }
    }

    const showStats = async () => {
        getAllJobs()
        try {
            setIsLoading(true)
            const response = await customFetch.get('/jobs/stats', {
                headers: {
                    Authorization: `Bearer ${user.token}`
                }
            })
            setJobStatus({
                ...jobStatus,
                stats: response.data.defaultStats,
                monthlyApplications: response.data.monthlyApplications
            })
            setIsLoading(false)
        } catch (error) {
            if (checkForUnauthorizedResponse(error)) {
                return
            }
            toast.error(error.response.data.msg)
            setIsLoading(false)
        }
    }

    const changePage = (newPage) => {
        setAllJobs({
            ...allJobs,
            page: newPage
        })
    }

    const clearAll = (message) => {
        logoutUser()
        clearJob()
        setAllJobs(initialState)
        toast.success(message)
    }

    return <AllJobsContext.Provider value={{
        allJobs,
        isLoading,
        deleteJob,
        getAllJobs,
        showStats,
        jobStatus,
        setAllJobs,
        initialFiltersState,
        changePage,
        clearAll
    }}>
        {children}
    </AllJobsContext.Provider>
}


export const useAllJobsContext = () => {
    return useContext(AllJobsContext)
}







