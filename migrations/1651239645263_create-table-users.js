exports.up = (pgm) => {
  pgm.createTable('users', {
    id: {
      type: 'VARCHAR(50)',
      primaryKey: true,
    },
    email: {
      type: 'VARCHAR(100)',
      notNull: true,
      unique: true,
    },
    password: {
      type: 'TEXT',
      notNull: true,
    },
    is_verified: {
      type: 'BOOLEAN',
      default: false,
    },
    name: {
      type: 'VARCHAR(100)',
      notNull: true
    },
  });
};

exports.down = (pgm) => {
  pgm.dropTable('users');
};
