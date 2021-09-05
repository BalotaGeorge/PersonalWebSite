import { ComponentFixture, TestBed } from "@angular/core/testing";

import { SelectOptionDialogComponent } from "./select-option-dialog.component";

describe("SelectOptionDialogComponent", () => {
  let component: SelectOptionDialogComponent;
  let fixture: ComponentFixture<SelectOptionDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SelectOptionDialogComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SelectOptionDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
