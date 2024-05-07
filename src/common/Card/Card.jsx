import { useState } from "react";
import "./Card.css";

export const CourseCard = ({ title, description, handleUpdate, userRoleId }) => {
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
                </>
            )}
        </div>
    );
};
