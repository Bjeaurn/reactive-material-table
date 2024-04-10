import { FormGroup } from '@angular/forms';

export interface Person {
  id?: number;
  name: string;
  birthdate: Date;
}

// export type PersonFormGroup = FormGroup<
//   {
//     [K in keyof Person]: FormControl<Person[K] | null>;
//   } & {
//     isEdit: FormGroup<{ isEdit: FormControl<boolean> }>;
//   }
// >;

export type PersonFormGroup = FormGroup<any>;
