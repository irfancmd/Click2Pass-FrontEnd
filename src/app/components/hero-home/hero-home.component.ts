import { Component } from "@angular/core";
import { RouterModule } from "@angular/router";
import {
  ButtonModule,
  CarouselModule,
  ContainerComponent,
} from "@coreui/angular";
import { Page1Component } from "./page-1/page-1.component";

@Component({
  selector: "app-hero-home",
  standalone: true,
  imports: [
    RouterModule,
    ContainerComponent,
    CarouselModule,
    ButtonModule,
    Page1Component,
  ],
  templateUrl: "./hero-home.component.html",
  styleUrl: "./hero-home.component.scss",
})
export class HeroHomeComponent {}
