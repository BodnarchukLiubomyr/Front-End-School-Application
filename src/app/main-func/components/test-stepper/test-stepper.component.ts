import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-test-stepper',
  templateUrl: './test-stepper.component.html',
  styleUrl: './test-stepper.component.scss'
})
export class TestStepperComponent {
  @Input() userTest: any;
  @Input() selectedAnswers: any[] = [];
  @Input() currentQuestionIndex = 0;

  @Output() answerChange = new EventEmitter<any>();
  @Output() questionChange = new EventEmitter<number>();

  handlePreviousQuestion() {
    if (this.currentQuestionIndex > 0) {
      this.currentQuestionIndex--;
      this.questionChange.emit(this.currentQuestionIndex);
    }
  }

  handleNextQuestion() {
    if (this.currentQuestionIndex < this.userTest.questions.length - 1) {
      this.currentQuestionIndex++;
      this.questionChange.emit(this.currentQuestionIndex);
    }
  }

  isNextButtonDisabled() {
    const currentAnswer = this.selectedAnswers.find(
      (answer) => answer.id === this.userTest.questions[this.currentQuestionIndex]?.id
    );
    return !currentAnswer || currentAnswer.answer.length === 0;
  }
}
