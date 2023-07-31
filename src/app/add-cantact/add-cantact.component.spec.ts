import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddCantactComponent } from './add-cantact.component';

describe('AddCantactComponent', () => {
  let component: AddCantactComponent;
  let fixture: ComponentFixture<AddCantactComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddCantactComponent]
    });
    fixture = TestBed.createComponent(AddCantactComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
