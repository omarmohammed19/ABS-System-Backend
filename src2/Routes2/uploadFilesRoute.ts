import { Router } from 'express';
import upload from '../Controllers2/uploadFilesController';
// const imageController = require('../controllers/imageController');
const imageRouter = Router();
import fs from 'fs';

imageRouter.post('/single', upload.single('file'), (req, res) => {
  //@ts-ignore
  res.json({ success: true, url: res.req.file?.filename });
});

imageRouter.post('/multiple', upload.array('files', 12), (req, res) => {
  res.send('Multiple files uploaded');
});

imageRouter.get('/getImage', (req, res) => {
  try {
    fs.readFile('uploads/' + req.query.name, (err, data) => {
      res.writeHead(200);
      res.end(data);
    });
  } catch (error) {
    console.log(error);
  }
});

export default imageRouter;
