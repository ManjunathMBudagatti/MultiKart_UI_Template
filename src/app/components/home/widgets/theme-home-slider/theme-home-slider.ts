import { CommonModule, isPlatformBrowser } from '@angular/common';
import { Component, SimpleChanges, input, Inject, PLATFORM_ID } from '@angular/core';
import { RouterModule } from '@angular/router';

// CORRECTED IMPORTS: OwlOptions is the correct type, SlidesOutputData for the event
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

  // Updated to use OwlOptions
  public options: OwlOptions = {
    ...homeBannerSlider,
    loop: true,
    autoplay: true,
    autoplayTimeout: 5000,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: true,
  };

  public filteredBanners: IBanners[] = [];
  public videoType = ['mp4', 'webm', 'ogg'];
  public StorageURL = environment.storageURL;

  // ----------------------------------------------------
  // Animation State Variables
  // ----------------------------------------------------
  public activeSlideIndex: number = 0;
  public showBrokenEffect = false;
  public leavingImageUrl: string | null = null;
  public leavingImageBars: { style: any }[] = [];
  
  private lastActiveIndex: number = 0;
  private readonly totalBars = 10; 

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {}

  ngOnChanges(change: SimpleChanges) {
    if (change['banners'] && change['banners'].currentValue) {
      this.filteredBanners = change['banners'].currentValue?.banners?.filter((banner: IBanners) => {
        return banner.status;
      }) || [];
    }
  }

  // ----------------------------------------------------
  // Animation Logic
  // ----------------------------------------------------

  /**
   * Called by (translated) event in HTML
   */
  onSlideChange(data: SlidesOutputData): void {
    if (!isPlatformBrowser(this.platformId) || data.startPosition === undefined) return;

    // Owl Carousel returns an index that might need normalization
    const newIndex = data.startPosition % (this.filteredBanners.length || 1);

    if (newIndex !== this.activeSlideIndex) {
      this.lastActiveIndex = this.activeSlideIndex;

      // Trigger "Broken Glass" effect only when switching between Slide 0 and Slide 1
      const isTransition0to1 = (this.lastActiveIndex === 0 && newIndex === 1);
      const isTransition1to0 = (this.lastActiveIndex === 1 && newIndex === 0);

      if ((isTransition0to1 || isTransition1to0) && this.filteredBanners[this.lastActiveIndex]) {
        this.triggerBrokenEffect(this.filteredBanners[this.lastActiveIndex].image_url);
      } else {
        this.resetBrokenEffect();
      }

      this.activeSlideIndex = newIndex;
    }
  }

  private generateBrokenBars(imageUrl: string): void {
    this.leavingImageBars = [];
    const fullImageUrl = this.StorageURL + imageUrl;
    const barWidthPercentage = 100 / this.totalBars;

    for (let i = 0; i < this.totalBars; i++) {
      this.leavingImageBars.push({
        style: {
          'background-image': `url(${fullImageUrl})`,
          'background-size': `${this.totalBars * 100}% 100%`,
          'background-position': `-${i * barWidthPercentage}% 0%`,
          'left': `${i * barWidthPercentage}%`,
          'width': `${barWidthPercentage}%`,
          'height': `100%`,
          'animation-delay': `${i * 0.05}s`
        }
      });
    }
  }

  private triggerBrokenEffect(imageUrl: string): void {
    if (!imageUrl) return;

    this.leavingImageUrl = imageUrl;
    this.generateBrokenBars(this.leavingImageUrl);
    this.showBrokenEffect = true;

    if (isPlatformBrowser(this.platformId)) {
      setTimeout(() => {
        this.resetBrokenEffect();
      }, 800);
    }
  }

  private resetBrokenEffect(): void {
    this.showBrokenEffect = false;
    this.leavingImageUrl = null;
    this.leavingImageBars = [];
  }
}