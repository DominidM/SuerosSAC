import { Injectable } from '@angular/core';
import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { environment } from '../../environments/environment';

export interface AdminUser {
  id: number;
  email: string;
  hashed_password: string;
  created_at?: string;
}

export interface HeroSlide {
  id?: number;
  imagen: string;
  titulo: string;
  acento: string;
  subtitulo: string;
  texto: string;
  orden: number;
  created_at?: string;
}

export interface Suero {
  id?: number;
  nombre: string;
  badge: string;
  descripcion: string;
  descripcion_destacada: string[];
  imagen: string;
  orden: number;
  created_at?: string;
}

export interface Servicio {
  id?: number;
  titulo: string;
  badge: string;
  icono: string;
  descripcion: string;
  imagen: string;
  mensaje_wsp: string;
  orden: number;
  created_at?: string;
}

export interface Reclamacion {
  id?: number;
  nombres: string;
  apellidos: string;
  dni: string;
  telefono: string;
  correo: string;
  direccion: string;
  bien_contratado: string;
  tipo: 'QUEJA' | 'RECLAMO';
  detalle: string;
  pedido: string;
  estado: string;
  created_at?: string;
}

@Injectable({ providedIn: 'root' })
export class SupabaseService {
  private supabase: SupabaseClient;

  constructor() {
    this.supabase = createClient(environment.supabaseUrl, environment.supabaseKey);
  }

  get client() {
    return this.supabase;
  }

  // --- ADMIN AUTH (bcryptjs) ---
  async getAdminByEmail(email: string) {
    const { data, error } = await this.supabase
      .from('admin_users')
      .select('*')
      .eq('email', email)
      .maybeSingle();
    if (error) throw new Error(`Error BD: ${error.message}`);
    if (!data) throw new Error('Usuario no encontrado en admin_users');
    return data as AdminUser;
  }

  // --- HERO SLIDES ---
  async getHeroSlides() {
    const { data, error } = await this.supabase.from('hero_slides').select('*').order('orden');
    if (error) throw error;
    return data as HeroSlide[];
  }

  async saveHeroSlide(slide: Partial<HeroSlide>) {
    if (slide.id) {
      const { data, error } = await this.supabase.from('hero_slides').update(slide).eq('id', slide.id).select().single();
      if (error) throw error;
      return data as HeroSlide;
    }
    const { data, error } = await this.supabase.from('hero_slides').insert(slide).select().single();
    if (error) throw error;
    return data as HeroSlide;
  }

  async deleteHeroSlide(id: number) {
    const { error } = await this.supabase.from('hero_slides').delete().eq('id', id);
    if (error) throw error;
  }

  // --- SUEROS ---
  async getSueros() {
    const { data, error } = await this.supabase.from('sueros').select('*').order('orden');
    if (error) throw error;
    return data as Suero[];
  }

  async saveSuero(suero: Partial<Suero>) {
    if (suero.id) {
      const { data, error } = await this.supabase.from('sueros').update(suero).eq('id', suero.id).select().single();
      if (error) throw error;
      return data as Suero;
    }
    const { data, error } = await this.supabase.from('sueros').insert(suero).select().single();
    if (error) throw error;
    return data as Suero;
  }

  async deleteSuero(id: number) {
    const { error } = await this.supabase.from('sueros').delete().eq('id', id);
    if (error) throw error;
  }

  // --- SERVICIOS ---
  async getServicios() {
    const { data, error } = await this.supabase.from('servicios').select('*').order('orden');
    if (error) throw error;
    return data as Servicio[];
  }

  async saveServicio(servicio: Partial<Servicio>) {
    if (servicio.id) {
      const { data, error } = await this.supabase.from('servicios').update(servicio).eq('id', servicio.id).select().single();
      if (error) throw error;
      return data as Servicio;
    }
    const { data, error } = await this.supabase.from('servicios').insert(servicio).select().single();
    if (error) throw error;
    return data as Servicio;
  }

  async deleteServicio(id: number) {
    const { error } = await this.supabase.from('servicios').delete().eq('id', id);
    if (error) throw error;
  }

  // --- RECLAMACIONES ---
  async getReclamaciones() {
    const { data, error } = await this.supabase.from('reclamaciones').select('*').order('fecha_creacion', { ascending: false });
    if (error) throw error;
    return data as Reclamacion[];
  }

  async saveReclamacion(reclamacion: Reclamacion) {
    const { data, error } = await this.supabase.from('reclamaciones').insert(reclamacion).select().single();
    if (error) throw error;
    return data as Reclamacion;
  }

  async updateReclamacionEstado(id: number, estado: string) {
    const { error } = await this.supabase.from('reclamaciones').update({ estado }).eq('id', id);
    if (error) throw error;
  }

  async deleteReclamacion(id: number) {
    const { error } = await this.supabase.from('reclamaciones').delete().eq('id', id);
    if (error) throw error;
  }
}
