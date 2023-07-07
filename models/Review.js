module.exports = (sequelize, DataTypes) => {
    const Review = sequelize.define(
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
                allowNull: false,
                references: {
                    model: 'user',
                    key: 'id',
                },
            },
            content: {
                type: DataTypes.TEXT,
                allowNull: false,
            },
            created_at: {
                type: DataTypes.DATE,
                allowNull: false,
                defaultValue: sequelize.literal('CURRENT_TIMESTAMP'),
            },
            result: {
                type: DataTypes.STRING(30),
                allowNull: false,
            },
            test_name: {
                type: DataTypes.STRING(30),
                allowNull: false,
                references: {
                    model: 'test',
                    key: 'test_name',
                },
            },
            img: {
                type: DataTypes.STRING(10),
                allowNull: false,
                references: {
                    model: 'user',
                    key: 'img',
                },
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
