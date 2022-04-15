import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MatContactDialogComponent } from './mat-contact-dialog.component';

describe('MatContactDialogComponent', () => {
  let component: MatContactDialogComponent;
  let fixture: ComponentFixture<MatContactDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MatContactDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MatContactDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
