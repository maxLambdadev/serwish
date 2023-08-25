import {
    Pipe,
    PipeTransform
} from '@angular/core';

@Pipe({
    name: 'removeFileFormat'
})
export class RemoveFileFormatPipe implements PipeTransform {
    constructor() { }
    transform(value: string, len: number) {
        return value.slice(0, -len);
    }
}
