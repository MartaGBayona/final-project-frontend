/* eslint-disable no-unused-vars */
import "./Courses.css"
import { useSelector } from "react-redux";
import { userData } from "../../app/slices/userSlice";
import { useState, useEffect } from "react";
import { CourseCard } from "../../common/Card/Card";
import { getCourse, UpdateCourse, CreateCourse } from "../../services/apiCalls";

export const Courses = () => {
    const rdxUser = useSelector(userData);
    const roleId = rdxUser.credentials.user ? rdxUser.credentials.user.role : null;
    const [courses, setCourses] = useState([]);
    const [isCreating, setIsCreating] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");
    const [courseData, setCourseData] = useState({
        title: "",
        description: ""
    });

    const fetchCourses = async () => {
        try {
            const fetched = await getCourse();
            setCourses(fetched.data);
        } catch (error) {
            console.error('Error fetching courses:', error);
        }
    };

    const handleCourseUpdate = async (courseId, newData) => {
        console.log('ID del curso:', courseId);
        try {
            if (roleId === 1) {
                const updatedCourse = await UpdateCourse(rdxUser.credentials, newData, courseId);

                // Actualizar solo si la actualización fue exitosa
                if (updatedCourse.success) {
                    // Obtener los cursos actualizados desde la API después de la actualización
                    const updatedCoursesData = await getCourse();

                    // Actualizar el estado de los cursos con los datos actualizados de la API
                    setCourses(updatedCoursesData.data);

                    console.log('Curso actualizado:', updatedCourse);
                } else {
                    console.error('Error al actualizar el curso:', updatedCourse.message);
                }
            } else {
                console.error('No tienes permiso para realizar modificaciones.');
            }
        } catch (error) {
            console.error('Error al actualizar el curso:', error);
        }
    };

    const createNewCourse = async () => {
        try {
            setIsCreating(true);
            const response = await CreateCourse(rdxUser.credentials, courseData);
            if (response.success) {
                // Actualizar la lista de cursos después de crear uno nuevo
                fetchCourses();
                // Limpiar el formulario
                setCourseData({ title: "", description: "" });
                setIsCreating(false);
            } else {
                setErrorMessage(response.message);
                setIsCreating(false);
            }
        } catch (error) {
            console.error('Error al crear el curso:', error);
            setErrorMessage("Error al crear el curso");
            setIsCreating(false);
        }
    };

    const handleTitleChange = (courseId, newTitle) => {
        const updatedCourses = courses.map(course => {
            if (course.id === courseId) {
                return { ...course, title: newTitle };
            }
            return course;
        });
        setCourses(updatedCourses);
    };

    const handleDescriptionChange = (courseId, newDescription) => {
        const updatedCourses = courses.map(course => {
            if (course.id === courseId) {
                return { ...course, description: newDescription };
            }
            return course;
        });
        setCourses(updatedCourses);
    };

    useEffect(() => {
        if (courses.length === 0) {
            fetchCourses();
        }
    }, [courses]);

    return (
        <div className="courseDesign">
            <div className="subtitleCourseDesign">Nuestros cursos</div>
            <div className="cardRoster">
                {courses.length > 0 ? (
                    <div>
                        {courses.map((course, index) => (
                            <CourseCard
                                key={index}
                                title={course.title}
                                description={course.description}
                                handleUpdate={(newData) => handleCourseUpdate(course.id, newData)}
                                userRoleId={roleId === 1 ? roleId : null}
                            />
                        ))}
                    </div>
                ) : (
                    <div>Los cursos están cargando...</div>
                )}
            </div>
            {roleId === 1 && (
                <div className="courseCardDesign">
                    <input
                        className="inputCardDesign"
                        type="text"
                        placeholder="Título del curso"
                        value={courseData.title}
                        onChange={(e) => setCourseData({ ...courseData, title: e.target.value })}
                    />
                    <textarea
                        className="textareaCardDesign"
                        placeholder="Descripción del curso"
                        value={courseData.description}
                        onChange={(e) => setCourseData({ ...courseData, description: e.target.value })}
                    />
                    <button className="cButtonDesign" onClick={createNewCourse} disabled={isCreating}>
                        {isCreating ? "Creando..." : "Crear curso"}
                    </button>
                    {errorMessage && <div className="errorMessage">{errorMessage}</div>}
                </div>
            )}
        </div>
    );
}


