import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import {
  ContainerComponent,
  GridModule,
  NavModule,
  TabsModule,
} from '@coreui/angular';
import { QuestionSetGridComponent } from '../../components/question-set-grid/question-set-grid.component';
import { Chapter } from '../../models/chapter.model';
import { ChapterService } from '../../services/chapter.service';
import { ExamTypeDetailComponent } from '../../components/exam-type-detail/exam-type-detail.component';

@Component({
  selector: 'app-citizenship',
  standalone: true,
  imports: [
    RouterModule,
    ContainerComponent,
    GridModule,
    NavModule,
    TabsModule,
    QuestionSetGridComponent,
    ExamTypeDetailComponent,
  ],
  templateUrl: './citizenship.component.html',
  styleUrl: './citizenship.component.scss',
})
export class CitizenshipComponent implements OnInit {
  readonly chapters: Chapter[] = [];

  constructor(private chapterService: ChapterService) {}

  ngOnInit(): void {
    this.chapterService.getChapters().subscribe((data) => {
      this.chapters.push(...data.data);
    });
  }
}
