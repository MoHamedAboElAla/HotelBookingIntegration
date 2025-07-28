import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormsModule, ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule } from '@angular/router'; // أضف هذا السطر


@Component({
  standalone: true,
  selector: 'app-login',
  imports: [CommonModule, FormsModule, ReactiveFormsModule, MatFormFieldModule, MatInputModule, MatButtonModule, MatIconModule,RouterModule ],
  templateUrl: './login.html',
  styleUrl: './login.css'
})
export class Login {
  loginForm: FormGroup;
  hide = true;
  loading = false;
  error: string | null = null;

  private authService = inject(AuthService);
  private router = inject(Router);
  private fb = inject(FormBuilder);

  constructor() {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  login() {
  if (this.loginForm.invalid) return;

  this.loading = true;
  this.error = null;

  this.authService.login(this.loginForm.value).subscribe({
    next: (res) => {
      localStorage.setItem('token', res.token);

      const role = this.authService.getUserRole();

      if (role === 'Admin') {
        this.router.navigateByUrl('/dashboard');
      } else {
        this.router.navigateByUrl('/home');
      }
    },
    error: (err) => {
      this.error = err.error?.message || 'Login failed. Please try again.';
      this.loading = false;
    },
    complete: () => {
      this.loading = false;
    }
  });
}
}