import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import {
  ContainerComponent,
  GridModule,
  NavModule,
  TabsModule,
} from '@coreui/angular';
import { QuestionSetGridComponent } from '../../components/question-set-grid/question-set-grid.component';
import { ExamTypeDetailComponent } from '../../components/exam-type-detail/exam-type-detail.component';
import { ExamService } from '../../services/exam.service';
import { Chapter } from '../../models/chapter.model';
import { ChapterService } from '../../services/chapter.service';

@Component({
  selector: 'app-driving',
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
  templateUrl: './driving.component.html',
  styleUrl: './driving.component.scss',
})
export class DrivingComponent implements OnInit {
  public chapters: Chapter[] = [];

  constructor(
    private chapterService: ChapterService,
    private examService: ExamService
  ) {}

  ngOnInit(): void {
    this.examService.currentExamCurriculumID = '5';

    this.chapterService.getChapters().subscribe((data) => {
      let chs = data.data;
      chs = chs.filter((c: any) => c.curriculumId == '5')

      this.chapters.push(...chs);
    });
  }
}
