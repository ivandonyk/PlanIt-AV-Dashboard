import { Directive, ElementRef, Renderer2, Input, OnInit, HostListener } from '@angular/core'

@Directive({
  selector: '[maxLength]',
})
export class MaxlengthDirective implements OnInit {
  constructor(
    private elementRef: ElementRef,
    private renderer: Renderer2) {}

  ngOnInit() {
  }

  @HostListener('document:keydown', ['$event'])
  handleKeyboardEvent(event: KeyboardEvent) {
    const maxLength = this.elementRef.nativeElement.maxLength;
    const currentLength = this.elementRef.nativeElement.value.length;
    if (currentLength >= maxLength && (/Key/.test(event.code) || /Digit/.test(event.code))) {
      event.preventDefault();
    }
  }
}
