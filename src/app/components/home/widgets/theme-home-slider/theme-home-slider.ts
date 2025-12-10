import { CommonModule, isPlatformBrowser } from '@angular/common';
import { Component, SimpleChanges, input, Inject, PLATFORM_ID } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CarouselModule, SlidesOutputData, OwlOptions } from 'ngx-owl-carousel-o';
import { environment } from '../../../../../environments/environment';
import { ImageLink } from '../../../../shared/components/widgets/image-link/image-link';
import { homeBannerSlider } from '../../../../shared/data/owl-carousel';
import { IBanners } from '../../../../shared/interface/theme.interface';

@Component({
  selector: 'app-theme-home-slider',
  imports: [CommonModule, RouterModule, CarouselModule, ImageLink],
  templateUrl: './theme-home-slider.html',
  styleUrl: './theme-home-slider.scss',
})
export class ThemeHomeSlider {
  readonly banners = input<any>();
  readonly theme = input<string>();

  public options: OwlOptions = {
    ...homeBannerSlider,
    loop: true,
    autoplay: true,
    autoplayTimeout: 6000, 
    autoplayHoverPause: false,
    smartSpeed: 1000, 
    mouseDrag: true,
    touchDrag: true,
    pullDrag: true,
  };

  public filteredBanners: IBanners[] = [];
  public videoType = ['mp4', 'webm', 'ogg'];
  public StorageURL = environment.storageURL;

  public activeSlideIndex: number = 0;

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {}

  ngOnChanges(change: SimpleChanges) {
    if (change['banners'] && change['banners'].currentValue) {
      this.filteredBanners = change['banners'].currentValue?.banners?.filter((banner: IBanners) => {
        return banner.status;
      }) || [];
    }
  }

  onSlideChange(data: SlidesOutputData): void {
    if (!isPlatformBrowser(this.platformId) || data.startPosition === undefined) return;
    this.activeSlideIndex = data.startPosition % (this.filteredBanners.length || 1);
  }
}