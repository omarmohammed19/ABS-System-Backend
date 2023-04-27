import { Router } from 'express';
import { upload } from '../Upload_Files/Controller';
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

imageRouter.delete('/deleteFile', upload.none(), (req, res) => {
  try {
    const fileName = req.query.fileName;
    fs.unlinkSync(`uploads/${fileName}`);
    res.json({ success: true, message: `${fileName} deleted successfully` });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: 'Failed to delete file' });
  }
});

export default imageRouter;
