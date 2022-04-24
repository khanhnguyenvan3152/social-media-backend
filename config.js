if(process.env.NODE_ENV!=='production') {
    require('dotenv').config()
}
module.exports ={
    connectionString: process.env.DATABASE_CONNECTION_STRING,
    dbUsername: process.env.DATABASE_USERNAME,
    dbPassword: process.env.DATABASE_PASSWORD,
    salt:process.env.SALT,
    tokenSecret:process.env.TOKEN_SECRET,
    tokenExpiry:process.env.TOKEN_EXPIRY,
    frontendURL: process.env.FRONTEND_URL,
    mailService: process.env.MAIL_SERVICE,
    mailUser: process.env.MAIL_USER,
    mailPassword: process.env.MAIL_PASSWORD,
 }