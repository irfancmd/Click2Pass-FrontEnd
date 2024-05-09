import { Component, EventEmitter, Input, OnInit, OnChanges, Output, SimpleChanges } from "@angular/core";
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
export class QuestionComponent implements OnInit, OnChanges {
  @Input() question?: Question;
  @Input() questionIndex: number = 0;
  @Input() totalQuestions: number = 0;

  @Output() questionAnsweredEvent = new EventEmitter<{
    index: number;
    answered: boolean;
    isCorrect: boolean;
  }>();

  @Output() questionNavigationEvent = new EventEmitter<number>();

  readonly icons = { cilArrowLeft };

  public questionForm = new FormGroup({
    answer: new FormControl(null),
  });

  public reviewLater: boolean = false;

  constructor(public examService: ExamService) {}

  ngOnInit(): void {
  }

  ngOnChanges(changes: SimpleChanges): void {
    console.log(this.examService.answers);

    if(changes["questionIndex"].currentValue != changes["questionIndex"].previousValue) {
      if(this.examService.answers[this.questionIndex]) {
        this.questionForm.controls.answer.setValue(this.examService.answers[this.questionIndex]);
        this.questionForm.controls.answer.disable({ onlySelf: true, emitEvent: false });
      } else {
        this.questionForm.controls.answer.enable({ onlySelf: true, emitEvent: false });
      }
    }
  }

  onOptionClicked() {
    // Only for chapter wise and random practice
    if(this.examService.isPracticeModeON) {
      this.onQuestionAnswered(this.questionIndex, false);
      this.questionForm.controls.answer.disable({ onlySelf: true, emitEvent: false });
    }
  }



  onQuestionAnswered(questionIndex: number, navigateNext: boolean = true) {
    console.log("Answered " + this.questionForm.controls.answer.value);
        console.log(this.questionForm.value);

    let isCorrect = false;
    let answered = this.questionForm.controls.answer.value != null;
    this.examService.answers[questionIndex] =
      this.questionForm.controls.answer.value;

    if (
      this.question &&
      this.question.correctAnswerText == this.questionForm.controls.answer.value
    ) {
      isCorrect = true;
    }

    if(navigateNext) {
      // this.questionForm.controls.answer.setValue("0");
      this.questionForm.reset();
      this.reviewLater = false;

      this.questionAnsweredEvent.emit({
        index: this.questionIndex,
        answered,
        isCorrect,
      });

      // Add practice mode logic
      // Add finish exam logic
    }
  }

  public onClickNavigate(questionIndex: number) {
    if (
      !this.examService.reviewLater[this.questionIndex] &&
      this.questionForm.controls.answer.value != null &&
      !this.examService.isPracticeModeON &&
      this.examService.answers[this.questionIndex] == null
    ) {
      alert(
        "Please click on the “Confirm Submission” button to save your answer."
      );
    } else {
      // if (this.examService.answers[questionIndex]) {
        this.questionForm.controls.answer.setValue(
          this.examService.answers[questionIndex]
        );
        this.reviewLater = this.examService.reviewLater[questionIndex];
      // }

      this.questionForm.reset();
      this.reviewLater = false;

      this.questionNavigationEvent.emit(questionIndex);
    }
  }

  onReviewStatusChange(event: any) {
    this.examService.reviewLater[this.questionIndex] = this.reviewLater;
  }
}
