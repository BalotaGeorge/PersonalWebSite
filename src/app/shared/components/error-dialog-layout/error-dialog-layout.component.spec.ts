import { ComponentFixture, TestBed } from "@angular/core/testing";

import { ErrorDialogLayoutComponent } from "./error-dialog-layout.component";

describe("ErrorDialogLayoutComponent", () => {
  let component: ErrorDialogLayoutComponent;
  let fixture: ComponentFixture<ErrorDialogLayoutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ErrorDialogLayoutComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ErrorDialogLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
