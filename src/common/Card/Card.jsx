import "./Card.css";

export const CourseCard = ({ courseId, title, description, handleUpdate, handleTitleChange, handleDescriptionChange, userRoleId }) => {
    const handleTitleInputChange = (e) => {
        handleTitleChange(courseId, e.target.value);
    };

    const handleDescriptionInputChange = (e) => {
        handleDescriptionChange(courseId, e.target.value);
    };

    return (
        <div className="courseCardDesign">
            <input
                className="inputCardDesign"
                type="text"
                placeholder="Título"
                value={title}
                onChange={handleTitleInputChange}
                disabled={userRoleId !== 1}
            />
            <textarea
                className="textareaCardDesign"
                placeholder="Descripción"
                value={description}
                onChange={handleDescriptionInputChange}
                disabled={userRoleId !== 1}
            />
            {userRoleId === 1 && (
                <>
                    <button className="cButtonDesign" onClick={() => handleUpdate({ title, description })}>
                        Modificar datos
                    </button>
                </>
            )}
        </div>
    );
};



