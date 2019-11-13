
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('users').truncate()
    .then(function () {
      // Inserts seed entries
      return knex('users').insert([
        {username: 'James', password: '1234', department: 'testing'},
        {username: 'Mark', password: '1234', department: 'different'},
      ]);
    });
};
