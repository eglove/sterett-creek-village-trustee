export const CLOUDINARY_PRESET = {
  COVENANT:
    process.env.NODE_ENV === 'development'
      ? 'sterett-covenants-test'
      : 'sterett-covenants',
  HOME_IMAGE:
    process.env.NODE_ENV === 'development'
      ? 'sterett-home-images-test'
      : 'sterett-home-images',
};

export const CLOUDINARY_URL = {
  IMAGE_UPLOAD: 'https://api.cloudinary.com/v1_1/eglove/image/upload',
};
