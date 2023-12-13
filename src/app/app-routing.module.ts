import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthModule } from './auth/auth.module';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { SubjectsComponent } from './teacher/subjects/subjects.component';
import { NewExamComponent } from './teacher/new-exam/new-exam.component';
import { TeacherModule } from './teacher/teacher.module';
import { ExamQuestionsComponent } from './student/exam-questions/exam-questions.component';
import { StudentModule } from './student/student.module';
import { StudentsListComponent } from './teacher/students-list/students-list.component';


const routes: Routes = [
  { path: 'auth', component: LoginComponent },
  { path: 'auth/register', component: RegisterComponent },
  { path: 'teacher/subject', component: SubjectsComponent },
  { path: 'teacher/exam', component: NewExamComponent },
  { path: 'student/exam/:id', component: ExamQuestionsComponent },
  { path: 'teacher/list', component: StudentsListComponent },
  { path: '', redirectTo: '/auth', pathMatch: 'full' },
  { path: '**', redirectTo: '/auth', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes),AuthModule,TeacherModule,StudentModule],
  exports: [RouterModule]
})
export class AppRoutingModule { }
