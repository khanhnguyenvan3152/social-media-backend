const mailer =require('nodemailer')
const { mailUser, mailService, mailPassword } = require('../config')

const transport = mailer.createTransport({
    service: mailService,
    auth: {
        user: mailUser,
        pass: mailPassword
    }
})

const sendMail = ({to,subject,html}) =>{
    return new Promise((resolve,reject)=>{
        const options = {from:mailUser,to,subject,html}
        return transport.sendMail(options).then(res=>{
            resolve(res.data)
        }).catch((err)=>{
            console.log(err)
        })
    })
}

module.exports = {sendMail}