import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DecisionTreeVizComponent } from './decision-tree-viz.component';

describe('DecisionTreeVizComponent', () => {
  let component: DecisionTreeVizComponent;
  let fixture: ComponentFixture<DecisionTreeVizComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DecisionTreeVizComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DecisionTreeVizComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});