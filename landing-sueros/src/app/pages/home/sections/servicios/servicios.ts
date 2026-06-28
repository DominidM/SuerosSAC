import { Component, signal, OnInit } from '@angular/core';
import { NgClass } from '@angular/common';
import { SupabaseService } from '../../../../core/supabase.service';
import { Servicio } from '../../../../core/supabase.service';

@Component({
  selector: 'app-servicios',
  standalone: true,
  imports: [NgClass],
  templateUrl: './servicios.html',
  styleUrl: './servicios.scss'
})
export class ServiciosComponent implements OnInit {
  readonly telefono = '519832781298';
  servicios = signal<Servicio[]>([]);
  errorDb = signal('');

  constructor(private supabase: SupabaseService) {}

  async ngOnInit() {
    try {
      const data = await this.supabase.getServicios();
      this.servicios.set(data);
    } catch (e: any) {
      this.errorDb.set(e.message || 'Error de conexión');
    }
  }

  reservar(mensaje: string | undefined) {
    const msg = mensaje || 'Hola, quiero reservar';
    const url = `https://wa.me/${this.telefono}?text=${encodeURIComponent(msg)}`;
    window.open(url, '_blank');
  }
}