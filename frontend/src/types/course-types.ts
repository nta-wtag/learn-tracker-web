export interface Module {
  title: string;
  estDays: number;
  resources: string[];
}

export interface Week {
  week: number;
  modules: Module[];
}

export interface Course {
  course: string;
  lessons: Week[];
  image: string;
}
