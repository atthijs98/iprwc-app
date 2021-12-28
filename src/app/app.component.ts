import { ChangeDetectorRef, Component, EventEmitter, OnDestroy, OnInit } from '@angular/core';
import { NavigationStart, Router } from '@angular/router';
import { GeneralStateService } from './shared/services/general-state.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {
  title = 'iprwc-app';
  showHead = false;
  backgroundImage: BackgroundImages = this.generalStateService.getBackgroundImage();
  backgroundImageSubscriber: EventEmitter<BackgroundImages> = this.generalStateService.getBackgroundImageEvent();

  constructor(private router: Router, private cdRef: ChangeDetectorRef, private generalStateService: GeneralStateService) {
    this.router.events.forEach((event) => {
      if (event instanceof NavigationStart) {
        this.showHead = !(event.url === '/login' || event.url === '/register' || event.url === '/' || event.url === '/home');
        this.cdRef.detectChanges();
      }
    });
  }

  ngOnInit():void {
    this.backgroundImageSubscriber.subscribe((image: BackgroundImages) => {
      this.backgroundImage = image;
    });
  }

  ngOnDestroy(): void {
    this.backgroundImageSubscriber.unsubscribe();
  }
}
