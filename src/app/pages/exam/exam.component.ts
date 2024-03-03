import { Component, OnDestroy, OnInit } from "@angular/core";
import { RouterModule } from "@angular/router";
import {
  ContainerComponent,
  GridModule,
  NavModule,
  TabsModule,
} from "@coreui/angular";
import { QuestionComponent } from "../../components/question/question.component";
import { QuestionNumberGridComponent } from "../../components/question-number-grid/question-number-grid.component";
import { ExamService } from "../../services/exam.service";
import { Exam } from "../../models/exam.model";
import { Question } from "../../models/question.models";

@Component({
  selector: "app-exam",
  standalone: true,
  imports: [
    RouterModule,
    ContainerComponent,
    GridModule,
    NavModule,
    TabsModule,
    QuestionComponent,
    QuestionNumberGridComponent,
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
  public answeredCount = 0;
  public notAnsweredCount = 0;
  public passMarkPercentage = 0;
  public allowedMistakesCount = 0;
  public examTimeInMinutes = 0;

  public examLoaded = false;

  public questions: Question[] = [];
  public answeredStatus: number[] = [];

  public currentQuestionIndex = 0;

  public isCorrectVisible = false;
  public isInCorrectVisible = false;
  public correctCount = 0;
  public examTimeCounter: any;

  constructor(public examService: ExamService) {}

  ngOnInit(): void {
    console.log("init");
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

        if (this.examService.examEndTime) {
          this.examTimeCounter = setInterval(() => {
            if ((this.examService.examEndTime as Date) < new Date()) {
              // alert("Time up! " + this.examService.examEndTime);
            }

            this.timeLeft = this.calculateTimeDifference(
              new Date(),
              this.examService.examEndTime as Date
            );

            // Add time-up logic
          }, 1000);
        }

        this.notAnsweredCount = this.exam?.questionCount ?? 0;
        this.passMarkPercentage = 70; // Hard coded.
        this.allowedMistakesCount = 3; // Hard coded.
        this.examTimeInMinutes = 20; // Hard coded. Not being used now.

        this.answeredStatus = Array(this.questionCount).fill(0);

        if (this.exam) {
          for (let i = 1; i <= this.exam.questionCount; i++) {
            this.questions.push((this.exam as any)[`q${i}`]);
          }
        }

        this.examLoaded = true;
      });
    });
  }

  ngOnDestroy(): void {
    this.examService.examEndTime = undefined;
    clearInterval(this.examTimeCounter);
  }

  private calculateTimeDifference(start_time: Date, end_time: Date): string {
    const startMinutes = start_time.getMinutes();
    const startSeconds = start_time.getSeconds();
    const endMinutes = end_time.getMinutes();
    const endSeconds = end_time.getSeconds();

    // Calculate the total time difference in seconds
    const totalSeconds =
      endMinutes * 60 + endSeconds - (startMinutes * 60 + startSeconds);

    // Convert to "mm:ss" format
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;

    return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
  }

  onQuestionAnswered(event: {
    index: number;
    previous: boolean;
    answered: boolean;
    isCorrect: boolean;
    finishExam: boolean;
  }) {
    if (this.examService.isPracticeModeON) {
      this.isCorrectVisible = false;
      this.isInCorrectVisible = false;

      if (event.isCorrect) {
        this.isCorrectVisible = true;

        setTimeout(() => {
          this.isCorrectVisible = false;
          this.isInCorrectVisible = false;

          if (event.answered) {
            this.answeredStatus[event.index] = 1;
            this.answeredCount = this.countAnsweredQuestions();

            if (event.isCorrect) {
              this.correctCount++;
            }
          }

          if (event.finishExam) {
            alert(
              "You've completed the test. You got " +
                `${this.correctCount} / ${this.questionCount}`
            );
          } else {
            if (event.previous) {
              this.currentQuestionIndex--;
            } else {
              this.currentQuestionIndex++;
            }
          }
        }, 1000);
      } else {
        this.isInCorrectVisible = true;
      }
    } else {
      if (event.answered) {
        this.answeredStatus[event.index] = 1;
        this.answeredCount = this.countAnsweredQuestions();

        if (event.isCorrect) {
          this.correctCount++;
        }
      }

      if (event.finishExam) {
        alert(
          "You've completed the test. You got " +
            `${this.correctCount} / ${this.questionCount}`
        );
      } else {
        if (event.previous) {
          this.currentQuestionIndex--;
        } else {
          this.currentQuestionIndex++;
        }
      }
    }
  }

  onQuestionNumberClicked(questionIndex: number) {
    this.currentQuestionIndex = questionIndex;
  }

  private countAnsweredQuestions(): number {
    return this.answeredStatus.filter((e) => e === 1).length;
  }
}
