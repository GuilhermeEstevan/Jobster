import { useEffect } from "react"
import { useAllJobsContext } from "../../Features/Job/AllJobsContext"
import { ChartsContainer, StatsContainer } from "../../Components"

const Stats = () => {


  const { showStats, isLoading, jobStatus } = useAllJobsContext()



  useEffect(() => {
    showStats()
  }, [])


  if (isLoading) {

    return null
  }



  return (
    <>
      <StatsContainer />
      {jobStatus.monthlyApplications.length > 0 ? <ChartsContainer /> : null}
    </>
  )
}
export default Stats