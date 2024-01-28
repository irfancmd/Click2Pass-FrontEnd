import { Component } from "@angular/core";
import { RouterModule } from "@angular/router";
import {
  ContainerComponent,
  GridModule,
  NavModule,
  TabsModule,
} from "@coreui/angular";
import { QuestionSetGridComponent } from "../../components/question-set-grid/question-set-grid.component";

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
  ],
  templateUrl: "./citizenship.component.html",
  styleUrl: "./citizenship.component.scss",
})
export class CitizenshipComponent {}
