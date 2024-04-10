import { CommonModule } from '@angular/common';
import { Component, ViewChild } from '@angular/core';
import {
  FormArray,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatTable, MatTableModule } from '@angular/material/table';
import { distinctUntilChanged, map, tap } from 'rxjs';
import { PersonFormGroup } from './person';
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    MatTableModule,
    MatButtonModule,
    CommonModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  @ViewChild(MatTable, { static: true }) table!: MatTable<any>;

  displayedColumns = ['name', 'birthdate', 'buttons', 'actions'];

  formArray = new FormArray<PersonFormGroup>([]);

  update$ = this.formArray.valueChanges.pipe(
    map((v) => v.length),
    distinctUntilChanged(),
    tap(() => this.table.renderRows())
  );

  addRow() {
    this.formArray.insert(
      0,
      new FormGroup({
        id: new FormControl(),
        name: new FormControl('', Validators.required),
        birthdate: new FormControl<Date | null>(null),
        isEdit: new FormControl<boolean>(true),
      })
    );
  }

  private removeFromArray(person: PersonFormGroup) {
    const index = this.formArray.controls.findIndex((v) => v === person);
    this.formArray.removeAt(index);
  }

  cancel(person: PersonFormGroup) {
    this.removeFromArray(person);
  }

  delete(person: PersonFormGroup) {
    // Delete would be a call, in this case without it's the same as removing it from the Array.
    this.removeFromArray(person);
  }

  save(person: PersonFormGroup) {
    // Persist the bastard.
    person.get('isEdit')!.setValue(false);
    person.get('id')!.setValue(Math.round(Math.random() * 10)); // To prove a point it doesn't matter for the clientside handling of removals.
    console.log(person);
  }
}
