import { Component } from "@angular/core";
import { RouterModule } from "@angular/router";
import {
  ButtonModule,
  CardModule,
  ContainerComponent,
  FormModule,
  GridModule,
} from "@coreui/angular";
import { IconModule, IconSetService } from "@coreui/icons-angular";
import { cilArrowLeft } from "@coreui/icons";

@Component({
  selector: "app-question",
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
  templateUrl: "./question.component.html",
  styleUrl: "./question.component.scss",
  providers: [IconSetService],
})
export class QuestionComponent {
  readonly icons = { cilArrowLeft };
}
