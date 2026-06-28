import { Component, OnInit, signal } from '@angular/core';
import { SupabaseService } from '../../core/supabase.service';

@Component({
  selector: 'app-admin-dashboard',
  standalone: true,
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.scss'
})
export class AdminDashboardComponent implements OnInit {
  loading = signal(true);
  stats = signal({
    slides: 0, sueros: 0, servicios: 0, reclamaciones: 0,
    reclamacionesPendientes: 0
  });

  constructor(private supabase: SupabaseService) {}

  async ngOnInit() {
    try {
      const [slides, sueros, servicios, reclamaciones] = await Promise.all([
        this.supabase.getHeroSlides(),
        this.supabase.getSueros(),
        this.supabase.getServicios(),
        this.supabase.getReclamaciones()
      ]);
      this.stats.set({
        slides: slides.length,
        sueros: sueros.length,
        servicios: servicios.length,
        reclamaciones: reclamaciones.length,
        reclamacionesPendientes: reclamaciones.filter(r => r.estado === 'pendiente').length
      });
    } catch (_) {} finally {
      this.loading.set(false);
    }
  }
}
