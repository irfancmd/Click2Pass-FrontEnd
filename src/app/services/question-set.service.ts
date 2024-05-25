import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { CommonResponse } from "../models/common-response.models";
import { Observable } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class QuestionSetService {
  // private readonly QUESTION_SET_ENDPOINT = "http://localhost:3000/question-set";
  private readonly QUESTION_SET_ENDPOINT =
    "https://click2pass.ca:3000/question-set";

  constructor(private httpClient: HttpClient) {}

  getQuestionSets(): Observable<CommonResponse> {
    return this.httpClient.get<CommonResponse>(this.QUESTION_SET_ENDPOINT);
  }
}
