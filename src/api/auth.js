import { API_HOST } from "../utils/constants";

export function signUpApi(user) {
    const url = `${API_HOST}/registro`
    const userTemp = {
        ...user,
        email: user.email.toLowerCase(),
        fechaNacimiento: new Date()
    }
    delete userTemp.repeatPassword

    console.log(userTemp);
    console.log(url);

    const params = {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(userTemp)
    }

    return fetch(url, params).then(response => {
        if (response.status >= 200 && response.status < 300) {
            return response.json()
        }
        return { code: 404, message: "Email no disponible" }
    }).then(result => {
        return result
    }).catch(err => {
        return err
    })

}