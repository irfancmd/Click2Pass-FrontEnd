import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ContainerComponent, GridModule, NavModule } from '@coreui/angular';

@Component({
  selector: 'app-privacy-policy',
  standalone: true,
  imports: [
    RouterModule,
    ContainerComponent,
    GridModule,
    NavModule,
  ],
  templateUrl: './privacy-policy.component.html',
  styleUrl: './privacy-policy.component.scss'
})
export class PrivacyPolicyComponent {

}
