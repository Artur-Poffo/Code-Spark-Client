import type { IClassWithStudentProgress } from "./IClassWithStudentProgress";
import type { IModuleWithStudentProgress } from "./IModuleWithStudentProgress";

export interface ICourseWithStudentProgress {
  modules: IModuleWithStudentProgress[],
  classes: IClassWithStudentProgress[],
}