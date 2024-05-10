import { Clink } from '../CLink/CLink'
import "./Header.css"
import { useSelector, useDispatch } from "react-redux";
import { userData, logout } from "../../app/slices/userSlice";

export const Header = () => {
    const rdxUser = useSelector(userData);
    const dispatch = useDispatch();

    return (
        <div className="headerDesign">
            <Clink path="/" title="Gorgoneye" />
            <Clink path="/courses" title="Formación" />
            {rdxUser?.credentials?.token ? (
                <div className="navigatorDesign">
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
                <div className="navigatorDesign">
                    <Clink path="/login" title="Acceso" />
                    <Clink path="/register" title="Registro" />
                </div>
            )
            }
        </div>
    )
}