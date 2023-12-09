import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  // baseUrl = "http://localhost:8080";
  baseUrl = 'https://iqwr4l8g1i.execute-api.ap-south-1.amazonaws.com/Prod';

  constructor(private http:HttpClient) { }

  searchUser(userName:string){
    
    return this.http.get(`${this.baseUrl}/user/search/${userName}`);
  }
  getAllUsers(){
    
    return this.http.get(`${this.baseUrl}/user/all`);
  }
}