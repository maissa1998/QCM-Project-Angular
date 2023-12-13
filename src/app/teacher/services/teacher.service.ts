import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Subject } from 'src/app/model/subject';

@Injectable({
  providedIn: 'root'
})
export class TeacherService {

  constructor(private http:HttpClient) { }

  createSubject(model:Subject): Observable<any>{
    return this.http.post("http://localhost:3000/Subjects",model);
  }

  updateSubject(model:Subject,id:number): Observable<any>{
    return this.http.put("http://localhost:3000/Subjects/"+id,model);
  }

  getSubjects(): Observable<Subject[]> {
    return this.http.get<Subject[]>("http://localhost:3000/Subjects");
  }

  deleteSubject(id:number): Observable<any>{
    return this.http.delete("http://localhost:3000/Subjects/"+id);
  }

  getSubjectsById(id:number){
    return this.http.get<Subject>("http://localhost:3000/Subjects/"+id);
  }

}
