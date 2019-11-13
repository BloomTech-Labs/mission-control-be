module.exports = {
  jwtSecret:
    process.env.JWT_SECRET ||
    "4*Zey0zCfzeC@m2qmG&8@FHOVas3cPf$l&hr3m5mAzIa3pkxUPALgsi5kv7j9oYQ21J66aVIgE%6aj%SHEykGtY1RFmTJ5&*^Ukz",
  adminSecret: process.env.JWT_ADMIN,
  managerSecret: process.env.JWT_MANAGER,
  studentSecret: process.env.JWT_STUDENT,
  environment: process.env.NODE_ENV
};
