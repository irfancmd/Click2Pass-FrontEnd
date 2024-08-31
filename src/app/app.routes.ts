import { Routes } from "@angular/router";
import { HomeComponent } from "./pages/home/home.component";
import { CitizenshipComponent } from "./pages/citizenship/citizenship.component";
import { ExamComponent } from "./pages/exam/exam.component";
import { DrivingComponent } from "./pages/driving/driving.component";
import { PrivacyPolicyComponent } from "./pages/privacy-policy/privacy-policy.component";
import { ContactUsComponent } from "./pages/contact-us/contact-us.component";

export const routes: Routes = [
  { path: "", component: HomeComponent },
  { path: "citizenship", component: CitizenshipComponent },
  { path: "driving", component: DrivingComponent },
  { path: "exam", component: ExamComponent },
  { path: "exam/restart", component: ExamComponent },
  { path: "privacy-policy", component: PrivacyPolicyComponent },
  { path: "contact-us", component: ContactUsComponent },
];
