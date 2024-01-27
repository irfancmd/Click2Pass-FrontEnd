import { Component } from "@angular/core";
import { RouterModule } from "@angular/router";
import { ButtonModule, ContainerComponent, GridModule } from "@coreui/angular";
import { IconModule, IconSetService } from "@coreui/icons-angular";
import { cilArrowRight } from "@coreui/icons";

@Component({
  selector: "app-features-home",
  standalone: true,
  imports: [
    RouterModule,
    ContainerComponent,
    GridModule,
    IconModule,
    ButtonModule,
  ],
  templateUrl: "./features-home.component.html",
  styleUrl: "./features-home.component.scss",
  providers: [IconSetService],
})
export class FeaturesHomeComponent {
  readonly icons = { cilArrowRight };
}
