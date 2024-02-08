import { Component, EventEmitter, Input, Output } from '@angular/core';
import { RouterModule } from '@angular/router';
import {
  ButtonModule,
  CardModule,
  ContainerComponent,
  FormModule,
  GridModule,
} from '@coreui/angular';
import { IconModule, IconSetService } from '@coreui/icons-angular';
import { cilArrowLeft } from '@coreui/icons';
import { Question } from '../../models/question.models';

@Component({
  selector: 'app-question',
  standalone: true,
  imports: [
    RouterModule,
    ContainerComponent,
    GridModule,
    IconModule,
    ButtonModule,
    CardModule,
    FormModule,
  ],
  templateUrl: './question.component.html',
  styleUrl: './question.component.scss',
  providers: [IconSetService],
})
export class QuestionComponent {
  @Input() question?: Question;
  @Input() questionIndex: number = 0;
  @Input() totalQuestions: number = 0;

  @Output() questionAnsweredEvent = new EventEmitter<number>();

  readonly icons = { cilArrowLeft };

  onQuestionAnswered(finishExam: boolean) {
    this.questionAnsweredEvent.emit(this.questionIndex);

    // Add practice mode logic
    // Add finish exam logic
  }
}
