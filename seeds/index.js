const sequelize = require('../config/connection');
const { User, Review } = require('../models');

const userData = require('./userData.json');
const postInfo = require('./postsInfo.json');
const Review = require('../models/Review');

const seedDatabase = async () => {
  await sequelize.sync({ force: true });

  const users = await User.bulkCreate(userData, {
    individualHooks: true,
    returning: true,
  });

  for (const review of postInfo) {
    await Review.create({
      ...review,
      user_id: users[Math.floor(Math.random() * users.length)].id,
    });
  }

  process.exit(0);
};

seedDatabase();
