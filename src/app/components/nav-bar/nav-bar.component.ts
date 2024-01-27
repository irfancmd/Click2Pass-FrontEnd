import { Component } from "@angular/core";
import { RouterModule } from "@angular/router";
import {
  ButtonModule,
  CollapseModule,
  ContainerComponent,
  NavLinkDirective,
  NavbarModule,
} from "@coreui/angular";

@Component({
  selector: "app-nav-bar",
  standalone: true,
  imports: [
    RouterModule,
    ContainerComponent,
    NavLinkDirective,
    CollapseModule,
    NavbarModule,
    ButtonModule,
  ],
  templateUrl: "./nav-bar.component.html",
  styleUrl: "./nav-bar.component.scss",
})
export class NavBarComponent {}
