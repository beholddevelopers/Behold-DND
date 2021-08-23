const path = require("path");

module.exports = {
  sassOptions: {
    includePaths: [path.join(__dirname, "styles")],
  },
  reactStrictMode: true,
  webpack: (config, { buildId, dev, isServer, defaultLoaders, webpack }) => {
    config.module.rules.push({
      test: /\.(glb|gltf|bin)$/,
      use: [
        {
          loader: "file-loader",
          options: {
            publicPath: "/_next/static/models",
            outputPath: "static/models/",
          },
        },
      ],
    });
    return config;
  },
};
