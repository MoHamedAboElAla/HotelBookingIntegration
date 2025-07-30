import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { AuthService, ProfileDto } from '../../services/auth.service';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.html',
  imports: [CommonModule, ReactiveFormsModule, FormsModule],
  styleUrls: ['./profile.css']
})
export class Profile implements OnInit {

  changePasswordForm!: FormGroup;
  profileForm!: FormGroup;
  loading = true;
  successMessage = '';
  errorMessage = '';
  showPasswordForm = false;
  newPassword = '';

  constructor(
    private authService: AuthService,
    private fb: FormBuilder,
    private cdRef: ChangeDetectorRef
  ) { }

  ngOnInit(): void {
    
    this.loadProfile();

    this.changePasswordForm = this.fb.group({
  currentPassword: ['', Validators.required],
  newPassword: ['', [Validators.required, Validators.minLength(6)]],
  confirmPassword: ['', Validators.required]
}, { validators: this.passwordsMatchValidator });

    
  }
  passwordsMatchValidator(group: FormGroup) {
  const newPassword = group.get('newPassword')?.value;
  const confirmPassword = group.get('confirmPassword')?.value;
  return newPassword === confirmPassword ? null : { passwordsMismatch: true };
}

  loadProfile() {
    this.authService.getProfile().subscribe({
      next: (data: ProfileDto) => {
        this.profileForm = this.fb.group({
          name: [data.name, [Validators.required, Validators.minLength(3)]],
          email: [data.email, [Validators.required, Validators.email]],
          phoneNumber: [data.phoneNumber, [Validators.required, Validators.pattern(/^01[0125][0-9]{8}$/)]],
          commercialRegister: [data.commercialRegister],
          taxVisa: [data.taxVisa]
        });
        this.loading = false;
        this.cdRef.detectChanges();
      },
      error: () => {
        this.errorMessage = 'Failed to load profile data.';
        this.loading = false;
        this.cdRef.detectChanges();
      }
    });
  }

  onUpdateProfile() {
    if (this.profileForm.invalid) return;

    this.authService.updateProfile(this.profileForm.value).subscribe({
      next: () => {
        this.successMessage = 'Profile updated successfully.';
        this.errorMessage = '';
        this.cdRef.detectChanges();
      },
      error: () => {
        this.errorMessage = 'An error occurred while updating the profile.';
        this.successMessage = '';
        this.cdRef.detectChanges();
      }
    });
  }

  onUpdatePassword() {
  if (this.changePasswordForm.invalid) return;

  const formValue = this.changePasswordForm.value;

  const body = {
    currentPassword: formValue.currentPassword,
    newPassword: formValue.newPassword
  };

  this.authService.updatePassword(body).subscribe({
    next: () => {
      this.successMessage = 'Password changed successfully.';
      this.errorMessage = '';
      this.changePasswordForm.reset();
      this.showPasswordForm = false;
      this.cdRef.detectChanges();
    },
    error: () => {
      this.errorMessage = 'An error occurred while changing the password.';
      this.successMessage = '';
      this.cdRef.detectChanges();
    }
  });
}
}