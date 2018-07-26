import { TestBed, TestModuleMetadata } from '@angular/core/testing';
import { setUpTestBed } from '@testing/common.spec';

import { TypographyComponent } from '@routes/admin/ngalain/style/typography/typography.component';
import { ColorService } from '@routes/admin/ngalain/style/color.service';

describe('Component: Typography', () => {
  setUpTestBed(<TestModuleMetadata>{
    declarations: [TypographyComponent],
    providers: [ColorService],
  });

  it('should create an instance', () => {
    const fixture = TestBed.createComponent(TypographyComponent);
    const comp = fixture.debugElement.componentInstance;
    expect(comp).toBeTruthy();
  });
});
