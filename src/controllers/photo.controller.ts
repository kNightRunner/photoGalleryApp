import {Request, Response} from "express";
import  Photo from '../models/Photo';


export async function getPhotos(req:Request, res:Response):Promise  <Response> {
const photos = await Photo.find();
return res.json(photos);
}

export async function getPhoto(req:Request, res:Response): Promise <Response>{
const photos = await Photo.find();
    const photo = Photo.findById(req.params.id);
return res.json({photos});
}


export async function createPhoto(req:Request, res:Response):Promise<Response> {

    const {title, description } = req.body;

    const newPhoto = {
        title:title,
        description: description,
        imagePath: req.file.path

    };
const photo = new Photo(newPhoto);
    await photo.save();
    return res.json({
        message: "Photo successfully saved",
        photo

    })

};

export async function deletePhoto(req:Request, res:Response):Promise<Response> {
const { id } = req.params;
const photo = await Photo.findByIdAndRemove(id);
    return res.json({
        message: "Photo Deleted",
        photo
    })
}
