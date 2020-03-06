const repoByOrgReducer = repo => {
  return {
    id: repo.node.id,
    name: repo.node.name,
    owner: repo.node.owner.login,
    ownerId: repo.node.owner.id,
  };
};

const sparklineReducer = spark => {
  return {
    oid: spark.oid,
    message: spark.message,
    additions: spark.additions,
    deletions: spark.deletions,
    changedFiles: spark.changedFiles,
    committedDate: spark.committedDate
  };
};


const issueReducer = issue => {
  console.log(issue.node)
  const closed = issue.node.filter(count => count === "CLOSED");
  const open = issue.node.filter(count => count === "OPEN");
  return {
    issueCount: issue.totalCount,
    closedIssues: closed,
    openIssues: open
  };
};

const prReducer = pr => {
  return {
    
  }
}

module.exports = { repoByOrgReducer, sparklineReducer, issueReducer, prReducer };
