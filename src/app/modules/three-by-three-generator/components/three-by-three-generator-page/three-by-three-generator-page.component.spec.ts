import { ComponentFixture, TestBed } from "@angular/core/testing";

import { ThreeByThreeGeneratorPageComponent } from "./three-by-three-generator-page.component";

describe("ThreeByThreeGeneratorPageComponent", () => {
  let component: ThreeByThreeGeneratorPageComponent;
  let fixture: ComponentFixture<ThreeByThreeGeneratorPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ThreeByThreeGeneratorPageComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ThreeByThreeGeneratorPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
