import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import axiosInstance from '../interceptors/auth.interceptor';
import { LoginCredentials, LoginResponse } from '../models/user.model';

// @Injectable marks this class as a service that Angular can inject
// into any component that needs it. Think of it as registering
// this service with Angular's dependency injection system.
@Injectable({
  providedIn: 'root', // Makes this service available app-wide (singleton)
})
export class AuthService {
  // The key we use to store/retrieve the token from localStorage
  private readonly TOKEN_KEY = 'accessToken';

  constructor(private router: Router) {}

  // ── LOGIN ────────────────────────────────────────────
  // Sends username & password to the API.
  // On success: stores the token and navigates to /dashboard.
  // On failure: throws the error so the component can show a message.
  async login(credentials: LoginCredentials): Promise<void> {
    // We use axiosInstance (not default axios) so our interceptor applies.
    // But for LOGIN, there's no token yet — the interceptor just skips
    // adding the Authorization header (because localStorage is empty).
    const response = await axiosInstance.post<LoginResponse>(
      '/auth/login',
      credentials
    );

    const { accessToken } = response.data;

    // Store the token in localStorage.
    // localStorage persists even when the browser tab is closed.
    // This is why you stay logged in across page refreshes.
    this.storeToken(accessToken);

    // Navigate to dashboard after successful login
    this.router.navigate(['/dashboard']);
  }

  // ── LOGOUT ───────────────────────────────────────────
  // Removes the token and navigates back to login.
  logout(): void {
    localStorage.removeItem(this.TOKEN_KEY);
    this.router.navigate(['/login']);
  }

  // ── TOKEN HELPERS ────────────────────────────────────
  storeToken(token: string): void {
    localStorage.setItem(this.TOKEN_KEY, token);
  }

  getToken(): string | null {
    return localStorage.getItem(this.TOKEN_KEY);
  }

  // isLoggedIn checks whether a token exists in localStorage.
  // This is used by the AuthGuard to decide if a route is accessible.
  isLoggedIn(): boolean {
    return !!this.getToken(); // !! converts the value to a boolean
  }
}
