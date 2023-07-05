import { useUserContext } from "../Features/User/UserContext"
import Wrapper from "../assets/wrappers/SmallSidebar"
import Logo from "./Logo"
import { FaTimes } from 'react-icons/fa'
import NavLinks from "./NavLinks"


const SmallSidebar = () => {

  const { isSidebarOpen, toggleSidebar } = useUserContext()


  return (
    <Wrapper>
      <div className={isSidebarOpen ? 'sidebar-container show-sidebar' : 'sidebar-container'}>
        <div className="content">

          <button
            className="close-btn"
            onClick={toggleSidebar}
          >
            <FaTimes />
          </button>
          <header>
            <Logo />
          </header>
          <NavLinks toggleSidebar={toggleSidebar} />
        </div>
      </div>
    </Wrapper>
  )
}
export default SmallSidebar