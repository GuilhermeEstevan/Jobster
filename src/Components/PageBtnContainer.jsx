import { HiChevronDoubleLeft, HiChevronDoubleRight } from 'react-icons/hi';
import Wrapper from '../assets/wrappers/PageBtnContainer'
import { useAllJobsContext } from '../Features/Job/AllJobsContext';



const PageBtnContainer = () => {

    const { allJobs, changePage } = useAllJobsContext()
    const { numOfPages, page } = allJobs

    const pages = Array.from({ length: numOfPages }, (_, index) => {
        return index + 1
    })



    const prevPage = () => {
        let newPage = page - 1
        if (newPage === 0) {
            return
        }
        changePage(newPage)
    }

    const nextPage = () => {
        let newPage = page + 1
        if (newPage > numOfPages) {
            return
        }
        changePage(newPage)
    }

    return (
        <Wrapper>
            <button type='button' className='prev-btn' onClick={prevPage}>
                <HiChevronDoubleLeft />
                prev
            </button>
            <div className="btn-container">
                {pages.map((pageNumber) => {
                    return (
                        <button
                            type='button'
                            key={pageNumber}
                            className={pageNumber === page ? 'pageBtn active' : 'pageBtn'}
                            onClick={() => { changePage(pageNumber) }}>
                            {pageNumber}
                        </button>
                    )
                })}
            </div>
            <button type='button' className='next-btn' onClick={nextPage}>
                <HiChevronDoubleRight />
                next
            </button>
        </Wrapper>
    )
}
export default PageBtnContainer