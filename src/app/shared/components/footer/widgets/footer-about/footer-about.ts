import { CommonModule } from '@angular/common';
import { Component, input } from '@angular/core';

import { IOption } from '../../../../../shared/interface/theme-option.interface';

@Component({
  selector: 'app-footer-about',
  imports: [CommonModule],
  templateUrl: './footer-about.html',
  styleUrl: './footer-about.scss',
})
export class FooterAbout {
  readonly data = input<IOption | null>();
}
