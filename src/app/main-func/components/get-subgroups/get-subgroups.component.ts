import { Component, Input } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { StorageService } from '../../../shared';
import { MainFuncService } from '../../services/main-func.service';
import { DeleteSubgroupsComponent } from '../delete-subgroups/delete-subgroups.component';

@Component({
  selector: 'app-get-subgroups',
  templateUrl: './get-subgroups.component.html',
  styleUrl: './get-subgroups.component.scss'
})
export class GetSubgroupsComponent {
  @Input() tasks: any[] = [];
    subjectId = '';
    private subscription: Subscription;
  
    isGetSubgroupsFailed = false;
    errorMessage = '';
  
    subgroups: any;
    subject:any;
  
    constructor(
      private mainFuncService: MainFuncService,
      private route: ActivatedRoute,
      private storageService: StorageService,
      private dialog: MatDialog
    ) {
      this.subscription = new Subscription();
    }
  
    ngOnInit(): void {
      this.route.params.subscribe((params) => {
        this.subjectId = params['subjectId'];
        if (this.subjectId) {
          this.getSubgroups(this.subjectId);
        }
      });
    }
  
    closeErrorAlert() {
      this.isGetSubgroupsFailed = false;
    }
  
    getSubgroups(subjectId: string): void {
      this.subscription = this.mainFuncService.getSubgroups(this.subjectId)
      .subscribe({
        next: data => {
          this.subgroups = data;
          this.subject = this.storageService.getSubject();
          console.log('Subgroups:', this.subgroups);
        },
        error: err => {
          if (err.status == 500) {
            this.errorMessage = err.error.message;
            this.isGetSubgroupsFailed = true;
          }
        }
      })
    }

    onDelete(subjectId: string): void{
        this.dialog.open(DeleteSubgroupsComponent, {
          data: {
            subjectId: subjectId
        },
        });
    }
  
    ngOnDestroy(): void {
      this.subscription?.unsubscribe();
    }
}
