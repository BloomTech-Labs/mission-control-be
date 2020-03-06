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
  return {

  }
}

const prReducer = pr => {
  return {
    
  }
}

module.exports = { repoByOrgReducer, sparklineReducer, issueReducer, prReducer };
