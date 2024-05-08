/* eslint-disable no-unused-vars */
import './Users.css'
import { useState, useEffect } from "react";
import { GetAllUsers, DeleteUser } from '../../services/apiCalls';
import { useSelector } from "react-redux";
import { userData } from "../../app/slices/userSlice";
import { useNavigate } from "react-router-dom"
import { UserAdminCard } from "../../common/Card/Card";

export const Users = () => {
    const rdxUser = useSelector(userData);
    const [users, setUsers] = useState([]);
    const [errorMsg, setErrorMsg] = useState("");
    const navigate = useNavigate()

    useEffect(() => {
        if (rdxUser.credentials.token){
            if (users.length === 0) {
                const BringData = async () => {
                    try {
                        const fetched = await GetAllUsers(rdxUser.credentials.token);
                        setUsers(fetched);
                        console.log("usuarios", fetched)
                    } catch (error) {
                        setErrorMsg("Error al obtener usuarios: " + error.message);
                    }
                };
                BringData();
            }
        }
        else {
            navigate("/")
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [users, rdxUser.credentials.token]);

    const handleDelete = async (userIdToDelete) => {
        try {
            const response = await DeleteUser(rdxUser.credentials.token, { id: userIdToDelete });
            console.log("soy las credenciales", rdxUser.credentials)
            console.log("soy el usuario a borrar", userIdToDelete)
            
            if (!response.success) {
                throw new Error(response.message || "Error al eliminar el usuario");
            }
    
            const updatedUsers = users.filter(user => user.id !== userIdToDelete);
            setUsers(updatedUsers);
        } catch (error) {
            setErrorMsg("Error al eliminar el usuario: " + error.message);
        }
    };
    return (
        <>
            <div className="usersDesign">
                <div className="titleUserDesign">
                    Lista de Usuarios
                </div>
                {users.length > 0 ? (
                    <div className="cardsRosterAdmin">
                        {users.map(user => (
                            <UserAdminCard
                                key={user.id}
                                name={user.name}
                                surname={user.surname}
                                secondSurname={user.secondSurname}
                                birth={user.birth}
                                email={user.email}
                                role={user.role_id}
                                onDelete={() => handleDelete(user.id)}
                                isDeletable={user.role_id !== 1}
                            />
                        ))}
                    </div>
                ) : (
                    <div>{errorMsg || "Los usuarios están viniendo."}</div>
                )}
            </div>
        </>
    )
}