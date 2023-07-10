module.exports = (sequelize, DataTypes) => {
    const Ask = sequelize.define(
        'Ask',
        {
            ask_id: {
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
            title: {
                type: DataTypes.STRING(100),
                allowNull: false,
            },
            content: {
                type: DataTypes.TEXT,
                allowNull: true,
            },
            manager_msg: {
                type: DataTypes.TEXT,
            },
        },
        {
            tableName: 'ask',
            freezeTableName: true,
            timestamps: false,
        },
    );

    return Ask;
};
