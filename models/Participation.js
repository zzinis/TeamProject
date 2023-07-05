'use strict';

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
            test_id: {
                type: DataTypes.INTEGER,
                allowNull: false,
                references: {
                    model: 'test',
                    key: 'test_id',
                },
            },
            participation_date: {
                type: DataTypes.DATEONLY,
                allowNull: false,
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
