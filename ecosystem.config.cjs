module.exports = {
  apps: [
    {
      name: "Portfolio",
      script: "npm",
      args: "run dev", // تشغيل سكربت dev الذي يشغل vite
      watch: true,
    },
  ],
};
