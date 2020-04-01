const CodeClimateAPI = require('./CodeClimateAPI');
const GitHubAPI = require('./GitHubAPI');

const datasources = () => {
  return {
    codeClimateAPI: new CodeClimateAPI(),
    gitHubAPI: new GitHubAPI(),
  };
};

module.exports = datasources;
