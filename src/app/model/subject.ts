
export class Subject {
    name!: string;
    questions!: any[];
    id!:number;
    constructor(name: string, questions: any[]) {
        this.name = name;
        this.questions = questions;
      }
}  