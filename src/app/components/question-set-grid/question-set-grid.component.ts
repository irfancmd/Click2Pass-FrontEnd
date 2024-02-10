import { Component, Input, OnInit, input } from "@angular/core";
import { Router, RouterModule } from "@angular/router";
import { ContainerComponent, GridModule } from "@coreui/angular";
import { QuestionSetCardComponent } from "./question-set-card/question-set-card.component";
import { Chapter } from "../../models/chapter.model";
import { ExamService } from "../../services/exam.service";

@Component({
  selector: "app-question-set-grid",
  standalone: true,
  imports: [
    RouterModule,
    ContainerComponent,
    GridModule,
    QuestionSetCardComponent,
  ],
  templateUrl: "./question-set-grid.component.html",
  styleUrl: "./question-set-grid.component.scss",
})
export class QuestionSetGridComponent implements OnInit {
  @Input() chapters: Chapter[] = [];
  @Input() isPracticeModeON: boolean = false;

  constructor(private router: Router, private examService: ExamService) {}

  ngOnInit(): void {}

  onCardClick(chapter?: Chapter) {
    if (chapter) {
      this.examService.currentExamChapter = chapter;
    }

    this.examService.isPracticeModeON = this.isPracticeModeON;
    this.router.navigate(["/exam"]);
  }
}
