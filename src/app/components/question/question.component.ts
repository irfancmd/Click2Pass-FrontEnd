import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  OnChanges,
  Output,
  SimpleChanges,
} from "@angular/core";
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
import { CommonModule } from "@angular/common";

@Component({
  selector: "app-question",
  standalone: true,
  imports: [
    CommonModule,
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
    isCorrect: boolean;
  }>();

  @Output() questionNavigationEvent = new EventEmitter<number>();

  readonly icons = { cilArrowLeft };

  public questionForm = new FormGroup({
    answer: new FormControl(null),
  });

  public isCorrect = false;
  public isOptionCorrect = [false, false, false, false, false, false];
  public reviewLater: boolean = false;

  constructor(public examService: ExamService) {}

  // ngOnInit(): void {
  //   this.questionForm.valueChanges.subscribe((formValue) => {
  //     // Only for chapter wise and random practice
  //     if (this.examService.isPracticeModeON) {
  //       this.onQuestionAnswered(this.questionIndex, false);

  //       this.questionForm.controls.answer.disable({
  //         onlySelf: true,
  //         emitEvent: false,
  //       });

  //       console.log(this.examService.answers);
  //     }
  //   });
  // }

  ngOnChanges(changes: SimpleChanges): void {
    if (this.examService.answers[changes["questionIndex"].currentValue]) {
      this.questionForm.controls.answer.setValue(
        this.examService.answers[changes["questionIndex"].currentValue]
      );
      this.reviewLater =
        this.examService.reviewLater[changes["questionIndex"].currentValue];

      // Disable form when in practice mode
      if (this.examService.isPracticeModeON) {
        this.questionForm.controls.answer.disable({
          onlySelf: true,
          emitEvent: false,
        });
      }
    }
  }

  onFormClick() {
    if (this.examService.isPracticeModeON) {
      this.onQuestionAnswered(this.questionIndex, false);

      this.questionForm.controls.answer.disable({
        onlySelf: true,
        emitEvent: false,
      });
    }
  }

  onQuestionAnswered(questionIndex: number, navigateNext: boolean = true) {
    let answered = this.questionForm.controls.answer.value != null;
    this.examService.answers[questionIndex] =
      this.questionForm.controls.answer.value;

    if (
      this.question &&
      this.question.correctAnswerText == this.questionForm.controls.answer.value
    ) {
      this.isCorrect = true;
    }

    const correctOptions = this.question?.correctAnswerText.split(",");
    this.isOptionCorrect[0] = correctOptions?.includes("1") ?? false;
    this.isOptionCorrect[1] = correctOptions?.includes("2") ?? false;
    this.isOptionCorrect[2] = correctOptions?.includes("3") ?? false;
    this.isOptionCorrect[3] = correctOptions?.includes("4") ?? false;
    this.isOptionCorrect[4] = correctOptions?.includes("5") ?? false;
    this.isOptionCorrect[5] = correctOptions?.includes("6") ?? false;

    if (navigateNext) {
      // this.questionForm.controls.answer.setValue("0");
      this.questionForm.reset();
      this.reviewLater = false;

      this.questionAnsweredEvent.emit({
        index: this.questionIndex,
        answered,
        isCorrect: this.isCorrect,
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
      this.questionForm.reset();
      this.questionForm.controls.answer.enable({
        onlySelf: true,
        emitEvent: false,
      });

      // if (this.examService.answers[questionIndex]) {
      //   this.questionForm.controls.answer.setValue(
      //     this.examService.answers[questionIndex]
      //   );
      //   this.reviewLater = this.examService.reviewLater[questionIndex];
      // }

      this.questionNavigationEvent.emit(questionIndex);
    }
  }

  onReviewStatusChange(event: any) {
    this.examService.reviewLater[this.questionIndex] = this.reviewLater;
  }
}
