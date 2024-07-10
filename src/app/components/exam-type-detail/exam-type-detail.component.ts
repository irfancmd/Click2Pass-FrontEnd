import { Component, Input, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import {
  CardModule,
  ContainerComponent,
  GridModule,
  ModalModule,
  SpinnerModule,
} from '@coreui/angular';
import { IconModule } from '@coreui/icons-angular';
import { cilMediaPlay } from '@coreui/icons';
import { ExamService } from '../../services/exam.service';
import { Chapter } from '../../models/chapter.model';
import { QuestionSetGridComponent } from '../question-set-grid/question-set-grid.component';

@Component({
  selector: 'app-exam-type-detail',
  standalone: true,
  imports: [
    RouterModule,
    ContainerComponent,
    GridModule,
    CardModule,
    IconModule,
    ModalModule,
    QuestionSetGridComponent,
    SpinnerModule,
  ],
  templateUrl: './exam-type-detail.component.html',
  styleUrl: './exam-type-detail.component.scss',
})
export class ExamTypeDetailComponent implements OnInit {
  @Input() examType:
    | 'simulation'
    | 'randomPractice'
    | 'chapterWise'
    | 'setWise'
    | 'roadSignDrivingPractice'
    | 'roadRulesDrivingPractice' = 'randomPractice';

  @Input() chapters?: Chapter[];
  @Input() questionSets?: any[]; // TODO: Add model.

  public title?: string = 'Start Randomized Test';

  readonly icons = { cilMediaPlay };

  public isModalVisible: boolean = false;

  constructor(private router: Router, private examService: ExamService) {}

  ngOnInit(): void {
    switch (this.examType) {
      case 'simulation':
        this.title = 'Start Simulation Test';
        break;
      case 'chapterWise':
        this.title = 'Start Chapter Wise Test';
        break;
      case 'setWise':
        this.title = 'Start Set Wise Test';
        break;
      case 'roadSignDrivingPractice':
        this.title = 'Practice Road Signs';
        break;
      case 'roadRulesDrivingPractice':
        this.title = 'Practice Rules of the Road';
        break;
      default:
        this.title = 'Start Randomized Test';
        break;
    }
  }

  onClickCard(): void {
    if (
      this.examType == 'chapterWise' ||
      this.examType == 'setWise' ||
      this.examType == 'roadSignDrivingPractice' ||
      this.examType == 'roadRulesDrivingPractice'
    ) {
      this.toggleLayer2Modal();
    } else {
      if (this.examType != 'simulation') {
        this.examService.isPracticeModeON = true;
      } else {
        this.examService.isPracticeModeON = false;
      }
      this.router.navigate(['/exam']);
    }
  }

  toggleLayer2Modal() {
    this.isModalVisible = !this.isModalVisible;
  }

  handleLayer2ModalChange(event: any) {
    this.isModalVisible = event;
  }
}
