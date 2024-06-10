import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PerpPositionPageComponent } from './perp-position-page.component';

describe('PerpPositionPageComponent', () => {
  let component: PerpPositionPageComponent;
  let fixture: ComponentFixture<PerpPositionPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PerpPositionPageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PerpPositionPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
