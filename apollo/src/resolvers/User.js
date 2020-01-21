const projects = (parent, args, context) => {
  const { email } = context.user;
  const where = {
    OR: [
      { sectionLead: { email } },
      { teamLead: { email } },
      { projectManagers_some: { email } },
      { team_some: { email_in: email } },
    ],
  };
  const res = context.prisma.projects({
    where,
  });

  return res;
};

module.exports = {
  projects,
};
