module.exports = {
    port: process.env.PORT || 3000,
    mongoURI: process.env.MONGO_URI,
    cryptSALT: process.env.cryptSALT,
    JWTsecret: process.env.JWT_SECRET,
};