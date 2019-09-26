exports.serializeUsersResponse = (allUsers, req) => {
  const users = allUsers.rows.map(user => ({
    name: user.name,
    last_name: user.lastName,
    email: user.email
  }));
  const totalPages = req.query.limit ? Math.ceil(allUsers.count / req.query.limit) : 0;
  const currentPage = req.query.page || 0;
  return { users, total_pages: totalPages, current_page: currentPage };
};
