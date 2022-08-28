import { Router } from 'express';
import upload from '../Controllers/uploadFilesController';
// const imageController = require('../controllers/imageController');
const imageRouter = Router();
import fs from 'fs';

imageRouter.post('/single',upload.single('file'), (req, res) => {
    //@ts-ignore
    res.json({success: true});
})

imageRouter.post('/multiple',upload.array('files', 12), (req, res) => {
    res.send('Multiple files uploaded');
})

imageRouter.get('/getImage', (req, res) => {
    fs.readFile('uploads/' + req.query.name, (err, data) => {
        if (err) throw err;
        res.writeHead(200);
        res.end(data);
    })
})

export default imageRouter;