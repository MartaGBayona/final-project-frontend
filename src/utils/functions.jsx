export const validate = (type, value) => {
    switch (type) {
        case "name":
        case "firstName":
        case "secondName":
        case "nombre":
        case "surname":
        case "secondSurname":
            if(value.length < 3) {
                return "El nombre debe tener al menos 3 caracteres"
            }
            return "";
            case "email":
            case "e-mail":
            case "correo":
            case "mail":
                // eslint-disable-next-line no-case-declarations
                const emailRegex = /^\w+([.-_+]?\w+)*@\w+([.-]?\w+)*(\.\w{2,10})+$/;

                if(!emailRegex.test(value)) {
                    return "El formato del correo es incorrecto"
                }
            
            return "";
            case "password":
            case "contraseña":
                if(value.length < 6 || !value.length >10) {
                    return "El password debe contener entre 6 y 10 caracteres"
                }

                return "";
            default:
                return("mensaje default")
    }
}