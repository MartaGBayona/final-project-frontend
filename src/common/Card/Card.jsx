import "./Card.css";

export const CourseCard = ({ title, description, handleInputChange, handleSubmit, userRoleId }) => {
    const isDirector = userRoleId === 1;
    const buttonUpdateCourse = isDirector ? (
        <button className="cButtonDesign" onClick={handleSubmit}>
            Modificar datos
        </button>
    ) : null;

    // Determina si los campos deben estar deshabilitados
    const isDisabled = !isDirector;

    return (
        <div className="courseCardDesign">
            <input
                className="inputCardDesign"
                type="text"
                placeholder="Título"
                value={title}
                onChange={(e) => handleInputChange("title", e.target.value)}
                disabled={isDisabled}
            />
            <textarea
                className="textareaCardDesign"
                placeholder="Descripción"
                value={description}
                onChange={(e) => handleInputChange("description", e.target.value)}
                disabled={isDisabled}
            />
            {buttonUpdateCourse}
        </div>
    );
}