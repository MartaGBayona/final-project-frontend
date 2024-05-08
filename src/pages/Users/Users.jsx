/* eslint-disable no-unused-vars */
import './Users.css'
import { useState, useEffect } from "react";
import { GetAllUsers } from '../../services/apiCalls';
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
    return (
        <>
            <div className="userDesign">
                <div className="titleDesign">
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
                                // onDelete={() => handleDelete(user._id)}
                                isDeletable={user.role !== "super_admin"}
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