import { Component, Input, OnInit } from '@angular/core';
import { AuthService } from 'src/app/auth/services/auth.service';

@Component({
  selector: 'app-student',
  templateUrl: './student.component.html',
  styleUrls: ['./student.component.css']
})
export class StudentComponent  implements OnInit{

  @Input() s!:any;
  @Input() index!: number;

  ngOnInit(): void {
   
  }

 

  

}
