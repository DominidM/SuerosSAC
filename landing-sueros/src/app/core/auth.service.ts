import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import * as bcryptjs from 'bcryptjs';
import { SupabaseService } from './supabase.service';

const SESSION_KEY = 'suero_admin_session';

interface SessionData {
  email: string;
  timestamp: number;
}

@Injectable({ providedIn: 'root' })
export class AuthService {
  private session: SessionData | null = null;

  constructor(
    private supabase: SupabaseService,
    private router: Router
  ) {
    this.cargarSession();
  }

  private cargarSession() {
    try {
      const raw = localStorage.getItem(SESSION_KEY);
      if (raw) {
        const data = JSON.parse(raw) as SessionData;
        const valido = Date.now() - data.timestamp < 8 * 60 * 60 * 1000;
        if (valido) this.session = data;
        else localStorage.removeItem(SESSION_KEY);
      }
    } catch { this.session = null; }
  }

  get isLoggedIn() {
    return this.session !== null;
  }

  get email() {
    return this.session?.email ?? '';
  }

  async login(email: string, password: string) {
    let admin;
    try {
      admin = await this.supabase.getAdminByEmail(email);
    } catch (e: any) {
      throw new Error(e.message || 'Error al consultar admin');
    }

    const coincide = bcryptjs.compareSync(password, admin.hashed_password);
    if (!coincide) throw new Error('Contraseña incorrecta');

    this.session = { email, timestamp: Date.now() };
    localStorage.setItem(SESSION_KEY, JSON.stringify(this.session));
  }

  logout() {
    this.session = null;
    localStorage.removeItem(SESSION_KEY);
    this.router.navigate(['/login']);
  }
}
