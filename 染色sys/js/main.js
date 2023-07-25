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

            const searchData = reactive({
                hair:{
                    "米蘭達": [
                        {key : '米蘭達黑',url : "./testimg/01.jpg" ,color:"黑"},
                        {key : '米蘭達紅',url : "./testimg/02.jpg" ,color:"紅"},
                        {key : '米蘭達綠',url : "./testimg/03.jpg" ,color:"綠"},
                        {key : '米蘭達黃',url : "./testimg/04.jpg" ,color:"黃"},
                        {key : '米蘭達橘',url : "./testimg/05.jpg" ,color:"橘"},
                        {key : '米蘭達藍',url : "./testimg/06.jpg" ,color:"藍"},
                        {key : '米蘭達紫',url : "./testimg/07.jpg" ,color:"紫"},
                        {key : '米蘭達褐',url : "./testimg/08.jpg" ,color:"褐"},
                    ],

                },
                face:{

                },
              


            })

            
            const ratioPrimImg = ref(blockImg.normal[0])
            const ratioMixImg = ref(blockImg.normal[1])

            const HairPrimaryColor = ref(searchData.hair["米蘭達"][0].url)
            const HairMixedColor = ref(searchData.hair["米蘭達"][1].url)


            const ratioPrimNum = ref(50)
            const ratioMixNum = ref(50)

            const showOtherMix = ref(false)
            const showPreviewResult = ref(true)
            const PreviewResultFn = ref(false)
            const previewItem = ref(true)
            const previewArrLength = ref(0)

            const handPreviewResult = () =>{
                PreviewResultFn.value = !PreviewResultFn.value
                document.getElementById("searchBar").focus()
            }
            
            const handOtherMix = ()=>{
                showOtherMix.value = !showOtherMix.value;
            }

            const searchKey = ref("")
            const searchHoverKey = ref("")
            const searchIdx = ref(0)
            const PreviewResultIshover = ref(false)

            

            const searchFn = (el) =>{
                

                searchKey.value = el.target.value
                previewItem.value = true
                



                if(searchKey.value === ""){
                    searchIdx.value = -1

                }

                if(el.keyCode === 13){
                    searchKey.value = searchHoverKey.value
                    document.getElementById("searchBar").value = searchHoverKey.value
                    document.getElementById("searchBar").focus()
                    previewItem.value = false
                }
               
            }
            const searchItemMove = (el) =>{

                searchKey.value = el.target.value
                previewItem.value = true

                if(el.keyCode === 40){
                    el.preventDefault()
                    searchIdx.value++;
                    
                    
                    
                }
                if(el.keyCode === 38){
                    el.preventDefault()
                    searchIdx.value--;
                }

                if(searchIdx.value < 0 & el.keyCode === 38){
                    searchIdx.value = 0;
                }

                if(searchIdx.value >= previewArrLength.value   & el.keyCode === 40){
                    searchIdx.value = previewArrLength.value -1
                }

                if(PreviewResultIshover.value === true & el.keyCode === 40){
                    PreviewResultIshover.value = false
                    searchIdx.value++;
                }
                if(PreviewResultIshover.value === true & el.keyCode === 38){
                    PreviewResultIshover.value = false
                    searchIdx.value--;
                }
            }

            const PushResultFn = (el) =>{
                searchKey.value = el.target.innerText
                document.getElementById("searchBar").value = el.target.innerText
                document.getElementById("searchBar").focus()
                previewItem.value = false
            }
            const listIshover = (el) =>{
                searchHoverKey.value = el.target.innerText
                console.log(searchHoverKey.value);
                PreviewResultIshover.value = true
            }
            const listNothover = () =>{
                PreviewResultIshover.value = false
            }


            const PreviewResult = computed(()=>{
                let idx = -1;
                if(searchKey.value === ""){
                    previewArrLength.value = 0
                    return "";
                }
                // 沒有開啟預覽功能
                if(!PreviewResultFn.value){
                    previewArrLength.value = 0
                    return ""
                }
                // 預覽功能有開啟才顯示
                if(PreviewResultFn.value){
                    const filter = searchData.hair["米蘭達"].filter(item=>{
                        if(item.key.indexOf(searchKey.value) !== -1){
                            return item.key
                        }
                      
                    })
                    const Map  = filter.map(item=>{
                        idx ++;
                        let str = searchKey.value
                        let replaceTxt = item.key.replace( str , `<span class="mark">${str}</span>`)
                        return {"key": item.key, "idx": idx, "status" : false, "Html": replaceTxt }
                    })
                    if(PreviewResultIshover.value){
                        Map.forEach(item=>{
                            if(searchHoverKey.value === item.key){
                                searchIdx.value = item.idx
                                item.status = true
                            }
                        })
                    }
                    Map.forEach(item=>{
                        // item.status = false
                        if(searchIdx.value === item.idx){
                            item.status = true
                            searchHoverKey.value = item.key
                        }
                    })
                    previewArrLength.value = Map.length
                    console.log(Map);
                    return Map
                }
            })



            const showImgResult = computed(()=>{
                const filter = searchData.hair["米蘭達"].filter(item=>{
                    if(item.key.indexOf(searchKey.value) !== -1){
                        return item.key
                    }
                  
                })
                const Map  = filter.map(item=>{
                    return {key: `${item.key}`, "url": `${item.url}` }
                })
                if(Map.length === 0){
                    let innerError = "查詢結果錯誤"
                    console.log("查詢結果錯誤");
                    return  {"Html": innerError }
                }else{
                    return Map
                }
            })



       



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
                let mixImg = document.getElementById("mixedColorImg");
                mixImg.style["opacity"] = Opacity;
                ratioPrimNum.value = 100 - newVal;

            })


            
            
            const altVal = ref("")
            const hoverRowAlt = (el)=>{
                altVal.value = el.target.alt
            }
            const leaveRowAlt = ()=>{
                altVal.value = ""
            }


            const brownRowImg = computed(()=>{
                
                 const Map = searchData.hair["米蘭達"].map(item => {
                    return {"url" : item.url , "alt" : `${item.color}+褐色`, "showAlt" : false}
                });
                const Map2 =  Map.map(item=>{
                    if(altVal.value !== item.alt){
                        return {"url" : item.url , "alt" : item.alt, "showAlt" : false}
                    }else{
                        return {"url" : item.url , "alt" : item.alt, "showAlt" : true}
                    }
                })
                return Map2
            })

            const purpleRowImg = computed(()=>{
                
                 const Map = searchData.hair["米蘭達"].map(item => {
                    return {"url" : item.url , "alt" : `${item.color}+紫色`}
                });
                const Map2 =  Map.map(item=>{
                    if(altVal.value !== item.alt){
                        return {"url" : item.url , "alt" : item.alt, "showAlt" : false}
                    }else{
                        return {"url" : item.url , "alt" : item.alt, "showAlt" : true}
                    }
                })
                return Map2.slice(0,7)
            })
            const blueRowImg = computed(()=>{
                
                 const Map = searchData.hair["米蘭達"].map(item => {
                    return {"url" : item.url , "alt" : `${item.color}+藍色`}
                });
                const Map2 =  Map.map(item=>{
                    if(altVal.value !== item.alt){
                        return {"url" : item.url , "alt" : item.alt, "showAlt" : false}
                    }else{
                        return {"url" : item.url , "alt" : item.alt, "showAlt" : true}
                    }
                })
                return Map2.slice(0,6)
            })
            const orangeRowImg = computed(()=>{
                
                 const Map = searchData.hair["米蘭達"].map(item => {
                    return {"url" : item.url , "alt" : `${item.color}+橘色`}
                });
                const Map2 =  Map.map(item=>{
                    if(altVal.value !== item.alt){
                        return {"url" : item.url , "alt" : item.alt, "showAlt" : false}
                    }else{
                        return {"url" : item.url , "alt" : item.alt, "showAlt" : true}
                    }
                })
                return Map2.slice(0,5)
            })
            const yellowRowImg = computed(()=>{
                
                 const Map = searchData.hair["米蘭達"].map(item => {
                    return {"url" : item.url , "alt" : `${item.color}+黃色`}
                });
                const Map2 =  Map.map(item=>{
                    if(altVal.value !== item.alt){
                        return {"url" : item.url , "alt" : item.alt, "showAlt" : false}
                    }else{
                        return {"url" : item.url , "alt" : item.alt, "showAlt" : true}
                    }
                })
                return Map2.slice(0,4)
            })
            const greenRowImg = computed(()=>{
                
                 const Map = searchData.hair["米蘭達"].map(item => {
                    return {"url" : item.url , "alt" : `${item.color}+綠色`}
                });
                const Map2 =  Map.map(item=>{
                    if(altVal.value !== item.alt){
                        return {"url" : item.url , "alt" : item.alt, "showAlt" : false}
                    }else{
                        return {"url" : item.url , "alt" : item.alt, "showAlt" : true}
                    }
                })

                return Map2.slice(0,3)
            })
            const redRowImg = computed(()=>{
                
                 const Map = searchData.hair["米蘭達"].map(item => {
                    return {"url" : item.url , "alt" : `${item.color}+紅色`}
                });

                const Map2 =  Map.map(item=>{
                    if(altVal.value !== item.alt){
                        return {"url" : item.url , "alt" : item.alt, "showAlt" : false}
                    }else{
                        return {"url" : item.url , "alt" : item.alt, "showAlt" : true}
                    }
                })
                return Map2.slice(0,2)
            })
            const blackRowImg = computed(()=>{
                
                 const Map = searchData.hair["米蘭達"].map(item => {
                    return {"url" : item.url , "alt" : `${item.color}+黑色`}
                });

                const Map2 =  Map.map(item=>{
                    if(altVal.value !== item.alt){
                        return {"url" : item.url , "alt" : item.alt, "showAlt" : false}
                    }else{
                        return {"url" : item.url , "alt" : item.alt, "showAlt" : true}
                    }
                })
                return Map2.slice(0,1)
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
                PreviewResultFn,
                searchFn,
                PreviewResult,
                previewItem,
                PushResultFn,
                listIshover,
                listNothover,
                searchItemMove,
                showImgResult,
                brownRowImg,
                purpleRowImg,
                blueRowImg,
                orangeRowImg,
                yellowRowImg,
                greenRowImg,
                redRowImg,
                blackRowImg,
                hoverRowAlt,
                leaveRowAlt,
                
                


            }
        }
    }


    createApp(App).mount("#app")     
    

    
}