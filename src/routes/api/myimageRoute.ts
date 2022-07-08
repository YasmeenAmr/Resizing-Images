import express from 'express';
import fs from 'fs';
import resizeMyImage from '../../utilities/resizimage';
import path from 'path';

const myimage = express.Router();

myimage.get('/', async (req: express.Request, res: express.Response): Promise<void>=> {
  const width = req.query['width'];
  const height = req.query['height'];
  const filename = req.query['filename'];

  //checking queries
  if (!filename || !width || !height ||isNaN(Number(width)) || isNaN(Number(height))|| (Number(width))<1 || (Number(height))<1) {
     res.status(400).send('sorry missing paramters');
     return;
  }

  const myImagDiraction = `${path.resolve(
    __dirname,
    `../../../assets/${filename}.jpg`
  )}`; //to get path of image
  //console.log(myImagDiraction);
  //to save image in thumbnail file in format filename_width_height.jpg
  const myImagThumbnil = `${path.resolve(
    __dirname,
    `../../../assets/thumbnail/${filename}-${width}-${height}.jpg`
  )}`;

  //checking if the image got cached or not to resizing it
  if (fs.existsSync(myImagThumbnil)) {
    return res.sendFile(myImagThumbnil);
  } //checking if the image exists or not
  if (fs.existsSync(myImagDiraction)) {
    await resizeMyImage(
      myImagDiraction,
      parseInt(width as string),
      parseInt(height as string),
      myImagThumbnil
    );
    return res.sendFile(myImagThumbnil);
    //console.log("resize")
  } else {
     res.status(404).send("sorry image can't found");
    return;
  }
});

export default myimage;

//checking if the image exists or not
/*if(fs.existsSync(myImagDiraction))
    {
        await resizeMyImage(myImagDiraction,parseInt(width as string),parseInt (height as string),myImagThumbnil)
         return res.sendFile(myImagThumbnil);
         //return console.log("resize")
    }
    else{
          res.status(404).send("sorry image can't found");
    }*/
