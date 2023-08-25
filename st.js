const {
    buildSitemaps
} = require('express-sitemap-xml')
const request = require('request');
const fs = require('fs')
const {environment} = require("./src/environments/environment");

async function run() {
    const urls = [{
            url: '/home',
            lastMod: true,
            changeFreq: 'monthly',
            priority: 0.9
        },
        {
            url: '/services',
            lastMod: true,
            changeFreq: 'monthly',
            priority: 0.9
        },
        {
            url: '/specialists',
            lastMod: true,
            changeFreq: 'monthly',
            priority: 0.9
        },
        {
            url: '/blog',
            lastMod: true,
            changeFreq: 'monthly',
            priority: 0.7
        },
        {
            url: '/profile',
            lastMod: true,
            changeFreq: 'monthly',
            priority: 0.7
        },
        {
            url: '/wishlist',
            lastMod: true,
            changeFreq: 'monthly',
            priority: 0.7
        },
        {
            url: '/search',
            lastMod: true,
            changeFreq: 'monthly',
            priority: 0.7
        },
        {
            url: '/contact',
            lastMod: true,
            changeFreq: 'monthly',
            priority: 0.7
        }
    ]
    await request(`${environment.apiUrl}/api/services/list?locale=ka&perPage=500`, async function (_error, _response, body) {

        const data = JSON.parse(body);

        for (let index in data.body.list.data) {
            const el = (data.body.list.data)[index];
            urls.push({
                url: '/services/details/' + el.id + '/' + el.translated.slug,
                changeFreq: 'always',
                lastMod: true,
                priority: 1
            });
        }

        const sitemaps = await buildSitemaps(urls, 'https://serwish.ge/')
        const content = sitemaps['/sitemap.xml']
        fs.writeFile('src/sitemap.xml', content, err => {
            if (err) {
                console.error(err);
                return;
            }
        })
    });
}

run();
