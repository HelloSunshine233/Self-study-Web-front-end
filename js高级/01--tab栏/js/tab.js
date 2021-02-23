/*
    一 功能的需求
        1. 点击tab栏，可以实现切换效果
        2. 点击+号，可以添加tab项和内容项
        3. 点击*号，可以删除当前的tab项和内容项
        4. 双击tab项文字或者是内容项文字都可以修改里面的内容 
    二 面向对象编程： 抽取对象：tab对象
        1. 切换功能
        2. 添加功能
        3. 删除功能
        4. 修改功能
    三 存在的问题
        1. class="inconfont icon-guanbi",为什么可以同时添加两个类？
        2. 这个必须把this.main先获取过来，然后再操作里面的小li什么的？
        this.lis = this.main.querySelectorAll('li');
        3. 这里init()中那个为什么for循环中的 为什么会点击那个li就会直接的显示那个事件。他是一直在那里循环等着的吗？
        解答：我感觉就类似于那个单片机中的那个一直循环检测一样，但是这个网路执行的比较快，所以其实就是一直在检测
        4. // 给每个小li都绑定一个index。这个是必须的（这个是绑定的，所以点击的时候会显示自己需要的index）
            this.lis[i].index = i;
*/
var that;
class Tab {
    // 传参，传到这个地方
    constructor(id) {
        that = this;
        // 这里输出的this指向的是 Tab{} (这个里面获取的东西有点多，但是也是获取的标签才能显示出来)
        // 有那个 lis main  sections 
        // console.log(this); 

        // 获取元素
        // 有点疑问的地方是，后面的页面上的元素，怎么获取呢
        this.main = document.querySelector(id); // 这里的id传参，传过来（真的有点绕啊）
        // 1. 这个必须把this.main先获取过来，然后再操作里面的小li什么的？
        this.lis = this.main.querySelectorAll('li');
        this.sections = this.main.querySelectorAll('section');
        this.init();
    }
    init() {
        // init的初始化相关的元素绑定事件
        // 给每个小li都绑定点击事件 for循环
        for (var i = 0; i < this.lis.length; i++ ) {
            // 给每个小li都绑定一个index。这个是必须的
            this.lis[i].index = i;
            // 因为是点击才执行方法。所以不要加   ()
            this.lis[i].onclick = this.toggleTab;
        }
    }
    
    // 准备四种方法
    // 1. 切换功能
    toggleTab() {
        // this.clearClass(); // 此时的this 指向的是lis 所以现在需要的是指向id盒子里面的
        // 排他思想的。先清除所以，再添加特定的类
        that.clearClass();
          
        // 这里的this指向的是lis;所以下面的那个that要该为指向constructor中的this
        this.className = 'liactive';
    
        // 留着测试用
        // （这个是绑定的，所以点击的时候会显示自己需要的index）
        // console.log(this.index); 

        // 这里就会出现问题，找不到这个this 问题
        // this.sections[this.index].className = 'conactive';
        // 这里的this指向的是lis;所以下面的那个that要该为指向constructor中的this
        // （这个是绑定的，所以点击的时候会显示自己需要的index）
        that.sections[this.index].className = 'conactive';
    }
    clearClass() {
        for (var i = 0; i < this.lis.length; i++) {
            this.lis[i].className = '';
            this.sections[i].className = '';
        }
    }
    // 2. 添加功能
    addTab() {}
    // 3. 删除功能
    removeTab() {}
    // 4. 修改功能
    editTab() {}

}
// 1. 为什么要传那个tab类呢？
new Tab('#tab');
       
