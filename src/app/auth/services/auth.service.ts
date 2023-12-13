import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject, tap } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http:HttpClient) { }
  user = new Subject()

  createUser(model:any){
    return this.http.post("http://localhost:3000/Student",model)
  }  
  
  login(model:any){
    return this.http.put("http://localhost:3000/login/1",model)
  }
  
  getUsers(type:string){
    return this.http.get("http://localhost:3000/"+type)
    //type = student or teacher
  }    

  getRole() {
    return this.http.get("http://localhost:3000/login/1")
  }
  getStudentById(id:number){
    return this.http.get("http://localhost:3000/Student/"+id);
  }
  updateStudent(id:number,model:any){
    return this.http.put("http://localhost:3000/Student/"+id,model);
  }

}
