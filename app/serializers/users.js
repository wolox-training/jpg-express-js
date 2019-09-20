exports.serializeUsersResponse = (users, req) => {
  const us = users.rows.map(user => ({
    name: user.name,
    lastName: user.lastName,
    email: user.email
  }));
  const totalPages = Math.ceil(users.count / req.query.limit);
  const currentPage = req.query.page;
  return { us, total_pages: totalPages, current_page: currentPage };
};
