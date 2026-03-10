import { Component } from '@angular/core';
import { HeroComponent } from './sections/hero/hero';
import { PorQueSuerosComponent } from './sections/por-que-sueros/por-que-sueros';
import { NuestrosSuerosComponent } from './sections/nuestros-sueros/nuestros-sueros';
import { ServiciosComponent } from './sections/servicios/servicios';
import { ContactoComponent } from './sections/contacto/contacto';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
      HeroComponent,
      PorQueSuerosComponent,
      NuestrosSuerosComponent,
      ServiciosComponent,
      ContactoComponent],
  templateUrl: './home.html',
  styleUrl: './home.scss'
})
export class HomeComponent {}