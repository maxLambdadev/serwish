import { Meta, Title } from "@angular/platform-browser";

import { Injectable, Inject } from '@angular/core';
import { DOCUMENT } from '@angular/common';


@Injectable({
    providedIn: 'root'
})
export class SeoService {

    constructor(
        @Inject(DOCUMENT) private dom: Document,

        private titleService: Title,
        private meta: Meta
    ) {
    }

    setDetailSeo(title: string, desc: string, tags?: string, author?: string, image?: string): void {


        this.titleService.setTitle(
            `${title}`
        );

        /**
            * update title meta tags
            */
        this.meta.updateTag({ name: 'title', content: `${title}` })
        this.meta.updateTag({ property: 'og:title', content: `${title}` });
        this.meta.updateTag({ property: 'twitter:title', content: `${title}` });

        /**
         * update description meta tags
         */
        this.meta.updateTag({ name: 'description', content: `${desc}` })
        this.meta.updateTag({ property: 'og:description', content: `${desc}` })
        this.meta.updateTag({ property: 'twitter:description', content: `${desc} ` })

        /**
         * Update Keywords
         */

        if (tags) {
            this.meta.updateTag({ name: 'keywords', content: `${tags}` })
        }

        if (author) {
            this.meta.updateTag({ name: 'author', content: `${author}` })
        }

        if (image) {
            /**
            * image tags
            */
            this.meta.updateTag({ property: 'og:image', content: image })
            this.meta.updateTag({ property: 'twitter:image', content: image })
        }
    }

    setSeo(url: string): void {
        if (url == '/' || url.startsWith('/?')) {
            this.titleService.setTitle(`მთავარი • Serwish.Ge`)
        } else if (url.startsWith('/specialists') || url.startsWith('specialists/?')) {
            this.titleService.setTitle(`სპეციალისტები • Serwish.Ge`)
        } else if (url.startsWith('/blog') || url.startsWith('blog/?')) {
            this.titleService.setTitle(`ბლოგი • Serwish.Ge`)
        } else if (url.startsWith('/contact')) {
            this.titleService.setTitle('კონტაქტი • Serwish.Ge');
        } else if (url.startsWith('/search')) {
            this.titleService.setTitle('ძებნა • Serwish.Ge');
        } else if (url.startsWith('/profile')) {
            this.titleService.setTitle('პროფილი • Serwish.Ge');
        } else if (url.startsWith('/wishlist')) {
            this.titleService.setTitle('თანხის განაღდება • Serwish.Ge');
        } else if (url.startsWith('/services')) {
            this.titleService.setTitle('სერვისები • Serwish.Ge');
        }

        /**
         * update type meta tag
         */
        this.meta.updateTag({ property: "og:type", content: "webSite" })

        /**
         * update url meta tags
         */
        this.meta.updateTag({ property: 'og:url', content: `https://serwish.ge${url}` });
        this.meta.updateTag({ property: 'twitter:url', content: `https://serwish.ge${url}` });

        /**
         * twitter card
         */
        this.meta.updateTag({ property: 'twitter:card', content: 'summary_large_image' })

        /**
         * image tags
         */
        this.meta.updateTag({ property: 'og:image', content: `https://serwish.ge/serwish.png` })
        this.meta.updateTag({ property: 'twitter:image', content: `https://serwish.ge/serwish.png` })

    }


    createLinkForCanonicalURL() {
        const head = this.dom.getElementsByTagName('head')[0];

        var element: HTMLLinkElement = this.dom.querySelector(`link[rel='canonical']`) || null
        if (element == null) {
            element = this.dom.createElement('link') as HTMLLinkElement;
            head.appendChild(element);
        }
        element.setAttribute('rel', 'canonical')
        element.setAttribute('href', this.dom.URL)
    }
}