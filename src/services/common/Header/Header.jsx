import { Clink } from '../CLink/CLink'
import './Header.css'

export const Header = () => {
    return (
        <div className="headerDesign">
            <Clink 
                path="/"
                title="Home"
            />
            <Clink 
                path="/login"
                title="Login"
            />
            <Clink 
                path="/register"
                title="Register"
            />
        </div>
    )
}