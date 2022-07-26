import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { combineLatest, Observable } from "rxjs";
import { map, startWith, tap } from "rxjs/operators";
import { Course } from "../model/course";
import { Lesson } from "../model/lesson";
import { CoursesService } from "../services/courses.service";

interface CourseData {
  course: Course;
  lessons: Lesson[];
}

@Component({
  selector: "course",
  templateUrl: "./course.component.html",
  styleUrls: ["./course.component.css"],
})
export class CourseComponent implements OnInit {
  constructor(
    private route: ActivatedRoute,
    private readonly coursesService: CoursesService
  ) {}

  data$: Observable<CourseData>;

  ngOnInit() {
    const courseId = parseInt(this.route.snapshot.paramMap.get("courseId"));

    const course$ = this.coursesService
      .findById(courseId)
      .pipe(startWith(null));

    const lessons$ = this.coursesService
      .findLessonsByCourseId(courseId)
      .pipe(startWith([]));

    this.data$ = combineLatest([course$, lessons$]).pipe(
      map(([course, lessons]) => {
        return {
          course,
          lessons,
        };
      }),
      tap(console.log)
    );
  }
}
