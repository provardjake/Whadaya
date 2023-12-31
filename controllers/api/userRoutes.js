const router = require('express').Router();
const { User, Review } = require('../../models');

router.post('/', async (req, res) => {
  try {
    const userData = await User.create(req.body);

    req.session.save(() => {
      req.session.user_id = userData.id;
      req.session.logged_in = true;

      res.status(200).json(userData);
    });
  } catch (err) {
    res.status(400).json(err);
  }
});

router.post('/login', async (req, res) => {
  try {
    const userData = await User.findOne({ where: { email: req.body.email } });

    if (!userData) {
      res
        .status(400)
        .json({ message: 'Incorrect email or password, please try again' });
      return;
    }

    const validPassword = await userData.checkPassword(req.body.password);

    if (!validPassword) {
      res
        .status(400)
        .json({ message: 'Incorrect email or password, please try again' });
      return;
    }

    req.session.save(() => {
      req.session.user_id = userData.id;
      req.session.logged_in = true;
      
      res.json({ user: userData, message: 'You are now logged in!' });
    });

  } catch (err) {
    res.status(400).json(err);
  }
});

router.post('/logout', (req, res) => {
  if (req.session.logged_in) {
    req.session.destroy(() => {
      res.status(204).end();
    });
  } else {
    res.status(404).end();
  }
});

router.get("/", async (req, res)=>{
  try{
    const userData = await User.findAll();

    res.status(200).json(userData);
  }
  catch(err){
    res.status(400).json(err);
  }
});

router.get("/:id", async (req, res)=>{
  try{
    const userData = await User.findByPk(req.params.id, {
      include: [
        {
          model: Review
        }
      ]
    });

    if(!userData){
      res.status(404).json({message: "User not found!"});
      return;
    }
    res.status(200).json(userData);
  }
  catch(err){
    res.status(400).json(err);
  }
});

router.delete("/:id", async(req, res)=>{
  try{
    const userData = await User.destroy({
      where: {
        id: req.params.id,
        user_id: req.session.user_id
      }
    });

    if(!userData){
      res.status(404).json({message: "User not found!"});
      return;
    }

    res.status(200).json(userData);
  }
  catch(err){
    res.status(400).json(err);
  }
});

router.put("/:id", async (req, res)=>{
  try{
    const updatedUser = await User.update(req.body, {
      where: {
        id: req.params.id
      }
    });

    res.status(200).json(updatedUser);
  }
  catch(err){
    res.status(404).json(err);
  }
})

module.exports = router;
