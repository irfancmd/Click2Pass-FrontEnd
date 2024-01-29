import { Component } from "@angular/core";
import { RouterModule } from "@angular/router";
import {
  ContainerComponent,
  GridModule,
  NavModule,
  TabsModule,
} from "@coreui/angular";
import { QuestionComponent } from "../../components/question/question.component";
import { QuestionNumberGridComponent } from "../../components/question-number-grid/question-number-grid.component";

@Component({
  selector: "app-exam",
  standalone: true,
  imports: [
    RouterModule,
    ContainerComponent,
    GridModule,
    NavModule,
    TabsModule,
    QuestionComponent,
    QuestionNumberGridComponent,
  ],
  templateUrl: "./exam.component.html",
  styleUrl: "./exam.component.scss",
})
export class ExamComponent {}
