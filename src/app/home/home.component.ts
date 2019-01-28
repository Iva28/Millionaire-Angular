import { Component, OnInit, ViewChild } from '@angular/core';
import { Question } from '../models/question';
import { QuestionComponent } from '../question/question.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  start = false;
  points = 0;
  questions: Question[] = [ new Question (1, 'Which month has only 28 days (unless it\'s a leap year)?',
                                         ['March', 'September', 'June', 'Feburary'], 3),
                            new Question (2, 'Which country is largest by area?',
                                         ['UK', 'USA', 'Russia', 'China'], 2),
                            new Question (3, 'Which state in the United States is largest by area??',
                                         ['Alaska', 'California', 'Texas', 'Hawaii'], 0)];

  curQuestionId = 0;
  curQuestion: Question = this.questions[this.curQuestionId];
  win = false;
  gameover = false;

  usedFifty = false;
  usedPhone  = false;
  usedAudience  = false;

  showPhone = false;
  showAudience = false;

  audienceRes: { [key: string]: number; } = {};

  @ViewChild(QuestionComponent) questionComp;

  constructor() { }

  ngOnInit() {
  }

  checkAnswer(incorrect: boolean) {
    this.showPhone = false;
    this.showAudience = false;

    if (incorrect) {
      this.gameover = true;
      } else {
        this.points += 10;
        this.curQuestionId++;
        this.curQuestion = this.questions[this.curQuestionId];
        if (this.questions.length === this.curQuestionId) {
          this.win = true;
        }
    }
  }

  FiftySelected() {
    this.usedFifty = true;
    this.questionComp.removeTwoChoices();
  }

  PhoneFriendSelected() {
    this.usedPhone = true;
    this.showPhone = true;
  }

  AskAudienceSelected() {
    this.usedAudience = true;
    this.showAudience = true;

    let perc = 0;
    for (let i = 0; i < this.curQuestion.answers.length; i++) {
      if (i !== this.curQuestion.correct) {
        if (i === 0) {
          this.audienceRes['A'] = 10; perc += 10;
        } else if (i === 1) {
          this.audienceRes['B'] = 10; perc += 10;
        } else if (i === 2) {
          this.audienceRes['C'] = 15; perc += 15;
        } else if (i === 3) {
          this.audienceRes['D'] = 20; perc += 20;
        }
      }
    }

    const a = ['A', 'B', 'C', 'D'];
    const b = Object.keys(this.audienceRes);
    const correct = a.filter(item => b.indexOf(item) < 0);
    this.audienceRes[correct[0]] = 100 - perc;
  }
}

