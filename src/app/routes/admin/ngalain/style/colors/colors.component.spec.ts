import { TestBed, TestModuleMetadata } from '@angular/core/testing';
import { setUpTestBed } from '@testing/common.spec';

import { ColorsComponent } from '@routes/admin/ngalain/style/colors/colors.component';
import { ColorService } from '@routes/admin/ngalain/style/color.service';

describe('Component: Colors', () => {
  setUpTestBed(<TestModuleMetadata>{
    declarations: [ColorsComponent],
    providers: [ColorService],
  });

  it('should create an instance', () => {
    const fixture = TestBed.createComponent(ColorsComponent);
    const comp = fixture.debugElement.componentInstance;
    expect(comp).toBeTruthy();
  });
});
