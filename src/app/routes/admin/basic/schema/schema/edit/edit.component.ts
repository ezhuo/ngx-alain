import { Component, OnInit, OnDestroy, Injector } from '@angular/core';
import { ModalControl } from '@core';

@Component({
  selector: 'com-schema-edit',
  templateUrl: './edit.component.html',
})
export class SchemaFormEditComponent extends ModalControl implements OnInit, OnDestroy {

  validateForm: any;

  constructor(protected injector: Injector) {
    super(injector);

    this.validateForm = this.FormBuilder.group({
      login_username: ['', [this.Validators.required]],
      true_name: ['', [this.Validators.required]],
    });
  }

  ngOnInit() {
    super.ngOnInit();
    this.appBase.__formGroupFillData(this.validateForm, this.form.data);
  }

  ngOnDestroy() {
    super.ngOnDestroy();
  }

  submitForm = ($event, value) => {
    $event.preventDefault();
    for (const key in this.validateForm.controls) {
      this.validateForm.controls[key].markAsDirty();
      this.validateForm.controls[key].updateValueAndValidity();
    }
    if (!this.validateForm.valid) {
      return false;
    }
    console.log(this.validateForm);
    value.role_id = 0;
    value.company_id = 1;
    value.company_fdn = '1.';

    console.log(value);
    this.httpSrv.update(this.dataSource.url, value, this.dataSource.val).subscribe((result) => {
      console.log(result);
      this.modalClose(result);
    });

  }

}
