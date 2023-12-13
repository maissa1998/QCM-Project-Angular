import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/auth/services/auth.service';
import { Subject } from 'src/app/model/subject';
import { TeacherService } from 'src/app/teacher/services/teacher.service';

@Component({
  selector: 'app-exam-questions',
  templateUrl: './exam-questions.component.html',
  styleUrls: ['./exam-questions.component.css']
})
export class ExamQuestionsComponent implements OnInit{

  //get subject id
  id:any;
  subject!:Subject;
  user:any;
  studentInfo:any;
  totalResult:number=0;
  showResult:boolean=false;
  userSubjects:any []=[];
  checkExam:boolean = true;
  constructor(private route:ActivatedRoute,private auth:AuthService,private service:TeacherService,private toaster:ToastrService){
    this.id = this.route.snapshot.paramMap.get('id')
    this.getSubject()
    this.getLogedInUse()
  }
  ngOnInit(): void {
  }
  getSubject(){
    this.service.getSubjectsById(this.id).subscribe(res =>{
      this.subject = res
    })
  }

  deleteQuestion(index:number){
    this.subject.questions.splice(index,1)
    const model = new Subject(this.subject.name, this.subject.questions);
    this.service.updateSubject(model,this.id).subscribe(res =>{
      this.toaster.success("Deleted successfully")
    })
  }

  getLogedInUse(){//for user role
    this.auth.getRole().subscribe(res =>{
      this.user = res
      this.getUserData()
    })
  } 

  getUserData(){
    this.auth.getStudentById(this.user.userId).subscribe((res:any) =>{
      this.studentInfo = res
      this.userSubjects = res?.subjects ? res?.subjects : [];
      this.checkStudentExam()
    })
  }

  getAnswer(event:any){
    let value = event.value,
      questionIndex = event.source.name
      this.subject.questions[questionIndex].studentAnswer = value//adding studentAnswer to Questions table 
    console.log(this.subject.questions)
  }
  getResult(){
    this.totalResult = 0
    for(let x in this.subject.questions){
      if(this.subject.questions[x].studentAnswer == this.subject.questions[x].correctAnswer){
        this.totalResult++
      }
    }
    this.showResult=true
    this.userSubjects.push({
        name:this.subject.name,
        id:this.subject.id,
        result:this.totalResult,
    })
    const model = {
      username: this.studentInfo.username,
      email: this.studentInfo.email,
      password: this.studentInfo.password,
      subjects:this.userSubjects
    }
    this.auth.updateStudent(this.user.userId,model).subscribe(res =>{
      this.toaster.success("Result saved!")
    })
    console.log(this.totalResult)
  }

  checkStudentExam(){//student passed the exam or not
    for(let x in this.userSubjects){
      if(this.userSubjects[x].id == this.id){
        this.totalResult = this.userSubjects[x].result
        this.checkExam = false
        if(this.user.role == 'Student'){
          this.toaster.warning("You already did this QCM test")
        }
        
      }
    }
    console.log(this.checkExam)
  }
}
