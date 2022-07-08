import app from '../../index';
import supertest from 'supertest';
import path from 'path';
import sizeOf from 'image-size';

const req = supertest(app);
describe(' testing myimageRoute without parameters', () => {
  it('respons with status=400 without  height parameter', async () => {
    await req.get('/image?filename=c&width=100').expect(400);
  });
  it('respons with status=400 without width parameter', async () => {
    await req.get('/image?filename=c&height=100').expect(400);
  });
  it('respons with status=400 without filename parameter', async () => {
    await req.get('/image?width=100&height=100').expect(400);
  });
});
describe('testing myimageRoute without source images ', () => {
  it('respons with status=404 without source image', async () => {
    await req.get('/image?filename=tytyty&width=100&height=100').expect(404);
  });
});

describe('testing resizing image in thumbnail file with new dimentions', () => {
  it('comparing dimentions of image in thumbnail file  with new dimentions in url', async () => {
    await req.get('/image?filename=a&width=100&height=100').then(() => {
      const dimentions = sizeOf(
        `${path.resolve(__dirname, `../../../assets/thumbnail/a-100-100.jpg`)}`
      );
      expect(dimentions.width).toEqual(100);
      expect(dimentions.height).toEqual(100);
    });
  });
});
