import { useState } from "react";
import "./Card.css";

export const CourseCard = ({ title, description, subjects, handleUpdate, handleDelete, userRoleId }) => {
    const [write, setWrite] = useState(true);
    const [editedTitle, setEditedTitle] = useState(title); 
    const [editedDescription, setEditedDescription] = useState(description);

    const handleEditClick = () => {
        setWrite(false);
    };

    const handleConfirmClick = () => {
        setWrite(true); 
        handleUpdate({ title: editedTitle, description: editedDescription, subjects });
    };

    const handleTitleChange = (e) => {
        setEditedTitle(e.target.innerText);
    };

    const handleDescriptionChange = (e) => {
        setEditedDescription(e.target.innerText);
    };

    return (
        <div className="courseCardDesign">
            <div
                className="titleCourseDesign"
                contentEditable={userRoleId === 1 && !write}
                onBlur={handleTitleChange}
            >
                {title}
            </div>
            <div
                className="descriptionCourseDesign"
                contentEditable={userRoleId === 1 && !write}
                onBlur={handleDescriptionChange}
            >
                {description}
            </div>
            <div>
                {subjects.map(subject => (
                    <div key={subject.id}>
                        <div className="subjectsTitleDesign">{subject.title}</div>
                        <div className="subjectsDesign">{subject.description}</div>
                    </div>
                ))}
            </div>
            {userRoleId === 1 && (
                <>
                    {write ? (
                        <button className="cButtonDesign" onClick={handleEditClick}>
                            Editar
                        </button>
                    ) : (
                        <button className="cButtonDesign" onClick={handleConfirmClick}>
                            Confirmar
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

export const InscriptionCard = ({title, description, subjects, isDeletable, onDelete }) => {
    return (
        <div className="inscriptionCard">
            <div className="inscriptionData">
                <div className="titleCourseDesign">{title}</div>
                <div className="descriptionCourseDesign">{description}</div>
                <div>
                    {subjects.map(subject => (
                        <div key={subject.id}>
                            <div className="subjectsTitleDesign">{subject.title}</div>
                            <div className="subjectsDesign">{subject.description}</div>
                        </div>
                    ))}
                </div>
            </div>
            {isDeletable && (
                <div className="buttonContainer">
                    <button className="cButtonDeleteDesign" onClick={onDelete}>Borrar</button>
                </div>
            )}
        </div>
    );
}