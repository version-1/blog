# ver-1-0.net

https://ver-1-0.net/

My blog built in Gatsby + Netlify.

## Path prefix

This site is built for hosting under `/blog/`.

Gatsby uses `pathPrefix: '/blog'` in `gatsby-config.ts`, and the app route metadata exposes `blog.basePath` as `/blog/` from `src/lib/routes.ts`.

Use the normal build script so generated links and assets include the prefix:

```sh
npm run build
```

When previewing the production build locally, use:

```sh
npm run serve
```
