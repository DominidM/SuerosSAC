import { Component, input, output, signal, inject } from '@angular/core';
import { CloudinaryUploadService } from '../../core/cloudinary-upload.service';

@Component({
  selector: 'app-image-upload',
  standalone: true,
  template: `
    <div class="upload-area" [class.has-image]="!!imageUrl()" [class.uploading]="subiendo()">
      @if (subiendo()) {
        <div class="upload-progress">
          <div class="spinner"></div>
          <span>Subiendo imagen...</span>
        </div>
      } @else if (imageUrl()) {
        <img [src]="imageUrl()" class="upload-preview" />
        <button type="button" class="change-btn" (click)="inputFile.click()">
          <i class="pi pi-refresh"></i> Cambiar imagen
        </button>
      } @else {
        <div class="upload-placeholder" (click)="inputFile.click()">
          <i class="pi pi-cloud-upload"></i>
          <span>Presiona para seleccionar imagen</span>
          <span class="upload-hint">JPG, PNG, WEBP, AVIF</span>
        </div>
      }

      <input
        #inputFile
        type="file"
        accept="image/jpeg,image/png,image/webp,image/avif"
        (change)="onFileSelected($event)"
        hidden
      />
    </div>
  `,
  styles: `
    .upload-area {
      border: 1px dashed rgba(255,255,255,0.15);
      border-radius: 0.75rem;
      overflow: hidden;
      transition: border-color 0.2s;
      position: relative;
    }

    .upload-area:not(.has-image) {
      cursor: pointer;
    }

    .upload-area:not(.has-image):hover {
      border-color: #3b82f6;
      background: rgba(59,130,246,0.04);
    }

    .upload-area.uploading {
      border-color: #60a5fa;
      background: rgba(59,130,246,0.06);
    }

    .upload-placeholder {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 0.5rem;
      padding: 2rem;
      color: rgba(255,255,255,0.4);

      i {
        font-size: 2rem;
        color: rgba(255,255,255,0.2);
      }

      span { font-size: 0.9375rem; }

      .upload-hint {
        font-size: 0.8125rem;
        color: rgba(255,255,255,0.25);
      }
    }

    .upload-preview {
      display: block;
      width: 100%;
      max-height: 200px;
      object-fit: cover;
    }

    .change-btn {
      position: absolute;
      bottom: 0.5rem;
      right: 0.5rem;
      display: inline-flex;
      align-items: center;
      gap: 0.375rem;
      padding: 0.375rem 0.75rem;
      border: none;
      border-radius: 0.5rem;
      background: rgba(15,23,42,0.85);
      color: #fff;
      font-size: 0.8125rem;
      cursor: pointer;
      backdrop-filter: blur(4px);

      &:hover { background: rgba(15,23,42,0.95); }
    }

    .upload-progress {
      display: flex;
      align-items: center;
      gap: 0.75rem;
      padding: 2rem;
      color: rgba(255,255,255,0.6);
      font-size: 0.9375rem;
    }

    .spinner {
      width: 24px;
      height: 24px;
      border-radius: 50%;
      border: 2px solid rgba(255,255,255,0.1);
      border-top-color: #60a5fa;
      animation: spin 0.8s linear infinite;
      flex-shrink: 0;
    }

    @keyframes spin {
      to { transform: rotate(360deg); }
    }
  `
})
export class ImageUploadComponent {
  imageUrl = input<string>();
  imageUrlChange = output<string>();
  subiendo = signal(false);

  private cloudinary = inject(CloudinaryUploadService);

  async onFileSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    const file = input.files?.[0];
    if (!file) return;

    this.subiendo.set(true);
    try {
      const res = await this.cloudinary.upload(file);
      this.imageUrlChange.emit(res.secure_url);
      this.subiendo.set(false);
    } catch (_) {
      this.subiendo.set(false);
      input.value = '';
    }
  }
}
