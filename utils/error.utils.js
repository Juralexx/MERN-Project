/**
 * Signup errors
 */

export const signUpErrors = (err) => {
    let errors = {
        pseudo: "",
        email: "",
        password: ""
    }

    if (err.message.includes("pseudo"))
        errors.pseudo = "Votre pseudo ne peut contenir que des lettres, chiffres, tirets (-) et underscoress (_) et faire entre 3 et 20 caractères.";

    if (err.message.includes("email"))
        errors.email = "Veuillez saisir une adresse e-mail valide.";

    if (err.message.includes("password"))
        errors.password = "Votre mot de passe ne respecte pas les conditions requises.";

    if (err.code === 11000 && Object.keys(err.keyValue)[0].includes("pseudo"))
        errors.pseudo = "Ce pseudo est déjà pris.";

    if (err.code === 11000 && Object.keys(err.keyValue)[0].includes("email"))
        errors.email = "Cette adresse e-mail est déjà rattachée à un compte existant.";

    return errors;
};

/**
 * Signin errors
 */

export const signInErrors = (err) => {
    let errors = {
        email: "",
        password: ""
    }

    if (err.message.includes("email"))
        errors.email = "Cet email n\'existe pas."

    if (err.message.includes("password"))
        errors.password = "Mot de passe incorrect."

    return errors
}

/**
 *  User update errors
 */

export const userErrors = (err) => {
    let error = {
        name: "",
        phone: "",
        work: ""
    }

    if (err.message.includes("name"))
        error.name = "Veuillez saisir un prénom valide."

    if (err.message.includes("lastname"))
        error.lastname = "Veuillez saisir un prénom valide."

    if (err.message.includes("phone"))
        error.phone = "Veuillez saisir un numéro de téléphone valide."

    if (err.message.includes("work"))
        error.work = "Veuillez saisir un numéro de téléphone valide."

    return error
}

/**
 * Uploads errors
 */

export const uploadErrors = (err) => {
    let error = {
        format: "",
        maxSize: ""
    }

    if (err.message.includes("invalid file"))
        return error.format = "Format incompatible. Les extensions acceptées sont .jpg, .jpeg, .png."

    if (err.message.includes("max size"))
        return error.maxSize = "Le fichier dépasse 1Mo. Merci de choisir un fichier d'une taille inférieure."

    return error
}

/**
 * Project errors
 */

export const projectErrors = (err) => {
    let errors = {
        title: "",
        subtitle: "",
        category: "",
        location: "",
        description: "",
        content: ""
    }

    if (err.message.includes("title"))
        errors.title = "Veuillez saisir un titre valide, votre titre doit faire entre 10 et 60 caractères."

    if (err.message.includes("subtitle"))
        errors.subtitle = "Veuillez saisir un sous-titre valide, votre sous-titre doit faire entre 10 et 150 caractères."

    if (err.message.includes("category"))
        errors.category = "Veuillez sélectionner une catégorie."

    if (err.message.includes("location"))
        errors.location = "Veuillez sélectionner une ville pour votre projet."

    if (err.message.includes("description"))
        errors.description = "Veuillez ajouter une courte description à votre projet, votre courte-description doit faire entre 10 et 300 caractères."

    if (err.message.includes("content"))
        errors.content = "Veuillez ajouter une description valide, votre description doit faire entre 10 et 100 000 caractères."

    return errors
}

/**
 * Actuality erros
 */

export const actualityErrors = (err) => {
    let errors = {
        title: "",
        description: "",
    }

    if (err.message.includes("title"))
        errors.title = "Veuillez saisir un titre valide, votre titre doit faire entre 10 et 60 caractères"

    if (err.message.includes("description"))
        errors.description = "Veuillez ajouter une description à votre actualité, votre titre doit faire entre 10 et 10 000 caractères"

    return errors
}

/**
 * Actuality erros
 */

export const qnaErrors = (err) => {
    let errors = {
        question: "",
        answer: "",
    }

    if (err.message.includes("question"))
        errors.question = "Veuillez saisir une question valide, votre question doit faire entre 10 et 100 caractères."

    if (err.message.includes("answer"))
        errors.answer = "Veuillez ajouter une reponse valide à votre question, votre question doit faire entre 10 et 4000 caractères."

    return errors
}