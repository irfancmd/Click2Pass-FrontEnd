import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CommonResponse } from '../models/common-response.models';
import { Observable } from 'rxjs';
import { ContactMessage } from '../models/contact-message.model';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  // private readonly USER_ENDPOINT = "http://localhost:3000/user";
  private readonly USER_ENDPOINT = 'https://click2pass.ca:3000/user';

  constructor(private httpClient: HttpClient) {}

  sendContactMessage(
    contactMessage: ContactMessage
  ): Observable<CommonResponse> {
    return this.httpClient.post<CommonResponse>(
      `${this.USER_ENDPOINT}/contact-message`,
      contactMessage
    );
  }
}
