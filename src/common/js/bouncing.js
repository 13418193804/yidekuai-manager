
import Vue from 'vue'

// 注册一个全局自定义指令 `v-bouncing` 用于加载时
/**
        * .el-loading-mask {
        * position: absolute;
        * z-index: 2000;
        * background-color: rgba(255,255,255,.9);
        * margin: 0;
        * top: 0;
        * right: 0;
        * bottom: 0;
        * left: 0;
        * -webkit-transition: opacity .3s;
        *  transition: opacity .3s;
        * }
        */

        // v-bouncing 不可用在子组件template下的首级div
        Vue.directive('bouncing', {
            bind: function (el, binding) {
       
              // let bouncing_loader = document.createElement("div");
              // let div1 = document.createElement("div");
              // let div2 = document.createElement("div");
              // let div3 = document.createElement("div");
              // bouncing_loader.className = 'flex  flex-align-center flex-pack-center el-loading-mask bouncing-loader ';
              // bouncing_loader.appendChild(div1);
              // bouncing_loader.appendChild(div2);
              // bouncing_loader.appendChild(div3);
              // el.appendChild(bouncing_loader)

          
            },
            // 当被绑定的元素插入到 DOM 中时……
            inserted: function (el, binding) {
        
            
              if (!el.getElementsByClassName('bouncing-loader')[0]) {
                let bouncing_loader = document.createElement("div");
                let div1 = document.createElement("div");
                let div2 = document.createElement("div");
                let div3 = document.createElement("div");
                bouncing_loader.className = 'flex  flex-align-center flex-pack-center el-loading-mask bouncing-loader ';
                bouncing_loader.appendChild(div1);
                bouncing_loader.appendChild(div2);
                bouncing_loader.appendChild(div3);
                el.appendChild(bouncing_loader)
              }
              let bouncing_loader = el.getElementsByClassName('bouncing-loader')[0]
           let loader =  ()=>{
              if (binding.value) {
               
                if( el.className.indexOf('bouncing-position')===-1){
                  el.className += ' bouncing-position'
                }
                // if(bouncing_loader.className.indexOf('bouncing-none') !== -1){
                  bouncing_loader.className = bouncing_loader.className.replace('bouncing-none', '').trim()
                // }
              } else{

                bouncing_loader.className += ' bouncing-none'
                if(bouncing_loader.className.indexOf('bouncing-none') !== -1){
                  el.className = el.className.replace('bouncing-position', '').trim()
                }
              
              }
             }
              loader();
            },
            // 所在组件的 VNode 更新时调用，但是可能发生在其子 VNode 更新之前。指令的值可能发生了改变，也可能没有。但是你可以通过比较更新前后的值来忽略不必要的模板更新 (详细的钩子函数参数见下)。
            update: function (el, binding) {
            
            },
            // 指令所在组件的 VNode 及其子 VNode 全部更新后调用。
            componentUpdated: function (el, binding) {
            
              if (!el.getElementsByClassName('bouncing-loader')[0]) {
                let bouncing_loader = document.createElement("div");
                let div1 = document.createElement("div");
                let div2 = document.createElement("div");
                let div3 = document.createElement("div");
                bouncing_loader.className = 'flex  flex-align-center flex-pack-center el-loading-mask bouncing-loader ';
                bouncing_loader.appendChild(div1);
                bouncing_loader.appendChild(div2);
                bouncing_loader.appendChild(div3);
                el.appendChild(bouncing_loader)
              }
              let bouncing_loader = el.getElementsByClassName('bouncing-loader')[0]
           let loader =  ()=>{
              if (binding.value) {
               
                if( el.className.indexOf('bouncing-position')===-1){
                  el.className += ' bouncing-position'
                }
                // if(bouncing_loader.className.indexOf('bouncing-none') !== -1){
                  bouncing_loader.className = bouncing_loader.className.replace('bouncing-none', '').trim()
                  bouncing_loader.className = bouncing_loader.className.replace('bouncing-none', '').trim()
                  bouncing_loader.className = bouncing_loader.className.replace('bouncing-none', '').trim()
                // }
              } else{
                bouncing_loader.className =   bouncing_loader.className.split('bouncing-none')[0].trim() + ' bouncing-none'
                
                if(bouncing_loader.className.indexOf('bouncing-none') !== -1){
                  el.className = el.className.replace('bouncing-position', '').trim()
                }
              }
             }


        
              loader();


            },
            unbind: function (el, binding) {
          
            }
          })


    