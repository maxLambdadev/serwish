import { Injectable } from '@angular/core';

import { Icon } from './icon.model';

const NOT_FOUND_SVG = `
  <svg viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg">
    <path d="M255 401c-11.047 0-20-8.953-20-20s8.953-20 20-20 20 8.953 20 20-8.953 20-20 20zm20-90v-26.855c38.672-9.356 65.465-44.442 63.938-84.118-1.66-43.203-37.106-78.332-80.696-79.964-23.289-.883-45.281 7.46-61.906 23.472C179.996 159.273 171 180.391 171 203c0 11.047 8.953 20 20 20s20-8.953 20-20c0-11.64 4.645-22.527 13.082-30.652 8.727-8.403 20.316-12.774 32.66-12.317 22.817.86 41.363 19.102 42.227 41.535.8 20.907-13.63 39.38-34.32 43.918C247.19 249.316 235 264.402 235 282.176V311c0 11.047 8.953 20 20 20s20-8.953 20-20zm113.46 164.105c9.45-5.722 12.47-18.02 6.747-27.464-5.727-9.45-18.023-12.47-27.469-6.746C334.145 461.242 295.504 472 256 472c-119.102 0-216-96.898-216-216S136.898 40 256 40s216 96.898 216 216c0 42.59-12.664 84.043-36.625 119.887-6.14 9.18-3.672 21.601 5.508 27.742 9.183 6.14 21.605 3.672 27.742-5.512C497.004 355.676 512 306.531 512 256c0-68.379-26.629-132.668-74.98-181.02C388.668 26.63 324.379 0 256 0S123.332 26.629 74.98 74.98C26.63 123.332 0 187.621 0 256s26.629 132.668 74.98 181.02C123.332 485.37 187.621 512 256 512c46.813 0 92.617-12.758 132.46-36.895zm0 0"/>
  </svg>
`;

@Injectable({
    providedIn: 'root'
})
export class IconRegistry {
    private registry = new Map<string, string>();

    register(icons: Icon[]): void {
        icons.forEach((icon: Icon) => this.registry.set(icon.name, icon.data));
    }

    icon(name: string): string | undefined {
        if (!this.registry.has(name)) {
            console.warn(
                `We could not find icon with name ${name}, add it to the registry.`,
                `Available keys are:`,
                this.registry.keys()
            );

            return NOT_FOUND_SVG;
        }

        return this.registry.get(name);
    }
}
