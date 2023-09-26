const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Review extends Model{}

Review.init(
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        title: {
            type: DataTypes.VARCHAR(80),
            allowNull: false
        },
        message: {
            type: DataTypes.STRING,
            allowNull: false
        },
        replies: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 0
        },
        likes: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 0
        },
        date: {
            type: DataTypes.DATE,
            allowNull: false
        },
        user_id: {
            type: DataTypes.INTEGER,
            references: {
                model: "user",
                key: "id"
            }
        },
        category_id: {
            type: DataTypes.INTEGER,
            references: {
                model: "categories",
                key: "id"
            }
        },
        comment_id: {
            type: DataTypes.INTEGER,
            references: {
                model: "comment",
                key: "id"
            }
        }        
    },
    {
        sequelize,
        freezeTableName: true,
        underscored: true,
        modelName: "review",
    }
);

module.exports = Review;