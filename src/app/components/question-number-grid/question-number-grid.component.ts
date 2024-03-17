import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
import { RouterModule } from "@angular/router";
import {
  ButtonModule,
  CardModule,
  ContainerComponent,
  GridModule,
} from "@coreui/angular";
import { ExamService } from "../../services/exam.service";

@Component({
  selector: "app-question-number-grid",
  standalone: true,
  imports: [
    RouterModule,
    ContainerComponent,
    GridModule,
    ButtonModule,
    CardModule,
  ],
  templateUrl: "./question-number-grid.component.html",
  styleUrl: "./question-number-grid.component.scss",
})
export class QuestionNumberGridComponent implements OnInit {
  questionCount: number = 20;
  @Input() timeLeft: string = "";
  @Input() answeredCount: number = 0;
  @Input() notAnsweredCount: number = 0;
  @Input() passMarkPercentage: number = 0;
  @Input() allowedMistakesCount: number = 0;
  @Input() examTimeInMinutes: number = 0;

  @Output() questionNumberClickedEvent = new EventEmitter<number>();

  questionIndecies: number[] = [];

  constructor(public examService: ExamService) {}

  ngOnInit(): void {
    for (let i = 0; i < this.questionCount; i++) {
      this.questionIndecies.push(i);
    }
  }

  onCLickQuestionNumber(questionNumber: number) {
    this.questionNumberClickedEvent.emit(questionNumber);
  }
}
