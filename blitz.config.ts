import { BlitzConfig, sessionMiddleware, simpleRolesIsAuthorized } from 'blitz';

const config: BlitzConfig = {
  images: {
    domains: [
      'res.cloudinary.com',
      'sterett-creek-village-trustee-test.s3.us-east-2.amazonaws.com',
    ],
  },
  middleware: [
    sessionMiddleware({
      cookiePrefix: 'sterett-creek-village-trustee',
      isAuthorized: simpleRolesIsAuthorized,
    }),
  ],
  /* Uncomment this to customize the webpack config
  webpack: (config, { buildId, dev, isServer, defaultLoaders, webpack }) => {
    // Note: we provide webpack above so you should not `require` it
    // Perform customizations to webpack config
    // Important: return the modified config
    return config
  },
  */
};
module.exports = config;
