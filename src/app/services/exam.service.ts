import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { CommonResponse } from "../models/common-response.models";
import { BehaviorSubject, Observable } from "rxjs";
import { Chapter } from "../models/chapter.model";

@Injectable({
  providedIn: "root",
})
export class ExamService {
  // private readonly EXAM_ENDPOINT = "http://localhost:3000/exam";
  private readonly EXAM_ENDPOINT = "http://72.167.50.39:3000/exam";

  public currentExamChapter?: Chapter;
  public isPracticeModeON = false;
  public examEndTime?: Date;
  public reviewLater: boolean[] = new Array(20).fill(false);
  public answers = new Array(20).fill(null);
  public isExamStarted = new BehaviorSubject<boolean>(false);
  public isExamFinished = new BehaviorSubject<boolean>(false);
  public answerCorrectStatus = new Array(20).fill(false);
  public answeredCount = 0;

  constructor(private httpClient: HttpClient) {}

  createNewExam(): Observable<CommonResponse> {
    if (!this.currentExamChapter) {
      return this.httpClient.post<CommonResponse>(this.EXAM_ENDPOINT, {});
    } else {
      return this.httpClient.post<CommonResponse>(this.EXAM_ENDPOINT, {
        chapterId: this.currentExamChapter?.id,
      });
    }
  }

  getExamById(examId: number): Observable<CommonResponse> {
    return this.httpClient.get<CommonResponse>(
      `${this.EXAM_ENDPOINT}/${examId}`
    );
  }

  resetAll() {
    this.currentExamChapter = undefined;
    this.isPracticeModeON = false;
    this.examEndTime = undefined;
    this.reviewLater = new Array(20).fill(false);
    this.answers = new Array(20).fill(null);
    this.isExamFinished.next(false);
    this.isExamStarted.next(false);
    this.answerCorrectStatus = new Array(20).fill(false);
    this.answeredCount = 0;
  }
}
