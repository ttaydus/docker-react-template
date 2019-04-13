exports.seed = function(knex, Promise) {
    // Deletes ALL existing entries
    return knex('cards').del()
      .then(function () {
        // Inserts seed entries
        return knex('cards').insert([
            { title: 'groceries', priority: 'medium', status: 'Upcoming'},
            { title: 'clean', priority: 'low', status: 'inAction'},
            { title: 'play', priority: 'high', status: 'Finito'},
            { title: 'anotherTask', priority: 'low', status: 'inAction'}
        ]);
      });
  };