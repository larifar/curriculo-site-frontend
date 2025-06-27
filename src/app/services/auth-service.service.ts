import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthServiceService {

  private supabase! : SupabaseClient

  constructor() {
  }

  private getSupabase(): SupabaseClient {
    if (!this.supabase) {
      this.supabase = createClient(environment.supabaseUrl, environment.supabaseAnonKey);
    }
    return this.supabase;
  }

  async signUp(email: string, password: string): Promise<void> {
  const { data, error } = await this.getSupabase().auth.signUp({
    email,
    password,
  });

  if (error) throw error;

  if (data.user && data.user.identities?.length === 0) {
    throw new Error('E-mail já cadastrado');
  }
}

  async signIn(email: string, password: string): Promise<void> {
    const { data, error } = await this.getSupabase().auth.signInWithPassword({ email, password });
    if (error) throw error;

    const token = data.session?.access_token;
    if (token) {
      localStorage.setItem('token', token);
    }
  }

  async getCurrentSession(): Promise<string | null> {
    try {
      const { data } = await this.getSupabase().auth.getSession();
      return data.session?.access_token ?? null;
  } catch (error) {
      return null;
  }
  }

  async signOut(): Promise<void> {
    const { error } = await this.getSupabase().auth.signOut();
    localStorage.removeItem('token');
    if (error) throw error;
  }
}
