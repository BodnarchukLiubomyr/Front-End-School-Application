import { Directive, OnChanges, Input, HostBinding } from "@angular/core";

@Directive({
    selector: '[show-password]'
})
export class ShowPasswordDirective implements OnChanges {
    @Input() show = false;
    @HostBinding('attr.type') type = 'password';

    ngOnChanges() {
        if (this.show) {
            this.type = 'text'
        } else {
            this.type = 'password'
        }
    }
}