import { Directive, ElementRef, Renderer2, Input, OnInit, HostListener, OnDestroy } from '@angular/core';

@Directive({
  selector: '[maxLength]',
})
export class MaxlengthDirective implements OnInit, OnDestroy {
  constructor(
    private elementRef: ElementRef,
    private renderer: Renderer2) {}

  ngOnInit() {
    if (this.elementRef.nativeElement.getAttribute('maxlength')) {
      this.elementRef.nativeElement.addEventListener('keydown', this.handleKeyboardEvent);
    }
  }

  // @HostListener('document:keydown', ['$event'])
  handleKeyboardEvent(event: any) {
    const maxLength = event.target.maxLength;
    const currentLength = event.target.value.length;
    if (currentLength >= maxLength && (/Key/.test(event.code) || /Digit/.test(event.code))) {
      event.preventDefault();
    }
  }



  ngOnDestroy() {
    this.elementRef.nativeElement.removeEventListener('keydown', this.handleKeyboardEvent);
  }


}
