module.exports = (sequelize, DataTypes) => {
    const Participation = sequelize.define(
        'Participation',
        {
            participation_id: {
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
            test_name: {
                type: DataTypes.STRING(30),
                allowNull: false,
                references: {
                    model: 'test',
                    key: 'test_name',
                },
            },
            result: {
                type: DataTypes.STRING(30),
                allowNull: true,
            },
        },
        {
            tableName: 'participation',
            freezeTableName: true,
            timestamps: false,
        },
    );

    return Participation;
};
