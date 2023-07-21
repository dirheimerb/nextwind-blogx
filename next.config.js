// import remarkGfm from 'remark-gfm'
// import createMDX from '@next/mdx'

// /** @type {import('next').NextConfig} */
// const nextConfig = {
//   pageExtensions: ['js', 'jsx','ts', 'tsx', 'md', 'mdx'],
//   swcMinify: true,
//   images: {
//     domains: [
//       'images.unsplash.com',

//     ],
//   },
//   experimental: {
//     serverActions: true,
//     mdxRs: true,
//   }
// }

// const withMDX = createMDX({
//   options: {
//     extension: /\.mdx?$/,
//     remarkPlugins: [remarkGfm],
//     rehypePlugins: [],
//     providerImportSource: '@mdx-js/react',
//   }
// })

// export default withMDX(nextConfig)

/** @type {import('next').NextConfig} */
const nextConfig = {
  pageExtensions: ['js', 'jsx', 'ts', 'tsx', 'md', 'mdx'],
  swcMinify: true,
  images: {
    domains: ['images.unsplash.com'],
  },
  experimental: {
    serverActions: true,
  },
};

module.exports = nextConfig;
