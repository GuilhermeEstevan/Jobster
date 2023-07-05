import Wrapper from "../assets/wrappers/BigSidebar"
import NavLinks from "./NavLinks"
import Logo from "./Logo"
import { useUserContext } from "../Features/User/UserContext"

const BigSidebar = () => {

  const { isSidebarOpen } = useUserContext()

  return (
    <Wrapper>
      <div className={isSidebarOpen ? 'sidebar-container' : 'sidebar-container show-sidebar'}>
        <div className="content">
          <header>
            <Logo />
          </header>
          <NavLinks />
        </div>
      </div>
    </Wrapper>
  )
}
export default BigSidebar