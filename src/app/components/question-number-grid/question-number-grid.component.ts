import { Component, Input } from '@angular/core';
import { RouterModule } from '@angular/router';
import {
  ButtonModule,
  CardModule,
  ContainerComponent,
  GridModule,
} from '@coreui/angular';

@Component({
  selector: 'app-question-number-grid',
  standalone: true,
  imports: [
    RouterModule,
    ContainerComponent,
    GridModule,
    ButtonModule,
    CardModule,
  ],
  templateUrl: './question-number-grid.component.html',
  styleUrl: './question-number-grid.component.scss',
})
export class QuestionNumberGridComponent {
  @Input() questionCount: number = 0;
  @Input() timeLeft: string = '';
  @Input() answeredCount: number = 0;
  @Input() notAnsweredCount: number = 0;
  @Input() passMarkPercentage: number = 0;
  @Input() allowedMistakesCount: number = 0;
  @Input() examTimeInMinutes: number = 0;
}
