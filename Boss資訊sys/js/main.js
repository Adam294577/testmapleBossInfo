const {createApp, ref, reactive, computed, watch } = Vue

const App = {
    setup(){


// API
        const BossInfo = {
            "data" : {
                

                "使烏" : {
                    "banner": "./img/boss/banner_使烏.png",
                    "GradeList": [
                        {
                        url : "./img/boss/grade_normal.png",
                        urlact : "./img/boss/grade_normal_act.png",
                        alt : "normal",
                    },
                        {
                        url : "./img/boss/grade_hard.png",
                        urlact : "./img/boss/grade_hard_act.png",
                        alt : "hard",
                    }
                    ],    
                    "bossIntro":{
                        "show" : true,
                        "bosstxt": [
                            { key:"nor最低入場等級", Grade: "normal", title: "最低入場等級:" , msg: "190up"},
                            { key:"nor入場次數", Grade: "normal", title: "入場次數:" , msg: "不限制"},
                            { key:"nor入場等待時間", Grade: "normal", title: "入場等待時間:" , msg: "30分鐘/次"},
                            { key:"nor完成次數", Grade: "normal", title: "完成次數:" , msg: "全模式每週1次"},
                            { key:"nor重置時間", Grade: "normal", title: "重置時間:" , msg: "每週四 0:00更新"},
                            { key:"nor玩家命數", Grade: "normal", title: "玩家命數:" , msg: "5"},
                            { key:"nor消耗欄冷卻時間", Grade: "normal", title: "消耗欄冷卻時間:" , msg: "10秒"},
                            { key:"nor前置任務", Grade: "normal", title: "前置任務:" , msg: "黑暗天堂"},
                            { key:"nor前置任務時間", Grade: "normal", title: "前置任務時間:" , msg: "約2.5小時"},                            

                            { key:"hard最低入場等級", Grade: "hard" , title: "最低入場等級:" , msg: "190up"},
                            { key:"hard入場次數", Grade: "hard" , title: "入場次數:" , msg: "3次/天"},
                            { key:"hard入場等待時間", Grade: "hard" , title: "入場等待時間:" , msg: "30分鐘/次"},
                            { key:"hard完成次數", Grade: "hard" , title: "完成次數:" , msg: "全模式每週1次"},
                            { key:"hard重置時間", Grade: "hard" , title: "重置時間:" , msg: "每週四 0:00更新"},
                            { key:"hard玩家命數", Grade: "hard" , title: "玩家命數:" , msg: "10"},
                            { key:"hard消耗欄冷卻時間", Grade: "hard" , title: "消耗欄冷卻時間:" , msg: "10秒"},
                            { key:"hard前置任務", Grade: "hard" , title: "前置任務:" , msg: "黑暗天堂"},
                            { key:"hard前置任務時間", Grade: "hard" , title: "前置任務時間:" , msg: "約2.5小時"},
                        ],
                    },                                    
                },
                "戴米安" : {
                    "banner": "./img/boss/banner_戴米安.png",
                    "GradeList": [
                        {
                        url : "./img/boss/grade_normal.png",
                        urlact : "./img/boss/grade_normal_act.png",
                        alt : "normal",
                    },
                        {
                        url : "./img/boss/grade_hard.png",
                        urlact : "./img/boss/grade_hard_act.png",
                        alt : "hard",
                    }
                    ],                    
                },
                "露希妲" :{
                    "banner": "./img/boss/banner_露希妲.png",
                    "GradeList": [
                        {
                        url : "./img/boss/grade_easy.png",
                        urlact : "./img/boss/grade_easy_act.png",
                        alt : "easy",
                    },
                        {
                        url : "./img/boss/grade_normal.png",
                        urlact : "./img/boss/grade_normal_act.png",
                        alt : "normal",
                    },
                        {
                        url : "./img/boss/grade_hard.png",
                        urlact : "./img/boss/grade_hard_act.png",
                        alt : "hard",
                    }
                    ],

                    "bossIntro":{
                        "show" : true,
                        "bosstxt": [
                            { key:"easy最低入場等級" ,Grade: "easy", title: "最低入場等級:" , msg: "220up"},
                            { key:"easy入場次數" ,Grade: "easy", title: "入場次數:" , msg: "3次/天"},
                            { key:"easy入場等待時間" ,Grade: "easy", title: "入場等待時間:" , msg: "30分鐘/次"},
                            { key:"easy完成次數" ,Grade: "easy", title: "完成次數:" , msg: "全模式每週1次"},
                            { key:"easy重置時間" ,Grade: "easy", title: "重置時間:" , msg: "每週四 0:00更新"},
                            { key:"easy玩家命數" ,Grade: "easy", title: "玩家命數:" , msg: "10"},
                            { key:"easy消耗欄冷卻時間" ,Grade: "easy", title: "消耗欄冷卻時間:" , msg: "10秒"},
                            { key:"easy前置任務" ,Grade: "easy", title: "前置任務:" , msg: "夢之都拉契爾恩"},
                            { key:"easy前置任務時間" ,Grade: "easy", title: "前置任務時間:" , msg: "約30分"},

                            { key:"nor最低入場等級", Grade: "normal", title: "最低入場等級:" , msg: "220up"},
                            { key:"nor入場次數", Grade: "normal", title: "入場次數:" , msg: "3次/天"},
                            { key:"nor入場等待時間", Grade: "normal", title: "入場等待時間:" , msg: "30分鐘/次"},
                            { key:"nor完成次數", Grade: "normal", title: "完成次數:" , msg: "全模式每週1次"},
                            { key:"nor重置時間", Grade: "normal", title: "重置時間:" , msg: "每週四 0:00更新"},
                            { key:"nor玩家命數", Grade: "normal", title: "玩家命數:" , msg: "10"},
                            { key:"nor消耗欄冷卻時間", Grade: "normal", title: "消耗欄冷卻時間:" , msg: "10秒"},
                            { key:"nor前置任務", Grade: "normal", title: "前置任務:" , msg: "夢之都拉契爾恩"},
                            { key:"nor前置任務時間", Grade: "normal", title: "前置任務時間:" , msg: "約30分"},                            

                            { key:"hard最低入場等級", Grade: "hard" , title: "最低入場等級:" , msg: "220up"},
                            { key:"hard入場次數", Grade: "hard" , title: "入場次數:" , msg: "3次/天"},
                            { key:"hard入場等待時間", Grade: "hard" , title: "入場等待時間:" , msg: "30分鐘/次"},
                            { key:"hard完成次數", Grade: "hard" , title: "完成次數:" , msg: "全模式每週1次"},
                            { key:"hard重置時間", Grade: "hard" , title: "重置時間:" , msg: "每週四 0:00更新"},
                            { key:"hard玩家命數", Grade: "hard" , title: "玩家命數:" , msg: "10"},
                            { key:"hard消耗欄冷卻時間", Grade: "hard" , title: "消耗欄冷卻時間:" , msg: "10秒"},
                            { key:"hard前置任務", Grade: "hard" , title: "前置任務:" , msg: "夢之都拉契爾恩"},
                            { key:"hard前置任務時間", Grade: "hard" , title: "前置任務時間:" , msg: "約30分"},
                        ],
                    },

                    "bossData":{
                        "show" : false,

                    },
                    "damageRef":{
                        "show" : false,

                    },
                    "bossBonus":{
                        "show" : false,
                    },
                    "otherBonusInfo":{
                        "show" : false,

                    },

                },
                "威爾" :{
                    "banner": "./img/boss/banner_威爾.png",
                    "GradeList": [
                        {
                        url : "./img/boss/grade_easy.png",
                        urlact : "./img/boss/grade_easy_act.png",
                        alt : "easy",
                    },
                        {
                        url : "./img/boss/grade_normal.png",
                        urlact : "./img/boss/grade_normal_act.png",
                        alt : "normal",
                    },
                        {
                        url : "./img/boss/grade_hard.png",
                        urlact : "./img/boss/grade_hard_act.png",
                        alt : "hard",
                    }
                ],

                    "easy" :{
                        "bossIntro":{
                            "restrictionLv" : 220,
                            "restrictionTimes" : "3次/天",
                            "restrictionCD" : "30分鐘/次",
                            "restrictionFin": "全模式每週1次",
                            "updateTime" : "每週四 0:00更新",
                            "deathTimes" : 10,
                            "ConsumablesCD" : "10秒",
                            "frontmisstion" : "任務名稱",
                            "frontmisstionTime" : 30,
                        },
                        "bossData":{

                        },
                        "damageRef":{

                        },
                        "bossBonus":{
                        },
                        "otherBonusInfo":{

                        },
                    },
                    "normal" :{

                    },
                    "hard" :{
                        "bossIntro":{
                            "restrictionLv" : 220,
                            "restrictionTimes" : "3次/天",
                            "restrictionCD" : "30分鐘/次",
                            "restrictionFin": "全模式每週1次",
                            "updateTime" : "每週四 0:00更新",
                            "deathTimes" : 10,
                            "ConsumablesCD" : "10秒",
                            "frontmisstion" : "任務名稱",
                            "frontmisstionTime" : 30,
                        },
                        "bossData":{

                        },
                        "damageRef":{

                        },
                        "bossBonus":{
                        },
                        "otherBonusInfo":{

                        },
                    },
                },

                
            }
        };


        
        

        //  NavFn
        const NavBool = ref(false);

        const handNavBool = () =>{
            NavBool.value = !NavBool.value;
        }
        const NavWidth = computed(()=>{
            return NavBool.value ? 0 : "-500px";
        })

        const NavPageidx = ref(1);
        const handNavPage = (el) =>{
            if(el.target.id === "backbtn"){
                NavPageidx.value = 1;
                return;
            }
            if(el.target.id === "nextbtn"){
                NavPageidx.value = 2;
                return;
            }
            

        }

        // GradeCh

        // 父層data
        const GradeSelected = ref("hard")
        const BossNameSelected = ref("露希妲")
        const sectionSelected = ref("")

        // getAPI
        const GradeList = ref(BossInfo.data[BossNameSelected.value].GradeList)


        const GradeListbool = ref(false)

        const handGradeMenu = () =>{
            GradeListbool.value = !GradeListbool.value;
        }
        const handGradeVal = (el) =>{
            GradeSelected.value = el.currentTarget.dataset.alt;
            GradeListbool.value = false;
            // emit
        }

        const GradeVal = computed(()=>{
            const Grade =  GradeList.value.filter(item=>{
                return item.alt === GradeSelected.value
            })
            return Grade[0]
            
        })

        const showGradeList = computed(()=>{

            const Map = GradeList.value.map(item=>{
             if(item.alt === GradeSelected.value){
                 return { url: item.urlact , alt: item.alt}
             }else{
                 return { url: item.url , alt: item.alt}
             }
            })
           
            return Map;
    
         })        



        // render bossIntro content

        // getAPI
        const banner = ref(BossInfo.data[BossNameSelected.value].banner)

        const bosstxtData = ref(BossInfo.data[BossNameSelected.value].bossIntro.bosstxt)

        const bosstxtRender = computed(()=>{
            const filterGrade = bosstxtData.value.filter(item=>{
                return item.Grade === GradeSelected.value
            })
            return filterGrade
        })



        // BOSS名稱重新定義資料內容

        const chbossNameTest = (el) =>{
            BossNameSelected.value = el.target.dataset.bossname
            GradeSelected.value = el.target.alt
            NavBool.value = false
        }


        
        watch(BossNameSelected, (bossCh)=>{
            banner.value = BossInfo.data[bossCh].banner
            GradeList.value = BossInfo.data[bossCh].GradeList
            bosstxtData.value = BossInfo.data[bossCh].bossIntro.bosstxt
        })


        // sectionTag
        const sectionTagItem = reactive([
            {act: true , title: "BOSS入場規則"},
            {act: false , title: "BOSS資訊"},
            {act: false , title: "BOSS獎勵"},
            {act: false , title: "獎勵資訊說明"},
        ])
        const sectioncont = reactive([
            {  idx:0, section: "bossIntro", open: false},
            {  idx:1, section: "bossData", open: true},
            {  idx:2, section: "damageRef", open: true},
            {  idx:3, section: "bossBonus", open: false},
            {  idx:4, section: "otherBonusInfo", open: false}
        ])

        const handsectionTagAct = (el) =>{
            // console.log(el.target.innerText);


            // 處理 sectionTagBox變化
            sectionTagItem.map(item=>{
                if(el.target.innerText === item.title){
                    return item.act = true
                }
                return item.act = false
            })
            
             // 處理 section Render變化
            sectioncont.map(item=>{
                return item.open = false;
            })
            console.log(sectioncont);

           
           
            if(el.target.innerText === "BOSS入場規則"){
                sectioncont[0].open = true;
                 console.log(sectioncont);

                return;
            }
            if(el.target.innerText === "BOSS資訊"){
                sectioncont[1].open = true;
                sectioncont[2].open = true;
                 console.log(sectioncont);

                return;
            }
            if(el.target.innerText === "BOSS獎勵"){
                sectioncont[3].open = true;
                 console.log(sectioncont);

                return;
            }
            if(el.target.innerText === "獎勵資訊說明"){
                sectioncont[4].open = true;
                 console.log(sectioncont);

                return;
            }

            
            
        }




        return{
            // NavOpen
            NavWidth,
            handNavBool,
            // NavPage
            handNavPage,
            NavPageidx,
            // GradeCh
            showGradeList,
            GradeVal,
            GradeListbool,
            handGradeMenu,
            handGradeVal,

            //  render bossIntro content
            banner,
            bosstxtRender,

            // NavTest
            chbossNameTest,

            // sectionTag
            sectioncont,
            sectionTagItem,
            handsectionTagAct
        }



    
    }


    
}

createApp(App).mount("#app")     





