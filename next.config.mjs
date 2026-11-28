/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  async rewrites() {
    const hrBuddy = 'https://hr-buddy-drab.vercel.app/hr-buddy'
    const honeytrap = 'https://honeytrap-wheat.vercel.app/honeytrap'
    const aiSignal = 'https://ai-signal-orpin.vercel.app/AISignal'
    return [
      { source: '/hr-buddy', destination: hrBuddy },
      { source: '/hr-buddy/:path*', destination: `${hrBuddy}/:path*` },
      { source: '/honeytrap', destination: honeytrap },
      { source: '/honeytrap/:path*', destination: `${honeytrap}/:path*` },
      { source: '/AISignal', destination: aiSignal },
      { source: '/AISignal/:path*', destination: `${aiSignal}/:path*` },
    ]
  },
}
 
export default nextConfig 