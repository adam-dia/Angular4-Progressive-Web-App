import { Pipe, PipeTransform } from "@angular/core";
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
/**
 * Generated class for the NosanitizePipe pipe.
 *
 * See https://angular.io/api/core/Pipe for more info on Angular Pipes.
 */
@Pipe({
  name: 'nosanitize',
})
export class NosanitizePipe implements PipeTransform {

  constructor(private domSanitizer: DomSanitizer) { }

  transform(html: string): SafeHtml {
    // elementRef.nativeElement.querySelector('a').addEventListener(...)
    // html = 'javascript:alert("Hi there")';
    return this.domSanitizer.bypassSecurityTrustHtml(html);
  }
}
