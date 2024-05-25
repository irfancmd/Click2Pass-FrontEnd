import { Component } from "@angular/core";
import { RouterModule } from "@angular/router";
import {
  ButtonModule,
  CarouselModule,
  ContainerComponent,
} from "@coreui/angular";
import { Page1Component } from "./page-1/page-1.component";
import { Page2Component } from "./page-2/page-2.component";
import { Page3Component } from "./page-3/page-3.component";

@Component({
  selector: "app-hero-home",
  standalone: true,
  imports: [
    RouterModule,
    ContainerComponent,
    CarouselModule,
    ButtonModule,
    Page1Component,
    Page2Component,
    Page3Component,
  ],
  templateUrl: "./hero-home.component.html",
  styleUrl: "./hero-home.component.scss",
})
export class HeroHomeComponent {}
