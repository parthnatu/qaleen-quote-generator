import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditDetailModalComponent } from './edit-detail-modal.component';

describe('EditDetailModalComponent', () => {
  let component: EditDetailModalComponent;
  let fixture: ComponentFixture<EditDetailModalComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EditDetailModalComponent]
    });
    fixture = TestBed.createComponent(EditDetailModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
