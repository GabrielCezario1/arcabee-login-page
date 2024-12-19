import { CommonModule } from '@angular/common';
import { Component, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import * as CryptoJS from 'crypto-js'; 


@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule,CommonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit {
 
  loginForm!: FormGroup;
  loginsValidados = {Username:'gabriel',encryptedPassword:"4bfd772ec3cf0f0e2c121293557e1bb4bf342289c069f015911072cd27e74f37"};
  
  constructor(private fb: FormBuilder, 
              private router: Router,
              private toastr: ToastrService) {}

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  onSubmit(): void {
    if (this.loginForm.valid) {
      const { username, password } = this.loginForm.value;

      const encryptedPassword = CryptoJS.SHA256(password).toString();

      if (
        username === this.loginsValidados.Username &&
        encryptedPassword === this.loginsValidados.encryptedPassword
      ) {
        this.router.navigate(['/home']);
      } else {
        this.toastr.error('Usuário ou senha inválidos!', 'Erro de Login');
      }
    }
  }
}