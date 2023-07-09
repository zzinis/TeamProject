module.exports = (sequelize, DataTypes) => {
    const User = sequelize.define(
        'User',
        {
            id: {
                type: DataTypes.STRING(10),
                allowNull: false,
                primaryKey: true,
            },
            pw: {
                type: DataTypes.STRING(100),
                allowNull: true,
            },
            name: {
                type: DataTypes.STRING(20),
                allowNull: true,
            },
            email: {
                type: DataTypes.STRING(50),
                allowNull: true,
            },
            img: {
                type: DataTypes.STRING(10),
                allowNull: true,
                primaryKey: true,
            },
        },
        {
            tableName: 'user',
            freezeTableName: true,
            timestamps: false,
        },
    );

    return User;
};
