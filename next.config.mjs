/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  async rewrites() {
    const hrBuddy = 'https://hr-buddy-drab.vercel.app/hr-buddy'
    const honeytrap = 'https://honeytrap-wheat.vercel.app/honeytrap'
    return [
      { source: '/hr-buddy', destination: hrBuddy },
      { source: '/hr-buddy/:path*', destination: `${hrBuddy}/:path*` },
      { source: '/honeytrap', destination: honeytrap },
      { source: '/honeytrap/:path*', destination: `${honeytrap}/:path*` },
    ]
  },
}
 
export default nextConfig 