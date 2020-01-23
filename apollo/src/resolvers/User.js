const projects = (_, _args, { user: { email }, prisma }) => {
  const where = {
    OR: [
      { sectionLead: { email } },
      { teamLead: { email } },
      { projectManagers_some: { email } },
      { team_some: { email_in: email } },
    ],
  };
  const res = prisma.projects({
    where,
  });

  return res;
};

module.exports = {
  projects,
};
