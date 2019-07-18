import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RoomsTableComponent } from './rooms-table.component';

describe('RoomsTableComponent', () => {
  let component: RoomsTableComponent;
  let fixture: ComponentFixture<RoomsTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RoomsTableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RoomsTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
