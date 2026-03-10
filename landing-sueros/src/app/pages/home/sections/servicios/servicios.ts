import { Component, signal } from '@angular/core';

interface Servicio {
  titulo: string;
  descripcion: string;
  imagen: string;
}

@Component({
  selector: 'app-servicios',
  standalone: true,
  templateUrl: './servicios.html',
  styleUrl: './servicios.scss'
})
export class ServiciosComponent {
  servicios = signal<Servicio[]>([
    {
      titulo: 'Local',
      descripcion: 'Visítanos en nuestro local y recibe la aplicación de tu suero en un ambiente cómodo, seguro y supervisado por nuestro equipo médico.',
      imagen: 'https://res.cloudinary.com/dxuk9bogw/image/upload/v1773168940/03-de-abril-suero-fisiolgico_1_wmxxqb.jpg'
    },
    {
      titulo: 'Domicilio',
      descripcion: 'Recibe la aplicación de tu suero en la comodidad de tu hogar. Nuestro equipo va hasta donde estés con todos los implementos necesarios.',
      imagen: 'https://res.cloudinary.com/dxuk9bogw/image/upload/v1773168940/03-de-abril-suero-fisiolgico_1_wmxxqb.jpg'
    }
  ]);
}