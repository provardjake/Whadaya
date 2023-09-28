const router = require('express').Router();
const {Categories } = require('../../models');

router.get("/", async(req, res)=>{
    try{
        const categoryData = await Categories.findAll();

        res.status(200).json(categoryData);
    }
    catch(err){
        res.status(400).json(err);
    }
});

router.get("/:id", async(req, res)=>{
    try{
        const categoryData = await Categories.findByPk(req.params.id);

        if(!categoryData){
            res.status(404).json({message: "Category not found!"});
            return;
        }

        res.status(200).json(categoryData);
    }
    catch(err){
        res.status(400).json(err);
    }
});

module.exports = router;