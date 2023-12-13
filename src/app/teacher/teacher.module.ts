import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NewExamComponent } from './new-exam/new-exam.component';
import { SubjectsComponent } from './subjects/subjects.component';
import { RouterModule, Routes } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatRadioModule } from '@angular/material/radio';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatStepperModule } from '@angular/material/stepper';
import { NavigationModule } from '../navigation/navigation.module';
import { StudentComponent } from './student/student.component';
import { StudentsListComponent } from './students-list/students-list.component';


const teacherRoutes: Routes = [
  { path: 'subject', component: SubjectsComponent },
  { path: 'exam', component: NewExamComponent },
  { path: 'list', component: StudentsListComponent },


];

@NgModule({
  declarations: [
    NewExamComponent,
    SubjectsComponent,
    StudentComponent,
    StudentsListComponent
  ],
  imports: [
    CommonModule,
    MatStepperModule,
    MatRadioModule,
    MatFormFieldModule,
    MatInputModule,
    NavigationModule,
    ReactiveFormsModule,
    RouterModule.forChild(teacherRoutes),
  ]
})
export class TeacherModule { }
