import { HTTP_METHOD } from '@ethang/utilities';
import FormData from 'form-data';

export interface CloudinaryImage {
  access_mode: string;
  asset_id: string;
  bytes: number;
  created_at: string;
  etag: string;
  folder: string;
  format: string;
  height: number;
  original_filename: string;
  placeholder: boolean;
  public_id: string;
  resource_type: string;
  secure_url: string;
  signature: string;
  tags: any[];
  type: string;
  url: string;
  version: number;
  version_id: string;
  width: number;
}

import { CLOUDINARY_PRESET, CLOUDINARY_URL } from '../dashboard/constants';

export const cloudinaryUpload = async (
  file: File,
  preset: keyof typeof CLOUDINARY_PRESET
): Promise<CloudinaryImage> => {
  const fileData = new FormData();
  fileData.append('file', file);
  fileData.append('upload_preset', CLOUDINARY_PRESET[preset]);

  const response = await fetch(CLOUDINARY_URL.IMAGE_UPLOAD, {
    // @ts-expect-error Using formdata
    body: fileData,
    method: HTTP_METHOD.POST,
  });

  return (await response.json()) as CloudinaryImage;
};
