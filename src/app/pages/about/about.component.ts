import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ContainerComponent, GridModule, NavModule } from '@coreui/angular';

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [
    RouterModule,
    ContainerComponent,
    GridModule,
    NavModule,
  ],
  templateUrl: './about.component.html',
  styleUrl: './about.component.scss'
})
export class AboutComponent {

}
