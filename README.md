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

Gatsby's build summary still prints page paths without the prefix, such as `/` and `/about/`. That output is a route summary, not the final hosted URL. Check generated HTML or run `npm run serve` to verify that links and assets are emitted with `/blog/`.

GitHub's default branch is `main`. If local Git metadata points `origin/HEAD` at `origin/master`, prefer GitHub's default branch when opening pull requests for this repository.
