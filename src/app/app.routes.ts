import { Routes } from "@angular/router";
import { HomeComponent } from "./pages/home/home.component";
import { CitizenshipComponent } from "./pages/citizenship/citizenship.component";
import { ExamComponent } from "./pages/exam/exam.component";

export const routes: Routes = [
  { path: "", component: HomeComponent },
  { path: "citizenship", component: CitizenshipComponent },
  { path: "test", component: ExamComponent },
];
