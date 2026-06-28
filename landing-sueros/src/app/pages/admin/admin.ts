import { Component, signal, OnInit } from '@angular/core';
import { RouterModule, Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs';
import { AuthService } from '../../core/auth.service';

const RUTAS: Record<string, string> = {
  '': 'Dashboard',
  'hero': 'Slides Hero',
  'sueros': 'Sueros',
  'servicios': 'Servicios',
  'reclamaciones': 'Reclamaciones'
};

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './admin.html',
  styleUrl: './admin.scss'
})
export class AdminComponent implements OnInit {
  breadcrumbs = signal<string[]>(['Admin']);

  readonly adminEmail = signal('');

  constructor(
    private auth: AuthService,
    private router: Router
  ) {
    this.adminEmail.set(auth.email);
  }

  ngOnInit() {
    this.actualizarBreadcrumbs(this.router.url);
    this.router.events
      .pipe(filter(e => e instanceof NavigationEnd))
      .subscribe(e => this.actualizarBreadcrumbs((e as NavigationEnd).url));
  }

  private actualizarBreadcrumbs(url: string) {
    const partes = url.replace('/admin/', '').replace('/admin', '').split('/').filter(Boolean);
    const crumbs = ['Admin'];
    partes.forEach(p => {
      crumbs.push(RUTAS[p] || p);
    });
    this.breadcrumbs.set(crumbs);
  }

  cerrarSesion() {
    this.auth.logout();
  }
}
