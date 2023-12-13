import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm!: FormGroup;
  user: any[] = [];
  selectedRole: string = 'Student';
  roles: any = [
    'Student',
    'Teacher'
  ];

  constructor(private fb: FormBuilder, private service: AuthService, private router: Router, private toaster: ToastrService) { }

  ngOnInit(): void {
    this.getUsers();
    this.createForm()
  }

  /*createForm() {
    this.loginForm = this.fb.group({
      type:[this.type],
      email:['' , [Validators.required , Validators.email]],
      password:['' , [Validators.required]],      
    })
  }*/
  createForm() {
    this.loginForm = this.fb.group({
      type: [this.selectedRole],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
    });
    console.log('Initial type value:', this.selectedRole);
  }

  /*getUsers(){
    this.service.getUsers(this.type).subscribe((res:any) => {
      this.students = res
    })
  }*/
  getUsers() {
    if (this.selectedRole) {
      this.service.getUsers(this.selectedRole).subscribe(
        (res: any) => {
          this.user = res;
        },
        (error) => {
          console.error(`Error fetching users for type ${this.selectedRole}:`, error);
        }
      );
    }
  }

  getRole(event: any) {
    this.selectedRole = event.target.value;
    console.log('Selected type:', this.selectedRole);
    this.getUsers()
  }

  submit() {

    let index = this.user.findIndex(item => item.email == this.loginForm.value.email && item.password == this.loginForm.value.password)
    if (index == -1) {
      this.toaster.error("Email or password is incorrect", "", {
        disableTimeOut: false,
        titleClass: "toastr_title",
        messageClass: "toastr_message",
        timeOut: 5000,
        closeButton: true,
      })
    } else {
      const model = {
        username: this.user[index].username,
        role: this.selectedRole,
        userId: this.user[index].id
      }
      this.service.login(model).subscribe(res => {
        this.service.user.next(res)
        this.toaster.success("Welcome " + model.username, "", {
          disableTimeOut: false,
          titleClass: "toastr_title",
          messageClass: "toastr_message",
          timeOut: 5000,
          closeButton: true,
        })
        this.router.navigate(['/teacher/subject'])
      })
    }
  }
}
