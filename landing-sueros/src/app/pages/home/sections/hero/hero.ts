import { Component, signal, computed, OnInit, OnDestroy } from '@angular/core';
import { SupabaseService } from '../../../../core/supabase.service';
import { HeroSlide } from '../../../../core/supabase.service';

const FALLBACK_SLIDES: HeroSlide[] = [
  { imagen: 'https://res.cloudinary.com/dxuk9bogw/image/upload/v1773167563/VGNI2GQ3GZDKHKVE56TSMA27QM_gpo9d8.avif', titulo: 'SUERO VITAMINICOS', acento: 'A DOMICILIO', subtitulo: 'Una vida mas plena y saludable', texto: 'cuidate con SueroHome', orden: 1 },
  { imagen: 'https://res.cloudinary.com/dxuk9bogw/image/upload/v1773171498/CLNNASSSYRDEPA2PZNB4WPII6E_q0f9gj.avif', titulo: 'RECUPERATE RÁPIDO', acento: 'CON NOSOTROS', subtitulo: 'Tratamiento personalizado para ti', texto: 'siempre bajo receta médica', orden: 2 },
  { imagen: 'https://res.cloudinary.com/dxuk9bogw/image/upload/v1773171335/depositphotos_313568012-stock-photo-set-fluid-intravenous-drop-saline_tz8hhr.webp', titulo: 'ATENCIÓN ESPECIALIZADA', acento: 'PARA TU SALUD', subtitulo: 'Donde estés, cuando lo necesites', texto: 'cuidate con SueroHome', orden: 3 }
];

@Component({
  selector: 'app-hero',
  standalone: true,
  templateUrl: './hero.html',
  styleUrl: './hero.scss'
})
export class HeroComponent implements OnInit, OnDestroy {
  slideActual = signal(0);
  private intervalo: any;

  slides = signal<HeroSlide[]>(FALLBACK_SLIDES);

  slideVisible = signal(true);

  constructor(private supabase: SupabaseService) {}

  async ngOnInit() {
    try {
      const data = await this.supabase.getHeroSlides();
      if (data.length > 0) this.slides.set(data);
    } catch (_) {}
    this.iniciarAutoplay();
  }

  ngOnDestroy() {
    clearInterval(this.intervalo);
  }

  iniciarAutoplay() {
    this.intervalo = setInterval(() => {
      this.cambiarSlide((this.slideActual() + 1) % this.slides().length);
    }, 5000);
  }

  cambiarSlide(index: number) {
    this.slideVisible.set(false);
    setTimeout(() => {
      this.slideActual.set(index);
      this.slideVisible.set(true);
    }, 300);
  }

  irASlide(index: number) {
    clearInterval(this.intervalo);
    this.cambiarSlide(index);
    this.iniciarAutoplay();
  }
  
  readonly telefono = '519832781298';
  readonly mensaje = 'Hola, quiero reservar una cita';

  abrirWhatsapp() {
    const url = `https://wa.me/${this.telefono}?text=${encodeURIComponent(this.mensaje)}`;
    window.open(url, '_blank');
  }

}