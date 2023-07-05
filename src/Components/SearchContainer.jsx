import { useState, useMemo, useEffect } from "react"
import { FormRowSelect, FormRow } from "."
import { useAllJobsContext } from "../Features/Job/AllJobsContext"
import { useJobContext } from "../Features/Job/JobContext"
import Wrapper from "../assets/wrappers/SearchContainer"


const SearchContainer = () => {

  const { isLoading, allJobs, setAllJobs, initialFiltersState } = useAllJobsContext()
  const { job } = useJobContext()
  const { search, searchStatus, searchType, sort, sortOptions } = allJobs
  const { statusOptions, jobTypeOptions } = job
  const [localSearch, setLocalSearch] = useState('')


  const handleSearch = (e) => {
    const name = e.target.name
    const value = e.target.value
    setAllJobs({
      ...allJobs,
      [name]: value,
      page: 1
    })
  }
  const clearForm = (e) => {
    e.preventDefault()
    setLocalSearch('')
    setAllJobs({
      ...allJobs, ...initialFiltersState
    })
  }

  // ALTERNATIVE DEBOUNCE

  // const debounce = () => {
  //   console.log('debounce');
  //   let timeoutID
  //   return (e) => {
  //     setLocalSearch(e.target.value)
  //     clearTimeout(timeoutID)
  //     timeoutID = setTimeout(() => {
  //       const name = e.target.name
  //       const value = e.target.value
  //       setAllJobs({
  //         ...allJobs,
  //         [name]: value
  //       })
  //     }, 1000);
  //   }
  // }

  // const optimizedDebounce = useMemo(() => debounce(), [])

  // USEEFFECT

  useEffect(() => {
    const debounceID = setTimeout(() => {
      console.log('atualizando');
      setAllJobs({
        ...allJobs,
        search: localSearch
      })

    }, 1000);
    return () => clearTimeout(debounceID)
  }, [localSearch, allJobs])


  return (
    <Wrapper>
      <form className="form">
        <h4>search form</h4>
        <div className="form-center">
          <FormRow
            type='text'
            name='search'
            value={localSearch}
            handleChange={(e) => { setLocalSearch(e.target.value) }} />
          <FormRowSelect
            labelText='Status'
            name='searchStatus'
            value={searchStatus}
            handleChange={handleSearch}
            list={['all', ...statusOptions]} />
          <FormRowSelect
            labelText='type'
            name='searchType'
            value={searchType}
            handleChange={handleSearch}
            list={['all', ...jobTypeOptions]} />
          <FormRowSelect
            labelText='sort'
            name='sort'
            value={sort}
            handleChange={handleSearch}
            list={['all', ...sortOptions]} />
          <button
            className="btn btn-block btn-danger"
            disabled={isLoading}
            onClick={clearForm}>
            clear filters
          </button>
        </div>
      </form>
    </Wrapper>
  )
}
export default SearchContainer