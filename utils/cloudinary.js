const cloudinary = require('cloudinary')
const uuid = require('uuid').v5
cloudinary.config({
    cloud_name: 'dqc5eqdsj',
    api_key: '671822221848354',
    api_secret: 'ii1WsYjk5DZuhDPuf5SJa-32x4M'
});

exports.uploadToCloudinary = async (stream, folder, imagePublicId) => {
    const options = imagePublicId ? { public_id: imagePublicId, overwrite: true } : {public_id:`${folder}/${uuid()}`}
    return new Promise((resolve,reject)=>{
        const streamLoad = cloudinary.v2.uploader.upload_stream(options,(error,result)=>{
            if(result){
                resolve(result)
            }else{
                reject(error)
            }
        })
        stream.pipe(streamLoad)
    })
}


exports.deleteFromCloudinary = async ()=>{
    
}