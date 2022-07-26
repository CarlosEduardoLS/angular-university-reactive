import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { Observable } from "rxjs";
import { Course } from "../model/course";
import { Lesson } from "../model/lesson";
import { CoursesService } from "../services/courses.service";

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

  course$: Observable<Course>;

  lessons$: Observable<Lesson[]>;

  ngOnInit() {
    const courseId = parseInt(this.route.snapshot.paramMap.get("courseId"));

    this.course$ = this.coursesService.findById(courseId);

    this.lessons$ = this.coursesService.findLessonsByCourseId(courseId);
  }
}
