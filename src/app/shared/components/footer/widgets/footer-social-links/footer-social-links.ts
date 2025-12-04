import { CommonModule } from '@angular/common';
import { Component, input } from '@angular/core';

import { IOption } from '../../../../../shared/interface/theme-option.interface';

@Component({
  selector: 'app-footer-social-links',
  imports: [CommonModule],
  templateUrl: './footer-social-links.html',
  styleUrl: './footer-social-links.scss',
})
export class FooterSocialLinks {
  readonly data = input<IOption | null>();
}
