import { Component, Input, OnInit } from "@angular/core";
import { Router, RouterModule } from "@angular/router";
import { CardModule, ContainerComponent, GridModule } from "@coreui/angular";
import { IconModule } from "@coreui/icons-angular";
import { cilMediaPlay } from "@coreui/icons";
import { ExamService } from "../../services/exam.service";

@Component({
  selector: "app-exam-type-detail",
  standalone: true,
  imports: [
    RouterModule,
    ContainerComponent,
    GridModule,
    CardModule,
    IconModule,
  ],
  templateUrl: "./exam-type-detail.component.html",
  styleUrl: "./exam-type-detail.component.scss",
})
export class ExamTypeDetailComponent implements OnInit {
  @Input() isSimulation?: boolean = false;

  public title?: string = "Start Randomized Test";

  readonly icons = { cilMediaPlay };

  constructor(private router: Router, private examService: ExamService) {}

  ngOnInit(): void {
    if (this.isSimulation) {
      this.title = "Start Simulation Test";
    }
  }

  onClickCard(): void {
    if (!this.isSimulation) {
      this.examService.isPracticeModeON = true;
    }

    this.router.navigate(["/exam"]);
  }
}
