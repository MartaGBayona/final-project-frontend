import "./Register.css"
import { useState } from "react"
import { RegisterUser } from "../../services/apiCalls"
import { useNavigate } from "react-router-dom"
import { CInputLogRegister } from "../../common/CInput/CInput"
import { CButton } from "../../common/CButton/CButton"
import { validate } from "../../utils/functions"

export const Register = () => {
    const navigate = useNavigate();

    const [user, setUser] = useState({
        name: "",
        surname: "",
        secondSurname:"",
        birth:"",
        email: "",
        password: "",
    });

    const [userError, setUserError] = useState({
        nameError: "",
        surnameError:"",
        secondSurnameError:"",
        birthError:"",
        emailError: "",
        passwordError: "",
    });

    const [msgError, setMsgError] = useState("");

    const inputHandler = (e) => {
        setUser((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value,
        }));
    };

    const checkError = (e) => {
        const fieldName = e.target.name;
        const fieldValue = e.target.value;
        // eslint-disable-next-line no-undef
        const error = validate(fieldName, fieldValue);

        setUserError((prevState) => ({
            ...prevState,
            [`${fieldName}Error`]: error
        }));
    };

    const registerMe = async () => {
        try {
            for (let element in user) {
                if (user[element] === "") {
                    throw new Error("Todos los campos deben ser completados")
                }
            }

            const fetched = await RegisterUser(user);
            setMsgError(fetched.message)
            setTimeout(() => {
                navigate("/")
            }, 1200);
        } catch (error) {
            setMsgError(error.message)
        }
    };

    return (
        <>
            <div className="registerDesign">
                <div className="leftRegisterDesign">
                </div>
                <div className="rightRegisterDesign">
                <div className="titleDesignRegister">
                        Registrate
                    </div>
                    <div className='titleInputDesign'>Nombre</div>
                    <CInputLogRegister
                        className={`cInputLogRegisterDesign ${userError.nameError ? "CInputDesignError" : ""}`}
                        type={"text"}
                        placeholder={"nombre"}
                        name={"name"}
                        value={user.name || ""}
                        changeEmit={(e) => {
                        inputHandler(e);
                        checkError(e);
                    }}
                    />
                    <div className='titleInputDesign'>Primer Apellido</div>
                    <CInputLogRegister
                        className={`cInputLogRegisterDesign ${userError.nameError ? "CInputDesignError" : ""}`}
                        type={"text"}
                        placeholder={"apellido"}
                        name={"surname"}
                        value={user.surname || ""}
                        changeEmit={(e) => {
                        inputHandler(e);
                        checkError(e);
                    }}
                    />
                    <div className='titleInputDesign'>Segundo Apellido</div>
                    <CInputLogRegister
                        className={`cInputLogRegisterDesign ${userError.nameError ? "CInputDesignError" : ""}`}
                        type={"text"}
                        placeholder={"apellido"}
                        name={"secondSurname"}
                        value={user.secondSurname || ""}
                        changeEmit={(e) => {
                        inputHandler(e);
                        checkError(e);
                    }}
                    />
                    <div className='titleInputDesign'>Fecha de nacimiento</div>
                    <CInputLogRegister
                        className={`cInputLogRegisterDesign ${userError.nameError ? "CInputDesignError" : ""}`}
                        type={"date"}
                        placeholder={"Fecha de nacimiento"}
                        name={"birth"}
                        value={user.birth || ""}
                        changeEmit={(e) => {
                        inputHandler(e);
                        checkError(e);
                    }}
                    />
                    <div className="error">{userError.nameError}</div>
                    <div className='titleInputDesign'>Correo</div>
                    <CInputLogRegister
                        className={`cInputLogRegisterDesign ${userError.emailError ? "CInputDesignError" : ""}`}
                        type={"email"}
                        placeholder={"email"}
                        name={"email"}
                        value={user.email || ""}
                        changeEmit={(e) => {
                        inputHandler(e);
                        checkError(e);
                    }}
                    />
                    <div className="error">{userError.emailError}</div>
                    <div className='titleInputDesign'>Contraseña</div>
                    <CInputLogRegister
                        className={`cInputLogRegisterDesign ${userError.passwordError ? "CInputDesignError" : ""}`}
                        type={"password"}
                        placeholder={"contraseña"}
                        name={"password"}
                        value={user.password || ""}
                        changeEmit={(e) => {
                        inputHandler(e);
                        checkError(e);
                    }}
                    />
                    <div className="error">{userError.passwordError}</div>
                    <CButton
                        className={"buttonDesign"}
                        title={"Registro"}
                        functionEmit={registerMe}
                    />
                    <div className="error">{msgError}</div>
                </div>
                    
            </div>
        </>
    )
}