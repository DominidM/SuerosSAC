import { Component, signal, OnInit } from '@angular/core';
import { RouterOutlet, Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs';
import { NavbarComponent } from './layout/navbar/navbar';
import { FooterComponent } from './layout/footer/footer';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, NavbarComponent, FooterComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {
  esAdmin = signal(false);

  constructor(private router: Router) {}

  ngOnInit() {
    this.actualizar();
    this.router.events
      .pipe(filter(e => e instanceof NavigationEnd))
      .subscribe(() => this.actualizar());
  }

  private actualizar() {
    const url = this.router.url;
    this.esAdmin.set(url.startsWith('/admin') || url.startsWith('/login'));
  }
}
