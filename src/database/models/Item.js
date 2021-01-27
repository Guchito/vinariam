module.exports = (sequelize, DataTypes) => {
    const alias = "Item"
    const cols = {
        id: {
            type: DataTypes.INTEGER.UNSIGNED,
            autoIncrement: true,
            primaryKey: true
        },
        name: {
            type: DataTypes.STRING
        },
        unit_price: {
            type: DataTypes.DECIMAL
        },
        quantity: {
            type: DataTypes.INTEGER.UNSIGNED
        },
        subTotal: {
            type: DataTypes.DECIMAL
        },
        img: {
            type: DataTypes.STRING
        },
        status: {
            type: DataTypes.BOOLEAN
        }, 
        user_id: {
            type: DataTypes.INTEGER.UNSIGNED
        },
        product_id: {
            type: DataTypes.INTEGER.UNSIGNED
        },
        order_id: {
            type: DataTypes.INTEGER.UNSIGNED
        }
    }
    const config = {
        tableName: "items",
        timestamps: true
    }

    const Item = sequelize.define(alias, cols, config);
   
    Item.associate = (models) => {
        Item.belongsTo(models.User,{
            as: "users",
            foreignKey: "user_id",
        });
        Item.belongsTo(models.Product,{
            as: "products",
            foreignKey: "product_id",
        });
        Item.belongsTo(models.Order,{
            as: "orders",
            foreignKey: "order_id",
        });
    };

    return Item;

}

