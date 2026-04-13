import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { socialLinks } from './src/data/siteConfig.js'

const siteUrl = (process.env.VITE_SITE_URL || '').replace(/\/$/, '')

function htmlSeoPlugin() {
  return {
    name: 'html-seo-inject',
    transformIndexHtml(html) {
      if (!siteUrl) return html

      const canonical = `${siteUrl}/`
      const ogImage = `${siteUrl}/images/marko-bare.png`
      const sameAs = [socialLinks.linkedin, socialLinks.github, socialLinks.instagram].filter(
        (u) => typeof u === 'string' && /^https?:\/\//i.test(u),
      )
      const jsonLd = JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'Person',
        name: 'Marko Bare',
        jobTitle: 'Web Developer',
        description:
          'Web developer building modern, responsive, and accessible interfaces with React, WordPress, and strong front-end fundamentals.',
        url: canonical,
        image: ogImage,
        sameAs,
        knowsAbout: ['Web development', 'React', 'JavaScript', 'HTML', 'CSS', 'WordPress', 'Accessibility'],
      })

      const block = `
    <link rel="canonical" href="${canonical}" />
    <meta property="og:url" content="${canonical}" />
    <meta property="og:image" content="${ogImage}" />
    <meta property="og:image:alt" content="Marko Bare — portrait" />
    <meta name="twitter:image" content="${ogImage}" />
    <script type="application/ld+json">${jsonLd}</script>`

      return html.replace('</head>', `${block}\n  </head>`)
    },
  }
}

export default defineConfig({
  plugins: [react(), htmlSeoPlugin()],
  build: {
    target: 'es2020',
    cssMinify: true,
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('node_modules/react-dom')) return 'vendor-react-dom'
          if (id.includes('node_modules/react/')) return 'vendor-react'
          if (id.includes('node_modules/react-icons')) return 'vendor-icons'
        },
      },
    },
  },
})
