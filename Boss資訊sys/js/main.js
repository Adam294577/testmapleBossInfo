const {createApp, ref, reactive, computed, watch } = Vue

const App = {
    setup(){


// API
        const BossInfo = {
            "data" : {
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

        // getAPI
        const GradeList = reactive(BossInfo.data[BossNameSelected.value].GradeList)


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
            const Grade =  GradeList.filter(item=>{
                return item.alt === GradeSelected.value
            })
            return Grade[0]
            
        })


        const showGradeList = computed(()=>{

           const Map = GradeList.map(item=>{
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

        const bosstxtData = reactive(BossInfo.data[BossNameSelected.value].bossIntro.bosstxt)

        const bosstxtRender = computed(()=>{
            const filterGrade = bosstxtData.filter(item=>{
                return item.Grade === GradeSelected.value
            })
            return filterGrade
        })




        
         


        return{
            // NavOpen
            NavBool,
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
            bosstxtRender
        }

    
    }


    
}

createApp(App).mount("#app")     