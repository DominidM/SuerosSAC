import { Component, signal } from '@angular/core';
import { NgClass } from '@angular/common';

interface Servicio {
  titulo: string;
  badge: string;
  icono: string;
  descripcion: string;
  imagen: string;
  mensajeWsp: string;
}

@Component({
  selector: 'app-servicios',
  standalone: true,
  imports: [NgClass],
  templateUrl: './servicios.html',
  styleUrl: './servicios.scss'
})
export class ServiciosComponent {
  readonly telefono = '519832781298';

  servicios = signal<Servicio[]>([
    {
      titulo: 'Local',
      badge: 'Presencial',
      icono: 'pi-building',
      descripcion: 'Visítanos en nuestro local y recibe la aplicación de tu suero en un ambiente cómodo, seguro y supervisado por nuestro equipo médico.',
      imagen: 'https://res.cloudinary.com/dxuk9bogw/image/upload/v1773168940/03-de-abril-suero-fisiolgico_1_wmxxqb.jpg',
      mensajeWsp: 'Hola, quiero reservar una cita en el local'
    },
    {
      titulo: 'Domicilio',
      badge: 'A domicilio',
      icono: 'pi-home',
      descripcion: 'Recibe la aplicación de tu suero en la comodidad de tu hogar. Nuestro equipo va hasta donde estés con todos los implementos necesarios.',
      imagen: 'https://res.cloudinary.com/dxuk9bogw/image/upload/v1773168940/03-de-abril-suero-fisiolgico_1_wmxxqb.jpg',
      mensajeWsp: 'Hola, quiero reservar una atención a domicilio'
    }
  ]);

  reservar(mensaje: string) {
    const url = `https://wa.me/${this.telefono}?text=${encodeURIComponent(mensaje)}`;
    window.open(url, '_blank');
  }
}