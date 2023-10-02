const router = require('express').Router();
const { User, Review, Categories, Comment } = require('../models');
const withAuth = require('../utils/auth');

// Prevent non logged in users from viewing the homepage
router.get('/', withAuth, async (req, res) => {
  try {
    const reviewData = await Review.findAll({
      include: [
        {
          model: User,
          attributes: ["username"]
        },
        {
          model: Categories,
          attributes: ["name"]
        }
      ]
    });

    const review = reviewData.map((review) => review.get({plain: true}));
    console.log(review);

    res.render('homepage', {
      review,
      // Pass the logged in flag to the template
      logged_in: req.session.logged_in,
    });
  } catch (err) {
    res.status(400).json(err);
  }
});

router.get("/review", withAuth, async(req, res)=>{
  try{
    res.render("review");
  }
  catch(err){
    res.status(400).json(err);
  }
});

router.get("/review/:id", withAuth, async(req, res)=>{
  try{

    const commentArray = [];
    const reviewData = await Review.findByPk(req.params.id, {
      include: [
        {
          model: Categories,
          attributes: ["name"]
        },
        {
          model: User,
          attributes: ["username"]
        },
        {
          model: Comment,
          attributes: ["message", "likes", "replies", "user_id"],
        }
      ]
      });

      const review = reviewData.get({plain: true});
      

      // const commentData = await Comment.findByPk(review.comments[0].user_id, {
      //   include: [
      //     {
      //       model: User,
      //       attributes: ["username"]
      //     }
      //   ]
      // });

      // const comment = commentData.get({plain: true});

      for(let i = 0; i < review.comments.length; i++){
        const commentData = await Comment.findByPk(review.comments[i].user_id, {
          include: [
            {
              model: User,
              attributes: ["username"]
            }
          ]
        });

        const comment = commentData.get({plain: true});

        commentArray.push(comment);
      }

      console.log(commentArray);

      res.render("single-review", {
        review,
        commentArray,
        logged_in: req.session.logged_in,
      });
  }
  catch(err){
    res.status(400).json(err);
  }
});

router.get('/login', (req, res) => {
  // If a session exists, redirect the request to the homepage
  if (req.session.logged_in) {
    res.redirect('/');
    return;
  }

  res.render('login');
});

module.exports = router;
