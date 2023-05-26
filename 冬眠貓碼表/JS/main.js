window.onload = ()=>{

const changeFn = () =>{
    let stopwatch = document.getElementById("stopwatchBtn")
    let counterBtn = document.getElementById("counterBtn")

    const ActstopwatchFn = () =>{
        stopwatch.classList.add("act")
        counterBtn.classList.remove("act")

    }
    const ActcounterFn = () =>{
        stopwatch.classList.remove("act")
        counterBtn.classList.add("act")
    }

    stopwatch.addEventListener("click",ActstopwatchFn)
    counterBtn.addEventListener("click",ActcounterFn)
    
}
changeFn()

const stopwatchFn = () =>{
    let eventDateProvided = '2077-12-25T00:00:00';
    let convertEventDate = moment.utc(eventDateProvided)
    let stopwatch = document.getElementById("stopwatch")
    let StartBtn = document.getElementById("StartBtn")
    let StopBtn =document.getElementById("StopBtn")
    let clearBtn = document.getElementById("ClearBtn")
    let stopT1 = null
    let Timearr  = []  
    let NumImg = [
        {"url":  "./img/n0.png",
        "alt" : "0"
    },
        {"url":  "./img/n1.png",
        "alt" : "1"
    },
        {"url":  "./img/n2.png",
        "alt" : "2"
    },
        {"url":  "./img/n3.png",
        "alt" : "3"
    },
        {"url":  "./img/n4.png",
        "alt" : "4"
    },
        {"url":  "./img/n5.png",
        "alt" : "5"
    },
        {"url":  "./img/n6.png",
        "alt" : "6"
    },
        {"url":  "./img/n7.png",
        "alt" : "7"
    },
        {"url":  "./img/n8.png",
        "alt" : "8"
    },
        {"url":  "./img/n9.png",
        "alt" : "9"
    },
        {"url":  "./img/colon.png",
        "alt" : "colon"
    },
    ]
    
    let tail = document.getElementsByClassName("cattail")[0]
    let eyes = document.getElementsByClassName("eyes")[0]
    let mouth = document.getElementsByClassName("mouth")[0]
    let catbody = document.getElementsByClassName("catbody")[0]
    let water = document.getElementsByClassName("water")[0]

    const imgOnload= () =>{
        let loadImg = new Image()
        NumImg.forEach(item =>{
            loadImg = new Image()
            loadImg.src = item.url
        })
    }
    imgOnload()

    const clockRunner = () =>{
    convertEventDate.add(1,'s');
    Timearr[0] = convertEventDate.format('HH').slice(0,1)
    Timearr[1] = convertEventDate.format('HH').slice(1)
    Timearr[2] = "colon"
    Timearr[3] = convertEventDate.format('mm').slice(0,1)
    Timearr[4] = convertEventDate.format('mm').slice(1)
    Timearr[5] = "colon"
    Timearr[6] = convertEventDate.format('ss').slice(0,1)
    Timearr[7] = convertEventDate.format('ss').slice(1)
    // console.log(Timearr);
    const numTranImgFn = () =>{
        let ImgArr = Timearr.map(url => {
            if(url === "colon"){
                return {"url" : NumImg[10].url, "alt" : NumImg[10].alt}
            }
            if(url === "0") {
                return {"url" : NumImg[0].url, "alt" : NumImg[0].alt}
            }
            if(url === "1") {
                return {"url" : NumImg[1].url, "alt" : NumImg[1].alt}
            }
            if(url === "2") {
                return {"url" : NumImg[2].url, "alt" : NumImg[2].alt}
            }
            if(url === "3") {
                return {"url" : NumImg[3].url, "alt" : NumImg[3].alt}
            }
            if(url === "4") {
                return {"url" : NumImg[4].url, "alt" : NumImg[4].alt}
            }
            if(url === "5") {
                return {"url" : NumImg[5].url, "alt" : NumImg[5].alt}
            }
            if(url === "6") {
                return {"url" : NumImg[6].url, "alt" : NumImg[6].alt}
            }
            if(url === "7") {
                return {"url" : NumImg[7].url, "alt" : NumImg[7].alt}
            }
            if(url === "8") {
                return {"url" : NumImg[8].url, "alt" : NumImg[8].alt}
            }
            if(url === "9") {
                return {"url" : NumImg[9].url, "alt" : NumImg[9].alt}
            }
        
        });
        // console.log(ImgArr);
        const randerImg = ()=>{
            
            let html = ''
            ImgArr.forEach(item => {
                html += `
                <img src="${item.url}" alt="${item.alt}">
                `
            });
        
            stopwatch.innerHTML = html
        }
        imgOnload()
        randerImg()

    }   
    numTranImgFn() 
    }

    const Sleepstatus = () =>{

        if (eyes.classList.contains("sleep")){

            water.style.display  = "block"
            water.style.opacity  = 0.1

            if( mouth.classList.contains("sleep") & tail.classList.contains("sleep")){
                water.style.opacity  = 0.5
            }


            setTimeout(()=>{
                water.style.opacity = 0.5
            },500)

            tail.classList.remove("happy")
            mouth.classList.remove("happy")
            tail.classList.remove("angry")
            mouth.classList.remove("angry")

            mouth.classList.add("sleep")
            tail.classList.add("sleep")




            
            


            catbody.removeEventListener("mouseover",HappytoAngry)
            catbody.removeEventListener("mouseleave",AngrytoHappy)

        }else{
            water.style.display  = "none"

            catbody.addEventListener("mouseover",HappytoAngry)
            catbody.addEventListener("mouseleave",AngrytoHappy)
        }

 
    }
    
    const HappytoAngry = () =>{
        tail.classList.remove("happy")
        tail.classList.remove("sleep")
        tail.classList.add("angry")
        eyes.classList.remove("happy")
        eyes.classList.remove("sleep")
        eyes.classList.add("angry")
        mouth.classList.remove("happy")
        mouth.classList.remove("sleep")
        mouth.classList.add("angry")
    }
    const AngrytoHappy = () =>{
        tail.classList.remove("angry")
        tail.classList.remove("sleep")
        tail.classList.add("happy")
        eyes.classList.remove("sleep")
        eyes.classList.remove("angry")
        eyes.classList.add("happy")
        mouth.classList.remove("angry")
        mouth.classList.remove("sleep")
        mouth.classList.add("happy")
    }
    catbody.addEventListener("mouseover",HappytoAngry)
    catbody.addEventListener("mouseleave",AngrytoHappy)
    Sleepstatus()


    


    const clearzero = (el) =>{
        btnClickTransition(el.currentTarget)
        eventDateProvided = '2077-12-25T00:00:00';
        convertEventDate = moment.utc(eventDateProvided)
        let html  = ''
        html += `
                <img  src="./img/n0.png" alt="H">
                <img  src="./img/n0.png" alt="h">
                <img  src="./img/colon.png" alt="冒號">
                <img  src="./img/n0.png" alt="M">
                <img  src="./img/n0.png" alt="m">
                <img  src="./img/colon.png" alt="冒號">
                <img  src="./img/n0.png" alt="S">
                <img  src="./img/n0.png" alt="s">
        `
        stopwatch.innerHTML = html
    }
    const runFn = (el)=>{
        btnClickTransition(el.currentTarget)
        eyes.classList.remove("sleep")
        Sleepstatus()
        AngrytoHappy()
        
        stopT1 = setInterval(clockRunner, 1000);

        StartBtn.removeEventListener("click",runFn)
        clearBtn.removeEventListener("click",clearzero)
    
    
    
    }
    const stopFn = (el) =>{
        btnClickTransition(el.currentTarget)
        eyes.classList.add("sleep")
        Sleepstatus()
        StartBtn.addEventListener("click",runFn)
        clearBtn.addEventListener("click",clearzero)
        clearInterval(stopT1)
    }

    StartBtn.addEventListener("click",runFn)
    StopBtn.addEventListener("click",stopFn)
    clearBtn.addEventListener("click",clearzero)

    const btnClickTransition = (btn)=>{
        // console.log(btn);
        btn.classList.add("act")
        setTimeout(()=>{
            btn.classList.remove("act")
        },200)
    }

}
stopwatchFn()

const counterFn = ()=>{

}   
counterFn()

}