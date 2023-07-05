import AreaChartComponent from "./AreaChart"
import BarChartComponent from "./BarChart"
import Wrapper from "../assets/wrappers/ChartsContainer"
import { useState } from "react"
import { useAllJobsContext } from "../Features/Job/AllJobsContext"


const ChartsContainer = () => {

  const [barChart, SetBarChart] = useState(true)
  const { jobStatus } = useAllJobsContext()
  const { monthlyApplications: data } = jobStatus
  console.log(data);

  return (
    <Wrapper>
      <h4>Monthly Applications</h4>
      <button
        type="button"
        onClick={() => { SetBarChart(!barChart) }}>
        {barChart ? "Area Chart" : "Bar Chart"}
      </button>
      {barChart ? <BarChartComponent data={data} /> : <AreaChartComponent data={data} />}
    </Wrapper>
  )
}
export default ChartsContainer