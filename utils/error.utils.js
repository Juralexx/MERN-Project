export const signUpErrors = (err) => {
    let errors = { pseudo: "", email: "", password: "" };

    if (err.message.includes("pseudo"))
        errors.pseudo = "Pseudo incorrect";

    if (err.message.includes("email"))
        errors.email = "Email incorrect";

    if (err.message.includes("password"))
        errors.password = "Le mot de passe être composé de 8 caractères minimum";

    if (err.code === 11000 && Object.keys(err.keyValue)[0].includes("pseudo"))
        errors.pseudo = "Ce pseudo est déjà pris";

    if (err.code === 11000 && Object.keys(err.keyValue)[0].includes("email"))
        errors.email = "Cet email est déjà rattachée à un compte existant";

    return errors;
};

export const signInErrors = (err) => {
    let errors = { email: "", password: "" }

    if (err.message.includes("email"))
        errors.email = "Cet email n\'existe pas"

    if (err.message.includes("password"))
        errors.password = "Mot de passe incorrect"

    return errors
}

export const uploadErrors = (err) => {
    let error = { format: "", maxSize: "" }

    if (err.message.includes("invalid file"))
        return error.format = "Format incompatible. Les extensions acceptées sont .jpg, .jpeg, .png"

    if (err.message.includes("max size"))
        return error.maxSize = "Le fichier dépasse 1Mo. Merci de choisir un autre fichier."

    return error
}

export const projectErrors = (err) => {
    let errors = { title: "", category: "", content: "" }

    if (err.message.includes("title"))
        errors.title = "Veuillez saisir un titre valide"

    if (err.message.includes("category"))
        errors.category = "Veuillez sélectionner une catégorie"

    if (err.message.includes("content"))
        errors.content = "Veuillez ajouter une description"
        
    return errors
}