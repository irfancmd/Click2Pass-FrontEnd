import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { CommonResponse } from "../models/common-response.models";

@Injectable({
  providedIn: "root",
})
export class ChapterService {
  // private readonly CHAPTER_ENDPOINT = "http://localhost:3000/chapter";
  private readonly CHAPTER_ENDPOINT = "https://click2pass.ca:3000/chapter";

  constructor(private httpClient: HttpClient) {}

  getChapters(): Observable<CommonResponse> {
    return this.httpClient.get<CommonResponse>(this.CHAPTER_ENDPOINT);
  }
}
