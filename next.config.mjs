import withFlowbiteReact from "flowbite-react/plugin/nextjs";

/** @type {import('next').NextConfig} */
const nextConfig = {
  // experimental: {
  //   browserDebugInfoInTerminal: true
  // },
  images: {
    domains: ["res.cloudinary.com", "asset.cloudinary.com"],
  },
};

export default withFlowbiteReact(nextConfig);