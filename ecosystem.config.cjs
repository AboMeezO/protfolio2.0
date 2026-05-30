module.exports = {
  apps: [
    {
      name: "Portfolio",
      script: "npm",
      // Local development helper only. Static production hosting should serve the Vite build output.
      args: "run dev",
      watch: true,
    },
  ],
};
