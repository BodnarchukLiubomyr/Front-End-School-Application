import { ValidatorFn, AbstractControl } from "@angular/forms";

export function fieldsMatch(controlField: string, checkControlField: string): ValidatorFn {
    return (controls: AbstractControl) => {
      const control = controls.get(controlField);
      const checkControl = controls.get(checkControlField);
  
      if (checkControl?.errors && !checkControl.errors['matching']) {
        return null;
      }
  
      if (control?.value !== checkControl?.value) {
        controls.get(checkControlField)?.setErrors({ matching: true });
        return { matching: true };
      } else {
        return null;
      }
    };
  }