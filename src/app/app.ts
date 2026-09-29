import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

// The root App component is intentionally minimal.
// Its only job is to render <router-outlet> — a placeholder
// where Angular will inject whichever component matches the current URL.
// (/login → LoginComponent, /dashboard → DashboardComponent)
@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  template: `<router-outlet />`,
  styles: [],
})
export class App {}
