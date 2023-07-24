
window.onload = () =>{

    const {createApp, ref, reactive, computed, watch, onMounted , onUpdated, onBeforeUnmount} = Vue
    const App = {

        setup(){
            // Activitybool
            const Activitybool = ref(false)
            const handActivitybool = () =>{
                Activitybool.value = !Activitybool.value
                mapleActivity.scrollTop = 0;
            }

 
            // ActivityTag
            const ActivityTagData = ref([
                {key:"黃金蘋果" ,class: "goldAppleTag" , url: "./img/黃金蘋果.png", act: true},
                {key:"時尚隨機箱" ,class: "fashionTag" , url: "./img/時尚隨機箱.png", act: false},
                {key:"皇家美容院" ,class: "dressingTag" , url: "./img/皇家美容院.png", act: false},
                {key:"寵物隨機箱" ,class: "petTag" , url: "./img/寵物隨機箱.png", act: false},
                {key:"萌獸卡牌包" ,class: "cuteMosTag" , url: "./img/萌獸卡牌包.png", act: false},
                {key:"月光水晶" ,class: "crystalTag" , url: "./img/月光水晶.png", act: false},
                {key:"魔法畫框" ,class: "frameTag" , url: "./img/魔法畫框.png", act: false}
            ])
            const ActivitySelected = ref([{key:"黃金蘋果", bannerUrl: "./img/黃金蘋果_banner.png"}])

            const handActivityTag = (el) =>{
                let target = el.currentTarget.dataset.tag
                ActivityTagData.value = ActivityTagData.value.map(item=>{
                    if(target === item.key){
                        ActivitySelected.value[0].key = item.key;
                        ActivitySelected.value[0].bannerUrl = `./img/${item.key}_banner.png`;
                        return {key: item.key ,class: item.class , url: item.url , act: true}
                    }else{
                        return {key: item.key ,class: item.class , url: item.url , act: false}
                    }
                })
            }


                
                // 近期活動 - scroll Event
                const scrollContainer = ref(null);
                const scrollValue = ref(0);
                function onScroll() {
                    scrollValue.value = scrollContainer.value.scrollTop;
                  }        
                  const handscrollTop = () =>{
                      scrollContainer.value.scrollTop = 0
                  }    
                  
                    // headerMenu
                const headerMenubool = ref(false)
                const handheaderMenu = () =>{
                    headerMenubool.value = !headerMenubool.value
                }
                const headerWindowWidth = ref(window.innerWidth);

                const handleResize = () => {
                  headerWindowWidth.value = window.innerWidth;
                  headerMenubool.value = headerWindowWidth.value < 576 ? false : true;

                };
                // workIntroBox
                const IntroBoxData = reactive({data:[
                    {
                    key: "聊天戒指模擬器" , 
                    aim :"讓雲玩家們能先無料的嘗試使用各種聊天戒指樣式，找到喜好後能遊戲購買!", 
                    learn:[
                        `1.自學以來第一次使用<a target="_blank" href="https://cli.vuejs.org/">Vue CLI</a>開啟的小專案`,
                        `2.嘗試使用<a target="_blank" href="https://swiperjs.com/">swiper.js</a>套件功能使地圖方便使用者自由選擇喜好`,
                        `3.使用<a target="_blank" href="https://interactjs.io/">interact.js</a>的套件功能 讓玩家能自由拖曳聊天框位置`,
                        `4.面對各種聊天戒指的樣式，在css切圖上也花了不少時間去了解T_T`,
                        ],
                    addTxt: `若聊天模擬器上沒有的，歡迎加入<a href="#">Discord</a>分享自己常用戒指有空之餘會再更新上去`,
                    },
                    {
                    key: "test" , 
                    aim :"5207", 
                    learn:[
                        `1.777`,
                        `2.5277`,
                        `3.94207`,
                        ],
                    addTxt: "",
                    },

                ]})
                const workIntroBoxBool = ref(false)
                const workIntroBoxCont = ref({})
                handworkIntroBox = (el) =>{
                    if(workIntroBoxBool.value){
                        workIntroBoxBool.value = false;
                        return
                    }
                    let txt = el.currentTarget.dataset.introtxt;
                    console.log(txt);
                IntroBoxData.data.forEach(item => {
                    if (item.key === txt){
                        workIntroBoxCont.value['key'] = item.key
                        workIntroBoxCont.value['aim'] = item.aim
                        workIntroBoxCont.value['learn'] = item.learn
                        workIntroBoxCont.value['addTxt'] = item.addTxt
                    }
                })
                console.log(workIntroBoxCont.value);
                workIntroBoxBool.value = true
                }
            
               

            
              
                              

                onMounted(() => {
                  scrollValue.value = scrollContainer.value.scrollTop;
                  window.addEventListener('resize', handleResize);
   
                });
                // 在組件被解除掛載前移除事件監聽器，避免記憶體洩漏
                onBeforeUnmount(() => {
                    window.removeEventListener('resize', handleResize);
                  });                  

                // 使用onUpdated來在組件更新後檢測滾動變化
                onUpdated(() => {
                  onScroll()
   
                });


    
            return{ 
                // Activitybool
                Activitybool,
                handActivitybool,                
                // ActivityTag
                ActivityTagData,
                ActivitySelected,
                handActivityTag,
                // Activityscroll
                scrollContainer,
                scrollValue,
                onScroll,
                handscrollTop,
                // headerMenu
                headerMenubool,
                handheaderMenu,
                // headerRWD
                headerWindowWidth,
                // workIntroBox
                workIntroBoxBool,
                IntroBoxData,
                handworkIntroBox,
                workIntroBoxCont,
            }   
        }
    }
        
    
    createApp(App).mount("#app")     

}


