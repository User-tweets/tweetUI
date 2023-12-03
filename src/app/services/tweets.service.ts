import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TweetsService {

  constructor(private http:HttpClient) { }

  baseUrl = "http://localhost:8080";  

  getAllTweets(){
    
    return this.http.get(`${this.baseUrl}/all` );
  }
  getTweetByUsername(username:string){
    
    return this.http.get(`${this.baseUrl}/${username}` )
  }

  saveTweet(username:string,tweet:any){
    
    return this.http.post(`${this.baseUrl}/${username}/add`,tweet );
  }

  getUsername(){
    return localStorage.getItem('username');
  }

  likeTweet(username:string,id:string){
    
    return this.http.post(`${this.baseUrl}/${username}/like/${id}`,null );
  }

  deleteTweet(id:string,username:string){
    
    return this.http.delete(`${this.baseUrl}/${username}/delete/${id}` );
  }

  updateTweet(id:string,username:string,body:any){
    
    return this.http.put(`${this.baseUrl}/${username}/update/${id}`,body);
  }
  replyTweet(id:string,username:string,body:any){
    
    return this.http.post(`${this.baseUrl}/${username}/reply/${id}`,body );
  }
}