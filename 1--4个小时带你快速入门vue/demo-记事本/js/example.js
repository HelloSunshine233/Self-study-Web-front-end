/* 
新增 1.生成列表结构（v-for数组）
     2.获取用户输入 （v-model双向数据绑定）
     3.回车，新增数据（v-on.enter 添加数据）

删除 

统计 

清空
  
隐藏 1.没有数据的时候 隐藏元素（v-if v-show 后面跟的条件是非空就行）
*/ 
var app = new Vue({
  el:"#todoapp",
  data:{
    list:["写代码","睡觉","玩游戏"],
    inputValue:"好好学习，天天向上"
  },
  methods:{
    add:function() {
      // 现在只是添加，还需要绑定点击事件才能成功
      // list.push() 这个就是自动增加尾部的列表的用法
      // js 中的 push() 方法可向数组的末尾添加一个或多个元素，并返回新的长度。
      this.list.push(this.inputValue);
    },
    // 删除
    remove:function(index) {
      // splice() 方法用于添加或删除数组中的元素。
      this.list.splice(index,1);
      console.log(index);
      // this.list.pop(this.inputValue);
    },
    clear:function() {
      this.list = [];
    }

  }
})



// const app = new Vue({
//   el: "#todoapp",
//   data: {
//     //  总数据
//     todoList: ["吃饭饭", "睡觉觉", "写代码"],
//     //  输入的内容
//     inputValue: "",
//   },
//   // 方法
//   methods: {
//     // 增加任务
//     addTodo() {
//       this.todoList.push(this.inputValue);
//     },
//     // 删除任务
//     delTodo(index) {
//       this.todoList.splice(index, 1);
//     },
//     clearTodo() {
//       this.todoList = [];
//     }
//   }
// });
