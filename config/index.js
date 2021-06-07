module.exports = {
    port: process.env.PORT,
    mongoURI: process.env.MONGO_URI,
    cryptSALT: process.env.cryptSALT,
    JWTsecret: process.env.JWT_SECRET,
};