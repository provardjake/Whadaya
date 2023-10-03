const User = require("./User");
const Review = require("./Review");
const Categories = require("./Categories");
const Comment = require("./Comment");

User.hasMany(Review,{
    foreignKey: "user_id"
});

Review.belongsTo(User,{
    foreignKey: "user_id"
});

User.hasMany(Comment,{
    foreignKey: "user_id"
});

Comment.belongsTo(User,{
    foreignKey: "user_id"
});

User.belongsToMany(Review,{
    through: Comment,
    foreignKey: "user_id"
});


Categories.hasMany(Review,{
    foreignKey: "category_id"
});

Review.belongsTo(Categories,{
    foreignKey: "category_id"
});

Review.hasMany(Comment,{
    foreignKey: "review_id"
});

Comment.belongsTo(Review,{
    foreignKey: "review_id"
});

module.exports= {User, Comment, Categories, Review}