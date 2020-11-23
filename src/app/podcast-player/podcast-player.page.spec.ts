import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { PodcastPlayerPage } from './podcast-player.page';

describe('PodcastPlayerPage', () => {
  let component: PodcastPlayerPage;
  let fixture: ComponentFixture<PodcastPlayerPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PodcastPlayerPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(PodcastPlayerPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
