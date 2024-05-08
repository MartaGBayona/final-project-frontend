/* eslint-disable no-unused-vars */
import './Users.css';
import { useState, useEffect } from "react";
import { GetAllUsers, DeleteUser } from '../../services/apiCalls';
import { useSelector } from "react-redux";
import { userData } from "../../app/slices/userSlice";
import { UserAdminCard } from "../../common/Card/Card";

export const Users = () => {
    const rdxUser = useSelector(userData);
    const [users, setUsers] = useState([]);
    const [filteredUsers, setFilteredUsers] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [errorMsg, setErrorMsg] = useState("");

    useEffect(() => {
        if (rdxUser.credentials.token) {
            if (users.length === 0) {
                const fetchData = async () => {
                    try {
                        const fetched = await GetAllUsers(rdxUser.credentials.token);
                        setUsers(fetched);
                    } catch (error) {
                        setErrorMsg("Error al obtener usuarios: " + error.message);
                    }
                };
                fetchData();
            }
        }
    }, [rdxUser.credentials.token, users.length]);

    const handleDelete = async (userIdToDelete) => {
        try {
            const response = await DeleteUser(rdxUser.credentials.token, { id: userIdToDelete });
            if (!response.success) {
                throw new Error(response.message || "Error al eliminar el usuario");
            }
            const updatedUsers = users.filter(user => user.id !== userIdToDelete);
            setUsers(updatedUsers);
        } catch (error) {
            setErrorMsg("Error al eliminar el usuario: " + error.message);
        }
    };

    const handleSearch = (e) => {
        const searchTerm = e.target.value.toLowerCase();
        setSearchTerm(searchTerm);
        const filtered = users.filter(user => 
            user.name.toLowerCase().includes(searchTerm) ||
            user.surname.toLowerCase().includes(searchTerm) ||
            user.email.toLowerCase().includes(searchTerm)
        );
        setFilteredUsers(filtered);
    };

    const displayedUsers = searchTerm.length > 0 ? filteredUsers : users;

    return (
        <div className="usersDesign">
            <div className="titleUserDesign">
                Lista de Usuarios
            </div>
            <input
            className='inputSearchDesign'
                type="text"
                placeholder="Buscar usuarios"
                value={searchTerm}
                onChange={handleSearch}
            />
            {displayedUsers.length > 0 ? (
                <div className="cardsRosterAdmin">
                    {displayedUsers.map(user => (
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
                <div>{errorMsg || "No se encontraron usuarios."}</div>
            )}
        </div>
    );
};
