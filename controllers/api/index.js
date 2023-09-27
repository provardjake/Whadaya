const router = require('express').Router();
const userRoutes = require('./userRoutes');
const reviewRoutes = require('./reviewRoutes');
const categoryRoutes = require('./categoryRoutes');
const commentRoutes = require('./commentRoutes');

router.use('/user', userRoutes);
router.use('/review', reviewRoutes);
router.use('/category', categoryRoutes);
router.use('/comment', commentRoutes);

module.exports = router;