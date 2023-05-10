
window.onload = () =>{

    const {createApp, ref, reactive } = Vue
    const App = {

        setup(){
  

            const ChatContent = ref("")
            const game_id = ref("")
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
            const inputmsg = ref("")
            const chatChannelSrc = ref('./img/chat_class_c1.png')
            const ChannelListisShow = ref(false);


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
                    return;
                }
                if( txt === "對好友(/f)"){
                    chatChannelSrc.value = BtnObj.normal[2];
                    return;
                }
                if( txt === "對組隊(/p)"){
                    chatChannelSrc.value = BtnObj.normal[1];
                    return;
                }
                if( txt === "對公會(/g)"){
                    chatChannelSrc.value = BtnObj.normal[3];
                    return;
                }
                if( txt === "對所有人(/e)"){
                    chatChannelSrc.value = BtnObj.normal[0];
                    return;
                }
                
            }

            // 鍵盤輸入切換頻道類別
            const txtSummit = (el) => {
                let str = el.target.value.trim()

                // console.log(str);
                if (el.keyCode === 13 & str === "/f"){
                    chatChannelSrc.value = BtnObj.normal[2]
                    el.target.value = ""
                    return;
                }

                if (el.keyCode === 13 & str === "/p"){
                    chatChannelSrc.value = BtnObj.normal[1]
                    el.target.value = ""
                    return;
                }
                if (el.keyCode === 13 & str === "/g"){
                    chatChannelSrc.value = BtnObj.normal[3]
                    el.target.value = ""
                    return;
                }
                if (el.keyCode === 13 & str === "/u"){
                    chatChannelSrc.value = BtnObj.normal[4]
                    el.target.value = ""
                    return;
                }
                if (el.keyCode === 13 & str === "/e"){
                    chatChannelSrc.value = BtnObj.normal[0]
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
                    el.target.value = ""
                    console.log(el.target.value);
                    console.log(inputmsg.value);
                    return;
                }
            }

            
            const handchatChannel = () =>{
                ChannelListisShow.value = !ChannelListisShow.value;
            }

            const clearfn = () =>{
                // console.log(5207);
                ChannelListisShow.value = false;
            }
            
            return{ChatContent,
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
                // let winKeycode = el.keyCode
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


