import { Sequelize } from 'sequelize';
import User from '../models/User';

const sequelize = new Sequelize({
  dialect: 'postgres',
  host: process.env.DB_HOST || 'localhost',
  port: parseInt(process.env.DB_PORT || '5432'),
  username: process.env.DB_USER || 'postgres',
  password: process.env.DB_PASSWORD || 'postgres',
  database: process.env.DB_NAME || 'leetcode_clone',
  logging: false,
});

const initializeDatabase = async () => {
  try {
    // Initialize models
    User.initModel(sequelize);

    // Sync database
    await sequelize.sync();
    console.log('Database synchronized successfully');
  } catch (error) {
    console.error('Failed to initialize database:', error);
    throw error;
  }
};

export { sequelize, initializeDatabase }; 