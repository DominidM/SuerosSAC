import { Component, OnInit, signal } from '@angular/core';
import { SupabaseService } from '../../../../core/supabase.service';

@Component({
  selector: 'app-dashboard-admin',
  standalone: true,
  imports: [],
  templateUrl: './dashboard-admin.html',
  styleUrl: './dashboard-admin.scss'
})
export class DashboardAdminComponent implements OnInit {
  stats = signal({
    sueros: 0,
    servicios: 0,
    slides: 0,
    reclamaciones: 0,
    reclamacionesPendientes: 0
  });

  constructor(private supabase: SupabaseService) {}

  async ngOnInit() {
    const s = await this.supabase.getSueros();
    const servicios = await this.supabase.getServicios();
    const slides = await this.supabase.getHeroSlides();
    const reclamaciones = await this.supabase.getReclamaciones();
    this.stats.set({
      sueros: s.length,
      servicios: servicios.length,
      slides: slides.length,
      reclamaciones: reclamaciones.length,
      reclamacionesPendientes: reclamaciones.filter(r => r.estado === 'pendiente').length
    });
  }
}
