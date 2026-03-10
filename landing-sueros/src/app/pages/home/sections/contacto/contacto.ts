import { Component } from '@angular/core';

@Component({
  selector: 'app-contacto',
  standalone: true,
  templateUrl: './contacto.html',
  styleUrl: './contacto.scss'
})
export class ContactoComponent {
  readonly telefono = '519832781298';
  readonly mensaje = 'Hola, quiero consultar sobre sus sueros';

  abrirWhatsapp() {
    const url = `https://wa.me/${this.telefono}?text=${encodeURIComponent(this.mensaje)}`;
    window.open(url, '_blank');
  }
}