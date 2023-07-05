module.exports = (Sequelize, DataTypes) => {
    const Review = Sequelize.define(
        'Review',
        {
            review_id: {
                type: DataTypes.INTEGER,
                allowNull: false,
                primaryKey: true,
                autoIncrement: true,
            },
            user_id: {
                type: DataTypes.STRING(10),
                allowNull: true,
                references: {
                    model: 'user',
                    key: 'id',
                },
            },
            content: {
                type: DataTypes.TEXT,
                allowNull: true,
            },
            created_at: {
                type: DataTypes.DATE,
                allowNull: true,
                defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
            },
            result: {
                type: DataTypes.STRING(30),
                allowNull: true,
            },
        },
        {
            tableName: 'review',
            freezeTableName: true,
            timestamps: false,
        },
    );

    return Review;
};
