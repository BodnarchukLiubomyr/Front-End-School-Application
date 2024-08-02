import { Component, Input } from '@angular/core';
import { Validators, FormBuilder } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { regexValidator } from '../../../../auth/directives/validation/field.match.directives';
import { StorageService } from '../../../../shared';
import { MainFuncService } from '../../../services/main-func.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-create-chat',
  templateUrl: './create-chat.component.html',
  styleUrl: './create-chat.component.scss'
})
export class CreateChatComponent {
  form = this.fb.group({
    lastname:['', {
      validators: [
        Validators.required,
        Validators.minLength(2),
        regexValidator(/(?:[^A-Z]*[A-Z]?[^A-Z]*)?/, { 'uppercase': ' ' }),
        regexValidator(/[a-z]+/, { 'lowercase': ' ' }),
        regexValidator(/^\S+$/, { 'nospaces': ' ' })
      ]
    }],
    firstname:['', {
      validators: [
        Validators.required,
        Validators.minLength(2),
        regexValidator(/(?:[^A-Z]*[A-Z]?[^A-Z]*)?/, { 'uppercase': ' ' }),
        regexValidator(/[a-z]+/, { 'lowercase': ' ' }),
        regexValidator(/^\S+$/, { 'nospaces': ' ' })
      ]
    }]
  })

  @Input()
  // createdChatId = '';
  errorMessage = '';
  userId = '';
  isCreateChatFailed = false;

  private subscription: Subscription;

  constructor(
    private mainFuncService: MainFuncService,
    private storageService: StorageService,
    private router: Router,
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private location: Location) {
    this.subscription = new Subscription();
  }

  ngOnInit(): void {
    this.userId = this.storageService.getUser().id;
  }

  closeErrorAlert() {
    this.isCreateChatFailed = false;
  }

  onSubmit(): void{
    const {lastname,firstname} = this.form.value;

    this.subscription = this.mainFuncService.createChat(this.userId, lastname!,firstname!).subscribe({
      next: data => {
        console.log(data);
        this.router.navigate(["main-part"])
      },
      error: err => {
        if (err.status == 500) {
          this.errorMessage = err.error.message;
          this.isCreateChatFailed = true;
        }
      }
    })
  }

  goBack(event: MouseEvent) {
    event.preventDefault();
    this.location.back();
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
