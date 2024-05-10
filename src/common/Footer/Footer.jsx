import { Clink } from '../CLink/CLink'
import "./Footer.css"
import { useSelector, useDispatch } from "react-redux";
import { userData, logout } from "../../app/slices/userSlice";

export const Footer = () => {
    const rdxUser = useSelector(userData);
    const dispatch = useDispatch();
    return (
        <div className="footerdDesign">
            <div className="pathContainer">
                <Clink path="/" title="Gorgoneye"/>
                <Clink path="/courses" title="Formación" />
                {rdxUser?.credentials?.token ? (
                <div>
                    <Clink path="/profile" title={rdxUser?.credentials?.user?.name} />
                    {rdxUser?.credentials?.user?.role === 1 ? (
                        <>
                            <Clink path="/director" title="Usuarios" />
                        </>
                    ) : (
                        <div></div>
                    )}
                    <div
                        className="cLinkDesign"
                        onClick={() => dispatch(logout({ credentials: "" }))}
                    >
                        Cerrar Sesión
                    </div>
                </div>
            ) : (
                <div>
                    <Clink path="/login" title="Acceso" />
                    <Clink path="/register" title="Registro" />
                </div>
            )
            }
            </div>
            <div className="imageContainer">
                <img src="../../../img/gorgonFooter.png" alt="Viaje a la luna" className="imgDesign" />
            </div>
        </div>
    )
}