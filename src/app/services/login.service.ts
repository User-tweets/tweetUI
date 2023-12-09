import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  // baseUrl = 'http://localhost:8080';
  baseUrl = 'https://iqwr4l8g1i.execute-api.ap-south-1.amazonaws.com/Prod';
  cred: any;

  constructor(private http: HttpClient) {}

  getToken(credentials: any) {
    return this.http.post(`${this.baseUrl}/login`, credentials,{headers:{skip:"true"}});
  }
  isLoggedIn() {
    return localStorage.getItem('token') != null;
  }
  logout() {
    localStorage.removeItem('token');
  }
  token() {
    return localStorage.getItem('token');
  }

  registerUser(credentials: any) {
    return this.http.post(`${this.baseUrl}/register`, credentials,{headers:{skip:"true"}});
  }

  forgotPassword(username: string, credentials: any) {
    this.cred = {
      password: credentials,
    };
    return this.http.put(`${this.baseUrl}/${username}/forgot`, this.cred,{headers:{skip:"true"}});
  }
}