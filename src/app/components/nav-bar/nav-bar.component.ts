import { Component } from "@angular/core";
import { RouterModule } from "@angular/router";
import {
  ButtonModule,
  CollapseModule,
  ContainerComponent,
  NavLinkDirective,
  NavbarModule,
  OffcanvasModule,
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
    OffcanvasModule,
  ],
  templateUrl: "./nav-bar.component.html",
  styleUrl: "./nav-bar.component.scss",
})
export class NavBarComponent {}
