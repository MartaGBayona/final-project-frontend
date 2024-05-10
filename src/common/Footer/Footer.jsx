import { Clink } from '../CLink/CLink'
import "./Footer.css"

export const Footer = () => {
    return (
        <div className="footerdDesign">
            <div className="pathContainer">
                <Clink path="/" title="Gorgoneye"/>
                <Clink path="/courses" title="Formación" />
                <Clink path="/login" title="Acceso" />
                <Clink path="/register" title="Registro" />
            </div>
            <div className="imageContainer">
                <img src="../../../img/gorgonFooter.png" alt="Viaje a la luna" className="imgDesign" />
            </div>
        </div>
    )
}