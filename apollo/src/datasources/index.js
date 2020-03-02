const CodeClimateAPI = require('./CodeClimateAPI');

const datasources = () => {
  return {
    codeClimateAPI: new CodeClimateAPI(),
  };
};

module.exports = datasources;
