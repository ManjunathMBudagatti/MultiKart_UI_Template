import { CommonModule } from '@angular/common';
import { Component, input } from '@angular/core';

import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-loader',
  imports: [CommonModule, TranslateModule],
  templateUrl: './loader.html',
  styleUrl: './loader.scss',
})
export class Loader {
  readonly loaderClass = input<string>('loader-wrapper');
}
