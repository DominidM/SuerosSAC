import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';

export interface CloudinaryResponse {
  secure_url: string;
  public_id: string;
  format: string;
}

@Injectable({ providedIn: 'root' })
export class CloudinaryUploadService {
  private cloudName = environment.cloudinaryCloudName;
  private uploadPreset = environment.cloudinaryUploadPreset;

  async upload(file: File): Promise<CloudinaryResponse> {
    const url = `https://api.cloudinary.com/v1_1/${this.cloudName}/image/upload`;
    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', this.uploadPreset);

    const res = await fetch(url, { method: 'POST', body: formData });
    if (!res.ok) {
      const err = await res.text();
      throw new Error(`Error al subir imagen: ${err}`);
    }
    return res.json();
  }
}
