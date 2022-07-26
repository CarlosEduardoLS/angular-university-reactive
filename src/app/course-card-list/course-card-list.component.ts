import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
} from "@angular/core";
import { MatDialog, MatDialogConfig } from "@angular/material/dialog";
import { filter, tap } from "rxjs/operators";
import { CourseDialogComponent } from "../course-dialog/course-dialog.component";
import { Course } from "../model/course";

@Component({
  selector: "courses-card-list",
  templateUrl: "./course-card-list.component.html",
  styleUrls: ["./course-card-list.component.css"],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CourseCardListComponent implements OnInit {
  constructor(private readonly dialog: MatDialog) {}

  @Input() courses: Course[];

  @Output() coursesChanged = new EventEmitter();

  ngOnInit() {}

  editCourse(course: Course) {
    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = "400px";

    dialogConfig.data = course;

    const dialogRef = this.dialog.open(CourseDialogComponent, dialogConfig);

    dialogRef
      .afterClosed()
      .pipe(
        filter((val) => !!val),
        tap(() => this.coursesChanged.emit())
      )
      .subscribe();
  }
}
