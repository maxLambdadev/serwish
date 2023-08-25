import {
    Pipe,
    PipeTransform
} from '@angular/core';

@Pipe({
    name: 'formatId'
})
export class FormatIdPipe implements PipeTransform {

    transform(id: any): any {
        let idLengh = id.toString.length

        return this.zeroPad(id, 6 - idLengh)

    }

    zeroPad(num: number, count: number) {
        return num.toString().padStart(count, "0");
    }

}

