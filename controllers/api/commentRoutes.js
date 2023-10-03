const router = require('express').Router();
const {User, Comment} = require('../../models');

router.get("/", async(req, res)=>{
    try{
        const commentData = await Comment.findAll();

        res.status(200).json(commentData);
    }
    catch(err){
        res.status(400).json(err);
    }
});

router.get("/:id", async(req, res)=>{
    try{
        const commentData = await Comment.findByPk(req.params.id, {
            include: [
                {
                    model: User
                }
            ]
        });

        if(!commentData){
            res.status(404).json({message: "Comment not found!"});
            return;
        }

        res.status(200).json(commentData);
    }
    catch(err){
        res.status(400).json(err);
    }
});

router.post("/", async(req, res)=>{
    console.log(req.body);
    console.log("----------------------------------------");

    try{
        const newComment = await Comment.create({
            ...req.body,
            user_id: req.session.user_id
        });

        res.status(200).json(newComment);
    }
    catch(err){
        res.status(400).json(err);
    }
});

router.delete("/:id", async (req, res)=>{
    try{
        const commentData = await Comment.destroy({
            where: {
                id: req.params.id,
                user_id: req.session.user_id
            }
        });

        if(!commentData){
            res.status(404).json({message: "No comment found with this id!"});
            return;
        }

        res.status(200).json(commentData);
    }
    catch(err){
        res.status(400).json(err);
    }
});

router.put("/:id", async (req, res)=>{
    try{
        const updatedComment = await Comment.update(req.body, {
            where: {
                id: req.params.id
            }
        });

        if(!updatedComment){
            res.status(404).json({message: "Comment not found!"});
            return;
        }

        res.status(200).json(updatedComment);
    }
    catch(err){
        res.status(400).json(err);
    }
});

module.exports = router;