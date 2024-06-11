import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StakingpageComponent } from './stakingpage.component';

describe('StakingpageComponent', () => {
  let component: StakingpageComponent;
  let fixture: ComponentFixture<StakingpageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StakingpageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StakingpageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
