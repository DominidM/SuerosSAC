import { Component, signal } from '@angular/core';

interface Suero {
  nombre: string;
  badge: string;
  descripcion: string;
  descripcionDestacada: string[];
  imagen: string;
}

@Component({
  selector: 'app-nuestros-sueros',
  standalone: true,
  templateUrl: './nuestros-sueros.html',
  styleUrl: './nuestros-sueros.scss'
})
export class NuestrosSuerosComponent {
  readonly telefono = '519832781298';

  sueros = signal<Suero[]>([
    {
      nombre: 'Suero 1',
      badge: 'Suero Vitamínico',
      descripcion: 'Ideal para tratar deficiencias vitamínicas y recuperar la energía del organismo. Aplicado por nuestro equipo bajo receta médica, en tu local o a domicilio.',
      descripcionDestacada: ['deficiencias vitamínicas', 'receta médica', 'domicilio'],
      imagen: 'https://res.cloudinary.com/dxuk9bogw/image/upload/v1773168940/03-de-abril-suero-fisiolgico_1_wmxxqb.jpg'
    },
    {
      nombre: 'Suero 2',
      badge: 'Suero Fisiológico',
      descripcion: 'Indicado para la hidratación y recuperación del organismo. Aplicación segura y controlada por nuestro equipo especializado bajo receta médica.',
      descripcionDestacada: ['hidratación', 'recuperación', 'receta médica'],
      imagen: 'https://res.cloudinary.com/dxuk9bogw/image/upload/v1773168940/03-de-abril-suero-fisiolgico_1_wmxxqb.jpg'
    }
  ]);

  consultarWhatsapp(nombreSuero: string) {
    const mensaje = `Hola, quiero consultar sobre el ${nombreSuero}`;
    const url = `https://wa.me/${this.telefono}?text=${encodeURIComponent(mensaje)}`;
    window.open(url, '_blank');
  }

  resaltarTexto(texto: string, palabras: string[]): string {
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