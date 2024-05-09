
import "./Card.css";

export const CourseCard = ({ title, description, handleUpdate, handleDelete, userRoleId }) => {

    const handleTitleChange = (e) => {
        handleUpdate({ title: e.target.innerText, description });
    };
    const handleDescriptionChange = (e) => {
        handleUpdate({ title, description: e.target.innerText });
    };

    return (
        <div className="courseCardDesign">
            <div
                className="titleCourseDesign"
                contentEditable={userRoleId === 1}
                onBlur={handleTitleChange}
            >
                {title}
            </div>
            <div
                className="descriptionCourseDesign"
                contentEditable={userRoleId === 1}
                onBlur={handleDescriptionChange}
            >
                {description}
            </div>
            {userRoleId === 1 && (
                <>
                    <button className="cButtonDesign" onClick={handleUpdate}>
                        Modificar datos
                    </button>
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
