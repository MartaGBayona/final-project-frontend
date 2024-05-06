import "./Courses.css"
import { useState, useEffect } from "react";
import { CourseCard } from "../../common/Card/Card";
import { getCourse } from "../../services/apiCalls";

export const Courses = () => {
    const [courses, setCourses] = useState([]);

    useEffect(() => {
        if (courses.length === 0) {
            const fetchData = async () => {
                try {
                    const fetched = await getCourse();
                    setCourses(fetched.data);
                } catch (error) {
                    console.error('Error fetching courses:', error);
                }
            };

            fetchData();
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