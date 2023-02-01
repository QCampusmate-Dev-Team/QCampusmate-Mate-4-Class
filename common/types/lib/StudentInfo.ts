import { SCHOOL } from './Constants'

export interface StudentInfo {
  enrollment: string;
  school: SCHOOL; 
  major: string | undefined;
  field: string | undefined;
  lang1st: string | undefined;
  lang2nd: string | undefined;
  isItrntnlStd: boolean;
  provData: boolean;
}