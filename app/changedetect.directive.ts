import { Directive, Output, EventEmitter, ElementRef } from "@angular/core";

@Directive({
    selector: '[domChange]'
  })
  export class DomChangeDirective {
    private changes: MutationObserver;
  
    @Output()
    public domChange = new EventEmitter();
  
    constructor(private elementRef: ElementRef) {
      const element = this.elementRef.nativeElement;
  
      this.changes = new MutationObserver((mutations: MutationRecord[]) => {
            mutations.forEach((mutation: MutationRecord) => this.domChange.emit(mutation));
          }
      );
  
      this.changes.observe(element, {
        attributes: true,
        childList: true,
        characterData: true
      });
    }
  }