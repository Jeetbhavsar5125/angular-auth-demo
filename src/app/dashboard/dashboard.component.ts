import { Component, OnInit, inject } from '@angular/core';
import { DashboardService } from '../services/dashboard.service';
import { AuthService } from '../auth/auth.service';
import { User } from '../models/user.model';

@Component({
  selector: 'app-dashboard',
  imports: [],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css',
})
export class DashboardComponent implements OnInit {
  private dashboardService = inject(DashboardService);
  private authService = inject(AuthService);

  user: User | null = null;
  isLoading = true;
  errorMessage = '';

  ngOnInit(): void {
    this.loadUser();
  }

  async loadUser(): Promise<void> {
    try {
      this.user = await this.dashboardService.getAuthenticatedUser();
    } catch (error: any) {
      if (error.response?.status === 401) {
        this.errorMessage = 'Session expired. Please login again.';
        this.authService.logout();
      } else {
        this.errorMessage = 'Failed to load user data.';
      }
    } finally {
      this.isLoading = false;
    }
  }

  logout(): void {
    this.authService.logout();
  }
}
