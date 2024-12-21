import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AppService } from '../../app.service';
@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule,CommonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit {
 
  loginForm!: FormGroup;
  
  constructor(private fb: FormBuilder, 
              private router: Router,
              private toastr: ToastrService,
              private appService: AppService) {}

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  onSubmit(): void {
    const { username, password } = this.loginForm.value;

    if (this.appService.login(username, password)) {
      this.router.navigate(['/home']);
    } else {
      this.toastr.error('Usuário ou senha inválidos.', 'Erro no Login');
    }
  }
}