import {
    Pipe,
    PipeTransform
} from '@angular/core';

@Pipe({
    name: 'generateThumb'
})
export class GenerateThumbPipe implements PipeTransform {

    transform(value: any, size: string): any {

        if (value && size) {

            const stringArray = value.split(".");
            const format = stringArray[stringArray.length - 1];

            let newString: string = "";
            newString = value.slice(0, (format.length + 1) * -1);
            newString = newString + "-" + size + "." + format;

            return newString;
        }
        
    }
}
