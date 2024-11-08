module.exports = {
  generateBuildId: async () => {
    return new Date().toISOString();
  },
};
