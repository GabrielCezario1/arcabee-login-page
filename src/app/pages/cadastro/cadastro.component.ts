import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import * as CryptoJS from 'crypto-js'; 
import { AppService } from '../../app.service';

@Component({
  selector: 'app-cadastro',
  standalone: true,
  imports: [ReactiveFormsModule,CommonModule],
  templateUrl: './cadastro.component.html',
  styleUrl: './cadastro.component.css'
})

export class CadastroComponent implements OnInit {

  cadastroForm!:FormGroup;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private toastr: ToastrService,
    private appService:AppService
  ) {}

  ngOnInit(): void {
    this.cadastroForm = this.fb.group({
      username: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(20)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', [Validators.required],]
    }, { validator: this.passwordMatchValidator });
  }

  passwordMatchValidator(form: FormGroup): null | { mismatch: boolean } {
    const password = form.get('password')?.value;
    const confirmPassword = form.get('confirmPassword')?.value;
    return password === confirmPassword ? null : { mismatch: true };
  }

  onSubmit(): void {
    if (this.cadastroForm.valid) {
      const { username, email, password } = this.cadastroForm.value;
      const encryptedPassword = CryptoJS.SHA256(password).toString();
      this.appService.cadastrarUsuario(username, email, encryptedPassword);
      this.toastr.success('Cadastro realizado com sucesso!', 'Sucesso');
      this.router.navigate(['/login']);
    } else {
      this.toastr.error('Por favor, preencha os campos corretamente.', 'Erro no Cadastro');
    }
  }
}


