import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import { Course } from "../model/course";

@Injectable()
export class CoursesService {
  constructor(private readonly http: HttpClient) {}

  findAll(): Observable<Course[]> {
    return this.http
      .get<Course[]>("/api/courses")
      .pipe(map((res) => res["payload"]));
  }
}
