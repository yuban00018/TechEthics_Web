### vue相关

#### watch

**不支持缓存**，数据变，直接会触发相应的操作
watch**支持异步**

watch是vue内部提供的一个用于侦听功能的更通用的方法，其用来响应数据的变化，通过特定的数据变化驱动一些操作。

vue官方文档解释当需要在数据变化时执行异步或开销较大的操作时，推荐使用该方法。

```vue
<script>
	export default {
		data(){
			variable:null,
		},
		watch:{
			// 此处监听variable变量，当期有变化时执行
			variable(item1,item2){
				// item1为新值，item2为旧值
			}
		}
	}
</script>
```

如上代码所示：当变量variable产生变化时，会被页面侦听到并执行相关的操作。

也可以这样写

```vue
<script>
	export default {
		data(){
			variable:null,
		},
		watch:{
			variable:{
				// 此处监听variable变量，当期有变化时执行
				handler(item1,item2){
					// item1为新值，item2为旧值
				}
			}
		}
	}
</script>
```

#### computed

**支持缓存**，只有依赖数据发生改变，才会重新进行计算
**不支持异步**，当computed内有异步操作时无效，无法监听数据的变化

原： 

```vue
<div id="example">
 {{ message.split('').reverse().join('') + number }}
</div>
```

使用了computed：

```vue
<template>
  <div>
    <p>{{ reversedMessage }}</p>
  </div>
</template>
 
<script>
export default {
  name: 'test1',
  data () {
    return {
      message: 'hello world',
      number: 1
    }
  },
  computed: {
    // 字符串反转
    reversedMessage () {
      return this.message.split('').reverse().join('') + this.number
    }
  }
}
</script>	
```

在 computed 中定义的每一个计算属性，都会被缓存起来，只有当计算属性里面依赖的一个或多个属性变化了，才会重新计算当前计算属性的值。上面的代码片段中，在 reversedMessage 中，它依赖了 message 和number 这两个属性，一旦其中一个变化了，reversedMessage 会立刻重新计算输出新值。

computed 和 watch 的使用场景并不一样，computed 的话是**通过几个数据的变化，来影响一个数据，**而 watch，则是可以**一个数据的变化，去影响多个数据**

computed 跟 methods 里面的方法的区别，computed 的话访问的时候会直接返回已缓存的结果，而不会像 methods 一样再次计算

#### mounted

html加载完成后执行

执行顺序：子组件-父组件

mounted钩子函数主要是用来执行DOM操作

#### created

html加载完成之前，执行

执行顺序：父组件-子组件

creadted钩子函数主要是用来初始化数据

#### props

props是子组件访问父组件数据的唯一接口

父组件可以使用 props 把数据传给子组件

#### $emit

子组件可以使用 $emit，让父组件监听到自定义事件

**this.$emit('A', B);**

子组件触发了父组件的A函数，B是A函数的参数

#### name

给组件命名

#### localStorage

在HTML5中，加入了一个localStorage特性，这个特性主要是用来作为本地存储来使用的，解决了cookie存储空间不足的问题(cookie中每条cookie的存储空间为4k)，localStorage中一般浏览器支持的是5M大小，这个在不同的浏览器中localStorage会有所不同。它只能存储字符串格式的数据，所以最好在每次存储时把数据转换成json格式，取出的时候再转换回来。

setItem(“key”,“value”)：存储名字为key的一个值value，如果key存在，就更新value

getItem(“key”)：获取名称为key的值，如果key不存在则返回null

removeItem(“key”)：删除名称为“key”的信息，这个key所对应的value也会全部被删除

clear()：清空localStorage中所有信息

key()：键的索引

#### load()

事件会在页面或图像加载完成后立即发生

#### encodeURIComponent()

函数可把字符串作为URI组件进行编码

某些字符后台无法读取，因此需要编码一下

#### window.open(url)

用来打开一个新窗口的函数

#### export function xx() {}

指定模块的输出，通过

```javascript
import {xx} from 'xxxx'
```

读入

#### Blob类型

Blob类型的对象表示不可变的类似文件对象的原始数据，通俗点说，就是Blob对象是二进制数据，但它是类似文件对象的二进制数据，因此可以像操作File对象一样操作Blob对象，实际上，File继承自Blob

#### URL.createObjectURL(Blob 对象)

URL.createObjectURL(Blob对象)：生成一个本地的预览地址

#### v-bind

v-on用于事件绑定，缩写@

```vue
< button v-on:click=“handleClick”>提交</ button>
< button @click=“handleClick”>提交</ button>
```

#### v-on

v-bind用于属性绑定，缩写 ：
如例：

```vue
< img v-bind:src=“imgUrl”/>
< img :src=“imgUrl”/>
```

#### v-model

v-model用于双向绑定,常用于表单，vue实例中的data与其渲染的dom元素上的内容保持一致，两者无论谁被改变，另一方也会相应的更新为相同的数据。

```vue
< form>
	< input type=“text” v-model=“inputValue”/>
< /form>
```

```vue
<input v-model="sth" />
<input v-bind:value="sth" v-on:input="sth = $event.target.value" />
<input :value="sth" @input="sth = $event.target.value" />
```

v-model只是语法糖而已

第一行的代码其实只是第二行的语法糖

#### components

意思为引入组件，组件可以写在别的文件中，也可以写在本文件中，需要赋值给变量

可以理解为就是用来注册子组件的

可以通过在<script>中引入子组件，再赋值给components的变量，让当前变量成为父组件可以使用的html标签

#### slot插槽

slot是Vue中的插槽，首先它是使用在 子组件 中的

Vue的slot插槽，简单理解就是，在子组件内占坑，在父组件里填坑。

slot一般都是子组件定义了主体部分，父组件引入，然后父组件根据需求不同需要向里面添加不同的内容。

**普通slot插槽**

```vue
<!--父组件-->
<template>
  <div id="app">
    <SecondPage>
      wql
    </SecondPage>
  </div>
</template>
<script>
import SecondPage from '@/components/SecondPage'
export default {
  name: 'App',
  components: {
    SecondPage: SecondPage
  },
}
</script>
```

```vue
<!--子组件-->
<template>
  <div>
    SecondPage
  </div>
</template>
```

结果不会显示wql

![img](file:///C:\Users\Au_Miner\AppData\Roaming\Tencent\Users\358671982\QQ\WinTemp\RichOle\9XP_TSG`{Y022N%$$R25O[U.png)

子组件加入插槽即可显示

```vue
<!--子组件-->
<template>
  <div>
    SecondPage
    <slot></slot>
  </div>
</template>
```

![img](file:///C:\Users\Au_Miner\AppData\Roaming\Tencent\Users\358671982\QQ\WinTemp\RichOle\XW$V738E@W4{NJMH%RCA_OA.png)

**具名插槽**

具名插槽的作用是，一个萝卜一个坑，可以将父组件中的内容插入指定的子组件位置中

具名插槽的使用语法
1 . 子组件定义slot时，在标签上加上name='xxx'属性
2 . 父组件将想插入的部分最外部的div上加上slot="xxx"属性

**作用域插槽 | 带数据的插槽**

slot-scope的出现实现了父组件调用子组件内部的数据，子组件的数据通过slot-scope属性传递到了父组件

```vue
<!--子组件-->
<template>
  <div>
    SecondPage
    <!--作用域插槽-->
    <slot :sss="data"></slot>
  </div>
</template>

<script>
export default {
  data: function(){
    return {
      data: ['zhangsan','lisi','wanwu','zhaoliu','tianqi','xiaoba']
    }
  }
}
</script>
```

```vue
<!--父组件-->
<template>
  <div id="app">
    <SecondPage>
      <template slot-scope="user">
        {{user.sss}}
      </template>
    </SecondPage>
  </div>
</template>

<script>
import SecondPage from '@/components/SecondPage'
export default {
  name: 'App',
  components: {
    SecondPage: SecondPage
  },
}
</script>
```

最终父组件可以获取子组件的数据并展示

#### ref

​	在JavaScript中需要通过document.querySelector("#demo")来获取dom节点，然后再获取这个节点的值。在Vue中，我们不用获取dom节点，元素绑定ref之后，直接通过this.$refs即可调用，这样可以减少获取dom节点的消耗。

```vue
<p ref="p">Hello</p>
<children ref="children"></children>
```

```vue
this.$refs.p
this.$refs.children
```

#### $route

**this.$route.query()**

查询跳转的时候携带的参数





### element-ui相关

#### 导入element-ui

使用cnpm

```javascript
npm install -g cnpm --registry=https://registry.npm.taobao.org
```

下载element-ui

```javascript
cnpm install element-ui -S
```

main.js中添加如下代码即可

```javascript
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
Vue.use(ElementUI)
```

#### :visible.sync

:visible指的是属性绑定，表示弹框的显示隐藏，当:visible的值为ture的时候，弹框显示，当为false的时候，弹框隐藏

后面的.sync指的就是同步动态双向的来表示visible的值，当我们关闭窗口的时候，这个弹框隐藏了，visible的值发生了变化，但是关闭窗口这个动作，我们没法用确定的动作去判断这个值，所以用到了vue中的双向绑定的原则，在vue中统一加上了.sync来表示同步的修改了visible的值

#### v-loading

就是可以显示出一个圈圈在转，表示正在加载

绑定的属性，bool型，可以控制要不要显示

#### el-table的多选表格形式

```vue
@selection-change="xxx"
```

@selection-change绑定的函数，即为当前表格选定某些行之后，会触发的函数

#### el-pagination分页

total:10个一页

current-change：页面改变会触发函数

hide-on-single-page：一页会隐藏forEach
