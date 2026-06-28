import { Component, HostListener, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './navbar.html',
  styleUrl: './navbar.scss'
})
export class NavbarComponent {
  isScrolled = signal(false);
  menuAbierto = signal(false);
  isAtTop = computed(() => !this.isScrolled());

  constructor(private router: Router) {}

  @HostListener('window:scroll')
  onScroll() {
    this.isScrolled.set(window.scrollY > 50);
    if (this.menuAbierto()) this.menuAbierto.set(false);
  }

  toggleMenu() {
    this.menuAbierto.set(!this.menuAbierto());
  }

  scrollTo(id: string) {
    this.menuAbierto.set(false);
    if (this.router.url === '/' || this.router.url === '') {
      document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
    } else {
      this.router.navigateByUrl('/').then(() => {
        setTimeout(() => {
          document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
        }, 300);
      });
    }
  }
}