import {
    Pipe,
    PipeTransform
} from '@angular/core';

@Pipe({
    name: 'removeLastSemicolon'
})
export class RemoveLastSemicolonPipe implements PipeTransform {
    constructor() { }
    transform(value: string) {
        return value.slice(0, -2);
    }
}
