export const CLOUDINARY_PRESET = {
  HOME_IMAGE:
    process.env.NODE_ENV === 'development'
      ? 'sterett-home-images-test'
      : 'sterett-home-images',
  MAIN_IMAGE:
    process.env.NODE_ENV === 'development' ? 'main-image-test' : 'main-image',
  TRUSTEES:
    process.env.NODE_ENV === 'development' ? 'trustees-test' : 'trustees',
};

export const CLOUDINARY_URL = {
  IMAGE_UPLOAD: 'https://api.cloudinary.com/v1_1/eglove/image/upload',
};
