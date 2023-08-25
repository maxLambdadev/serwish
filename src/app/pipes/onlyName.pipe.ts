import {
    Pipe,
    PipeTransform
} from '@angular/core';

@Pipe({
    name: 'onlyName'
})
export class OnlyNamePipe implements PipeTransform {

    transform(name: any): any {
        if (name) {
            if (this.hasWhiteSpace(name)) {
                const nameArray = name.split(" ");
                return nameArray[0];
            } else {
                return name;
            }
        }

    }

    hasWhiteSpace(value: string) {
        return value.indexOf(' ') >= 0;
    }

}
