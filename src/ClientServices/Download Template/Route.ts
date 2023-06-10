// Import required modules
import express, { Request, Response } from 'express';
import fs from 'fs';
import path from 'path';

// Function to handle the download request
async function downloadFile(req: Request, res: Response) {
  const filePath = 'Template//Template.xlsx';

  if (!filePath) {
    return res.status(400).send('Please provide a valid file path.');
  }

  const file = path.resolve(filePath.toString());
  try {
    // Check if the file exists
    fs.accessSync(file, fs.constants.F_OK);

    res.download(file); // Send the file as a download
  } catch (err) {
    console.error(err);
    res.status(404).send('File not found.');
  }
}

const downloadTemplateRouter = (app: express.Application) => {
  app.get('/download-template', downloadFile);
};

export default downloadTemplateRouter;
