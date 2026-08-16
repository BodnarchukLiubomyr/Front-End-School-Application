import { NgModule } from '@angular/core';
import {MatTooltipModule,} from '@angular/material/tooltip';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';

const material = [
  MatTooltipModule,
  MatDialogModule,
  MatButtonModule,
  MatAutocompleteModule,
  MatFormFieldModule,
  MatInputModule,
  MatIconModule
];


@NgModule({
  exports: [material],
  imports: [material]

})
export class MaterialModule { }
