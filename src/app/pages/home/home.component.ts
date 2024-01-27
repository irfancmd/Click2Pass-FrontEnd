import { Component } from "@angular/core";
import { HeroHomeComponent } from "../../components/hero-home/hero-home.component";
import { StatsHomeComponent } from "../../components/stats-home/stats-home.component";
import { FeaturesHomeComponent } from "../../components/features-home/features-home.component";

@Component({
  selector: "app-home",
  standalone: true,
  imports: [HeroHomeComponent, StatsHomeComponent, FeaturesHomeComponent],
  templateUrl: "./home.component.html",
  styleUrl: "./home.component.scss",
})
export class HomeComponent {}
