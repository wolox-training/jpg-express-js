exports.serializeUsersResponse = (allUsers, req) => {
  const users = allUsers.rows.map(user => ({
    name: user.name,
    lastName: user.lastName,
    email: user.email
  }));
  const totalPages = Math.ceil(allUsers.count / req.query.limit);
  const currentPage = req.query.page;
  return { users, total_pages: totalPages, current_page: currentPage };
};
