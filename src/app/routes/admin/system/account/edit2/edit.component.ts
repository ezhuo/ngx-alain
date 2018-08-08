import { Component, OnInit, OnDestroy, Injector } from '@angular/core';
import { ParentModalControl } from '@core/parent';
import { SFSchema } from '@delon/form';

@Component({
  selector: 'com-account-edit',
  templateUrl: './edit.component.html',
})
export class AccountViewComponent extends ParentModalControl implements OnInit, OnDestroy {

  validateForm: any;

  searchSchema: SFSchema = {
    'properties': {
      'email': {
        'type': 'string',
        'title': '邮箱',
        'format': 'email'
      },
      'name': {
        'type': 'string',
        'title': '姓名',
        'minLength': 5
      },
      'age': {
        'type': 'number',
        'title': '年龄',
        'minLength': 5,
        'minimum': 18,
        'maximum': 50,
        'default': 25
      },
      'yesOrNot': {
        'type': 'boolean',
        'title': '允许售卖',
        'default': true
      },
      'agree': {
        'type': 'boolean',
        'title': '同意《用户协议》',
        'ui': 'checkbox'
      },
      'birthday': {
        'type': 'number',
        'title': '生日',
        'format': 'date'
      },
      'status': {
        'type': 'string',
        'title': '状态',
        'enum': [
          { 'label': '待支付', 'value': 'WAIT_BUYER_PAY' },
          { 'label': '已支付', 'value': 'TRADE_SUCCESS' },
          { 'label': '交易完成', 'value': 'TRADE_FINISHED' }
        ],
        'default': 'WAIT_BUYER_PAY'
      },
      'remark': {
        'type': 'string',
        'title': '描述',
        'ui': {
          'widget': 'textarea',
          'autosize': true
        }
      },
      'file': {
        'type': 'string',
        'title': '附件',
        'format': 'uri'
      },
      'geo': {
        'type': 'string',
        'title': '所在地',
        'enum': this.stateSrv.cantonList,
        'default': [110000, 110100, 110105],
        'ui': 'cascader'
      },
      'range': {
        'type': 'number',
        'title': '范围',
        'default': 10,
        'ui': {
          'widget': 'slider',
          'grid': { 'span': 16 }
        }
      },
      'gender': {
        'type': 'string',
        'title': '性别',
        'enum': ['Men', 'Women'],
        'ui': {
          'widget': 'radio',
          'styleType': 'button'
        }
      },
      'like': {
        'type': 'string',
        'title': '兴趣',
        'enum': [
          { 'value': 1, 'label': '电影' },
          { 'value': 2, 'label': '书' },
          { 'value': 3, 'label': '旅行' }
        ],
        'default': 2,
        'ui': {
          'widget': 'tag'
        }
      },
      'roles': {
        'type': 'number',
        'title': '角色',
        'enum': [
          {
            'title': 'DNS管理',
            'value': 10
          },
          {
            'title': 'ECS管理',
            'value': 11
          },
          {
            'title': 'OSS管理',
            'value': 12
          },
          {
            'title': 'RDS管理',
            'value': 13
          }
        ],
        'ui': {
          'widget': 'transfer',
          'titles': [
            '未拥有',
            '已拥有'
          ],
          'grid': { 'span': 16 }
        },
        'default': [11, 12]
      },
      'product': {
        'type': 'array',
        'title': '产品清单',
        'maxItems': 5,
        'items': {
          'type': 'object',
          'properties': {
            'name': {
              'type': 'string',
              'title': '名称'
            },
            'price': {
              'type': 'number',
              'title': '单价',
              'minimum': 1
            }
          },
          'required': [
            'name',
            'price'
          ],
          'ui': {
            'spanLabel': 5,
            'spanControl': 19
          }
        },
        'ui': {
          'grid': { 'span': 24, 'arraySpan': 12 }
        }
      },
      'content': {
        'type': 'string',
        'title': '内容',
        'ui': {
          'widget': 'tinymce',
          'grid': { 'span': 24 }
        }
      }
    },
    'required': ['email', 'name'],
    'ui': {
      'spanLabelFixed': 100,
      'grid': {
        'span': 8
      }
    }
  };

  constructor(protected injector: Injector) {
    super(injector);

    this.validateForm = this.frmBuild.group({
      login_username: ['', [this.Validators.required]],
      true_name: ['', [this.Validators.required]],
    });
  }

  ngOnInit() {
    super.ngOnInit();
    this.baseFunc.__formGroupFillData(this.validateForm, this.formData);
  }

  ngOnDestroy() {
    super.ngOnDestroy();
  }

  submitForm = ($event, value) => {
    console.log($event);
    return false;
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
    this.httpSrv.update(this.primaryURL, value, this.primaryValue).subscribe((result) => {
      console.log(result);
      this.modalClose(result);
    });

  }

}
