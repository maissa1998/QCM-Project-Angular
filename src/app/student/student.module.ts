import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ExamQuestionsComponent } from './exam-questions/exam-questions.component';
import { RouterModule, Routes } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatRadioModule } from '@angular/material/radio';
import { NavigationModule } from '../navigation/navigation.module';

const studentRoutes: Routes = [
  { path: 'exam', component: ExamQuestionsComponent }

];

@NgModule({
  declarations: [
    ExamQuestionsComponent
  ],
  imports: [
    CommonModule,
    MatRadioModule,
    MatFormFieldModule,
    MatInputModule,
    NavigationModule,
    ReactiveFormsModule,
    RouterModule.forChild(studentRoutes),
  ]
})
export class StudentModule { }
