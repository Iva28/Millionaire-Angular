export class Question {
    constructor(public id: number, public question: string,
        public answers: string[], public correct: number) {
    }
}
