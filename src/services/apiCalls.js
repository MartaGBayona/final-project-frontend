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
            "Authorization": `Bearer ${credentials.user}`
        },
    };
    console.log("soy credentials", credentials.user)
    try {
        const response = await fetch(`${root}users/profile`, options);
        console.log("Respuesta completa:", response);
        const data = await response.json();
        console.log("Soy la data del perfil", data)
        


        return data;
        
    } catch (error) {
        console.error("Error al obtener el perfil", error);
        throw error;
    }
}