import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Validators, FormBuilder, FormArray } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { MainFuncService } from '../../services/main-func.service';
import { Location } from '@angular/common';
import { MatDialog } from '@angular/material/dialog';
import { StorageService } from '../../../shared/services/storage.service';

@Component({
  selector: 'app-update-question',
  templateUrl: './update-question.component.html',
  styleUrl: './update-question.component.scss'
})
export class UpdateQuestionComponent implements OnInit,OnDestroy{
  form = this.fb.group({
    description: ['', [
      Validators.required,
      Validators.pattern(/^[A-Z].{0,399}$/),
      Validators.maxLength(400)
    ]],
    choices: this.fb.array([
      this.fb.control('', [
        Validators.required,
        Validators.pattern(/^[A-Z].{0,399}$/),
        Validators.maxLength(400)
      ])
    ]),
    answers: this.fb.array([
      this.fb.control('', [
        Validators.required,
        Validators.pattern(/^[A-Z].{0,399}$/),
        Validators.maxLength(400)
      ])
    ]),
    name: ['', [
      Validators.required,
      Validators.pattern(/^(?:[^A-Z]*[A-Z]?[^A-Z]*)?(?=.*[a-z])(?!\\d)(?!\\s).{1,}$/),
      Validators.maxLength(60)
    ]],
    totalMark: ['', [
      Validators.required,
      Validators.pattern(/^(0|[1-9]|1[0-2])$/)
    ]]
  });

  @Input()
  testId = '';
  questionId = '';
  isUpdateQuestionFailed = false;
  errorMessage = '';
  private subscription: Subscription | undefined;
  categories: any;
  categoryName = '';

  constructor(
    private mainFuncService: MainFuncService,
    private router: Router,
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private dialog: MatDialog,
    private storageService: StorageService,
    private location: Location
  ) { }

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.questionId = params['questionId'];
    });
  }

  onCategorySelected(name: string) {
    this.categoryName = name;
    console.log('Selected category in UpdateQuestionComponent:', this.categoryName);
  }

  get choices() {
    return this.form.get('choices') as FormArray;
  }

  get answers() {
    return this.form.get('answers') as FormArray;
  }

  addChoice() {
    this.choices.push(this.fb.control('', [
      Validators.required,
      Validators.pattern(/^[A-Z].{0,399}$/),
      Validators.maxLength(400)
    ]));
  }

  removeChoice(index: number) {
    this.choices.removeAt(index);
  }

  addAnswer() {
    this.answers.push(this.fb.control('', [
      Validators.required,
      Validators.pattern(/^[A-Z].{0,399}$/),
      Validators.maxLength(400)
    ]));
  }

  removeAnswer(index: number) {
    this.answers.removeAt(index);
  }

  closeErrorAlert() {
    this.isUpdateQuestionFailed = false;
  }

  onSubmit(): void {
    const { description, totalMark } = this.form.value;
    const choices = this.choices.value as string[];
    const answers = this.answers.value as string[];
    this.testId = this.storageService.getEducationalTest().id;
    this.subscription = this.mainFuncService.updateQuestion(
      this.questionId, 
      description!, 
      choices, 
      answers, 
      this.categoryName, 
      totalMark!
    ).subscribe({
      next: data => {
        console.log(data);
        this.router.navigate(["main-part"]);
      },
      error: err => {
        if (err.status == 500) {
          this.errorMessage = err.error.message;
          this.isUpdateQuestionFailed = true;
        }
      }
    });
  }

  goBack(event: MouseEvent) {
    event.preventDefault();
    this.location.back();
  }

  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }
}
