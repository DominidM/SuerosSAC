import { Component, HostListener, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './navbar.html',
  styleUrl: './navbar.scss'
})
export class NavbarComponent {
  isScrolled = signal(false);
  menuAbierto = signal(false);
  isAtTop = computed(() => !this.isScrolled());

  @HostListener('window:scroll')
  onScroll() {
    this.isScrolled.set(window.scrollY > 50);
    if (this.menuAbierto()) this.menuAbierto.set(false);
  }

  toggleMenu() {
    this.menuAbierto.set(!this.menuAbierto());
  }

  scrollTo(id: string) {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
    this.menuAbierto.set(false);
  }
}