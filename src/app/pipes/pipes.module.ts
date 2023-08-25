import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SafePipe } from './sanitize.pipe';
import { RemoveLastSemicolonPipe } from './removeLastSemicolon.pipe';
import { RemoveFileFormatPipe } from './removeFormat.pipe';
import { OnlyNamePipe } from './onlyName.pipe';
import { FormatIdPipe } from './formatId.pipe';
import { GenerateThumbPipe } from './generateThumb.pipe';
@NgModule({
    declarations: [
        SafePipe,
        RemoveLastSemicolonPipe,
        RemoveFileFormatPipe,
        GenerateThumbPipe,
        OnlyNamePipe,
        FormatIdPipe
    ],
    imports: [CommonModule],
    exports: [
        SafePipe,
        RemoveLastSemicolonPipe,
        RemoveFileFormatPipe,
        GenerateThumbPipe,
        OnlyNamePipe,
        FormatIdPipe
    ],
})
export class PipesModule { }