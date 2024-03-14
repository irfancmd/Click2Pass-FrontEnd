import { Component, EventEmitter, Input, Output } from "@angular/core";
import { RouterModule } from "@angular/router";
import {
  ButtonModule,
  CardModule,
  ContainerComponent,
  FormModule,
  GridModule,
} from "@coreui/angular";
import { IconModule, IconSetService } from "@coreui/icons-angular";
import { cilArrowLeft } from "@coreui/icons";
import { Question } from "../../models/question.models";
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
} from "@angular/forms";
import { ExamService } from "../../services/exam.service";

@Component({
  selector: "app-question",
  standalone: true,
  imports: [
    RouterModule,
    ContainerComponent,
    GridModule,
    IconModule,
    ButtonModule,
    CardModule,
    FormModule,
    ReactiveFormsModule,
    FormsModule,
  ],
  templateUrl: "./question.component.html",
  styleUrl: "./question.component.scss",
  providers: [IconSetService],
})
export class QuestionComponent {
  @Input() question?: Question;
  @Input() questionIndex: number = 0;
  @Input() totalQuestions: number = 0;

  @Output() questionAnsweredEvent = new EventEmitter<{
    index: number;
    answered: boolean;
    previous: boolean;
    isCorrect: boolean;
    reviewLater: boolean;
    finishExam: boolean;
  }>();

  @Output() questionNavigationEvent = new EventEmitter<number>();

  readonly icons = { cilArrowLeft };

  public questionForm = new FormGroup({
    answer: new FormControl("0"),
  });

  public reviewLater: boolean = false;

  constructor(private examService: ExamService) {}

  onQuestionAnswered(previous: boolean, finishExam: boolean) {
    let isCorrect = false;
    let answered = this.questionForm.controls.answer.value != "0";
    let reviewLater = this.reviewLater;

    if (
      this.question &&
      this.question.correctAnswerText == this.questionForm.controls.answer.value
    ) {
      isCorrect = true;
    }

    this.questionAnsweredEvent.emit({
      index: this.questionIndex,
      answered,
      previous,
      isCorrect,
      reviewLater,
      finishExam,
    });

    this.questionForm.controls.answer.setValue("0");
    this.reviewLater = false;

    // Add practice mode logic
    // Add finish exam logic
  }

  onClickNavigate(questionIndex: number) {
    let reviewLater = this.reviewLater;

    if (
      !this.examService.isConfirmed[this.questionIndex] &&
      this.questionForm.controls.answer.value != "0"
    ) {
      alert(
        "Please click on the “Confirm Submission” button to save your answer."
      );
    } else {
      if (questionIndex < this.questionIndex && questionIndex >= 0) {
        this.questionNavigationEvent.emit(questionIndex);
      } else if (questionIndex < this.totalQuestions) {
        this.questionNavigationEvent.emit(questionIndex);
      }
    }
  }

  onReviewStatusChange(event: any) {
    this.examService.isConfirmed[this.questionIndex] = this.reviewLater;

    console.log(this.examService.isConfirmed);
  }
}
