import { Component, OnDestroy, OnInit, ViewChild } from "@angular/core";
import { RouterModule } from "@angular/router";
import {
  ButtonModule,
  CardModule,
  ContainerComponent,
  GridModule,
  ModalModule,
  NavModule,
  SpinnerModule,
  TabsModule,
} from "@coreui/angular";
import { QuestionComponent } from "../../components/question/question.component";
import { QuestionNumberGridComponent } from "../../components/question-number-grid/question-number-grid.component";
import { ExamService } from "../../services/exam.service";
import { Exam } from "../../models/exam.model";
import { Question } from "../../models/question.models";
import { CommonModule } from "@angular/common";

@Component({
  selector: "app-exam",
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    ButtonModule,
    ContainerComponent,
    CardModule,
    GridModule,
    NavModule,
    TabsModule,
    SpinnerModule,
    QuestionComponent,
    QuestionNumberGridComponent,
    ModalModule
  ],
  templateUrl: "./exam.component.html",
  styleUrl: "./exam.component.scss",
})
export class ExamComponent implements OnInit, OnDestroy {
  public examId: number = 0;
  public exam?: Exam;

  // public examEndTime = new Date();
  public questionCount = 0;
  public timeLeft = "";
  public timeLeftInMinutes = 0;
  public timeLeftInSeconds = 0;
  public notAnsweredCount = 0;
  public passMarkPercentage = 0;
  // public allowedMistakesCount = 0;
  public examTimeInMinutes = 0;

  public examLoaded = false;

  public questions: Question[] = [];
  public answeredStatus: number[] = [];

  public currentQuestionIndex = 0;

  public correctCount = 0;
  public examTimeCounter: any;
  public isTimeUpModalVisible: boolean = false;

  @ViewChild("questionComponent") questionComponent: any;

  constructor(public examService: ExamService) {}

  ngOnInit(): void {
    this.examService.createNewExam().subscribe((data) => {
      this.examId = data.data;

      // Get the exam object
      this.examService.getExamById(this.examId).subscribe((data) => {
        this.exam = data.data;

        // Set exam deadline
        this.examService.examEndTime = new Date(
          this.exam?.endTime ?? new Date()
        );

        this.questionCount = this.exam?.questionCount ?? 0;

        this.notAnsweredCount = this.exam?.questionCount ?? 0;
        this.passMarkPercentage = 75; // Hard coded.
        // this.allowedMistakesCount = 3; // Hard coded.
        this.examTimeInMinutes = 30; // Hard coded. Not being used now.

        this.answeredStatus = Array(this.questionCount).fill(0);

        if (this.exam) {
          for (let i = 1; i <= this.exam.questionCount; i++) {
            this.questions.push((this.exam as any)[`q${i}`]);
          }
        }

        this.examLoaded = true;
      });
    });

    this.examService.isExamStarted.subscribe((value) => {
      if (value == true) {
        if (
          !this.examService.isPracticeModeON &&
          this.examService.examEndTime
        ) {
          const examEndTime = this.addMinutesToDate(30);

          this.examTimeCounter = setInterval(() => {
            // if ((this.examService.examEndTime as Date) < new Date()) {
            //   // alert("Time up! " + this.examService.examEndTime);
            // }
            const timeLeftData = this.calculateTimeDifference(
              new Date(),
              examEndTime
            );
            this.timeLeft = timeLeftData[0];
            this.timeLeftInMinutes = timeLeftData[1];
            this.timeLeftInSeconds = timeLeftData[2];

            // Time-up logic
            if(this.examService.isExamStarted.value == true && this.timeLeftInSeconds <= 0) {
              this.isTimeUpModalVisible = true;
              this.examService.isExamFinished.next(true);
            }

          }, 1000);
        }
      }
    });

    this.examService.isExamFinished.subscribe((value) => {
      if (value == true) {
        clearInterval(this.examTimeCounter);
      }
    });
  }

  onClickExamStart() {
    this.examService.isExamStarted.next(true);
  }

  ngOnDestroy(): void {
    clearInterval(this.examTimeCounter);
    this.examService.resetAll();
  }

  private calculateTimeDifference(start_time: Date, end_time: Date): [string, number, number] {
    const differenceInMillis: number = (end_time as any) - (start_time as any);

    // Convert milliseconds to seconds
    const totalSeconds = Math.floor(differenceInMillis / 1000);

    // Convert to "mm:ss" format
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;

    return [`${minutes}:${seconds < 10 ? "0" : ""}${seconds}`, minutes, totalSeconds];
  }

  onQuestionAnswered(event: {
    index: number;
    answered: boolean;
    isCorrect: boolean;
  }) {
    if (event.answered) {
      this.answeredStatus[event.index] = 1;
      this.examService.answeredCount = this.countAnsweredQuestions();
      this.notAnsweredCount =
        this.questionCount - this.examService.answeredCount;

      if (event.isCorrect) {
        this.correctCount++;
        this.examService.answerCorrectStatus[event.index] = true;
      }
    }
  }

  onQuestionNumberClicked(questionIndex: number) {
    if (this.questionComponent) {
      this.questionComponent.onClickNavigate(questionIndex);
    }
  }

  onQuestionNavigation(questionIndex: number) {
    if (questionIndex >= 0 && questionIndex < 20) {
      this.currentQuestionIndex = questionIndex;
    }
  }

  get isPassed(): boolean {
    // return this.correctCount >= Math.floor(0.75 * this.questionCount);
    // const percentage = Number(((this.correctCount / this.questionCount) * 100).toFixed(2);
    return Number(this.getPercentage(this.correctCount, this.questionCount)) >= 75;
  }

  private countAnsweredQuestions(): number {
    return this.answeredStatus.filter((e) => e === 1).length;
  }

  getPercentage(achieved: number, total: number): string {
    return ((achieved / total) * 100).toFixed(2);
  }

  getExamName(): string {
    if (this.examService.isPracticeModeON) {
      if (this.examService.currentExamChapter) {
        return this.examService.currentExamChapter.name;
      } else if (this.examService.currentQuestionSet) {
        return "Question Set Practice";
      } else {
        return "Random Questions Test";
      }
    } else {
      return "Simulation Test";
    }
  }

  addMinutesToDate(minutes: number): Date {
    const currentDate = new Date();

    currentDate.setMinutes(currentDate.getMinutes() + minutes);

    return currentDate;
  }

  toggleTimeUpModal() {
    this.isTimeUpModalVisible = !this.isTimeUpModalVisible;
  }

}
