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
import { FormControl, FormGroup, ReactiveFormsModule } from "@angular/forms";

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
    previous: boolean;
    isCorrect: boolean;
  }>();

  readonly icons = { cilArrowLeft };

  public questionForm = new FormGroup({
    answer: new FormControl("0"),
  });

  onQuestionAnswered(previous: boolean, finishExam: boolean) {
    let isCorrect = false;

    if (
      this.question &&
      this.question.correctAnswerText == this.questionForm.controls.answer.value
    ) {
      isCorrect = true;
    }

    this.questionAnsweredEvent.emit({
      index: this.questionIndex,
      previous,
      isCorrect,
    });
    this.questionForm.controls.answer.setValue("0");

    // Add practice mode logic
    // Add finish exam logic
  }
}
