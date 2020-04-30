const orgsReducer = org => {
  return {
    id: org.id,
    name: org.attributes.name,
    repocount: org.meta.counts.repos,
  };
};

const repoReducer = repo => {
  return {
    id: repo.id,
    name: repo.attributes.human_name,
    orgId: repo.relationships.account.data.id,
    snapshotId: repo.relationships.latest_default_branch_snapshot.data.id,
  };
};

const snapshotReducer = project => {
  return {
    id: project.id,
    grade: project.attributes.ratings.length
      ? project.attributes.ratings[0].letter
      : 'N',
  };
};

module.exports = { orgsReducer, repoReducer, snapshotReducer };
