const root = "http://localhost:8000/api/"

export const LoginUser = async (user) => {
    const options = {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(user)
    };

    try {
        const response = await fetch(`${root}auth/login`, options);

        if (!response.ok) {
            throw new Error('Error en la solicitud al servidor');
        }

        const data = await response.json();

        if (!data.success) {
            throw new Error(data.message || 'Error en la respuesta del servidor');
        }

        return data;
    } catch (error) {
        console.error('Error en la función LoginUser:', error);
        throw error;
    }
};

export const RegisterUser = async (user) => {
    const options = {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(user)
    };

    try {
        const response = await fetch(`${root}auth/register`, options)

        const data = await response.json();

        if (!data.success) {
            throw new Error(data.message);
        }

        return data;
    } catch (error) {
        return error;
    }
};

export const GetProfile = async (credentials) => {
    const options = {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${credentials.token}`
        },
    };
    try {
        const response = await fetch(`${root}users/profile`, options);
        const data = await response.json();
        console.log("credenciales de la apicall",credentials)
        console.log("data de la apicall", data)
        return data;
        
    } catch (error) {
        console.error("Error al obtener el perfil", error);
        throw error;
    }
}

export const UpdateProfile = async (credentials, data) => {
    const options = {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${credentials.token}`
        },
        body: JSON.stringify(data)
    };

    try {
        const response = await fetch(`${root}users/${credentials.user.id}`, options);
        console.log("soy la data de update",data)
        const responseData = await response.json();

        if(!responseData.success) {
            throw new Error(data.message)
        }
        return responseData;
    } catch (error) {
        return error;
    }
};

export const GetAllUsers = async (credentials) => {
    const options = {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${credentials}`
        },
    };

    try {
        const response = await fetch(`${root}users`, options);
        const data = await response.json();

        if (!data.success) {
            throw new Error(data.message);
        }

        const servicesData = data.data;
        console.log("soy los usuarios", data)
        return servicesData;
    } catch (error) {
        throw new Error(error);
    }
}

export const DeleteUser = async (credentials, data) => {
    console.log(data)
    const options = {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${credentials}`
        },
        body: JSON.stringify(data)
    };

    try {
        const response = await fetch(`${root}users/${data.id}`, options);
        const responseData = await response.json();
        console.log("borrar usuarios", data)
        console.log("soy la respuesta del delete", response)

        if (!responseData.success) {
            throw new Error(responseData.message);
        }

        return responseData;
    } catch (error) {
        return { success: false, message: error.message };
    }
};

export const getCourse = async () => {
    const options = {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
    };

    try {
        const response = await fetch(`${root}courses`, options)
        const data = await response.json();
        console.log("soy la respuesta a los cursos", response)
        console.log("soy los cursos", data)
        return data
    } catch (error) {
        return error;
    }
}


export const UpdateCourse = async (credentials, data, courseId) => {
    console.log('Data enviada en la solicitud PUT:', data);
    console.log('ID del curso:', courseId);
    const options = {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${credentials.token}`
        },
        body: JSON.stringify(data)
    };
    console.log(JSON.stringify(data))
    console.log("Datos enviados en la solicitud PUT:", data)

    try {
        const response = await fetch(`${root}courses/${courseId}`, options);
        console.log("soy la data de updateCourse", data);
        const responseData = await response.json();

        if(!responseData.success) {
            throw new Error(responseData.message);
        }
        return responseData;
    } catch (error) {
        return error;
    }
};

export const CreateCourse = async (credentials, data) => {
    const options = {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${credentials.token}`
        },
        body: JSON.stringify(data)
    };

    try {
        const response = await fetch(`${root}courses`, options);
        console.log("soy la respuesta curso creado", response)
        const responseData = await response.json();
        console.log('Data enviada en la solicitud POST:', data);

        if (!responseData.success) {
            throw new Error(responseData.message);
        }

        return responseData;
    } catch (error) {
        return { success: false, message: error.message };
    }
}

export const DeleteCourse = async (credentials, courseId) => {
    const options = {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${credentials}`
        },
    };

    try {
        const response = await fetch(`${root}courses/${courseId}`, options);
        const responseData = await response.json();

        return responseData;
    } catch (error) {
        console.error("Error en la solicitud DELETE:", error);
        throw error; 
    }
};

export const PostInscription = async (credentials, data) => {
    const options = {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${credentials.token}`
        },
        body: JSON.stringify(data)
    };

    try {
        const response = await fetch(`${root}courses/${data.courseId}/inscriptions`, options);
        const responseData = await response.json();

        if (!responseData.success) {
            throw new Error(responseData.message);
        }

        return responseData;
    } catch (error) {
        return { success: false, message: error.message };
    }
}

export const GetMyInscriptions = async (credentials, studentId) => {
    console.log("soy el studentId", studentId)
    const options = {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${credentials.token}`
        },
    };
    try {
        const response = await fetch(`${root}users/${studentId}/inscriptions`, options);
        console.log("soy la respuesta del getInscriptions", response)
        const data = await response.json();
        console.log("credenciales de inscripciones",credentials)
        console.log("data del perfil/inscripciones", studentId)
        return data;
        
    } catch (error) {
        console.error("Error al obtener el perfil", error);
        throw error;
    }
}



