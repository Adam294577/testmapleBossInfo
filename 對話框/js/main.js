
window.onload = () =>{
    
    
    const ChatClassBtnCh = () =>{

        // let btn_obj = {
        //     normal : [
        //         "./img/chat_class_c1.png",
        //         "./img/chat_class_c2.png",
        //         "./img/chat_class_c3.png",
        //         "./img/chat_class_c4.png",
        //         "./img/chat_class_c5.png"
        //     ],
        //     hover :[
        //         "./img/chat_class_c1_h.png",
        //         "./img/chat_class_c2_h.png",
        //         "./img/chat_class_c3_h.png",
        //         "./img/chat_class_c4_h.png",
        //         "./img/chat_class_c5_h.png"
        //     ],
        //     list : [
        //         document.getElementById("class_item_c1"),
        //         document.getElementById("class_item_c2"),
        //         document.getElementById("class_item_c3"),
        //         document.getElementById("class_item_c4"),
        //         document.getElementById("class_item_c5")
        //     ]
        // }


        // let btn = document.getElementById("ChatClassBtn")
        // let List = document.getElementById("ChatClassList")
      
       



        // const Openchatclass = () =>{
        //     List.style['display'] = 'block';
        //     btn.removeEventListener("mouseleave",btnMouseout)
           

        // }
        // const Closechatclass = () =>{
        //     List.style['display'] = 'none';
        //     btn.addEventListener("mouseleave",btnMouseout);
        // }
        

        // const Selectchatclass = (el) =>{
        //     let idx = el.currentTarget.id.slice(-1) -1;



        //     if(idx === 0){
        //         btn.src = btn_obj.normal[2];
        //         Closechatclass();
        //         return;
        //     }
        //     if(idx === 1){
        //         btn.src = btn_obj.normal[1];
        //         Closechatclass();
        //         return;
        //     }
        //     if(idx === 2){
        //         btn.src = btn_obj.normal[3];
        //         Closechatclass();
        //         return;
        //     }
        //     if(idx === 3){
        //         btn.src = btn_obj.normal[4];
        //         Closechatclass();
        //         return;
        //     }
        //     if(idx === 4){
        //         btn.src = btn_obj.normal[0];
        //         Closechatclass();
        //         return;
        //     }
        
        // }

        // btn.addEventListener("mouseenter",btnMousein)
        // btn.addEventListener("mouseleave",btnMouseout)
        // btn.addEventListener("click",Openchatclass)
        // btn_obj.list[0].addEventListener("click",Selectchatclass)
        // btn_obj.list[1].addEventListener("click",Selectchatclass)
        // btn_obj.list[2].addEventListener("click",Selectchatclass)
        // btn_obj.list[3].addEventListener("click",Selectchatclass)
        // btn_obj.list[4].addEventListener("click",Selectchatclass)
       


    }
    // ChatClassBtnCh()


    const contextInput = () =>{
        let userinput = document.getElementById("userinput")
        let ChatClassBtn = document.getElementById("ChatClassBtn")
        let btn_obj = {
            normal : [
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
            list : [
                document.getElementById("class_item_c1"),
                document.getElementById("class_item_c2"),
                document.getElementById("class_item_c3"),
                document.getElementById("class_item_c4"),
                document.getElementById("class_item_c5")
            ]
        }

        // const txtSummit = (el) => {
        //     let txt = ""
        //     txt = el.target.value
            
            
        //     if (el.keyCode === 13 & txt === ""){
        //         el.target.blur()
        //         setTimeout(()=>{
        //             window.addEventListener("keydown", userfoucs);
        //         },100)
        //         return;
        //     }
        //     if (el.keyCode === 13 & txt === "/f"){
        //         ChatClassBtn.src = btn_obj.normal[2]
        //         el.target.value = ""
        //         return;
        //     }
        //     if (el.keyCode === 13 & txt === "/p"){
        //         ChatClassBtn.src = btn_obj.normal[1]
        //         el.target.value = ""
        //         return;
        //     }
        //     if (el.keyCode === 13 & txt === "/g"){
        //         ChatClassBtn.src = btn_obj.normal[3]
        //         el.target.value = ""
        //         return;
        //     }
        //     if (el.keyCode === 13 & txt === "/u"){
        //         ChatClassBtn.src = btn_obj.normal[4]
        //         el.target.value = ""
        //         return;
        //     }
        //     if (el.keyCode === 13 & txt === "/e"){
        //         ChatClassBtn.src = btn_obj.normal[0]
        //         el.target.value = ""
        //         return;
        //     }
        //     if (el.keyCode === 13 & txt.slice(0,1) === "/"){
        //         console.log("這是特殊字元:文字不會傳到聊天窗");
        //     }



        //     if (el.keyCode === 13){
        //         console.log(txt);
        //         el.target.value = ""
        //         return;
        //     }
        // }

        // const userfoucs = (el) =>{
        //     let winKeycode = el.keyCode
        //     if (winKeycode === 191 || winKeycode === 13){
        //         userinput.focus()
        //         window.removeEventListener("keydown", userfoucs);
        //         return;
        //     }
            
        // }

        // userinput.addEventListener("keydown",txtSummit)
        // window.addEventListener("keydown", userfoucs);
        
        
    }
    // contextInput()









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

            const ClickChangeSrc = (el)=>{
                // console.log( el.currentTarget.innerText);
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

            const ListisShow = ref(false);
            const Openchatclass = () =>{
                ListisShow.value = !ListisShow.value;
                // btn.removeEventListener("mouseleave",btnMouseout)
               
    
            }

            const clearfn = () =>{
                // console.log(5207);
                ListisShow.value = false;
            }
            
            return{ChatContent,
                 game_id,
                btnMousein,
                btnMouseout,
                BtnObj,
                ListisShow,
                Openchatclass,
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
        beforeDestroy() {
            
        },
        methods: {
            userfoucs(el){
                let winKeycode = el.keyCode
                let val = userinput.value

                
                if (winKeycode === 191 || winKeycode === 13){
                    userinput.focus()
                    return;
                }
                
                
            },
            userblur(el){
                let winKeycode = el.keyCode
                let val = userinput.value
                if (winKeycode === 13 & val === ''){
                    noinput.focus()
                    el.stopPropagation()
                    return
                }

            }


      

            
        },
    }

    

    createApp(App).mount("#app")     

}


