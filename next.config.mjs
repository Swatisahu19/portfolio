/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  async rewrites() {
    const hrBuddy = 'https://hr-buddy-drab.vercel.app/hr-buddy'
    return [
      { source: '/hr-buddy', destination: hrBuddy },
      { source: '/hr-buddy/:path*', destination: `${hrBuddy}/:path*` },
    ]
  },
}
 
export default nextConfig 