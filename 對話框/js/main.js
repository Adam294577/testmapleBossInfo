
window.onload = () =>{
    
    const ChatClassBtnCh = () =>{

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


        let btn = document.getElementById("ChatClassBtn")
        let List = document.getElementById("ChatClassList")
      
       



        const Openchatclass = () =>{
            List.style['display'] = 'block';
            btn.removeEventListener("mouseleave",btnMouseout)
           

        }
        const Closechatclass = () =>{
            List.style['display'] = 'none';
            btn.addEventListener("mouseleave",btnMouseout);
        }
        

        const Selectchatclass = (el) =>{
            let idx = el.currentTarget.id.slice(-1) -1;



            if(idx === 0){
                btn.src = btn_obj.normal[2];
                Closechatclass();
                return;
            }
            if(idx === 1){
                btn.src = btn_obj.normal[1];
                Closechatclass();
                return;
            }
            if(idx === 2){
                btn.src = btn_obj.normal[3];
                Closechatclass();
                return;
            }
            if(idx === 3){
                btn.src = btn_obj.normal[4];
                Closechatclass();
                return;
            }
            if(idx === 4){
                btn.src = btn_obj.normal[0];
                Closechatclass();
                return;
            }
        
        }

        // btn.addEventListener("mouseenter",btnMousein)
        // btn.addEventListener("mouseleave",btnMouseout)
        btn.addEventListener("click",Openchatclass)
        btn_obj.list[0].addEventListener("click",Selectchatclass)
        btn_obj.list[1].addEventListener("click",Selectchatclass)
        btn_obj.list[2].addEventListener("click",Selectchatclass)
        btn_obj.list[3].addEventListener("click",Selectchatclass)
        btn_obj.list[4].addEventListener("click",Selectchatclass)
       


    }
    ChatClassBtnCh()


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

        const txtSummit = (el) => {
            let txt = ""
            txt = el.target.value
            
            
            if (el.keyCode === 13 & txt === ""){
                el.target.blur()
                setTimeout(()=>{
                    window.addEventListener("keydown", userfoucs);
                },100)
                return;
            }
            if (el.keyCode === 13 & txt === "/f"){
                ChatClassBtn.src = btn_obj.normal[2]
                el.target.value = ""
                return;
            }
            if (el.keyCode === 13 & txt === "/p"){
                ChatClassBtn.src = btn_obj.normal[1]
                el.target.value = ""
                return;
            }
            if (el.keyCode === 13 & txt === "/g"){
                ChatClassBtn.src = btn_obj.normal[3]
                el.target.value = ""
                return;
            }
            if (el.keyCode === 13 & txt === "/u"){
                ChatClassBtn.src = btn_obj.normal[4]
                el.target.value = ""
                return;
            }
            if (el.keyCode === 13 & txt === "/e"){
                ChatClassBtn.src = btn_obj.normal[0]
                el.target.value = ""
                return;
            }
            if (el.keyCode === 13 & txt.slice(0,1) === "/"){
                console.log("這是特殊字元:文字不會傳到聊天窗");
            }



            if (el.keyCode === 13){
                console.log(txt);
                el.target.value = ""
                return;
            }
        }

        const userfoucs = (el) =>{
            let winKeycode = el.keyCode
            if (winKeycode === 191 || winKeycode === 13){
                userinput.focus()
                window.removeEventListener("keydown", userfoucs);
                return;
            }
            
        }

        userinput.addEventListener("keydown",txtSummit)
        window.addEventListener("keydown", userfoucs);
        
        
    }
    contextInput()


// chatgpt編列的
    const shareImage = () => {
        // 載入圖片
        let img = new Image();
        img.onload = function() {
          // 將圖片轉換為 Data URL
          let canvas = document.createElement('canvas');
          canvas.width = img.width;
          canvas.height = img.height;
          canvas.getContext('2d').drawImage(img, 0, 0);
          let dataURL = canvas.toDataURL('image/png');
      
          // 分享圖片
          navigator.share({
            files: [new File([dataURL], 'image.png', { type: 'image/png' })]
          })
          .then(() => console.log('分享成功'))
          .catch((error) => console.log('分享失敗', error));
        };
        img.src = 'path/to/image.png';
      }




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
            
            const isShow = ref(false);
            return{ChatContent , game_id , btnMousein, btnMouseout , BtnObj}   
        }
    }

    

    createApp(App).mount("#app")     

}


