module.exports = {
    port: process.env.PORT || 3000,
    mongoURI: process.env.MONGO_URI,
    cryptSALT: process.env.cryptSALT,
    JWTsecret: process.env.JWT_SECRET,
    PERMS_KEY: process.env.PERMS_KEY,
    ERRORLIST: {
        userInvalido: 'El usuario debe contener entre 3 a 24 caracteres, letras y no debe contener espacios ni caracteres especiales.',
        passInvalida: 'La contraseña debe contener entre 6 a 32 caracteres, minúsculas, sin espacios y con al menos 3 dígitos',
        emailInvalido: 'Ingrese una dirección email válida.'
    },
};