var button = document.querySelector(".button")
var button1 = document.querySelector(".button1")
var button2 = document.querySelector(".button2") //得分
var gamebackground = document.querySelector(".game")//游戏背景
var width = gamebackground.offsetWidth //游戏界面宽度
var job = document.querySelector('.job') //角色 小王子
var gz=document.querySelector('.gz') //规则
var num = 0 //初始化分数

button.onclick = function () {
    gamebackground.style.backgroundImage = "url('./img/开始游戏的背景.jpg')" //开始切换背景
    button.style.display = "none" //开始按钮消失
    job.style.display = 'block' //小王子出现
    button2.style.display = 'block'  //分数
    gz.style.display = "none" //开始按钮消失
    initImg() //初始化掉落图片
}
document.onkeyup = function (event) {

    var event = event || window.event;
    if (event.keyCode == 37) { //左移
        var left = job.offsetLeft
        if (left <= 22) {
            job.style.left = '22px' //到变不在移动
        } else {
            left -= 30   //每次按下左键 移动12px
            job.style.left = left + "px"
        }

    } else if (event.keyCode == 39) {
        var left = job.offsetLeft
        if (left >= 980) {
            job.style.left = '980px'//到变不在移动
        } else {
            left += 30   //每次按下左键 移动12px
            job.style.left = left + "px"
        }
    } //右移
}
window.onload = () => {
   
}

function initImg() {
    var i = getRandom(0, 2) //产生随机数 1:玫瑰 2：狐狸 3:蛇
    if (i == 0) {
        getImg('./img/玫瑰1.png', 0)
    } else if (i == 1) {
        getImg('./img/狐狸.png', 1)
    } else if (i == 2) {
        getImg('./img/蛇1.png',2)
    }
}
/**
 * 封装生成图片
 * @param {*} val  图片路径
 * @param {*} i  区分图片类名
 */
function getImg(val, i) {
    var img = document.createElement('img')
    img.style.position = 'absolute'
    img.style.left = getRandom(40, width - 40) + "px" //随机图片位置
    img.style.top = 0
    img.width = '70'
    img.height = '70'
    img.src = val
    img.className = 'img' + i
    var times=3000
    if(num>30){
        times=30000/(num/5) //从50之后开始加速
    }
    gamebackground.appendChild(img)
    reduce(img, i)
    time1 = setTimeout(() => {
      initImg()
    }, times)
}


function reduce(img, i) { //下落过程
    var top = img.offsetTop
    top += 10  //每次下降10Px
    img.style.top = top + 'px'
    var times=200
    if(num>50){
        console.log(times)
        times=4000/num
    }else{
        times=200
    }
    if ( //两者接触得情况  //蛇
        job.offsetTop <= img.offsetTop + img.offsetHeight &&
        img.offsetWidth >= Math.abs(job.offsetLeft - img.offsetLeft) &&
        job.offsetWidth >= Math.abs(img.offsetLeft - job.offsetLeft)
    ) {
        
        if (i == 2) {  //遇到蛇 游戏结束
            alert('游戏结束')
         
            window.location.reload()
          
        } else if (i == 0) { //遇到玫瑰加10分
            num += 10
            button2.innerHTML = '得分' + num
            gamebackground.removeChild(img) //图片消失
        } else if (i == 1) {
            num -= 2
            button2.innerHTML = '得分' + num //遇到狐狸扣2分
            gamebackground.removeChild(img) //图片消失
        }
    }
    timer = setTimeout(() => {

        if (img.offsetTop >= 520) { //到底清除
            // clearTimeout(timer)
            gamebackground.removeChild(img)
        } else {
            reduce(img,i)
        }
    }, times)

}


/**
 * 
 * 随机数
  */

function getRandom(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min)
}


/**
 * 
 * 封装取所有同类名原生
  */


function get(val) {
    return document.querySelectorAll(val)
}
