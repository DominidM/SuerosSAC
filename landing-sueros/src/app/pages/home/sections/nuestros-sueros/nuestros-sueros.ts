import { Component, signal, OnInit } from '@angular/core';
import { SupabaseService } from '../../../../core/supabase.service';
import { Suero } from '../../../../core/supabase.service';

@Component({
  selector: 'app-nuestros-sueros',
  standalone: true,
  templateUrl: './nuestros-sueros.html',
  styleUrl: './nuestros-sueros.scss'
})
export class NuestrosSuerosComponent implements OnInit {
  readonly telefono = '519832781298';
  sueros = signal<Suero[]>([]);
  errorDb = signal('');

  constructor(private supabase: SupabaseService) {}

  async ngOnInit() {
    try {
      const data = await this.supabase.getSueros();
      this.sueros.set(data);
    } catch (e: any) {
      this.errorDb.set(e.message || 'Error de conexión');
    }
  }

  consultarWhatsapp(nombreSuero: string) {
    const mensaje = `Hola, quiero consultar sobre el ${nombreSuero}`;
    const url = `https://wa.me/${this.telefono}?text=${encodeURIComponent(mensaje)}`;
    window.open(url, '_blank');
  }

  resaltarTexto(texto: string, palabras: string[] | undefined): string {
    if (!palabras) return texto;
    let resultado = texto;
    palabras.forEach(palabra => {
      resultado = resultado.replace(
        new RegExp(palabra, 'gi'),
        `<strong class="destacado">${palabra}</strong>`
      );
    });
    return resultado;
  }
}