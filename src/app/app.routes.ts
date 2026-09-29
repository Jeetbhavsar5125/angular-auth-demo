import { Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { authGuard } from './guards/auth.guard';

// Route definitions for the entire application.
// Angular Router reads this array to decide which component to show
// based on the current URL.
export const routes: Routes = [
  // ── Public route ───────────────────────────────────
  // /login is accessible to everyone — no guard needed.
  {
    path: 'login',
    component: LoginComponent,
  },

  // ── Protected route ────────────────────────────────
  // /dashboard is protected by authGuard.
  // If the user has no token, authGuard redirects them to /login.
  {
    path: 'dashboard',
    component: DashboardComponent,
    canActivate: [authGuard],
  },

  // ── Default redirect ───────────────────────────────
  // If someone navigates to the root /, redirect to /login.
  { path: '', redirectTo: '/login', pathMatch: 'full' },

  // ── Wildcard route ─────────────────────────────────
  // Any unknown URL (e.g. /xyz) redirects to /login.
  { path: '**', redirectTo: '/login' },
];
