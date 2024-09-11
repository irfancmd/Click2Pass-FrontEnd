import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import {
  ButtonModule,
  CardModule,
  ContainerComponent,
  GridModule,
  NavModule,
  TabsModule,
} from '@coreui/angular';
import { ExamService } from '../../services/exam.service';
import { cilChevronCircleUpAlt, cilChevronCircleDownAlt } from '@coreui/icons';
import { IconModule } from '@coreui/icons-angular';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-question-number-grid',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    ContainerComponent,
    GridModule,
    ButtonModule,
    CardModule,
    IconModule,
    TabsModule,
    NavModule,
  ],
  templateUrl: './question-number-grid.component.html',
  styleUrl: './question-number-grid.component.scss',
})
export class QuestionNumberGridComponent implements OnInit {
  @Input() totalQuestions: number = 20;
  @Input() timeLeft: string = '';
  @Input() timeLeftInMinutes: number = 0;
  @Input() answeredCount: number = 0;
  @Input() notAnsweredCount: number = 0;
  @Input() passMarkPercentage: number = 0;
  // @Input() allowedMistakesCount: number = 0;
  @Input() examTimeInMinutes: number = 0;
  @Input() currentQuestionIndex: number = 0;

  @Output() questionNumberClickedEvent = new EventEmitter<number>();

  questionIndecies: number[] = [];

  public hideQuestionNumbers: boolean = true;

  readonly icons = { cilChevronCircleUpAlt, cilChevronCircleDownAlt };

  public activeTabPane = 0;

  constructor(public examService: ExamService, private router: Router) {}

  ngOnInit(): void {
    for (let i = 0; i < this.totalQuestions; i++) {
      this.questionIndecies.push(i);
    }
  }

  onCLickQuestionNumber(questionNumber: number) {
    this.questionNumberClickedEvent.emit(questionNumber);
  }

  toggleQuestionNumberVisibility(): void {
    this.hideQuestionNumbers = !this.hideQuestionNumbers;
  }

  getRestartLink(): string {
    switch (this.examService.currentExamCurriculumID) {
      case '5':
        return '/driving';
      default:
        return '/citizenship';
    }
  }

  restartExam() {
    this.router.navigate(['/exam', 'restart'], { skipLocationChange: true });
  }

  onTabChange($event: number) {
    this.activeTabPane = $event;
  }
}
