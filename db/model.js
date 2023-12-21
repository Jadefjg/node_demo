const Sequelize = require('sequelize');
const sequelize = new Sequelize('node_db', 'root', 'feng514', {
  host: '192.168.79.128',
  dialect: 'mysql'
});


// 定义模型
const User = sequelize.define('user', {
  username: {
    type: Sequelize.STRING,
    allowNull: false
  },
  password: {
    type: Sequelize.STRING
  },
  nickname: {
    type: Sequelize.STRING
  },
  email: {
    type: Sequelize.STRING
  },
  user_pic: {
    type: Sequelize.STRING
  }
});


// 数据库操作：1. 创建数据

User.create({
  username:'feng',
  password:'123456',
  nickname:'qaz',
  email:'feng@qq.com',
  user_pic:'xxx'

})
.then(user => {
  console.log('Created user:', user);
})
.catch(err => {
  console.error('Error creating user:', err);
});


// 数据库操作：2. 查询数据
User.findAll()
.then(users => {
  console.log('All users:', users);
})
.catch(err => {
  console.error('Error retrieving users:', err);
});


// 数据库操作：2. 根据条件查询
User.findAll({
  where: {
    age: {
      [Sequelize.Op.gt]: 18
    }
  }
})
.then(users => {
  console.log('Users over 18:', users);
})
.catch(err => {
  console.error('Error retrieving users:', err);
});


// 数据库操作：3. 更新数据

User.update({ age: 30 }, {
  where: {
    firstName: '张'
  }
})
.then(updatedRows => {
  console.log('Updated rows:', updatedRows);
})
.catch(err => {
  console.error('Error updating user:', err);
});


// 数据库操作：4. 删除数据
User.destroy({
  where: {
    lastName: 'Doe'
  }
})
.then(deletedRows => {
  console.log('Deleted rows:', deletedRows);
})
.catch(err => {
  console.error('Error deleting user:', err);
});



// 高级功能：1. 数据关联
// 假设有两个模型：User 和 Post
const User = sequelize.define('user', {
  // 用户模型的属性定义
});

const Post = sequelize.define('post', {
  // 帖子模型的属性定义
});

// 一对一关联示例
User.hasOne(Post);
Post.belongsTo(User);

// 一对多关联示例
User.hasMany(Post);
Post.belongsTo(User);

// 多对多关联示例
User.belongsToMany(Post, { through: 'UserPost' });
Post.belongsToMany(User, { through: 'UserPost' });



// 高级功能：2. 查询过滤和排序
// 查询过滤示例
User.findAll({
  where: {
    age: { [Sequelize.Op.gt]: 18 }, // 年龄大于18
    lastName: { [Sequelize.Op.like]: '张%' } // lastName以'张'开头
  }
});

// 查询排序示例
User.findAll({
  order: [['lastName', 'DESC']], // 按lastName降序排序
});




// 高级功能：3. 事务管理
// 事务管理示例
try {
  await sequelize.transaction(async (t) => {
    // 在事务中执行一系列的数据库操作
    await User.create({ firstName: 'John', lastName: 'Doe' }, { transaction: t });
    await Post.create({ title: 'Hello', content: 'World' }, { transaction: t });

    // 提交事务
    await t.commit();
  });
} catch (error) {
  // 处理事务失败的情况
  console.error('Transaction error:', error)



  // 高级功能：4. 数据验证
// 模型属性的验证规则示例
const User = sequelize.define('user', {
  email: {
    type: Sequelize.STRING,
    allowNull: false,
    unique: true,
    validate: {
      isEmail: true // 必须为有效的邮箱地址
    }
  },
  password: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      len: [8, 20] // 密码长度必须在8到20之间
    }
  }
});




// 同步模型到数据库
User.sync({force: true}).then(() => {
  // 现在数据库中已经存在了user表
});

// 或者你可以同步所有定义的模型到数据库
sequelize.sync()
