import { Component } from "@angular/core";
import { RouterModule } from "@angular/router";
import {
  ContainerComponent,
  GridModule,
  NavModule,
  TabsModule,
} from "@coreui/angular";
import { QuestionSetGridComponent } from "../../components/question-set-grid/question-set-grid.component";
import { ExamTypeDetailComponent } from "../../components/exam-type-detail/exam-type-detail.component";

@Component({
  selector: "app-driving",
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
  templateUrl: "./driving.component.html",
  styleUrl: "./driving.component.scss",
})
export class DrivingComponent {}
