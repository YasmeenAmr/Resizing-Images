import express from 'express';
import myimage from './api/myimageRoute';

const routes = express.Router();

routes.use('/image', myimage);
export default routes;
