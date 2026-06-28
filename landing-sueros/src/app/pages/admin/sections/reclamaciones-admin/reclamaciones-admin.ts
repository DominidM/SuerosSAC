import { Component, OnInit, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { DatePipe } from '@angular/common';
import { SupabaseService, Reclamacion } from '../../../../core/supabase.service';
import { ConfirmModalComponent } from '../../../../shared/confirm-modal/confirm-modal';

@Component({
  selector: 'app-reclamaciones-admin',
  standalone: true,
  imports: [FormsModule, DatePipe, ConfirmModalComponent],
  templateUrl: './reclamaciones-admin.html',
  styleUrl: './reclamaciones-admin.scss'
})
export class ReclamacionesAdminComponent implements OnInit {
  items = signal<Reclamacion[]>([]);
  loading = signal(true);
  editando: Partial<Reclamacion> | null = null;
  mostrandoDetalle = false;
  mostrarModal = signal(false);
  eliminarId = signal<number | null>(null);

  estados = [
    { label: 'Pendiente', value: 'pendiente' },
    { label: 'En revisión', value: 'en_revision' },
    { label: 'Resuelto', value: 'resuelto' },
    { label: 'Rechazado', value: 'rechazado' }
  ];

  constructor(private supabase: SupabaseService) {}

  async ngOnInit() {
    await this.cargar();
  }

  async cargar() {
    this.loading.set(true);
    try {
      this.items.set(await this.supabase.getReclamaciones());
    } catch (_) {} finally {
      this.loading.set(false);
    }
  }

  ver(item: Reclamacion) {
    this.editando = { ...item };
    this.mostrandoDetalle = true;
  }

  cerrarDetalle() {
    this.editando = null;
    this.mostrandoDetalle = false;
  }

  async actualizarEstado() {
    if (!this.editando?.id) return;
    try {
      await this.supabase.updateReclamacionEstado(this.editando.id, this.editando.estado!);
      this.cerrarDetalle();
      await this.cargar();
    } catch (_) {}
  }

  confirmarEliminar(id: number) {
    this.eliminarId.set(id);
    this.mostrarModal.set(true);
  }

  async eliminar() {
    const id = this.eliminarId();
    if (id === null) return;
    try {
      await this.supabase.deleteReclamacion(id);
      await this.cargar();
    } catch (_) {} finally {
      this.mostrarModal.set(false);
      this.eliminarId.set(null);
    }
  }
}
