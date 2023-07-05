import { Logo } from '../Components'
import main from '../assets/images/main.svg'
import Wrapper from '../assets/wrappers/LandingPage'
import { Link } from 'react-router-dom'


const Landing = () => {
    return (
        <Wrapper>
            <nav>
                <Logo />
            </nav>
            <div className="container page">
                <div className="info">
                    <h1>job <span>tracking</span> app</h1>
                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Recusandae alias quae hic! Adipisci quo corrupti hic. Quaerat aspernatur in omnis officia veritatis quis id harum optio, eveniet quasi, quisquam perferendis.
                    </p>
                    <Link to='/register' className='btn btn-hero'>login/register</Link>
                </div>
                <img src={main} alt="job hunt" className='img main-img' />
            </div>
        </Wrapper>
    )
}
export default Landing