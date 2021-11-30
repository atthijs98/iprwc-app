import {EventEmitter, Injectable} from "@angular/core";

@Injectable({
  providedIn: 'root'
})
export class GeneralStateService {
  private backgroundImageEvent: EventEmitter<BackgroundImages> = new EventEmitter();
  private backgroundImage: BackgroundImages = 'none';

  public getBackgroundImage(): BackgroundImages {
    return this.backgroundImage;
  }

  public getBackgroundImageEvent(): EventEmitter<BackgroundImages> {
    return this.backgroundImageEvent;
  }

  public emitBackgroundImageChangeEvent(image: BackgroundImages): void {
    this.backgroundImage = image;
    this.backgroundImageEvent.emit(image);
  }
}
