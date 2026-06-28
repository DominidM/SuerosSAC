import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home';
import { LoginComponent } from './pages/login/login';
import { AuthGuard } from './guards/auth.guard';
import { LibroReclamacionesComponent } from './pages/libro-reclamaciones/libro-reclamaciones';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'libro-reclamaciones', component: LibroReclamacionesComponent },
  { path: 'login', component: LoginComponent },
  {
    path: 'admin',
    canActivate: [AuthGuard],
    loadComponent: () => import('./pages/admin/admin').then(m => m.AdminComponent),
    children: [
      { path: '', loadComponent: () => import('./pages/admin/dashboard').then(m => m.AdminDashboardComponent) },
      { path: 'hero', loadComponent: () => import('./pages/admin/sections/hero-slides/hero-slides-admin').then(m => m.HeroSlidesAdminComponent) },
      { path: 'sueros', loadComponent: () => import('./pages/admin/sections/sueros-admin/sueros-admin').then(m => m.SuerosAdminComponent) },
      { path: 'servicios', loadComponent: () => import('./pages/admin/sections/servicios-admin/servicios-admin').then(m => m.ServiciosAdminComponent) },
      { path: 'reclamaciones', loadComponent: () => import('./pages/admin/sections/reclamaciones-admin/reclamaciones-admin').then(m => m.ReclamacionesAdminComponent) }
    ]
  }
];
