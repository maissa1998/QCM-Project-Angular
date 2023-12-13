import { Component, OnInit } from '@angular/core';
import { TeacherService } from '../services/teacher.service';
import { Subject } from 'src/app/model/subject';
import { AuthService } from 'src/app/auth/services/auth.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-subjects',
  templateUrl: './subjects.component.html',
  styleUrls: ['./subjects.component.css']
})
export class SubjectsComponent implements OnInit{

  constructor(private service:TeacherService,private toaster:ToastrService, private auth:AuthService){}
  subjects: Subject[] = [];
  user:any = {};
  //user:any = null
  ngOnInit(): void {
    this.getSubjects();
    this.getUserInfo();
    /* this.auth.user.subscribe((res:any) => {
      if(res.role){
        this.user = res
      }      
    }) */
  }

  getSubjects(){
    this.service.getSubjects().subscribe((res:Subject[]) => {
      this.subjects = res
    })
  }

  getUserInfo(){
    this.auth.getRole().subscribe(res =>{
      this.user = res
    })
  } 

  delete(index:number){
    let id = this.subjects[index].id
    this.subjects.splice(index,1)
    this.service.deleteSubject(id).subscribe(res =>{
      this.toaster.success("Deleted successfully")
    })
  }
}
