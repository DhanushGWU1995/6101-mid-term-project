import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ResultDisplayComponent } from './result-display.component';

describe('ResultDisplayComponent', () => {
  let component: ResultDisplayComponent;
  let fixture: ComponentFixture<ResultDisplayComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ResultDisplayComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ResultDisplayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display the prediction result', () => {
    component.predictionResult = { chdRisk: 'High', details: 'High risk of coronary heart disease' };
    fixture.detectChanges();
    const compiled = fixture.nativeElement;
    expect(compiled.querySelector('.result').textContent).toContain('High risk of coronary heart disease');
  });
});