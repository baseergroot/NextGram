import withFlowbiteReact from "flowbite-react/plugin/nextjs";

/** @type {import('next').NextConfig} */
const nextConfig = {
  // experimental: {
  //   browserDebugInfoInTerminal: true
  // },
  
  images: {

    // domains: ["res.cloudinary.com", "asset.cloudinary.com"],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com',
        pathname: '/**', // Wildcards can be used in the pathname.
      }, 
      {
        protocol: 'https',
        hostname: "asset.cloudinary.com",
        port: '', // Port can be omitted if default (80/443), otherwise specify.
        pathname: '/**', // Wildcards can be used in the pathname.
      },
    ]
  },
};

export default withFlowbiteReact(nextConfig);