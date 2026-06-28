import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { SupabaseService } from '../../core/supabase.service';

@Component({
  selector: 'app-libro-reclamaciones',
  standalone: true,
  imports: [FormsModule, RouterModule],
  templateUrl: './libro-reclamaciones.html',
  styleUrl: './libro-reclamaciones.scss'
})
export class LibroReclamacionesComponent {
  form = {
    nombres: '',
    apellidos: '',
    dni: '',
    telefono: '',
    correo: '',
    direccion: '',
    bien_contratado: '',
    tipo: 'QUEJA' as 'QUEJA' | 'RECLAMO',
    detalle: '',
    pedido: '',
    estado: 'pendiente'
  };
  enviado = false;
  error = '';
  loading = false;
  nroRegistro = '';

  constructor(private supabase: SupabaseService) {}

  async enviar() {
    this.loading = true;
    this.error = '';
    try {
      await this.supabase.saveReclamacion(this.form);
      this.enviado = true;
      this.nroRegistro = Date.now().toString(36).toUpperCase();
    } catch (e: any) {
      this.error = e.message || 'Error al enviar';
    } finally {
      this.loading = false;
    }
  }

  validarDNI() {
    this.form.dni = this.form.dni.replace(/\D/g, '').slice(0, 8);
  }

  validarTelefono() {
    this.form.telefono = this.form.telefono.replace(/\D/g, '').slice(0, 9);
  }
}
