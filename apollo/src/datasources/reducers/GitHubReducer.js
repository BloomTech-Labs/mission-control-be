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

const issueReducer = (data) => {
  const closedIssues = data.edges.filter(closed => closed.node.state === "CLOSED");
  const openIssues = data.edges.filter(open => open.node.state === "OPEN");
  return {
    issueCount: data.totalCount,
    closedIssues: closedIssues.length,
    openIssues: openIssues.length
  };
};

const prReducer = (data) => {
  const closedPRs = data.edges.filter(closed => closed.node.state === "CLOSED");
  const openPRs = data.edges.filter(open => open.node.state === "OPEN");
  const mergedPRs = data.edges.filter(merged => merged.node.state === "MERGED");
  return {
    prCount: data.totalCount,
    closedPRs: closedPRs.length,
    openPRs: openPRs.length,
    mergedPRs: mergedPRs.length
  };
};

module.exports = { repoByOrgReducer, sparklineReducer, issueReducer, prReducer };
