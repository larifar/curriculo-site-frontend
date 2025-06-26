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
    const { error } = await this.getSupabase().auth.signInWithPassword({ email, password });
    if (error) throw error;
  }

  async getCurrentSession(): Promise<string | null> {
    const { data, error } = await this.getSupabase().auth.getSession();
    if (error) throw error;
    return data.session?.access_token ?? null;
  }

  async signOut(): Promise<void> {
    const { error } = await this.getSupabase().auth.signOut();
    if (error) throw error;
  }
}
