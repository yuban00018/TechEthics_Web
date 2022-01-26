import { Message } from 'element-ui';
import axios from "axios";

// 实现通过url下载文件的作用
export function Download(url) {
    if (url === "" || url == null) {
      Message.error("请在点击提交后重试");
      return;
    }
      url = url.replace(/\\/g,"/");
    return axios({
      method: "GET",
      url: "/file/download?fileAddress=" + url,
      data: {},
      responseType: "blob",
    }).then((res) => {
        // a标签实现超链接
        var new_element = document.createElement("a");
        // console.log(res)
        // console.log(new_element)
        new_element.download = res.config.url.slice(res.config.url.search("---") + 3);
        new_element.style.display = "none";
        // Blob类型的对象表示不可变的类似文件对象的原始数据，通俗点说，就是Blob对象是二进制数据，但它是类似文件对象的二进制数据，因此可以像操作File对象一样操作Blob对象，实际上，File继承自Blob
        var blob = new Blob([res.data]);
        // URL.createObjectURL(Blob对象)：生成一个本地的预览地址
        new_element.href = URL.createObjectURL(blob);
        // 把当前new_element放到当前html文档的body里，然后触发click()事件
        // 疑惑1：为什么这里可以触发点击事件可以直接下载呢
        document.body.appendChild(new_element);
        new_element.click();
        document.body.removeChild(new_element);
      }).catch((err) => {
        Message.error(err);
      });
  }

// export function xx() {}：指定模块的输出，通过import {xx} from 'xxxx'读入
export function Preview(url){
  if (url === "" || url == null) {
    Message.error("请在点击提交后重试");
    return;
  }
  console.log(url);
  url = url.replace(/\\/g,"/");
  // encodeURIComponent()：函数可把字符串作为URI组件进行编码，某些字符后台无法读取，因此需要编码一下
  url = encodeURIComponent("http://localhost:8888/api/file/preview?fileAddress="+ url);
  // window.open(url)：用来打开一个新窗口的函数
  window.open("/static/plugins/pdfjs/web/viewer.html?file="+url);
}
