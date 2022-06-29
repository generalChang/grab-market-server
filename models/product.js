module.exports = function (sequelize, DataTypes) {
  //id같은 경우 자동생성됨.
  const product = sequelize.define("Product", {
    name: {
      type: DataTypes.STRING(20),
      allowNull: false,
    },
    price: {
      type: DataTypes.INTEGER(10),
      allowNull: false,
    },
    seller: {
      type: DataTypes.STRING(30),
      allowNull: false,
    },
    description: {
      type: DataTypes.STRING(300),
      allowNull: false,
    },
    imageUrl: {
      type: DataTypes.STRING(300),
      allowNull: true, //이미지 없어도 갠찬음.
    },
    soldout: {
      type: DataTypes.INTEGER(1),
      allowNull: false,
      defaultValue: 0,
    },
  });
  //테이블 생성.
  return product;
};
