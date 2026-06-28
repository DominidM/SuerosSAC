import { Component, OnInit, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { SupabaseService, HeroSlide } from '../../../../core/supabase.service';
import { LoadingOverlayComponent } from '../../../../shared/loading-overlay/loading-overlay';
import { ConfirmModalComponent } from '../../../../shared/confirm-modal/confirm-modal';
import { ImageUploadComponent } from '../../../../shared/image-upload/image-upload';

@Component({
  selector: 'app-hero-slides-admin',
  standalone: true,
  imports: [FormsModule, LoadingOverlayComponent, ConfirmModalComponent, ImageUploadComponent],
  templateUrl: './hero-slides-admin.html',
  styleUrl: './hero-slides-admin.scss'
})
export class HeroSlidesAdminComponent implements OnInit {
  slides = signal<HeroSlide[]>([]);
  loading = signal(true);
  guardando = signal(false);
  error = signal('');
  editando: Partial<HeroSlide> | null = null;
  mostrandoForm = false;
  mostrarModal = signal(false);
  eliminarId = signal<number | null>(null);

  constructor(private supabase: SupabaseService) {}

  async ngOnInit() {
    await this.cargarSlides();
  }

  async cargarSlides() {
    this.loading.set(true);
    this.error.set('');
    try {
      this.slides.set(await this.supabase.getHeroSlides());
    } catch (e: any) {
      this.error.set(e.message || 'Error al cargar slides');
    } finally {
      this.loading.set(false);
    }
  }

  nuevo() {
    this.editando = { titulo: '', acento: '', subtitulo: '', texto: '', imagen: '', orden: this.slides().length + 1 };
    this.mostrandoForm = true;
    this.error.set('');
  }

  editar(slide: HeroSlide) {
    this.editando = { ...slide };
    this.mostrandoForm = true;
    this.error.set('');
  }

  cancelar() {
    this.editando = null;
    this.mostrandoForm = false;
    this.error.set('');
  }

  async guardar() {
    if (!this.editando) return;
    this.guardando.set(true);
    this.error.set('');
    try {
      await this.supabase.saveHeroSlide(this.editando);
      this.cancelar();
      await this.cargarSlides();
    } catch (e: any) {
      this.error.set(e.message || 'Error al guardar');
    } finally {
      this.guardando.set(false);
    }
  }

  confirmarEliminar(id: number) {
    this.eliminarId.set(id);
    this.mostrarModal.set(true);
  }

  async eliminar() {
    const id = this.eliminarId();
    if (id === null) return;
    try {
      await this.supabase.deleteHeroSlide(id);
      await this.cargarSlides();
    } catch (e: any) {
      this.error.set(e.message || 'Error al eliminar');
    } finally {
      this.mostrarModal.set(false);
      this.eliminarId.set(null);
    }
  }
}
