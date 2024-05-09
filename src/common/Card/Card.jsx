import { useState } from "react";
import "./Card.css";

export const CourseCard = ({ title, description, subjects, handleUpdate, handleDelete, userRoleId }) => {
    const [isEditing, setIsEditing] = useState(false)
    const handleTitleChange = (e) => {
        handleUpdate({ title: e.target.innerText, description, subjects });
    };
    const handleDescriptionChange = (e) => {
        handleUpdate({ title, description: e.target.innerText, subjects });
    };

    const handleEditClick = () => {
        setIsEditing(true); 
    };

    const handleConfirmClick = () => {
        setIsEditing(false); 
        handleUpdate({ title, description, subjects }); 
    };

    return (
        <div className="courseCardDesign">
            <div
                className="titleCourseDesign"
                contentEditable={userRoleId === 1 && isEditing}
                onBlur={handleTitleChange}
            >
                {title}
            </div>
            <div
                className="descriptionCourseDesign"
                contentEditable={userRoleId === 1 && isEditing}
                onBlur={handleDescriptionChange}
            >
                {description}
                </div>
            <div className="subjectsList">
                <h4>Asignaturas:</h4>
                {subjects.map(subject => (
                    <div key={subject.id}>
                        <div>{subject.title}</div>
                        <div>{subject.description}</div>
                    </div>
                ))}
            </div>
            {userRoleId === 1 && (
                <>
                    {isEditing ? (
                        <button className="cButtonDesign" onClick={handleConfirmClick}>
                            Confirmar
                        </button>
                    ) : (
                        <button className="cButtonDesign" onClick={handleEditClick}>
                            Editar
                        </button>
                    )}
                    <button className="cButtonDesign" onClick={handleDelete}>
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
    return (
        <div className="inscriptionCard">
            <div className="inscriptionData">
                <div>Titulo: {title}</div>
                <div>Descripción: {description}</div>
            </div>
            {isDeletable && (
                <div className="buttonContainer">
                    <button className="cButtonDeleteDesign" onClick={onDelete}>Borrar</button>
                </div>
            )}
        </div>
    );
}
