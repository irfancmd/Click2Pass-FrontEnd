import { Component, Input, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CardModule, ContainerComponent, GridModule } from '@coreui/angular';
import { IconModule } from '@coreui/icons-angular';
import { cilMediaPlay } from '@coreui/icons';

@Component({
  selector: 'app-exam-type-detail',
  standalone: true,
  imports: [
    RouterModule,
    ContainerComponent,
    GridModule,
    CardModule,
    IconModule,
  ],
  templateUrl: './exam-type-detail.component.html',
  styleUrl: './exam-type-detail.component.scss',
})
export class ExamTypeDetailComponent implements OnInit {
  @Input() isSimulation?: boolean = false;

  public title?: string = 'Start Randomized Test';

  readonly icons = { cilMediaPlay };

  ngOnInit(): void {
    if (this.isSimulation) {
      this.title = 'Start Simulation Test';
    }
  }

  onClickCard(): void {
    console.log('The card has been clicked');
  }
}
