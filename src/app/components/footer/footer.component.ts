import { Component } from "@angular/core";
import { RouterModule } from "@angular/router";
import { ButtonModule, ContainerComponent, GridModule } from "@coreui/angular";

@Component({
  selector: "app-footer",
  standalone: true,
  imports: [RouterModule, ContainerComponent, GridModule, ButtonModule],
  templateUrl: "./footer.component.html",
  styleUrl: "./footer.component.scss",
})
export class FooterComponent {}
