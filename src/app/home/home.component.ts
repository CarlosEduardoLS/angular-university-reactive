import { Component, OnInit } from "@angular/core";
import { Observable, throwError } from "rxjs";
import { catchError, finalize, map } from "rxjs/operators";
import { LoadingService } from "../loading/loading.service";
import { MessagesService } from "../messages/messages.service";
import { Course, sortCoursesBySeqNo } from "../model/course";
import { CoursesService } from "../services/courses.service";

@Component({
  selector: "home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.css"],
})
export class HomeComponent implements OnInit {
  constructor(
    private readonly coursesService: CoursesService,
    private readonly loadingService: LoadingService,
    private readonly messagesService: MessagesService
  ) {}

  beginnerCourses$: Observable<Course[]>;
  advancedCourses$: Observable<Course[]>;

  ngOnInit() {
    this.reloadCourses();
  }

  reloadCourses() {
    const courses$ = this.coursesService.findAll().pipe(
      map((courses) => courses.sort(sortCoursesBySeqNo)),
      catchError((err: any) => {
        const message = "Could not load courses";
        this.messagesService.showErrors(message);
        console.log(message, err);
        return throwError(err);
      }),
      finalize(() => this.loadingService.loadingOff())
    );

    const loadCourses$ =
      this.loadingService.showLoaderUntilCompleted<Course[]>(courses$);

    this.beginnerCourses$ = loadCourses$.pipe(
      map((courses) =>
        courses.filter((course) => course.category === "BEGINNER")
      )
    );

    this.advancedCourses$ = loadCourses$.pipe(
      map((courses) =>
        courses.filter((course) => course.category === "ADVANCED")
      )
    );
  }
}
