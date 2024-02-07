import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import {
  ContainerComponent,
  GridModule,
  NavModule,
  TabsModule,
} from '@coreui/angular';
import { QuestionComponent } from '../../components/question/question.component';
import { QuestionNumberGridComponent } from '../../components/question-number-grid/question-number-grid.component';
import { ExamService } from '../../services/exam.service';
import { Exam } from '../../models/exam.model';

@Component({
  selector: 'app-exam',
  standalone: true,
  imports: [
    RouterModule,
    ContainerComponent,
    GridModule,
    NavModule,
    TabsModule,
    QuestionComponent,
    QuestionNumberGridComponent,
  ],
  templateUrl: './exam.component.html',
  styleUrl: './exam.component.scss',
})
export class ExamComponent implements OnInit {
  public examId: number = 0;
  public exam?: Exam;

  public examEndTime = new Date();
  public questionCount = 0;
  public timeLeft = '';
  public answeredCount = 0;
  public notAnsweredCount = 0;
  public passMarkPercentage = 0;
  public allowedMistakesCount = 0;
  public examTimeInMinutes = 0;

  constructor(private examService: ExamService) {}

  ngOnInit(): void {
    this.examService.createNewExam().subscribe((data) => {
      this.examId = data.data;

      // Get the exam object
      this.examService.getExamById(this.examId).subscribe((data) => {
        this.exam = data.data;

        // Set exam deadline
        this.examEndTime = this.exam?.endTime ?? new Date();
        this.examEndTime.setMinutes(this.examEndTime.getMinutes() + 20);
      });
    });
  }
}
