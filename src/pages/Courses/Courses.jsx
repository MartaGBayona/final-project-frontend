import { useSelector } from "react-redux";
import { userData } from "../../app/slices/userSlice";
import { useState, useEffect } from "react";
import { CourseCard } from "../../common/Card/Card";
import { getCourse, UpdateCourse } from "../../services/apiCalls";

export const Courses = () => {
    const rdxUser = useSelector(userData);
    const roleId = rdxUser.credentials.user ? rdxUser.credentials.user.role : null;
    const [courses, setCourses] = useState([]);

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
                    setCourses(prevCourses => {
                        return prevCourses.map(course => {
                            if (course.id === courseId) {
                                return { ...course, ...newData };
                            }
                            return course;
                        });
                    });
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
                                handleTitleChange={(newTitle) => handleTitleChange(course.id, newTitle)}
                                handleDescriptionChange={(newDescription) => handleDescriptionChange(course.id, newDescription)}
                                userRoleId={roleId === 1 ? roleId : null}
                            />
                        ))}
                    </div>
                ) : (
                    <div>Los cursos están cargando...</div>
                )}
            </div>
        </div>
    );
};


