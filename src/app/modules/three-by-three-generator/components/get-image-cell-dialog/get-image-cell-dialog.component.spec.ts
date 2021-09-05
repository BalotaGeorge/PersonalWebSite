import { ComponentFixture, TestBed } from "@angular/core/testing";

import { GetImageCellDialogComponent } from "./get-image-cell-dialog.component";

describe("GetImageCellDialogComponent", () => {
  let component: GetImageCellDialogComponent;
  let fixture: ComponentFixture<GetImageCellDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [GetImageCellDialogComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GetImageCellDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
