import express, { Request, Response, Router } from 'express';
import upload from '../Controllers/uploadFilesController';
import fs from 'fs';

async function uploadFile(req: Request, res: Response) {
    upload.single('file')
    //@ts-ignore
    res.json({ success: true, url: req.body.file });
}

async function uploadMultipleFile(req: Request, res: Response) {
    upload.array('files', 12)
    res.send('Multiple files uploaded');
}

async function getFiles(req: Request, res: Response) {
    fs.readFile('uploads/' + req.query.name, (err, data) => {
        if (err) throw err;
        res.writeHead(200);
        res.end(data);
    })
}

const uploadFileRouter = (app: express.Application) => {
    app.post('/file', uploadFile);
    app.post('/file', uploadMultipleFile);
    app.get('/file', getFiles);
}

export default uploadFileRouter;
