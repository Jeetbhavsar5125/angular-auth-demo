import { Injectable } from '@angular/core';
import axiosInstance from '../interceptors/auth.interceptor';
import { User } from '../models/user.model';

// DashboardService is responsible for all API calls
// that the Dashboard component needs.
// It will be created by Developer B (Account 2) in the dashboard feature branch.
// For now we define the service shell so routing and the guard can be wired up.
@Injectable({
  providedIn: 'root',
})
export class DashboardService {
  // Fetches the currently authenticated user's profile.
  // The Axios interceptor automatically adds the Authorization header —
  // we don't need to write it here at all.
  async getAuthenticatedUser(): Promise<User> {
    const response = await axiosInstance.get<User>('/auth/me');
    return response.data;
  }
}
