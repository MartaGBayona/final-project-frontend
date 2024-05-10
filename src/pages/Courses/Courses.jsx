/* eslint-disable no-unused-vars */
import "./Courses.css"
import { useSelector } from "react-redux";
import { userData } from "../../app/slices/userSlice";
import { useState, useEffect } from "react";
import { CourseCard } from "../../common/Card/Card";
import { getCourse, UpdateCourse, CreateCourse, DeleteCourse, PostInscription, DeleteInscription, CreateSubject } from "../../services/apiCalls";

export const Courses = () => {
    const rdxUser = useSelector(userData);
    const roleId = rdxUser.credentials.user ? rdxUser.credentials.user.role : null;
    const [courses, setCourses] = useState([]);
    const [inscriptionMessage, setInscriptionMessage] = useState("");
    const [selectedCourse, setSelectedCourse] = useState(null);
    const [isCreating, setIsCreating] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");
    const [courseData, setCourseData] = useState({
        title: "",
        description: ""
    });
    const [subjectData, setSubjectData] = useState({
        title: "",
        description: ""
    });
    const [loading, setLoading] = useState(false);

    const fetchCourses = async () => {
        try {
            const fetched = await getCourse();
            setCourses(fetched.data);
        } catch (error) {
            console.error('Error fetching courses:', error);
        }
    };


    const handleCourseUpdate = async (courseId, newData) => {
        try {
            if (roleId === 1) {
                const updatedCourse = await UpdateCourse(rdxUser.credentials, newData, courseId);

                if (updatedCourse.success) {
                    const updatedCoursesData = await getCourse();
                    setCourses(updatedCoursesData.data);
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
                fetchCourses();
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

    const deleteCourseHandler = async (courseId) => {
        setLoading(true);

        

        try {
            const result = await DeleteCourse(rdxUser.credentials.token, courseId);

            if (result && result.success) {
                const updatedCourses = courses.filter(course => course.id !== courseId);
                setCourses(updatedCourses);
            } else {
                setErrorMessage(result.message || 'Error deleting course');
            }

            setLoading(false);
        } catch (error) {
            setErrorMessage("Error deleting course");
            setLoading(false);
        }
    };

    const registerUserInCourse = async (courseId) => {
        try {
            const studentId = rdxUser.credentials.user.id;
            const response = await PostInscription(rdxUser.credentials, { courseId, student_id: studentId });
            if (response.success) {
                fetchCourses();
                setInscriptionMessage("¡Nos vemos en clase!");
            } else {
                throw new Error(response.message || "Error al registrar usuario en el curso");
            }
        } catch (error) {
            console.error('Error al registrar usuario en el curso:', error);
            setInscriptionMessage("Parece que algo ha ido mal.");
        }
    };       

    const handleCourseChange = (event) => {
        setSelectedCourse(event.target.value);
    };

    const createNewSubject = async () => {
        try {
            setIsCreating(true);
            const response = await CreateSubject(rdxUser.credentials, subjectData, selectedCourse);
            if (response.success) {
                fetchCourses();
                setIsCreating(false);
                setSubjectData({ title: "", description: "" });
                setSelectedCourse(null);
            } else {
                setErrorMessage(response.message);
                setIsCreating(false);
            }
        } catch (error) {
            console.error('Error creating subject:', error);
            setErrorMessage("Error creating subject");
            setIsCreating(false);
        }
    };

    useEffect(() => {
        if (courses.length === 0) {
            fetchCourses();
        }
    }, [courses]);

    useEffect(() => {
        if (inscriptionMessage) {
            const timer = setTimeout(() => {
                setInscriptionMessage("");
            }, 2000);
    
            return () => clearTimeout(timer);
        }
    }, [inscriptionMessage]);

    return (
        <>
            <div className="courseDesign">
                <div className="subtitleCourseDesign">Nuestros cursos</div>
                <div className="cardRoster">
                    {courses.length > 0 ? (
                        <div>
                            {courses.map((course, index) => {
                                const courseId = course.id;
                                return (
                                    <div key={index}>
                                        <CourseCard
                                            title={course.title}
                                            description={course.description}
                                            subjects={course.subjects}
                                            handleUpdate={(newData) => handleCourseUpdate(course.id, newData)}
                                            handleDelete={() => deleteCourseHandler(course.id)}
                                            userRoleId={roleId === 1 ? roleId : null}
                                        />
                                        {rdxUser.credentials.token && (
                                            <div className="registerButtonContainer">
                                                <button className="registerButtonDesign" onClick={() => registerUserInCourse(courseId)}>
                                                    ¡Apúntate al curso!
                                                </button>
                                                {inscriptionMessage && inscriptionMessage.includes("¡Inscripción exitosa!") && (
                                                    <div className="successMessage">{inscriptionMessage}</div>
                                                )}
                                                {inscriptionMessage && !inscriptionMessage.includes("¡Inscripción exitosa!") && (
                                                    <div className="errorMessage">{inscriptionMessage}</div>
                                                )}
                                            </div>
                                        )}
                                    </div>
                                );
                            })}
                        </div>
                    ) : (
                        <div>Los cursos están cargando...</div>
                    )}
                </div>
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
            {roleId === 1 && (
                <div className="subjectCardDesign">
                    <select className="selectDropdown" value={selectedCourse} onChange={handleCourseChange}>
                        <option value="">Selecciona un curso</option>
                        {courses.map(course => (
                            <option key={course.id} value={course.id}>{course.title}</option>
                        ))}
                    </select>
                    <input
                        type="text"
                        className="inputCardDesignSubject"
                        placeholder="Título de la asignatura"
                        value={subjectData.title}
                        onChange={(e) => setSubjectData({ ...subjectData, title: e.target.value })}
                    />
                    <textarea
                        className="textareaCardDesignSubject"
                        placeholder="Descripción de la asignatura"
                        value={subjectData.description}
                        onChange={(e) => setSubjectData({ ...subjectData, description: e.target.value })}
                    />
                    <button className="cButtonDesign" onClick={createNewSubject}>Crear asignatura</button>
                    {errorMessage && <div className="errorMessage">{errorMessage}</div>}
                </div>
            )}
        </>
    );
    
}

