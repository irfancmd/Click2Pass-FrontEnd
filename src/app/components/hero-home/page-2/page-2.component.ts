import { Component } from "@angular/core";
import { RouterModule } from "@angular/router";
import { ButtonModule, ContainerComponent } from "@coreui/angular";
import { IconModule, IconSetService } from "@coreui/icons-angular";
import { cilArrowRight } from "@coreui/icons";

@Component({
  selector: "app-page-2",
  standalone: true,
  imports: [RouterModule, ContainerComponent, IconModule, ButtonModule],
  templateUrl: "./page-2.component.html",
  styleUrl: "./page-2.component.scss",
  providers: [IconSetService],
})
export class Page2Component {
  readonly icons = { cilArrowRight };
}
