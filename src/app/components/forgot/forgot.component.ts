import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { LoginService } from '../../services/login.service';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-forgot',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, MatFormFieldModule, MatInputModule, MatButtonModule, RouterLink, RouterLinkActive, RouterOutlet],
  templateUrl: './forgot.component.html',
  styleUrl: './forgot.component.css'
})
export class ForgotComponent implements OnInit {
  credentials = new FormGroup({
    userId: new FormControl('', [Validators.required, Validators.email]),
    number: new FormControl('', [
      Validators.required,
      Validators.min(1000000000),
      Validators.max(9999999999),
    ]),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(6),
      Validators.maxLength(12),
    ]),
    confirmPassword: new FormControl('', [
      Validators.required,
      Validators.minLength(6),
      Validators.maxLength(12),
    ]),
  });
  public get userId() {
    return this.credentials.get('userId');
  }
  public get number() {
    return this.credentials.get('number');
  }
  public get password() {
    return this.credentials.get('password');
  }
  public get confirmPassword() {
    return this.credentials.get('confirmPassword');
  }
  onSubmit() {
    console.log(this.credentials.value);
    if (
      this.credentials.value.password != this.credentials.value.confirmPassword
    ) {
      alert('password mismatch');
    } else {
      this.loginService
        .forgotPassword(
          this.credentials.value.userId!,
          this.credentials.value.password
        )
        .subscribe(
          (response) => {
            console.warn(response);
            window.location.href = '/';
          },
          (error) => {
            console.warn(error);
          }
        );
    }
  }

  passwordMismatch(): boolean {
    console.warn(this.credentials.value.password);
    console.warn(this.credentials.value.confirmPassword);

    if (
      this.credentials.value.password != this.credentials.value.confirmPassword
    ) {
      console.log('inside if');
      return true;
    }
    return false;
  }

  constructor(private loginService: LoginService) {}

  ngOnInit(): void {}
}