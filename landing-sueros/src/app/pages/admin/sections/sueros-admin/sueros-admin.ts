import { Component, OnInit, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { SupabaseService, Suero } from '../../../../core/supabase.service';
import { LoadingOverlayComponent } from '../../../../shared/loading-overlay/loading-overlay';
import { ConfirmModalComponent } from '../../../../shared/confirm-modal/confirm-modal';
import { ImageUploadComponent } from '../../../../shared/image-upload/image-upload';

@Component({
  selector: 'app-sueros-admin',
  standalone: true,
  imports: [FormsModule, LoadingOverlayComponent, ConfirmModalComponent, ImageUploadComponent],
  templateUrl: './sueros-admin.html',
  styleUrl: './sueros-admin.scss'
})
export class SuerosAdminComponent implements OnInit {
  sueros = signal<Suero[]>([]);
  loading = signal(true);
  guardando = signal(false);
  error = signal('');
  editando: Partial<Suero> | null = null;
  mostrandoForm = false;
  mostrarModal = signal(false);
  eliminarId = signal<number | null>(null);

  constructor(private supabase: SupabaseService) {}

  async ngOnInit() {
    await this.cargarSueros();
  }

  async cargarSueros() {
    this.loading.set(true);
    this.error.set('');
    try {
      this.sueros.set(await this.supabase.getSueros());
    } catch (e: any) {
      this.error.set(e.message || 'Error al cargar sueros');
    } finally {
      this.loading.set(false);
    }
  }

  nuevo() {
    this.editando = { nombre: '', badge: '', descripcion: '', descripcion_destacada: [], imagen: '', orden: this.sueros().length + 1 };
    this.mostrandoForm = true;
    this.error.set('');
  }

  editar(suero: Suero) {
    this.editando = { ...suero };
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
      await this.supabase.saveSuero(this.editando);
      this.cancelar();
      await this.cargarSueros();
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
      await this.supabase.deleteSuero(id);
      await this.cargarSueros();
    } catch (e: any) {
      this.error.set(e.message || 'Error al eliminar');
    } finally {
      this.mostrarModal.set(false);
      this.eliminarId.set(null);
    }
  }

  agregarDestacado(texto: string) {
    if (!this.editando) return;
    const destacada = this.editando.descripcion_destacada || [];
    if (texto.trim()) {
      this.editando = { ...this.editando, descripcion_destacada: [...destacada, texto.trim()] };
    }
  }

  quitarDestacado(idx: number) {
    if (!this.editando?.descripcion_destacada) return;
    this.editando = { ...this.editando, descripcion_destacada: this.editando.descripcion_destacada.filter((_, i) => i !== idx) };
  }
}
