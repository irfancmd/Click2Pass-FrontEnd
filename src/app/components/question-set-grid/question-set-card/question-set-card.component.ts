import { Component } from "@angular/core";
import { RouterModule } from "@angular/router";
import { CardModule, ContainerComponent, GridModule } from "@coreui/angular";

@Component({
  selector: "app-question-set-card",
  standalone: true,
  imports: [RouterModule, ContainerComponent, GridModule, CardModule],
  templateUrl: "./question-set-card.component.html",
  styleUrl: "./question-set-card.component.scss",
})
export class QuestionSetCardComponent {}
