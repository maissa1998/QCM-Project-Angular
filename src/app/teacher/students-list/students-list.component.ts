import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/auth/services/auth.service';

@Component({
  selector: 'app-students-list',
  templateUrl: './students-list.component.html',
  styleUrls: ['./students-list.component.css']
})
export class StudentsListComponent implements OnInit{

  constructor(private auth:AuthService){}
  dataTable : any [] = [];
  dataSource:any;

  ngOnInit(): void {
    this.getStudents()
  }
  getStudents(){
    this.auth.getUsers('Student').subscribe((res:any) =>{
      this.dataSource = res?.map((student:any) => {
        if(student?.subjects){
          return student?.subjects?.map((sub:any) =>{
            return {
              name:student.username,
              subject:sub.name,
              result:sub.result
            }
          })//map() : table student
        }else{
          return [{
            name:student.username,
            subject:"-",
            result:"-"
        }]
        }
        
      })
      this.dataTable = [];
      this.dataSource.forEach((item:any)=>{
        item.forEach((subItem:any) =>{
          this.dataTable.push({
            name:subItem.name,
            subject:subItem.subject,
            result:subItem.result
          })
        })
      })
      console.log(this.dataTable)
    })    
  } 

}
