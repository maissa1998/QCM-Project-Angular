import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { TeacherService } from '../services/teacher.service';
import { Subject } from 'src/app/model/subject';

@Component({
  selector: 'app-new-exam',
  templateUrl: './new-exam.component.html',
  styleUrls: ['./new-exam.component.css']
})
export class NewExamComponent implements OnInit{

  name = new FormControl("");
  questionForm!:FormGroup;
  questions:any[] = [];
  correctId:any;
  subjectName = "";
  nextStep = 0;
  startAdd:boolean = false;
  preview:boolean = false;
  idSub:any;
  
constructor(private fb:FormBuilder,private toaster:ToastrService, private service:TeacherService){}

  ngOnInit(): void {
    this.createForm()
  }

  createForm(){
    this.questionForm = this.fb.group({
      question:['', [Validators.required]],
      answer1:['' , [Validators.required]],
      answer2:['' , [Validators.required]],
      answer3:['' , [Validators.required]],
      answer4:['' , [Validators.required]],
      correctAnswer:['']
    })
  }

  createQuestion(){
    if(this.correctId){
      const model = {
        question : this.questionForm.value.question,    
        answer1 : this.questionForm.value.answer1  ,
        answer2 : this.questionForm.value.answer2  , 
        answer3 : this.questionForm.value.answer3  , 
        answer4 : this.questionForm.value.answer4 ,
        correctAnswer:this.questionForm.value[this.correctId]
      }
      this.questions.push(model)
      this.questionForm.reset()
    }else{
      this.toaster.error("You need to chose the correct answer")
    }
    console.log(this.questions)
  }
  //show name when start clicked
  start(){
    if(this.name.value == ""){
      this.toaster.error("Please enter subject name")
    }else{
      this.startAdd = true
      this.subjectName = this.name.value as string;
    }
    if (this.startAdd){
      this.nextStep = 1
    }
  }

  getCorrect(event:any){
    this.correctId = event.value
    console.log(event.value)
  }

  clearForm(){
    this.questionForm.reset()
  }
  cancel(){
    this.questions = []
    this.questionForm.reset()
    this.subjectName = ""
    this.nextStep = 0
    this.startAdd = false
  }
  submit(){
    const model = new Subject(this.subjectName, this.questions);
    if(this.preview){
      this.nextStep = 2
    }else{//no repeat in db
      this.service.createSubject(model).subscribe((res:any) => {
        this.preview = true 
        this.idSub = res.id
      })
    }
  }
  delete(index:number){
    this.questions.splice(index,1)
    const model = new Subject(this.subjectName, this.questions);
    this.service.updateSubject(model,this.idSub).subscribe(res =>{
      this.toaster.success("Deleted successfully")
    })
  }
}

