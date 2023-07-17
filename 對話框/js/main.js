
window.onload = () =>{

    const {createApp, ref, reactive, computed, watch, onMounted , onUpdated} = Vue
    const App = {

        setup(){
            const BtnObj = reactive({
                normal:[
                    "./img/chat_class_c1.png",
                    "./img/chat_class_c2.png",
                    "./img/chat_class_c3.png",
                    "./img/chat_class_c4.png",
                    "./img/chat_class_c5.png"
                ],
                hover :[
                    "./img/chat_class_c1_h.png",
                    "./img/chat_class_c2_h.png",
                    "./img/chat_class_c3_h.png",
                    "./img/chat_class_c4_h.png",
                    "./img/chat_class_c5_h.png"
                ],
            })
            const game_id = ref("我推的ID")
            const inputmsg = ref("5207")
            const chatChannelSrc = ref('./img/chat_class_c1.png')
            
            const ChannelListisShow = ref(false);
            const RingChatbool = ref(false)

            let nowtime = moment().format("HH:mm"); 
            const nowTime = ref(nowtime)
            const timerun = ()=>{
                nowtime = moment().format("HH:mm"); 
                nowTime.value = nowtime
            }
            setInterval(timerun,1000)

            // c0r:系統頻紅 c0y:系統頻黃 c1:所有頻 c2:隊伍頻  c3:好友頻 c4:公會頻 c5:聯盟頻
            const msgChannel = ref("c1")

            const msgData = reactive([
                {userID: "", class: "c0y", msg: `<span class="symbol">[</span>歡迎<span class="symbol">]</span> 歡迎來到新楓之谷！！` , time: `<span class="symbol">[</span>${nowTime.value}<span class="symbol">]</span>`},
                {userID: "", class: "c0y", msg: `<span class="symbol">[</span>系統<span class="symbol">]</span> 新楓之谷 好玩不花錢 ヽ(✿ﾟ▽ﾟ)ノ` , time: `<span class="symbol">[</span>${nowTime.value}<span class="symbol">]</span>`},
                // {userID: `${game_id.value} :`, class: "c1", msg: "test123" , time: `<span class="symbol">[</span>${nowTime.value}<span class="symbol">]</span>`},
            ])



            const handchatChannel = () =>{
                ChannelListisShow.value = !ChannelListisShow.value;
            }

            const clearfn = () =>{
                ChannelListisShow.value = false;
            }

            const RingChatshow = (ringbol) =>{
                if (ringbol) return;
                RingChatbool.value = true
                setTimeout(()=>{ RingChatbool.value = false },5000)
            }
            
            // 滑鼠經過頻道類別 切換hover圖
            const btnMousein = ( item ) => {
                let txt_src = item.target.src.slice(-6,-4);
                let idx = txt_src.slice(1) -1; 
                if (txt_src === "c" + (idx + 1) ){
                    item.target.src = BtnObj.hover[idx];
                    return
                }
                
            }
            const btnMouseout = ( item ) => {
                let txt_src = item.target.src.slice(-8,-6);
                let idx = txt_src.slice(1) -1;
                if (txt_src === "c" + (idx + 1) ){
                    item.target.src = BtnObj.normal[idx];
                    return
                }
               
    
            }


            // 滑鼠點擊頻道類別 切換圖

            const ClickChangeSrc = (el)=>{
                let txt = el.currentTarget.innerText
                if( txt === "對聯盟(/u)"){
                    chatChannelSrc.value = BtnObj.normal[4];
                    msgChannel.value = "c5"
                    return;
                }
                if( txt === "對好友(/f)"){
                    chatChannelSrc.value = BtnObj.normal[2];
                    msgChannel.value = "c3"
                    return;
                }
                if( txt === "對組隊(/p)"){
                    chatChannelSrc.value = BtnObj.normal[1];
                    msgChannel.value = "c2"
                    return;
                }
                if( txt === "對公會(/g)"){
                    chatChannelSrc.value = BtnObj.normal[3];
                    msgChannel.value = "c4"
                    return;
                }
                if( txt === "對所有人(/e)"){
                    chatChannelSrc.value = BtnObj.normal[0];
                    msgChannel.value = "c1"
                    return;
                }
                
            }

            // 鍵盤輸入切換頻道類別
            const txtSummit = (el) => {
                let str = el.target.value.trim()

                // console.log(str);
                if (el.keyCode === 13 & str === "/f"){
                    chatChannelSrc.value = BtnObj.normal[2]
                    msgChannel.value = "c3"
                    el.target.value = ""
                    return;
                }

                if (el.keyCode === 13 & str === "/p"){
                    chatChannelSrc.value = BtnObj.normal[1]
                    msgChannel.value = "c2"
                    el.target.value = ""
                    return;
                }
                if (el.keyCode === 13 & str === "/g"){
                    chatChannelSrc.value = BtnObj.normal[3]
                    msgChannel.value = "c4"
                    el.target.value = ""
                    return;
                }
                if (el.keyCode === 13 & str === "/u"){
                    chatChannelSrc.value = BtnObj.normal[4]
                    msgChannel.value = "c5"
                    el.target.value = ""
                    return;
                }
                if (el.keyCode === 13 & str === "/e"){
                    chatChannelSrc.value = BtnObj.normal[0]
                    msgChannel.value = "c1"
                    el.target.value = ""
                    return;
                }
                if (el.keyCode === 13 & str.slice(0,1) === "/"){
                    console.log("這是特殊字元:文字不會傳到聊天窗");
                    el.target.value = "";
                    return;
                }
    
                if (el.keyCode === 13 & str !== ""){
                    inputmsg.value = el.target.value
                    msgData.push({class: msgChannel.value , msg: inputmsg.value, userID: `${game_id.value} :`, time : `<span class="symbol">[</span>${nowTime.value}<span class="symbol">]</span>`} )
                    RingChatshow(RingChatbool.value)
                    el.target.value = ""

                    // 因為msgStorage還沒先產出 所以要非同步進行
                    setTimeout(Msgscrolldown,10)
                    return;
                }
            }
            const Msgscrolldown = ()=>{
                let txtscroll = document.getElementById("txtscroll")
                txtscroll.scrollTop = txtscroll.scrollHeight
            }

            const msgStorage = computed(()=>{
                let result = ""
                const showmsg = msgData.map(item=>{
                    return {class: item.class , msg: item.msg ,  userID: item.userID, time: item.time , 
                        render: `${item.time} ${item.userID}  ${item.msg}`
                    }
                })

                result = showmsg

                // console.log(result);

                return result

               
            })
            
            // ID字數限制
            const gameIDcount = ref(0)
            const gameIDAlert = ref(false)
            function checkInput(el) {
              
              let punctuationCount = countMatches(el.target.value, /[\p{P}\u2000-\u206F\u2E00-\u2E7F\u3000-\u303F]/gu);
              let symbolCount = countMatches(el.target.value, /[\p{S}\u2070-\u209F\u20A0-\u20CF\u2100-\u214F]/gu);
              let whitespaceCount = countMatches(el.target.value, /[\p{Z}\u0009-\u000D\u0020]/gu);
              let chinesesymbolCount = (el.target.value.match(/[\u3105-\u3129\u02c7\u02cb\u02ca\u02d9\u02da\u02dc\u02c9\u02c7\u02cb\u02ca\u02d9\u02da\u02dc\u02c9\u02c7\u02cb\u02ca\u02d9\u02da\u02dc\u02c9\u02c7\u02cb\u02ca\u02d9\u02da\u02dc\u02c9\u02c7\u02cb\u02ca\u02d9\u02da\u02dc\u02c9\u02c7\u02cb\u02ca\u02d9\u02da\u02dc\u02c9\u02c7\u02cb\u02ca\u02d9\u02da\u02dc\u02c9\u02c7\u02cb\u02ca\u02d9\u02da\u02dc\u02c9\u02c7\u02cb\u02ca\u02d9\u02da\u02dc\u02c9\u02c7\u02cb\u02ca\u02d9\u02da\u02dc\u02c9\u02c7\u02cb\u02ca\u02d9\u02da\u02dc\u02c9\u02c7\u02cb\u02ca\u02d9\u02da\u02dc\u02c9\u02c7\u02cb\u02ca\u02d9\u02da\u02dc\u02c9\u02c7\u02cb\u02ca\u02d9\u02da\u02dc\u02c9]/g
              ) || []).length; 
              if(chinesesymbolCount !== 0 || whitespaceCount !== 0 || symbolCount !== 0 || punctuationCount !== 0 ){
                  gameIDAlert.value = true
              }else{
                  gameIDAlert.value = false
              }
              let chineseCount = (el.target.value.match(/[\u4e00-\u9fa5]/g) || []).length;
              let englishCount = (el.target.value.match(/[a-zA-Z]/g) || []).length; 
              let numberCount = countMatches(el.target.value, /[\p{N}]/gu);
        
              gameIDcount.value =  numberCount + chineseCount * 2 + englishCount;
              // 字符數4~12才正常
              if(gameIDcount.value <= 3 || gameIDcount.value >= 13){
                  gameIDAlert.value = true
              }
              game_id.value = el.target.value
              // console.log(gameIDcount.value);
        
            }
        
            function countMatches(value, regex) {
              let matches = value.match(regex);
              return matches ? matches.length : 0;
            }  
            
            // 戒指List
            const ringListbool = ref(false)
            const ringsearch = ref("")
            const ringSelected = reactive([
                {idx:4 , key:"黑貓貓", url:"none" , act: true ,mode:"mode04"},
            ])
            
            const ringList = reactive({data:[
                {idx:0 , key:"無", url:"none" , act: true ,mode:"mode00"},
                {idx:1 , key:"貓咪線球", url:"none" , act: false ,mode:"mode01"},
                {idx:2 , key:"蝴蝶夢", url:"none" , act: true ,mode:"mode02"},
                {idx:3 , key:"粉貓貓", url:"none" , act: true ,mode:"mode03"},
                {idx:4 , key:"黑貓貓", url:"none" , act: true ,mode:"mode04"},
            ]})


            const handRingList = (el)=>{
                let target = ""
                    target = el.currentTarget.dataset.ring
                if(target === "selected" || target === "cancel"){
                    ringListbool.value = !ringListbool.value
                }else{
                    // 
                    const actAllfalse = ringList.data.map(item=>{
                        return {
                            idx:item.idx, 
                            key:item.key, 
                            url:item.url, 
                            act: false,
                            mode:item.mode, 
                        }
                    })
                    const filt = actAllfalse.filter(item=>{
                        return item.key === target
                    })
                    
                    ringSelected[0].key = filt[0].key
                    ringSelected[0].url = filt[0].url
                    ringSelected[0].mode = filt[0].mode
                    ringListbool.value = false

                    ringsearch.value = ""
                    navSearch.value = ""
                }

          
                return target
            }
           
            const ringsearchFn = (el)=>{
                console.log(el.target.value);
                ringsearch.value =  el.target.value
            }


            const ringSelectedShow = computed(()=>{
                const a = ringSelected.map(item=>{
                    return {
                        key: item.key,
                        url: item.url,
                        mode:item.mode, 
                    }
                })
                return a
            })

            const ringListshow = computed(()=>{
                const a = ringList.data.map(item=>{
                    if(item.key === ringSelected[0].key){
                        return  {idx:item.idx , key:item.key, url:item.url , act: true }
                    }
                    return  {idx:item.idx , key:item.key, url:item.url , act: false }
                })
                const search = a.filter(item=>{
                    if(item.key.indexOf(ringsearch.value) !== -1){
                        return  {idx:item.idx , key:item.key, url:item.url , act: item.act }
                    }
                })
                console.log(search);
                return search
            })
            // 角色圖資料操作
            const personBoxBool = ref(false)
            const personSelected = ref([{idx:7, url : ""}])
            const personBoxData = ref([
                {idx:1, act: false, url:""},
                {idx:2, act: false, url:""},
                {idx:3, act: false, url:""},
                {idx:4, act: false, url:""},
                {idx:5, act: false, url:""},
                {idx:6, act: false, url:""},
                {idx:7, act: false, url:""},
                {idx:8, act: false, url:""},
                {idx:9, act: false, url:""},
                {idx:10,act: false,  url:""}
            ])
            const handpersonData = (el) =>{
                let idx = 0
                let url = ""
                if(el === null){
                    idx = personSelected.value[0].idx
                    url = personSelected.value[0].url
                    personBoxData.value = personBoxData.value.map(item=>{
                        if(item.idx === idx){
                            return {idx:item.idx, act: true, url:item.url}
                        }else{
                            return {idx:item.idx, act: false, url:item.url}
                        }
                    })                    
                    return
                }

                console.log(el.target.dataset.alt);
                idx = Number(el.target.dataset.alt)
                
                
                if(idx === personSelected.value[0].idx){
                    console.log(personBoxBool.value);
                    personBoxBool.value = !personBoxBool.value
                }else{
                    personSelected.value[0].idx = idx
                    personSelected.value[0].url = url

                    personBoxData.value = personBoxData.value.map(item=>{
                        if(item.idx === idx){
                            return {idx:item.idx, act: true, url:item.url}
                        }else{
                            return {idx:item.idx, act: false, url:item.url}
                        }
                    })
                    personBoxBool.value = false
                }
            }
            const personBoxRender = computed(()=>{
                const a = personBoxData.value.map(item=>{
                    return {idx:item.idx, act: item.act, url:item.url}
                })
                return a
            })




            // txt換行計算
            const msgRef = ref(null)
            const ChatTxtHeight = ref(0)

            const CalTxtHeight = () =>{
                // 固定行高15px
                // console.log(msgRef.value);
                const textHeight = msgRef.value.offsetHeight;
                ChatTxtHeight.value = `translateY(-${textHeight-15}px)`
                // console.log(ChatTxtHeight.value);
            }

            // MapSwiper
            const MapData = reactive([
                {idx:1 , url: "https://swiperjs.com/demos/images/nature-1.jpg"},
                {idx:2 , url: "https://swiperjs.com/demos/images/nature-2.jpg"},
                {idx:3 , url: "https://swiperjs.com/demos/images/nature-3.jpg"},
                {idx:4 , url: "https://swiperjs.com/demos/images/nature-4.jpg"},
                {idx:5 , url: "https://swiperjs.com/demos/images/nature-5.jpg"},
                {idx:6 , url: "https://swiperjs.com/demos/images/nature-6.jpg"},
                {idx:7 , url: "https://swiperjs.com/demos/images/nature-7.jpg"},
                {idx:8 , url: "https://swiperjs.com/demos/images/nature-8.jpg"},
                {idx:9 , url: "https://swiperjs.com/demos/images/nature-9.jpg"},
                {idx:10 , url: "https://swiperjs.com/demos/images/nature-10.jpg"},
            ])
            const MapSelected = ref(1)
            const HandImgDataMap = (el)=>{
                console.log(el.currentTarget.dataset.map);
                MapSelected.value = Number(el.currentTarget.dataset.map)
            }
            const MapRender = computed(()=>{
                const a = MapData.filter(item=>{
                    return item.idx === MapSelected.value
                })
                const render = a.map(item=>{
                    return `url(${item.url})`
                })
                // console.alert("暫時不出現地圖背景");
                console.warn("暫時不出現地圖背景");
                // return render
                return 0
            })

            onMounted(()=>{
                // 宣告 清除navSearch的值
                const navSearch = document.getElementById("navSearch").value

                handpersonData(null)                

                // 計算聊天室的高度
                CalTxtHeight()

                // 可拖拉chatsys
                let ChatContainer = document.getElementById('ChatContainer')

                function dragMoveListener (event) {
                    let target = event.target
                    let x = (parseFloat(target.getAttribute('data-x')) || 0) + event.dx
                    let y = (parseFloat(target.getAttribute('data-y')) || 0) + event.dy
                    target.style.transform = 'translate(' + x + 'px, ' + y + 'px)'
                    target.setAttribute('data-x', x)
                    target.setAttribute('data-y', y)
                    }
                    window.dragMoveListener = dragMoveListener
                interact(ChatContainer)
                    .draggable({
                      inertia: false,
                      autoScroll: true,
                      modifiers: [
                        interact.modifiers.snap({
                          targets: [
                            interact.snappers.grid({ x: 15, y: 15 })
                          ],
                          range: Infinity,
                          relativePoints: [ { x: 0, y: 0 } ]
                        }),
                    
                        interact.modifiers.restrict({
                          // restriction: element.parentNode,
                          restriction: 'parent',
                          elementRect: { top: -3, left: 0, bottom: 1, right: 1 },
                          endOnly: false
                        })
                      ],
                      listeners: {
                          move: dragMoveListener,
                        }
                    })    


                                    
                // swiperNav 
                const Getslide = document.getElementsByClassName('Getslide')
                const swiperRoot = document.getElementById("mapNavigation").shadowRoot
                const buttonPrev = swiperRoot.querySelector('[part="button-prev"]')
                const buttonNext = swiperRoot.querySelector('[part="button-next"]')

                const handNavDataMap = ()=>{
                    for (let i = 0; i < Getslide.length; i++) {
                        if(Getslide[i].classList.contains('swiper-slide-active')){
                            MapSelected.value = Number(Getslide[i].dataset.map)
                            console.log(Getslide[i].dataset.map);
                            console.log(MapSelected.value);
                        }
                    }
                }
                buttonPrev.addEventListener("click",handNavDataMap)
                buttonNext.addEventListener("click",handNavDataMap)
                  

            })
            onUpdated(()=>{
                CalTxtHeight()
            })
 
 
           

            

            
            return{
                game_id,
                btnMousein,
                btnMouseout,
                BtnObj,
                ChannelListisShow,
                handchatChannel,
                clearfn,
                chatChannelSrc,
                ClickChangeSrc,
                inputmsg,
                txtSummit,
                msgStorage,
                RingChatbool,
                // ID字數限制
                checkInput,
                gameIDAlert,
                // 戒指List
                ringListbool,
                ringSelectedShow,
                ringListshow,
                handRingList,
                ringsearchFn,
                // personData
                personBoxBool,
                handpersonData,
                personBoxRender,
                personSelected,


                // txt換行計算
                msgRef,
                ChatTxtHeight,
                // MapSwiper
                MapRender,
                HandImgDataMap,
                
              }   
        },
        mounted() {
            window.addEventListener("keydown", this.userfoucs);
            userinput.addEventListener('keydown',this.userblur)
 
        },
        methods: {
            userfoucs(el){
                let winKeycode = el.keyCode
                
                if (winKeycode === 191 || winKeycode === 13){
                    userinput.focus()
                    return;
                }
            },
            userblur(el){
                let val = userinput.value
                if (el.keyCode === 13 & val === ''){
                    noinput.focus()
                    el.stopPropagation()
                    return
                }
            }
        },
    }
    createApp(App).mount("#app")     

}


