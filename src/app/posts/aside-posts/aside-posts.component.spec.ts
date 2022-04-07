import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AsidePostsComponent } from './aside-posts.component';

describe('AsidePostsComponent', () => {
  let component: AsidePostsComponent;
  let fixture: ComponentFixture<AsidePostsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AsidePostsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AsidePostsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
