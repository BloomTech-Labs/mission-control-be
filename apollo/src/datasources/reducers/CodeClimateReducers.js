const orgsReducer = (org) => {

    return {
        id: org.id,
        name: org.attributes.name,
        repocount: org.meta.counts.repos,
    }
}

const repoReducer = (repo) => {
    // console.log(repo)
    return {
        id: repo.id,
        name: repo.attributes.human_name,
        orgId: repo.relationships.account.data.id,
        snapshotId: repo.relationships.latest_default_branch_snapshot.data.id
    }
}

const snapshotReducer = (project) => {
    console.log(project)
    return {
        id: project.id,
        name: 'Mission-Control-FE',
        grade: project.attributes.ratings.length ? project.attributes.ratings[0].letter : 'This is not the grade you are looking for'
    }
}

module.exports = {orgsReducer, repoReducer, snapshotReducer};