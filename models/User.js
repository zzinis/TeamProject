module.exports = (Sequelize, DataTypes) => {
    const User = Sequelize.define(
        'User',
        {
            id: {
                type: DataTypes.STRING(10),
                allowNull: false,
                primaryKey: true,
            },
            pw: {
                type: DataTypes.STRING(10),
                allowNull: false,
            },
            name: {
                type: DataTypes.STRING(10),
                allowNull: false,
            },
            email: {
                type: DataTypes.STRING(50),
                allowNull: false,
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
