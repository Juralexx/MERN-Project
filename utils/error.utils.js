module.exports.signUpErrors = (err) => {
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

module.exports.signInErrors = (err) => {
    let errors = { email: "", password: "" }

    if (err.message.includes("email"))
        errors.email = "Cet email n\'existe pas"

    if (err.message.includes("password"))
        errors.password = "Mot de passe incorrect"

    return errors
}

module.exports.uploadErrors = (err) => {
    let errors = { format: '', maxSize: '' }

    if (err.message.includes("invalid file"))
        errors.format = "Format incompatible. Les extensions acceptées sont .jpg, .jpeg, .png"

    if(err.message.includes("max size"))
        errors.maxSize = "Le fichier dépasse 500ko"

    return errors
}