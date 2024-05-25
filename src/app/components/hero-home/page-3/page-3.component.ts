import { Component } from "@angular/core";
import { RouterModule } from "@angular/router";
import { ButtonModule, ContainerComponent } from "@coreui/angular";
import { IconModule, IconSetService } from "@coreui/icons-angular";
import { cilArrowRight } from "@coreui/icons";

@Component({
  selector: "app-page-3",
  standalone: true,
  imports: [RouterModule, ContainerComponent, IconModule, ButtonModule],
  templateUrl: "./page-3.component.html",
  styleUrl: "./page-3.component.scss",
  providers: [IconSetService],
})
export class Page3Component {
  readonly icons = { cilArrowRight };
}
