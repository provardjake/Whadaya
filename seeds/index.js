const sequelize = require('../config/connection');
const { User, Review, Comment, Categories } = require('../models');

const userData = require('./userData.json');
const postInfo = require('./reviewData.json');
const commentInfo = require('./commentData.json');
const categoryInfo = require('./categoryData.json')

const seedDatabase = async () => {
  await sequelize.sync({ force: true });

  const category = await Categories.bulkCreate(categoryInfo, {
    individualHooks: true,
    returning: true,
  });

  const user = await User.bulkCreate(userData, {
    individualHooks: true,
    returning: true,
  });

  const review = await Review.bulkCreate(postInfo, {
    individualHooks: true,
    returning: true,
  });

  const comment = await Comment.bulkCreate(commentInfo, {
    individualHooks: true,
    returning: true,
  });


  process.exit(0);
};

seedDatabase();
