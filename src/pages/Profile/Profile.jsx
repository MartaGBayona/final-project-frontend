import './Profile.css'
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux"
import { userData } from "../../app/slices/userSlice";
import { useSelector } from "react-redux";
import { useState, useEffect } from "react";
import { GetProfile, UpdateProfile, GetMyInscriptions } from '../../services/apiCalls';
import { updated } from "../../app/slices/userSlice";
import { validate } from '../../utils/functions';
import { CInput } from '../../common/CInput/CInput';
import { CButton } from '../../common/CButton/CButton';
import { InscriptionCard } from '../../common/Card/Card';



export const Profile = () => {

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const rdxUser = useSelector(userData);

    const [write, setWrite] = useState("disabled");
    const [user, setUser] = useState({
        name: "",
        surname: "",
        secondSurname: "",
        birth: "",
        email: "",
    });

    const [userError, setUserError] = useState({
        nameError: "",
        surnameError: "",
        secondSurnameError: "",
        birthError: "",
        emailError: "",
    });

    const [userInscriptions, setUserInscriptions] = useState([]);
    const [loadedData, setLoadedData] = useState();

    const getUserProfile = async (credentials) => {
        try {
            const fetched = await GetProfile(credentials);
            console.log("Datos del usuario:", fetched.data);
            console.log("soy las credenciales", credentials.user.name)
            console.log(rdxUser.credentials.user.role)
            if (!fetched.success) {
                throw new Error(fetched.message || 'Error en la respuesta del servidor');
            }
            setUser({
                name: fetched.data.name,
                surname: fetched.data.surname,
                secondSurname: fetched.data.secondSurname,
                birth: fetched.data.birth,
                email: fetched.data.email
            });
            setLoadedData(true);
        } catch (error) {
            console.error('Error al obtener el perfil:', error);
            throw error;
        }
    };

    useEffect(() => {
        const getUserInscriptions = async () => {
            try {
                const studentId = rdxUser.credentials.user.id;
                const fetched = await GetMyInscriptions(rdxUser.credentials, studentId);
                setUserInscriptions(fetched.data || []);
            } catch (error) {
                console.error("Error al obtener las inscripciones del usuario:", error);
                throw error;
            }
        };

        if (rdxUser.credentials && loadedData) {
            getUserInscriptions();
        }
    }, [rdxUser.credentials, loadedData]);

    useEffect(() => {
        if (!rdxUser.credentials.token) {
            navigate("/");
        }
    }, [rdxUser.credentials, navigate]);

    useEffect(() => {
        if (!loadedData) {
            getUserProfile(rdxUser.credentials);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [rdxUser.credentials, loadedData]);

    const inputHandler = (e) => {
        setUser((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value,
        }));
    };

    const checkError = (e) => {
        const error = validate(e.target.name, e.target.value);
        setUserError((prevState) => ({
            ...prevState,
            [e.target.name + "Error"]: error
        }));
    };

    const updateData = async () => {
        try {
            const fetched = await UpdateProfile(rdxUser.credentials, user);
            console.log("modificar perfil", rdxUser.credentials.user)
            setUser((prevState) => ({
                ...prevState,
                name: fetched.data.name || prevState.name,
                surname: fetched.data.surname || prevState.surname,
                secondSurname: fetched.data.secondSurname || prevState.secondSurname,
                email: fetched.data.email || prevState.email,
            }));
            dispatch(updated({ credentials: { ...rdxUser.credentials, user: { ...rdxUser.credentials.user, name: user.name } } }));
            setWrite("disabled");
        } catch (error) {
            console.error('Error al actualizar el perfil:', error);
            throw error;
        }
    };
    console.log("Cantidad de inscripciones:", userInscriptions.length)
    return (
        <div className='profileDesign'>
            <div className="titleDesignRegister">
                Mi perfil
            </div>
            <CInput
                className={`CInputDesign ${userError.nameError ? "CInputDesignError" : ""}`}
                type={"text"}
                placeholder={"nombre"}
                name={"name"}
                value={user.name || ""}
                disabled={write !== ""}
                changeEmit={(e) => {
                    inputHandler(e);
                    checkError(e);
                }}
            />
            <CInput
                className={`CInputDesign ${userError.surnameError ? "CInputDesignError" : ""}`}
                type={"text"}
                placeholder={"apellido"}
                name={"surname"}
                value={user.surname || ""}
                disabled={write !== ""}
                changeEmit={(e) => {
                    inputHandler(e);
                    checkError(e);
                }}
            />
            <CInput
                className={`CInputDesign ${userError.secondSurnameError ? "CInputDesignError" : ""}`}
                type={"text"}
                placeholder={"apellido"}
                name={"secondSurname"}
                value={user.secondSurname || ""}
                disabled={write !== ""}
                changeEmit={(e) => {
                    inputHandler(e);
                    checkError(e);
                }}
            />
            <CInput
                className={`CInputDesign ${userError.birthError ? "CInputDesignError" : ""}`}
                type={"date"}
                placeholder={"Fecha de nacimiento"}
                name={"birth"}
                value={user.birth || ""}
                disabled={true}
                changeEmit={(e) => {
                    inputHandler(e);
                    checkError(e);
                }}
            />
            <div className="error">{userError.nameError}</div>
            <CInput
                className={`CInputDesign ${userError.emailError ? "CInputDesignError" : ""}`}
                type={"email"}
                placeholder={"email"}
                name={"email"}
                value={user.email || ""}
                disabled={write !== ""}
                changeEmit={(e) => {
                    inputHandler(e);
                    checkError(e);
                }}
            />
            <CButton
                className={write === "" ? "buttonDesign" : "buttonDesign"}
                title={write === "" ? "Confirmar" : "Editar"}
                functionEmit={write === "" ? updateData : () => setWrite("")}
            />
            <div className="titleDesignProfile">
                Mis Inscripciones
            </div>
            {userInscriptions && userInscriptions.length > 0 ? (
                userInscriptions.map(inscription => (
                    <InscriptionCard
                        key={inscription.course.id}
                        title={<div>{inscription.course.title}</div>}
                        description={<div>{inscription.course.description}</div>}
                        subjects={inscription.course.subjects}
                        isDeletable={true}
                    // onDelete={() => deletePostHandler(inscription._id)}
                    />
                ))
            ) : (
                <div>No hay posts para mostrar.</div>
            )}
        </div>
    )
}