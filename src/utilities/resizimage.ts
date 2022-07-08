import sharp from 'sharp';
//resizing images by using sharp
const resizeMyImage = async (
  fileOfImage: string,
  width: number,
  height: number,
  thumbNailFile: string
): Promise<void> => {
  try {
    await sharp(fileOfImage).resize(width, height).toFile(thumbNailFile);
  } catch (error) {
    console.log(error);
  }
};

export default resizeMyImage;
