import { Observable, map } from 'rxjs';
import {
  AbstractControl,
  AsyncValidatorFn,
  ValidationErrors,
  ValidatorFn,
} from '@angular/forms';
import { BibliotecaConstant } from '../constants/BibliotecaConstant';
import { BookService } from '../service/api/Book.service';

export function validatorNotCaractereSpecial(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const text: any = BibliotecaConstant.NOT_ALLOWED_VALUES;
    const value = control.value;
    return text.test(value) ? { isError: true } : null;
  };
}

export function validaorPasswordMatch(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const newPassword = control.parent?.get('newPassword')?.value;
    const repiteNewPassword = control.parent?.get('repiteNewPassword')?.value;
    return newPassword !== repiteNewPassword ? { passwordMatch: true } : null;
  };
}

export function validatorIsbnAsync(booService: BookService): AsyncValidatorFn {
  return (control: AbstractControl): Observable<ValidationErrors | null> => {
    return booService.existsByIsbn(control.value).pipe(
      map((data: boolean) => {
        return data ? { isbnError: true } : null;
      })
    );
  };
}
