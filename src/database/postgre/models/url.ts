import { Model, DataTypes } from 'sequelize';
import  sequelize = require('../db') 


class UrlModel extends Model {
  public originalUrl!: string;
  public shortUrl!: string;
  public expiresAt!: Date;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

UrlModel.init(
  {
    originalUrl: {
      type: DataTypes.STRING(2048),
      allowNull: false,
      primaryKey: true,
    },
    shortUrl: {
      type: DataTypes.STRING(32),
      allowNull: false,
    },
    expiresAt: {
      type: DataTypes.DATE,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: 'Url',
  }
);



export default UrlModel;