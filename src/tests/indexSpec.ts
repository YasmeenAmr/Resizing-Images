import app from '../index';
import supertest from 'supertest';
import path from 'path';
import sizeOf from 'image-size';

const req = supertest(app);
describe('testing the main endpoint', (): void => {
  it('respons with status=200', async () => {
    await req.get('/').expect(200);
  });
});
