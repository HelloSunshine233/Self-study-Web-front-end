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
        
        this.add = this.main.querySelector('.tabadd');
        
        // li的父元素 first-child css3选择器
        this.ul = this.main.querySelector('.fisrstnav ul:first-child');
        // section 父元素
        this.fsection = this.main.querySelector('.tabscon');
        this.init();
    }
    init() {
        // 一init()时候就，获取小li 和section
        this.updateNode();
        // init的初始化相关的元素绑定事件
        // 因为现在就是点击一次等，不需要添加到for循环里面
        this.add.onclick = this.addTab;
        // 给每个小li都绑定点击事件 for循环
        for (var i = 0; i < this.lis.length; i++ ) {
            // 给每个小li都绑定一个index。这个是必须的
            this.lis[i].index = i;
            // 因为是点击才执行方法。所以不要加   ()
            this.lis[i].onclick = this.toggleTab;
            this.remove[i].onclick = this.removeTab;
            this.spans[i].ondblclick = this.editTab;
            this.sections[i].ondblclick = this.editTab;

        }
    }
    // 因为我们动态添加元素 需要从新获取对应的元素
    // 获取所有的小li 和section
    updateNode() {
        // 1. 这个必须把this.main先获取过来，然后再操作里面的小li什么的？
        this.lis = this.main.querySelectorAll('li');
        this.sections = this.main.querySelectorAll('section');
        // 如果这个写在constructor里面的话就会产生，绑定事件的不更新，就会出现错误
        // 就会导致init() 中的元素发生问题，就会影响那个for循环中的时间的绑定点击事件，就会出现错误，所以必须更新
        this.remove = this.main.querySelectorAll('.icon-guanbi');


        // 原来就少一个All
        this.spans = this.main.querySelectorAll('.fisrstnav li span:first-child');
        // this.spans = this.main.querySelector('.fisrstnav li span:first-child');
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
        /* 
        这里的for中的this是没有问题的，因为那个clearClass() 是toggleTab()调用的，
        然后是里面的that调用的，that要该为指向constructor中的this，所以没有问题
        */ 
        for (var i = 0; i < this.lis.length; i++) {
            this.lis[i].className = '';
            this.sections[i].className = '';
        }
    }
    // 2. 添加功能
    addTab() {  
        // 调用之前先清除类
        that.clearClass();
        // alert(11);// 测试
        // (1) 创建li元素 和 section元素
        var random = Math.random();
        var li = '<li class="liactive"><span>新选项卡</span><span class="iconfont icon-guanbi"></span></li>';
        var section = '<section class="conactive">测试'+ random +'</section>'; 
        // (2) 把这两个元素追加到对应的父元素里面
        // 此时的this是   this.add.onclick = this.addTab; 按钮调用的，所以此时这里的this
        // 指向的是按钮，所以应该用的是that
        // this.ul.insertAdjacentHTML('beforeend', li);
        that.ul.insertAdjacentHTML('beforeend', li);
        that.fsection.insertAdjacentHTML('beforeend', section);
        // 这句话的意思其实就是那个必须在那个toggleTab()功能实现之前，把那个addTab()添加的那个li等更新好
        that.init();
    }
    // 3. 删除功能
    // 添加事件，阻止冒泡事件
    removeTab(e) {
        // 添加事件，阻止冒泡事件
        e.stopPropagation();
        // this.remove[i].onclick = this.removeTab();
        // 此时的this指向的是谁点击的，就是指向谁，这里指向的是 remove 也就是icon-guanbi
        // this.remove = this.main.querySelectorAll('.icon-guanbi');
        // 指向的他的爸爸有index
        var index = this.parentNode.index;
        console.log(index);
        // 根据索引号删除对应的li和section
        that.lis[index].remove();
        that.sections[index].remove();
        // 无论是删除，还是添加，都需要那个初始化一下。更新
        that.init(); 

        // 1. 当我们删除的不是选中状态的li 的时候,原来的选中状态li保持不变
        if (document.querySelector('.liactive')) return;

        // 2. 当我们删除了 选中状态  的这个li 的时候, 让它的前一个li 处于选定状态
        index--;
        // 手动调用我们的点击事件  不需要鼠标触发
        // && 这个就是短路与，先判断前面的是不是true 如果是的，就执行后面的操作
        that.lis[index] && that.lis[index].click();
    }
    // 4. 修改功能
    editTab() {
        // 先获取里面的文本框
        // 这里的this指向的是span
        var str = this.innerHTML;
        // alert(11); // 验证
        // 双击禁止选定文字
        window.getSelection ? window.getSelection().removeAllRanges() : document.selection.empty();
        // 生成文本框的功能
        this.innerHTML = '<input type="text" />';
        var input = this.children[0];
        input.value = str;
        input.select(); // 文本框中的文字处于选定状态

        // 当我们离开文本框就把文本框里面的值给span 
        input.onblur = function() {
            this.parentNode.innerHTML = this.value;
        };
        // 按下回车也可以把文本框里面的值给span
        input.onkeyup = function(e) {
            if (e.keyCode === 13) {
                // 手动调用表单失去焦点事件  不需要鼠标离开操作
                this.blur();
            }
        }
    }

}
// 1. 为什么要传那个tab类呢？
new Tab('#tab');
       
