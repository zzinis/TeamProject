module.exports = (sequelize, DataTypes) => {
    const Test = sequelize.define(
        'Test',
        {
            test_id: {
                type: DataTypes.INTEGER,
                allowNull: false,
                primaryKey: true,
                autoIncrement: true,
            },
            test_name: {
                type: DataTypes.STRING(30),
                allowNull: false,
            },
        },
        {
            tableName: 'test',
            freezeTableName: true,
            timestamps: false,
        },
    );

    return Test;
};
