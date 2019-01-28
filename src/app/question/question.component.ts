import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Question } from '../models/question';

@Component({
  selector: 'app-question',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.css']
})
export class QuestionComponent implements OnInit {

  @Input()
  question: Question;

  @Output()
  onNextQuestion: EventEmitter<boolean> = new EventEmitter();

  incorrect = false;

  AHide = false;
  BHide = false;
  CHide = false;
  DHide = false;

  constructor() { }

  ngOnInit() {
  }

  checkAnswer(answer: number) {
    this.AHide = false;
    this.BHide = false;
    this.CHide = false;
    this.DHide = false;
    if (this.question.correct === answer) {
      this.incorrect = false;
      } else {
      this.incorrect = true;
    }
    this.onNextQuestion.emit(this.incorrect);
  }

  removeTwoChoices() {
    const nums = [];
    while (nums.length !== 2) {
      const select =  Math.floor(Math.random() * 4);
      if (select !== this.question.correct && !nums.includes(select)) {
        nums.push(select);
        if (select === 0) {
          this.AHide = true;
        } else if (select === 1) {
          this.BHide = true;
        } else if (select === 2) {
          this.CHide = true;
        } else if (select === 3) {
          this.DHide = true;
        }
      }
    }
  }
}

