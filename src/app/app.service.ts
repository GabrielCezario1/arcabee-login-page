import { Injectable } from '@angular/core';
import * as CryptoJS from 'crypto-js';

@Injectable({
  providedIn: 'root'
})
export class AppService {

  private mockData: { username: string; email: string; encryptedPassword: string }[] = [
    { username: 'gabriel', email: 'gabriel@earcabee.com', encryptedPassword:'4bfd772ec3cf0f0e2c121293557e1bb4bf342289c069f015911072cd27e74f37' }
  ];

  constructor() { }

  cadastrarUsuario(username: string, email: string, encryptedPassword: string): void {
    this.mockData.push({ username, email, encryptedPassword });
    localStorage.setItem('users', JSON.stringify(this.mockData));
  }

  login(username: string, password: string): boolean {
    const encryptedPassword = CryptoJS.SHA256(password).toString();
    const users = JSON.parse(localStorage.getItem('users') || '[]');

    return users.some(
      (user: any) => user.username === username && user.encryptedPassword === encryptedPassword
    );
  }
}
