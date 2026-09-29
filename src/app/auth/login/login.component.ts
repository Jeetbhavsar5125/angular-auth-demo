import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  imports: [FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  // These properties are bound to the form inputs via [(ngModel)]
  username = '';
  password = '';

  // UI state flags
  isLoading = false;    // Shows a spinner while the API call is in progress
  errorMessage = '';    // Holds the error text to display if login fails

  constructor(
    private authService: AuthService,
    private router: Router
  ) {
    // If user is already logged in, redirect them to dashboard
    if (this.authService.isLoggedIn()) {
      this.router.navigate(['/dashboard']);
    }
  }

  // Called when the login form is submitted
  async onLogin(): Promise<void> {
    // Basic validation — ensure fields are not empty
    if (!this.username.trim() || !this.password.trim()) {
      this.errorMessage = 'Please enter both username and password.';
      return;
    }

    this.isLoading = true;
    this.errorMessage = ''; // Clear any previous error

    try {
      await this.authService.login({
        username: this.username,
        password: this.password,
      });
      // If login succeeds, AuthService will navigate to /dashboard.
      // We don't need to do anything here.
    } catch (error: any) {
      // Show a friendly error message depending on the type of failure
      if (error.response) {
        // The server responded with an error status (e.g., 400 Bad Request)
        const status = error.response.status;
        if (status === 400 || status === 401) {
          this.errorMessage = 'Invalid username or password. Please try again.';
        } else {
          this.errorMessage = `Server error (${status}). Please try again later.`;
        }
      } else if (error.request) {
        // The request was made but no response was received (network issue)
        this.errorMessage = 'Cannot connect to the server. Check your internet connection.';
      } else {
        // Something unexpected went wrong
        this.errorMessage = 'An unexpected error occurred. Please try again.';
      }
    } finally {
      this.isLoading = false;
    }
  }

  // Quick-fill demo credentials for easy testing
  fillDemoCredentials(): void {
    this.username = 'emilys';
    this.password = 'emilyspass';
  }
}
