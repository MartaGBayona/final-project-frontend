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