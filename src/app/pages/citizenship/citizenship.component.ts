import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, RouterModule } from "@angular/router";
import {
  ContainerComponent,
  GridModule,
  NavModule,
  TabsModule,
} from "@coreui/angular";
import { QuestionSetGridComponent } from "../../components/question-set-grid/question-set-grid.component";
import { Chapter } from "../../models/chapter.model";
import { ChapterService } from "../../services/chapter.service";
import { ExamTypeDetailComponent } from "../../components/exam-type-detail/exam-type-detail.component";
import { ExamService } from "../../services/exam.service";
import { QuestionSetService } from "../../services/question-set.service";

@Component({
  selector: "app-citizenship",
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
  templateUrl: "./citizenship.component.html",
  styleUrl: "./citizenship.component.scss",
})
export class CitizenshipComponent implements OnInit {
  public chapters: Chapter[] = [];
  public questionSets: any[] = []; // TODO: Add model.

  constructor(
    private chapterService: ChapterService,
    private examService: ExamService,
    private questionSetService: QuestionSetService,
    public activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.examService.currentExamCurriculumID = "1";
    this.examService.currentQuestionSet = undefined;
    this.examService.currentExamChapter = undefined;

    this.chapterService.getChapters().subscribe((data) => {
      let chs = data.data;
      chs = chs.filter((c: any) => c.curriculumId == "1");

      this.chapters.push(...chs);
    });

    this.questionSetService.getQuestionSets().subscribe((data) => {
      let qSets = data.data;

      qSets = qSets.filter((qs: any) => qs.curriculumId == "1");

      this.questionSets.push(...qSets);
    });
  }
}
