import { useState } from "react";
import "./Card.css";

export const CourseCard = ({ title, description, handleUpdate, handleDelete, userRoleId }) => {
    const [newTitle, setNewTitle] = useState(title);
    const [newDescription, setNewDescription] = useState(description);

    const handleTitleInputChange = (e) => {
        setNewTitle(e.target.value);
    };

    const handleDescriptionInputChange = (e) => {
        setNewDescription(e.target.value);
    };

    const handleUpdateClick = () => {
        handleUpdate({ title: newTitle, description: newDescription });
    };

    const handleDeleteClick = () => {
        handleDelete();
    }

    return (
        <div className="courseCardDesign">
            <input
                className="inputCardDesign"
                type="text"
                placeholder="Título"
                value={newTitle}
                onChange={handleTitleInputChange}
                disabled={userRoleId !== 1}
            />
            <textarea
                className="textareaCardDesign"
                placeholder="Descripción"
                value={newDescription}
                onChange={handleDescriptionInputChange}
                disabled={userRoleId !== 1}
            />
            {userRoleId === 1 && (
                <>
                    <button className="cButtonDesign" onClick={handleUpdateClick}>
                        Modificar datos
                    </button>
                    <button className="cButtonDesign" onClick={handleDeleteClick}>
                        Borrar
                    </button>
                </>
                
            )}
        </div>
    );
};


export const UserAdminCard = ({ name, surname, secondSurname, birth, email, role, isDeletable, onDelete }) => {
    return (
        <div className="userCard">
            <div className="userData">
                <div>Nombre: {name}</div>
                <div>Primer Apellido: {surname}</div>
                <div>Segundo Apellido: {secondSurname}</div>
                <div>Fecha de Nacimiento: {birth}</div>
                <div>Correo: {email}</div>
                <div>Rol: {role}</div>
            </div>
            {isDeletable && (
                <div className="buttonContainer">
                    <button className="cButtonDeleteDesign" onClick={onDelete}>Borrar</button>
                </div>
            )}
        </div>
    );
}

export const InscriptionCard = ({title, description, isDeletable, onDelete }) => {
    console.log("InscriptionCard renderizando con:", title, description);
    return (
        <div className="userCard">
            <div className="userData">
                <div>Titulo: {title}</div>
                <div>Descripción {description}</div>

            </div>
            {isDeletable && (
                <div className="buttonContainer">
                    <button className="cButtonDeleteDesign" onClick={onDelete}>Borrar</button>
                </div>
            )}
        </div>
    );
}
