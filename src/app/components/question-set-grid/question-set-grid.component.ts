import { Component, Input, OnInit, input } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CardModule, ContainerComponent, GridModule } from '@coreui/angular';
import { QuestionSetCardComponent } from './question-set-card/question-set-card.component';
import { Chapter } from '../../models/chapter.model';
import { ChapterService } from '../../services/chapter.service';

@Component({
  selector: 'app-question-set-grid',
  standalone: true,
  imports: [
    RouterModule,
    ContainerComponent,
    GridModule,
    QuestionSetCardComponent,
  ],
  templateUrl: './question-set-grid.component.html',
  styleUrl: './question-set-grid.component.scss',
})
export class QuestionSetGridComponent implements OnInit {
  @Input() chapters: Chapter[] = [];
  @Input() isPracticeModeON: boolean = false;

  ngOnInit(): void {}
}
