import { Component } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { RouterModule } from '@angular/router';
import {
  ContainerComponent,
  GridModule,
  NavModule,
  FormModule,
  ButtonModule,
  CardModule,
} from '@coreui/angular';
import { IconModule, IconSetService } from '@coreui/icons-angular';
import { cilPhone, cilEnvelopeClosed, cilLocationPin } from '@coreui/icons';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-contact-us',
  standalone: true,
  imports: [
    RouterModule,
    ContainerComponent,
    GridModule,
    NavModule,
    FormModule,
    ButtonModule,
    ReactiveFormsModule,
    CardModule,
    IconModule,
  ],
  templateUrl: './contact-us.component.html',
  styleUrl: './contact-us.component.scss',
  providers: [IconSetService],
})
export class ContactUsComponent {
  public messageSent: boolean = false;

  public contactForm = new FormGroup({
    name: new FormControl(null, [Validators.required]),
    email: new FormControl(null, [Validators.required]),
    subject: new FormControl(null, [Validators.required]),
    message: new FormControl(null, [Validators.required]),
  });

  readonly icons = { cilPhone, cilEnvelopeClosed, cilLocationPin };

  constructor(private userService: UserService) {}

  onSubmit() {
    this.userService
      .sendContactMessage(this.contactForm.value as any)
      .subscribe((res) => {
        if (res.status == 0) {
          this.messageSent = true;
        }
      });
  }
}
