import { ComponentFixture, TestBed } from "@angular/core/testing";

import { DialogLayoutComponent } from "./dialog-layout.component";

describe("DialogLayoutComponent", () => {
  let component: DialogLayoutComponent<unknown>;
  let fixture: ComponentFixture<DialogLayoutComponent<unknown>>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DialogLayoutComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
