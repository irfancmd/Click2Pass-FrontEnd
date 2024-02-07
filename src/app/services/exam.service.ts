import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CommonResponse } from '../models/common-response.models';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ExamService {
  private readonly EXAM_ENDPOINT = 'http://localhost:3000/exam';

  constructor(private httpClient: HttpClient) {}

  createNewExam(): Observable<CommonResponse> {
    return this.httpClient.post<CommonResponse>(this.EXAM_ENDPOINT, {});
  }

  getExamById(examId: number): Observable<CommonResponse> {
    return this.httpClient.get<CommonResponse>(`this.EXAM_ENDPOINT/${examId}`);
  }
}
