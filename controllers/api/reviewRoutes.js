const router = require('express').Router();
const { Review, User, Comment, Categories } = require('../../models');
const withAuth = require('../../utils/auth');

router.post('/', withAuth, async (req, res) => {
  try {
    const newReview = await Review.create({
      ...req.body,
      user_id: req.session.user_id,
    });

    res.status(200).json(newReview);
  } catch (err) {
    res.status(400).json(err);
  }
});

router.delete('/:id', withAuth, async (req, res) => {
  try {
    const reviewData = await Review.destroy({
      where: {
        id: req.params.id,
        user_id: req.session.user_id,
      },
    });

    if (!reviewData) {
      res.status(404).json({ message: 'No review found with this id!' });
      return;
    }

    res.status(200).json(reviewData);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get("/", async (req, res)=>{
  try{
    const reviewData = await Review.findAll();

    res.status(200).json(reviewData);
  }
  catch(err){
    res.status(400).json(err);
  }
});

router.get("/:id", async (req, res)=>{
  try{
    const reviewData = await Review.findByPk(req.params.id, {
      include: [
        {
          model: Categories
        },
        {
          model: User
        },
        {
          model: Comment
        }
      ]
    });

    if(!reviewData){
      res.status(404).json({message: "Review not found!"});
      return;
    }
    res.status(200).json(reviewData);
  }
  catch(err){
    res.status(400).json(err);
  }
});

router.put("/:id", async(req, res)=>{
  try{
    const updatedReview = await Review.update(req.body, {
      where: {
        id: req.params.id
      }
    });

    if(!updatedReview){
      res.status(404).json({message: "Review not found!"});
      return;
  }

    res.status(200).json(updatedReview);
  }
  catch(err){
    res.status(400).json(err);
  }
})

module.exports = router;
