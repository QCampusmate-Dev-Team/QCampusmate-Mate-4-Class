import type { SCHOOL, QUARTER, LETTER_EVALUATION } from './constants'
import type { stringOrUndefined } from './utils'
import type { Tree } from './degReq'

export interface Course {
  subject: string;
  school?: SCHOOL;
  major?: stringOrUndefined;
  subjectCode?: stringOrUndefined;
  unit?: number;
  target_students_from?: stringOrUndefined;
  target_year?: stringOrUndefined;
  quarter?: QUARTER;
}

export class GradeEntry implements Course, Tree {
  label: string;
  subject: string;
  status?: number;
  school?: SCHOOL;
  major?: stringOrUndefined;
  subjectCode?: stringOrUndefined;
  unit?: number;
  category?: stringOrUndefined;
  letter_evaluation?: LETTER_EVALUATION;
  gp?: number | '*' | undefined;
  year?: number | undefined;
  quarter?: QUARTER;
  numberlink?: stringOrUndefined; //"KED-KES1111J"
  course_id?: number | undefined;
  prinstructor?: stringOrUndefined;
  last_updated?: Date | string | undefined;

  id?: number;
  matched?: Boolean;

  constructor(label: string, subject: string) {
    this.label = label
    this.subject = subject
  }
}

export interface CourseMeta {
}
