
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
            const game_id = ref("測試ID123")
            const inputmsg = ref("測試內容哈哈哈")
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

                console.log(result);

                return result

               
            })
            
            const gameIDcount = ref(0)
            const gameIDAlert = ref(false)
              function checkInput(el) {
                
                let punctuationCount = countMatches(el.target.value, /[\p{P}\u2000-\u206F\u2E00-\u2E7F\u3000-\u303F]/gu);
                let symbolCount = countMatches(el.target.value, /[\p{S}\u2070-\u209F\u20A0-\u20CF\u2100-\u214F]/gu);
                let whitespaceCount = countMatches(el.target.value, /[\p{Z}\u0009-\u000D\u0020]/gu);
                let chinesesymbolCount = (el.target.value.match(/[\u3105-\u3129\u02c7\u02cb\u02ca\u02d9\u02da\u02dc\u02c9\u02c7\u02cb\u02ca\u02d9\u02da\u02dc\u02c9\u02c7\u02cb\u02ca\u02d9\u02da\u02dc\u02c9\u02c7\u02cb\u02ca\u02d9\u02da\u02dc\u02c9\u02c7\u02cb\u02ca\u02d9\u02da\u02dc\u02c9\u02c7\u02cb\u02ca\u02d9\u02da\u02dc\u02c9\u02c7\u02cb\u02ca\u02d9\u02da\u02dc\u02c9\u02c7\u02cb\u02ca\u02d9\u02da\u02dc\u02c9\u02c7\u02cb\u02ca\u02d9\u02da\u02dc\u02c9\u02c7\u02cb\u02ca\u02d9\u02da\u02dc\u02c9\u02c7\u02cb\u02ca\u02d9\u02da\u02dc\u02c9\u02c7\u02cb\u02ca\u02d9\u02da\u02dc\u02c9\u02c7\u02cb\u02ca\u02d9\u02da\u02dc\u02c9\u02c7\u02cb\u02ca\u02d9\u02da\u02dc\u02c9]/g
                ) || []).length; 

                if(chinesesymbolCount !== 0 || whitespaceCount !== 0 || symbolCount !== 0 || punctuationCount !== 0 ){
                    // console.log('標點符號',punctuationCount);
                    // console.log('特殊符號',symbolCount);
                    // console.log('空白符號',whitespaceCount);
                    // console.log('ㄅㄆㄇ符號',chinesesymbolCount);
                    gameIDAlert.value = true
                }else{
                    gameIDAlert.value = false
                }
                let chineseCount = (el.target.value.match(/[\u4e00-\u9fa5]/g) || []).length;
                let englishCount = (el.target.value.match(/[a-zA-Z]/g) || []).length; 
                let numberCount = countMatches(el.target.value, /[\p{N}]/gu);
            
                gameIDcount.value =  numberCount + chineseCount * 2 + englishCount;
                console.log(gameIDcount.value);
                IDTxt = el.target.value
            
              }
            
              function countMatches(value, regex) {
                let matches = value.match(regex);
                return matches ? matches.length : 0;
              }              
                

           

            

            
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
                checkInput,
                gameIDAlert
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


