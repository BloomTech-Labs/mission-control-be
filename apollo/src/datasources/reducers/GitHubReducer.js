const repoByOrgReducer = repo => {
  return {
    id: repo.node.id,
    name: repo.node.name,
    owner: repo.node.owner.login,
    ownerId: repo.node.owner.id,
  };
};

module.exports = { repoByOrgReducer };
