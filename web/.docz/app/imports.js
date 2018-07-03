export const imports = {
  'src/index.mdx': () =>
    import(/* webpackPrefetch: true, webpackChunkName: "src-index" */ 'src/index.mdx'),
  'src/Formuik/TextField.mdx': () =>
    import(/* webpackPrefetch: true, webpackChunkName: "src-formuik-text-field" */ 'src/Formuik/TextField.mdx'),
}
