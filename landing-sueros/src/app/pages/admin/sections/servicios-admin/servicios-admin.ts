import { Component, OnInit, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { SupabaseService, Servicio } from '../../../../core/supabase.service';
import { LoadingOverlayComponent } from '../../../../shared/loading-overlay/loading-overlay';
import { ConfirmModalComponent } from '../../../../shared/confirm-modal/confirm-modal';
import { ImageUploadComponent } from '../../../../shared/image-upload/image-upload';

@Component({
  selector: 'app-servicios-admin',
  standalone: true,
  imports: [FormsModule, LoadingOverlayComponent, ConfirmModalComponent, ImageUploadComponent],
  templateUrl: './servicios-admin.html',
  styleUrl: './servicios-admin.scss'
})
export class ServiciosAdminComponent implements OnInit {
  servicios = signal<Servicio[]>([]);
  loading = signal(true);
  guardando = signal(false);
  error = signal('');
  editando: Partial<Servicio> | null = null;
  mostrandoForm = false;
  mostrarModal = signal(false);
  eliminarId = signal<number | null>(null);

  constructor(private supabase: SupabaseService) {}

  async ngOnInit() {
    await this.cargarServicios();
  }

  async cargarServicios() {
    this.loading.set(true);
    this.error.set('');
    try {
      this.servicios.set(await this.supabase.getServicios());
    } catch (e: any) {
      this.error.set(e.message || 'Error al cargar servicios');
    } finally {
      this.loading.set(false);
    }
  }

  nuevo() {
    this.editando = { titulo: '', badge: '', icono: 'pi-building', descripcion: '', imagen: '', mensaje_wsp: '', orden: this.servicios().length + 1 };
    this.mostrandoForm = true;
    this.error.set('');
  }

  editar(servicio: Servicio) {
    this.editando = { ...servicio };
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
      await this.supabase.saveServicio(this.editando);
      this.cancelar();
      await this.cargarServicios();
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
      await this.supabase.deleteServicio(id);
      await this.cargarServicios();
    } catch (e: any) {
      this.error.set(e.message || 'Error al eliminar');
    } finally {
      this.mostrarModal.set(false);
      this.eliminarId.set(null);
    }
  }
}
