import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { BigPlayerPage } from './big-player.page';

describe('BigPlayerPage', () => {
  let component: BigPlayerPage;
  let fixture: ComponentFixture<BigPlayerPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BigPlayerPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(BigPlayerPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
