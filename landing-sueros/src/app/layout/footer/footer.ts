import { Component } from '@angular/core';

@Component({
  selector: 'app-footer',
  standalone: true,
  templateUrl: './footer.html',
  styleUrl: './footer.scss'
})
export class FooterComponent {
  readonly anio = new Date().getFullYear();
  readonly telefono = '519832781298';
  readonly mensaje = 'Hola, quiero consultar sobre sus sueros';

  abrirWhatsapp() {
    const url = `https://wa.me/${this.telefono}?text=${encodeURIComponent(this.mensaje)}`;
    window.open(url, '_blank');
  }

  scrollTo(id: string) {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  }

}