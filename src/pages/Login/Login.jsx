import { useState } from 'react';
import { CInput } from '../../common/CInput/CInput'
import { LoginUser } from "../../services/apiCalls";
import { login } from "../../app/slices/userSlice";
import './Login.css'
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux"
import { decodeToken } from "react-jwt";
import { CButton } from '../../common/CButton/CButton';


export const Login = () => {

    const navigate = useNavigate();

    const dispatch = useDispatch();

    const [user, setUser] = useState({
        email: "",
        password: "",
    });

    // const [userError, setUserError] = useState({
    //     emailError: "",
    //     passwordError: "",
    // });

    // const [msgError, setMsgError] = useState("");

    const inputHandler = (e) => {
        setUser((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value,
        }));
    };

    // const checkError = (e) => {
    //     const error = validate(e.target.name, e.target.value);

    //     setUserError((prevState) => ({
    //         ...prevState,
    //         [e.target.name + "Error"]: error
    //     }))
    // }

    const loginMe = async () => {
        try {
            for (let elemento in user) {
                if (user[elemento] === "") {
                    throw new Error("Debes rellenar todos los campos");
                }
            }

            const fetched = await LoginUser(user);

            if (fetched.token) {
                const decoded = decodeToken(fetched.token);
                console.log(fetched)

                const passport = {
                    token: fetched.token,
                    user: decoded,
                };

                dispatch(login({ credentials: passport }));

                // setMsgError(`Bienvenido de nuevo ${decoded.name}`);

                setTimeout(() => {
                    navigate("/");
                }, 2000);
            }
        } catch (error) {
            // setMsgError(error.message);
        }
    };

    return (
        <div className="loginDesign">
            <div className="leftLoginDesign">
            </div>
            <div className="rightLoginDesign">
            <div className="titleDesignRegister">
                Acceso
            </div>
            <CInput
                type="email"
                name="email"
                value={user.email || ""}
                changeEmit={(e) => inputHandler(e)}
            />
            <CInput
                type="password"
                name="password"
                value={user.password || ""}
                changeEmit={(e) => inputHandler(e)}
            />
            <CButton
                className={"buttonDesign"}
                title={"Entrar"}
                functionEmit={loginMe}
            />
            </div>

        </div>
    )
}