const { GraphQLDataSource } = require('apollo-datasource-graphql');
const { repoByOrgReducer, sparklineReducer, issueReducer, prReducer } = require('./reducers/GitHubReducer');
const { REPOS_BY_ORG, SPARKLINE, SPARKLINE_BY_DATE, PULSE } = require('./queries/GitHubQueries');

class GitHubAPI extends GraphQLDataSource {
  baseURL = 'https://api.github.com/graphql';
  token = 'bearer cdf9e6076522e639c93c493448b1f02bb403b94b'; //token needs to be updated to Lambda-School-Labs token

  willSendRequest(request) {
    if (!request.headers) {
      request.headers = {};
    }
    request.headers.Authorization = `${this.token}`;
  }

  /**
   * Returns a new Error with a more helpful Error message.
   *
   * If Github throws an error because it cannot find a repo
   * with the given ownder/name/until parameters, this function
   * will let the client know that their parameters may be
   * incorrect.
   *
   * @param {Error}     err        The Error Object to modify
   * @param {String[]}  paramsArr  The params the user should have given
   *
   * @returns Error
   */
  helpfulErrorReturn(err, paramsArr) {
    // This match statement can change in the future
    //     depending on the errors thrown by the Github API
    if (err.message.match(/(cannot read).+(defaultBranchRef)/i)) {
      // Maps through our params to create a readable list
      const paramsStr = paramsArr
        .map((param, i) => {
          const newParam = `"${param}"`;
          // ↑ adds "quote" around each param
          // ↓ if it's the last item, adds the word 'and'
          if (i === paramsArr.length - 1) return 'and ' + newParam;
          return newParam;
        })
        .join(', ');
      err.message +=
        '. Are the ' + paramsStr + ' properties typed correctly in this query?';
    }
    return err;
  }

  async getReposByOrg(dynamicQuery) {
    try {
      const res = await this.query(REPOS_BY_ORG, {
        variables: {
          dynamicQuery,
        },
      });
      return res.data.search.edges.map(repo => repoByOrgReducer(repo));
    } catch (err) {
      throw err;
    }
  }

  async getSparkline(owner, name) {
    try {
      const res = await this.query(SPARKLINE, {
        variables: {
          owner,
          name,
        },
      });

      const lineofspark =
        res.data.repository.defaultBranchRef.target.history.nodes;
      return lineofspark.map(spark => sparklineReducer(spark));
    } catch (err) {
      this.helpfulErrorReturn(err, ['owner', 'name']);
      throw err;
    }
  }

  async getSparklineByDate(owner, name, until) {
    try {
      const res = await this.query(SPARKLINE_BY_DATE, {
        variables: {
          owner,
          name,
          until,
        },
      });

      const lineofspark =
        res.data.repository.defaultBranchRef.target.history.nodes;
      return lineofspark.map(spark => sparklineReducer(spark));
    } catch (err) {
      this.helpfulErrorReturn(err, ['owner', 'name', 'until']);
      throw err;
    }
  }

  async getSparkline(owner, name) {
    try {
      const res = await this.query(SPARKLINE, {
        variables: {
          owner,
          name
        }
      });

      const lineofspark = res.data.repository.defaultBranchRef.target.history.nodes;
      return lineofspark.map(spark => (
        sparklineReducer(spark)
      ));
    } catch (err) {
      console.log('getSparkline ERROR:', err);
    }
  }

  async getSparklineByDate(owner, name, until) {
    try {
      const res = await this.query(SPARKLINE_BY_DATE, {
        variables: {
          owner,
          name,
          until
        }
      });

      const lineofspark = res.data.repository.defaultBranchRef.target.history.nodes;
      return lineofspark.map(spark => (
        sparklineReducer(spark)
      ));
    } catch (err) {
      console.log('getSparklineByDate ERROR:', err);
    }
  }

  async getPulse(owner, name) {
    try {
      const res = await this.query(PULSE, {
        variables: {
          owner,
          name
        }
      });

      const issues = issueReducer(res.data.repository.issues)
      
      const PRs = prReducer(res.data.repository.pullRequests)

      return {
        id: res.data.repository.id,
        issueCount: issues.issueCount,
        closedIssues: issues.closedIssues,
        openIssues: issues.openIssues,
        prCount: PRs.prCount,
        closedPRs: PRs.closedPRs,
        openPRs: PRs.openPRs,
        mergedPRs: PRs.mergedPRs
      }
    } catch (err) {
      console.log('getPulse ERROR', err);
    }
  }

}

module.exports = GitHubAPI;
