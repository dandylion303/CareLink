import {v2 as cloudinary} from 'cloudinary'
import 'dotenv/config'
import {CloudinaryStorage} from 'multer-storage-cloudinary'
import multer from 'multer'

cloudinary.config({
    cloud_name:process.env.CLOUDINARY_CLOUD_NAME,
    api_key:process.env.CLOUDINARY_API_KEY,
    api_secret:process.env.CLOUDINARY_API_SECRET
})

const storage = new CloudinaryStorage({
    cloudinary,
    params:{
        folder:'CareLink',
        allowed_formats:['png','jpg','webp','pdf']
    }
})

const upload = multer({storage})
export default upload

