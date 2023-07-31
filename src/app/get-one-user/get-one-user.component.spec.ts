import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GetOneUserComponent } from './get-one-user.component';

describe('GetOneUserComponent', () => {
  let component: GetOneUserComponent;
  let fixture: ComponentFixture<GetOneUserComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [GetOneUserComponent]
    });
    fixture = TestBed.createComponent(GetOneUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
