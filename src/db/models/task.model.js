const { Model, DataTypes } = require('sequelize');

// Table name in the database
const TASK_TABLE = 'tasks';

// Schema model
const TaskSchema = {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER,
  },
  title: {
    allowNull: false,
    type: DataTypes.STRING,
  },
  description: {
    allowNull: false,
    type: DataTypes.STRING,
  },
  status: {
    allowNull: false,
    type: DataTypes.STRING,
    defaultValue: 'assigned',
  },
  deliveryDate: {
    allowNull: false,
    type: DataTypes.DATEONLY, // YYYY-MM-DD
    field: 'delivery_date',
  },
  comments: {
    allowNull: true,
    type: DataTypes.TEXT,
  },
  tasked: {
    allowNull: true,
    type: DataTypes.STRING,
  },
  tags: {
    allowNull: true,
    type: DataTypes.STRING,
  },
};

// Config to create model instance
class Task extends Model {
  static config(sequelize) {
    return {
      sequelize,
      tableName: TASK_TABLE,
      modelName: 'Task',
      timestamps: false,
    };
  }
}

module.exports = {
  TASK_TABLE,
  TaskSchema,
  Task,
};
