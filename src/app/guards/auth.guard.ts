// =====================================================
// AUTH GUARD — Protects /dashboard from unauthenticated users
// =====================================================
//
// WHAT IS A ROUTE GUARD?
// A route guard is a function that Angular calls BEFORE
// navigating to a route. It decides: "Should I allow this
// navigation or block it?"
//
// HOW IT WORKS:
// 1. User tries to navigate to /dashboard
// 2. Angular calls this guard FIRST
// 3. Guard checks: is there a token in localStorage?
//    - YES → allow navigation (return true)
//    - NO  → block and redirect to /login
//
// This prevents unauthenticated users from ever seeing
// the dashboard, even if they type /dashboard in the URL.
// =====================================================

import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const authGuard: CanActivateFn = () => {
  const router = inject(Router);

  const token = localStorage.getItem('accessToken');

  if (token) {
    // Token exists → user is authenticated → allow access
    return true;
  }

  // No token → user is not authenticated → redirect to /login
  // createUrlTree creates a navigation instruction that Angular
  // uses to redirect without adding a history entry.
  return router.createUrlTree(['/login']);
};
