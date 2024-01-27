import { Component } from "@angular/core";
import { RouterModule } from "@angular/router";
import {
  ButtonModule,
  CardModule,
  ContainerComponent,
  GridModule,
} from "@coreui/angular";

@Component({
  selector: "app-stats-home",
  standalone: true,
  imports: [
    RouterModule,
    ContainerComponent,
    GridModule,
    ButtonModule,
    CardModule,
  ],
  templateUrl: "./stats-home.component.html",
  styleUrl: "./stats-home.component.scss",
})
export class StatsHomeComponent {}
