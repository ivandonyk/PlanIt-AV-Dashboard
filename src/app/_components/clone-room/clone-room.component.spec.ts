import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CloneRoomComponent } from './clone-room.component';

describe('CloneRoomComponent', () => {
  let component: CloneRoomComponent;
  let fixture: ComponentFixture<CloneRoomComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CloneRoomComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CloneRoomComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
