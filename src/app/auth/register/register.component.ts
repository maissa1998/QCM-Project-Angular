import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgForm } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { ToastPackage, ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  
  userForm!:FormGroup;
  students:any[] = [];

  constructor(private fb:FormBuilder,private service:AuthService,private router:Router,private toaster:ToastrService){}
  ngOnInit(): void {
    this.createForm()
    this.getStudents()
  }

  createForm() {
    this.userForm = this.fb.group({
      username:['' , [Validators.required]],
      email:['' , [Validators.required , Validators.email]],
      password:['' , [Validators.required]],
      confirmPassword:['' , [Validators.required]],
    })
  }

  getStudents(){
    this.service.getUsers('Student').subscribe((res:any) => {
      this.students = res
    })
  }

  passwordMatchValidator(formGroup: FormGroup) {
    const password = formGroup.get('password')?.value;
    const confirmPassword = formGroup.get('confirmPassword')?.value;

    return password === confirmPassword ? null : { passwordMismatch: true };
  }
  
  submit(){
    const model = {
      username:this.userForm.value.username,
      email:this.userForm.value.email,
      password:this.userForm.value.password
    }
    let index = this.students.findIndex(item => item.email == this.userForm.value.email)
    if(index !== -1){
      this.toaster.error("Email already exists","", {
        disableTimeOut: false,
        titleClass: "toastr_title",
        messageClass: "toastr_message",
        timeOut:5000,
        closeButton: true, 
      })
    }else{
      this.service.createUser(model).subscribe(res => {
        this.toaster.success("Account created !","", {
          disableTimeOut: false,
          titleClass: "toastr_title",
          messageClass: "toastr_message",
          timeOut:5000,
          closeButton: true, 
        })
        this.router.navigate(['/login'])
      })
    }    
  }

}
