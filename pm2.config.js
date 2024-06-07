/** pm2 configuration
 *    Note: The name field must not contain spaces.
 */
module.exports = {
  apps: [
    {
      script: "npm",
      args: "start",
      cwd: "/etc/kate/message-app/server",
      name: "Movie-Browse",
      port: "4006",
      instances: 1,
      autorestart: true,
      watch: false,
      max_memory_restart: "1G",
      env: {
        NODE_ENV: "production",
      },
    },
  ],
};
