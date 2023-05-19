window.onload = () =>{
    const {createApp, ref, reactive, onMounted, watch , computed} = Vue

    const App = {
        setup(){

            const blockImg =  reactive({
                normal:[
                    "./testimg/c1.png",
                    "./testimg/c2.png",
                    "./testimg/c3.png",
                    "./testimg/c4.png",
                    "./testimg/c5.png",
                    "./testimg/c6.png",
                    "./testimg/c7.png",
                    "./testimg/c8.png",
                ],
                disable:[
                    "./testimg/c1_dis.png",
                    "./testimg/c2_dis.png",
                    "./testimg/c3_dis.png",
                    "./testimg/c4_dis.png",
                    "./testimg/c5_dis.png",
                    "./testimg/c6_dis.png",
                    "./testimg/c7_dis.png",
                    "./testimg/c8_dis.png",                    
                ],
                active:[
                    "./testimg/c1_act.png",
                    "./testimg/c2_act.png",
                    "./testimg/c3_act.png",
                    "./testimg/c4_act.png",
                    "./testimg/c5_act.png",
                    "./testimg/c6_act.png",
                    "./testimg/c7_act.png",
                    "./testimg/c8_act.png",                       
                ],
                black:{
                    normal: "./testimg/c1.png",
                    active: "./testimg/c1_act.png",
                    disable: "./testimg/c1_dis.png"

                },
            })

            const primaryListArr  = reactive([
                {name: "黑色", url: blockImg.active[0] },
                {name: "紅色", url: blockImg.disable[1] },
                {name: "綠色", url: blockImg.normal[2] },
                {name: "黃色", url: blockImg.normal[3] },
                {name: "橘色", url: blockImg.normal[4] },
                {name: "藍色", url: blockImg.normal[5] },
                {name: "紫色", url: blockImg.normal[6] },
                {name: "褐色", url: blockImg.normal[7] },
            ])
            const mixedListArr  = reactive([
                {name: "黑色mix", url: blockImg.disable[0] },
                {name: "紅色mix", url: blockImg.active[1] },
                {name: "綠色mix", url: blockImg.normal[2] },
                {name: "黃色mix", url: blockImg.normal[3] },
                {name: "橘色mix", url: blockImg.normal[4] },
                {name: "藍色mix", url: blockImg.normal[5] },
                {name: "紫色mix", url: blockImg.normal[6] },
                {name: "褐色mix", url: blockImg.normal[7] },
            ])

            const HairObj = reactive({
                "米蘭達" : {
                    black: "./testimg/01.jpg",
                    red: "./testimg/02.jpg",
                    green: "./testimg/03.jpg",
                    yellow: "./testimg/04.jpg",
                    orange: "./testimg/05.jpg",
                    bluer: "./testimg/06.jpg",
                    purple: "./testimg/07.jpg",
                    brownr: "./testimg/08.jpg",
                },
            })

            
            const ratioPrimImg = ref(blockImg.normal[0])
            const ratioMixImg = ref(blockImg.normal[1])

            const HairPrimaryColor = ref(HairObj["米蘭達"].black)
            const HairMixedColor = ref(HairObj["米蘭達"].red)


            const ratioPrimNum = ref(50)
            const ratioMixNum = ref(50)

            const showOtherMix = ref(false)
            const showPreviewResult = ref(true)
            let  PreviewResultFn = document.getElementById("PreviewBtn")
            const handPreviewResult = () =>{
                PreviewResultFn = !PreviewResultFn
            }
            
            const handOtherMix = ()=>{
                showOtherMix.value = !showOtherMix.value;
            }
            const previewData = reactive({
                hair: [
                    {key : '髮型黑'},
                    {key : '髮型紅'},
                    {key : '髮型綠'},
                    {key : '髮型黃'},
                    {key : '髮型橘'},
                    {key : '髮型藍'},
                    {key : '髮型紫'},
                    {key : '髮型褐'},
                ]

            })
            let filterResult = reactive([])


            let test = ref(0)
            
            

            const searchFn = (el) =>{
                

                let key = el.target.value
                let keyCode = el.keyCode

                if(!PreviewResultFn){
                    showPreviewResult.value = false
                    return;
                }

                if(key === ""){
                    showPreviewResult.value = false
                    return;
                }

                if(PreviewResultFn){
                    
                    showPreviewResult.value = true

                    const ans = previewData.hair.filter(item=>{
                        return item.key.indexOf(key) !== -1
                    })
                          
                   
                    
                    if(keyCode === 13 | keyCode === 8){
                        test.value ++;
                       
                        filterResult = computed(()=>{
                            const Map = ans.map(item=>{
                                item
                            })
                            return Map
                        })
                        console.log(filterResult);
                        
                        
                        
                    }
                }

          
            }

           watch(filterResult, (newval)=>{
            console.log(newval);
           },
           { deep: true }
           )
   
         


            // 紀錄原本點選前的active、disable
            let blockStatus = {
                primActId : 0,
                primDisId : 0,
                mixActId : 0,
                mixDisId : 0,
            }

            const blockAllnormal = () =>{
                let i = 0
                let j = 0
                primaryListArr.forEach(item => {
                    item.url = blockImg.normal[i]
                    i++
                });
                mixedListArr.forEach(item => {
                    item.url = blockImg.normal[j]
                    j++
                });
            }
            const blockStatusRecord = ()=> {
                let i = 0
                let j = 0
                primaryListArr.forEach(item => {
                    let primaryurl = ""
                    if(item.url.indexOf("dis") !== -1){
                        primaryurl = item.url
                        blockStatus.primDisId = Number( primaryurl.slice(-9,-8) -1)
                    }
                    if(item.url.indexOf("act") !== -1){
                        primaryurl = item.url
                        blockStatus.primActId = Number( primaryurl.slice(-9,-8) -1)
                    }
                    i++;
                });
                mixedListArr.forEach(item => {
                    let mixedurl = ""
                    if(item.url.indexOf("dis") !== -1){
                        mixedurl = item.url
                        blockStatus.mixDisId =  Number(mixedurl.slice(-9,-8) -1)
                    }
                    if(item.url.indexOf("act") !== -1){
                        mixedurl = item.url
                        blockStatus.mixActId =  Number(mixedurl.slice(-9,-8) -1)
                    }
                    j++;
                });                

            }
            
            const  blockColorCh = (el) =>{
                let Color = el.target.alt
                let ColorIdx = el.target.src.slice(-9,-8)
                
                blockStatusRecord()
                const primClickRemainStatus = ()=>{
                    primaryListArr[blockStatus.primDisId].url = blockImg.disable[blockStatus.primDisId]
                    mixedListArr[blockStatus.mixActId].url = blockImg.active[blockStatus.mixActId]
                }

                const mixClickRemainStatus = ()=>{
                    primaryListArr[blockStatus.primActId].url = blockImg.active[blockStatus.primActId]
                    mixedListArr[blockStatus.mixDisId].url = blockImg.disable[blockStatus.mixDisId]
                }
                // 點選非normal Block  直接終止這事件
                if( ColorIdx !== "m"){
                }
                 // 點選normal Block 執行以下內容
                else{
                    blockAllnormal()
                    const ClickPrimFn = ()=>{
    
                        if(Color === "黑色"){
                            primaryListArr[0].url =  blockImg.active[0]
                            mixedListArr[0].url = blockImg.disable[0]
                            primClickRemainStatus()
        
                        }
                        if(Color === "紅色"){
                            primaryListArr[1].url =  blockImg.active[1]
                            mixedListArr[1].url = blockImg.disable[1]
                            primClickRemainStatus()                }
                        if(Color === "綠色"){
                            primaryListArr[2].url =  blockImg.active[2]
                            mixedListArr[2].url = blockImg.disable[2]
                            primClickRemainStatus()
                        }
                        if(Color === "黃色"){
                            primaryListArr[3].url =  blockImg.active[3]
                            mixedListArr[3].url = blockImg.disable[3]
                            primClickRemainStatus()
                        }
                        if(Color === "橘色"){
                            primaryListArr[4].url =  blockImg.active[4]
                            mixedListArr[4].url = blockImg.disable[4]
                            primClickRemainStatus()
                        }
                        if(Color === "藍色"){
                            primaryListArr[5].url =  blockImg.active[5]
                            mixedListArr[5].url = blockImg.disable[5]
                            primClickRemainStatus()
                        }
                        if(Color === "紫色"){
                            primaryListArr[6].url =  blockImg.active[6]
                            mixedListArr[6].url = blockImg.disable[6]
                            primClickRemainStatus()
                        }
                        if(Color === "褐色"){
                            primaryListArr[7].url =  blockImg.active[7]
                            mixedListArr[7].url = blockImg.disable[7]
                            primClickRemainStatus()
                        }                    
    
                    }
                    const ClickMixFn = ()=>{
                        if(Color === "黑色mix"){
                            mixedListArr[0].url =  blockImg.active[0]
                            primaryListArr[0].url = blockImg.disable[0]
                            mixClickRemainStatus()
                        }
                        if(Color === "紅色mix"){
                            mixedListArr[1].url =  blockImg.active[1]
                            primaryListArr[1].url = blockImg.disable[1]
                            mixClickRemainStatus()  
                        }            
                        if(Color === "綠色mix"){
                            mixedListArr[2].url =  blockImg.active[2]
                            primaryListArr[2].url = blockImg.disable[2]
                            mixClickRemainStatus()              
                        }
                        if(Color === "黃色mix"){
                            mixedListArr[3].url =  blockImg.active[3]
                            primaryListArr[3].url = blockImg.disable[3]
                            mixClickRemainStatus()              
                        }
                        if(Color === "橘色mix"){
                            mixedListArr[4].url =  blockImg.active[4]
                            primaryListArr[4].url = blockImg.disable[4]
                            mixClickRemainStatus()              
                        }
                        if(Color === "藍色mix"){
                            mixedListArr[5].url =  blockImg.active[5]
                            primaryListArr[5].url = blockImg.disable[5]
                            mixClickRemainStatus()              
                        }
                        if(Color === "紫色mix"){
                            mixedListArr[6].url =  blockImg.active[6]
                            primaryListArr[6].url = blockImg.disable[6]
                            mixClickRemainStatus()              
                        }
                        if(Color === "褐色mix"){
                            mixedListArr[7].url =  blockImg.active[7]
                            primaryListArr[7].url = blockImg.disable[7]
                            mixClickRemainStatus()              
                        }                    
    
                    }
                    ClickPrimFn()
                    ClickMixFn()
                    const ratioBlockCh = ()=>{
                        blockStatusRecord()
                        ratioPrimImg.value = blockImg.normal[blockStatus.primActId]
                        ratioMixImg.value = blockImg.normal[blockStatus.mixActId]
                    }
                    ratioBlockCh()                    

                    const HairColorCh = () => {
                        let primUrl = ""
                        let mixUrl = ""
                        blockStatusRecord()
                        primUrl = `./testimg/0${ blockStatus.primActId + 1}.jpg`
                        mixUrl = `./testimg/0${ blockStatus.mixActId + 1}.jpg`
                        HairPrimaryColor.value = primUrl
                        HairMixedColor.value = mixUrl

                    }
                    HairColorCh()

                }  

               

            }

            const BtnControlRatio = (el) =>{
                let id = el.target.id 

                if(ratioMixNum.value >= 99 & id === "opacityAddBtn" ){
                    return
                }
                if(ratioPrimNum.value >= 99 & id === "opacityRemoveBtn" ){
                    return
                }
                if (id === "opacityAddBtn"){
                    ratioMixNum.value++;
                    ratioPrimNum.value--;
                }
                if (id === "opacityRemoveBtn"){
                    ratioMixNum.value--;
                    ratioPrimNum.value++;                    
                }
                    
            }
            const resetRatioFn = () =>{
                ratioMixNum.value = 50;
                ratioPrimNum.value = 50;
                    
            }
   
            watch(ratioMixNum,(newVal)=>{
                let Opacity = newVal *0.01;
                console.log(Opacity);
                let mixImg = document.getElementById("mixedColorImg");
                mixImg.style["opacity"] = Opacity;
                ratioPrimNum.value = 100 - newVal;

            })

            onMounted(() => {
   
            })

            return{
                blockImg,
                primaryListArr,
                mixedListArr,
                blockColorCh,
                ratioPrimImg,
                ratioMixImg,
                ratioPrimNum,
                ratioMixNum,
                HairPrimaryColor,
                HairMixedColor,
                BtnControlRatio,
                resetRatioFn,
                showOtherMix,
                handOtherMix,
                showPreviewResult,
                handPreviewResult,
                searchFn,
                filterResult


            }
        }
    }


    createApp(App).mount("#app")     
    

    
}