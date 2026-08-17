import { v2 as cloudinary } from 'cloudinary'

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
})

export const uploadImage = (image: string) => cloudinary.uploader.upload(image, { folder: 'teslo-shop' })

export const deleteImage = (image: string) => cloudinary.uploader.destroy(image)
