const {createApp, ref, reactive, computed, watch, onMounted, onUpdated } = Vue

const App = {
    setup(){
                // 父層data
                const GradeSelected = ref("hard")
                const BossNameSelected = ref("露希妲")
                const sectionSelected = ref("BOSS資訊")

                // icon統一路徑
                const ItemURL = ref("./img/item/")
                const mosURL = ref("./img/mos/")

                const isload = ref(false)


// API
        const handLoadbool = ()=>{
            setTimeout(()=>{
                isload.value = true
            },100)
        }

        const BossInfo = reactive({
            "data" : {
                "露希妲" :{
                    "banner": "./img/boss/banner_露希妲.png",

                    "GradeList": [
                        {
                        "url": "./img/boss/grade_easy.png",
                        "urlact": "./img/boss/grade_easy_act.png",
                        "alt": "easy"
                    },
                        {
                        "url": "./img/boss/grade_normal.png",
                        "urlact": "./img/boss/grade_normal_act.png",
                        "alt": "normal"
                    },
                        {
                        "url": "./img/boss/grade_hard.png",
                        "urlact": "./img/boss/grade_hard_act.png",
                        "alt": "hard"
                    }
                    ],
        
                    "bossIntro":{
                        "show" : true,
                        "bosstxt": [
                            { "idx": 1, "key":"easy最低入場等級", "Grade": "easy", "title": "最低入場等級:" , "msg": "220up"},
                            { "idx": 2, "key":"easy入場次數", "Grade": "easy", "title": "入場次數:" , "msg": "3次/天"},
                            { "idx": 3, "key":"easy入場等待時間", "Grade": "easy", "title": "入場等待時間:" , "msg": "30分鐘/次"},
                            { "idx": 4, "key":"easy完成次數", "Grade": "easy", "title": "完成次數:" , "msg": "全模式每週1次"},
                            { "idx": 5, "key":"easy重置時間", "Grade": "easy", "title": "重置時間:" , "msg": "每週四 0:00更新"},
                            { "idx": 6, "key":"easy玩家命數", "Grade": "easy", "title": "玩家命數:" , "msg": "10"},
                            { "idx": 7, "key":"easy消耗欄冷卻時間", "Grade": "easy", "title": "消耗欄冷卻時間:" , "msg": "5秒"},
                            { "idx": 8, "key":"easy前置任務", "Grade": "easy", "title": "前置任務:" , "msg": "夢之都拉契爾恩"},
                            { "idx": 9, "key":"easy前置任務時間", "Grade": "easy", "title": "前置任務時間:" , "msg": "約45分"},                            
        
                            { "idx": 1, "key":"normal最低入場等級", "Grade": "normal", "title": "最低入場等級:" , "msg": "220up"},
                            { "idx": 2, "key":"normal入場次數", "Grade": "normal", "title": "入場次數:" , "msg": "3次/天"},
                            { "idx": 3, "key":"normal入場等待時間", "Grade": "normal", "title": "入場等待時間:" , "msg": "30分鐘/次"},
                            { "idx": 4, "key":"normal完成次數", "Grade": "normal", "title": "完成次數:" , "msg": "全模式每週1次"},
                            { "idx": 5, "key":"normal重置時間", "Grade": "normal", "title": "重置時間:" , "msg": "每週四 0:00更新"},
                            { "idx": 6, "key":"normal玩家命數", "Grade": "normal", "title": "玩家命數:" , "msg": "10"},
                            { "idx": 7, "key":"normal消耗欄冷卻時間", "Grade": "normal", "title": "消耗欄冷卻時間:" , "msg": "5秒"},
                            { "idx": 8, "key":"normal前置任務", "Grade": "normal", "title": "前置任務:" , "msg": "夢之都拉契爾恩"},
                            { "idx": 9, "key":"normal前置任務時間", "Grade": "normal", "title": "前置任務時間:" , "msg": "約45分"},                            
        
                            { "idx": 1, "key":"hard最低入場等級", "Grade": "hard" , "title": "最低入場等級:" , "msg": "220up"},
                            { "idx": 2, "key":"hard入場次數", "Grade": "hard" , "title": "入場次數:" , "msg": "3次/天"},
                            { "idx": 3, "key":"hard入場等待時間", "Grade": "hard" , "title": "入場等待時間:" , "msg": "30分鐘/次"},
                            { "idx": 4, "key":"hard完成次數", "Grade": "hard" , "title": "完成次數:" , "msg": "全模式每週1次"},
                            { "idx": 5, "key":"hard重置時間", "Grade": "hard" , "title": "重置時間:" , "msg": "每週四 0:00更新"},
                            { "idx": 6, "key":"hard玩家命數", "Grade": "hard" , "title": "玩家命數:" , "msg": "10"},
                            { "idx": 7, "key":"hard消耗欄冷卻時間", "Grade": "hard" , "title": "消耗欄冷卻時間:" , "msg": "5秒"},
                            { "idx": 8, "key":"hard前置任務", "Grade": "hard" , "title": "前置任務:" , "msg": "夢之都拉契爾恩"},
                            { "idx": 9, "key":"hard前置任務時間", "Grade": "hard" , "title": "前置任務時間:" , "msg": "約45分"}
                        ]
                    },
        
                    "bossData":{
                        "show" : false,
                        "stagecont":[
                            {"key":"easy一階", "Grade": "easy", "stagetitle" : "一階" , "LV" : 230 , "Defense" : "300%", "HP": 6000000000000,"HPCh":"6兆","attributeHalf": true},
                            {"key":"easy二階", "Grade": "easy", "stagetitle" : "二階" , "LV" : 230 , "Defense" : "300%", "HP": 6000000000000,"HPCh":"6兆","attributeHalf": true},
                            {"key":"normal一階", "Grade": "normal", "stagetitle" : "一階" , "LV" : 230 , "Defense" : "300%", "HP": 12000000000000,"HPCh":"12兆","attributeHalf": true},
                            {"key":"normal二階", "Grade": "normal", "stagetitle" : "二階" , "LV" : 230 , "Defense" : "300%", "HP": 12000000000000,"HPCh":"12兆","attributeHalf": true},
                            {"key":"hard一階", "Grade": "hard", "stagetitle" : "一階" , "LV" : 230 , "Defense" : "300%", "HP": 50800000000000,"HPCh":"50.8兆","attributeHalf": true},
                            {"key":"hard二階", "Grade": "hard", "stagetitle" : "二階" , "LV" : 230 , "Defense" : "300%", "HP": 54000000000000,"HPCh":"54兆","attributeHalf": true},
                            {"key":"hard三階", "Grade": "hard", "stagetitle" : "三階" , "LV" : 230 , "Defense" : "300%", "HP": 11970000000000,"HPCh":"11兆9700億","attributeHalf": true ,"hpRecoverCh":"5985億"}
                        ],
                        
                        "mosInfo": {
                            "has": true,
                            "info": [
                                {"key":"easy惡夢石巨人一階", "name":"惡夢石巨人(一階)", "Grade": "easy", "stagetitle" : "一階" , "LV" : 230 , "Defense" : "10%", "HP": 65000000000,"HPCh":"650億","attributeHalf": false},
                                {"key":"easy惡夢石巨人二階", "name":"惡夢石巨人(二階)", "Grade": "easy", "stagetitle" : "二階" , "LV" : 230 , "Defense" : "10%", "HP": 45000000000,"HPCh":"450億","attributeHalf": false},
                                {"key":"easy惡夢毒菇菇", "name":"惡夢毒菇菇", "Grade": "easy", "stagetitle" : "一階" , "LV" : 230 , "Defense" : "10%", "HP": 65000000000,"HPCh":"650億","attributeHalf": false},
        
                                {"key":"normal惡夢石巨人一階", "name":"惡夢石巨人(一階)", "Grade": "normal", "stagetitle" : "一階" , "LV" : 230 , "Defense" : "10%", "HP": 150000000000,"HPCh":"1500億","attributeHalf": false},
                                {"key":"normal惡夢石巨人二階", "name":"惡夢石巨人(二階)", "Grade": "normal", "stagetitle" : "二階" , "LV" : 230 , "Defense" : "10%", "HP": 100000000000,"HPCh":"1000億","attributeHalf": false},
                                {"key":"normal惡夢毒菇菇", "name":"惡夢毒菇菇", "Grade": "normal", "stagetitle" : "一階" , "LV" : 230 , "Defense" : "10%", "HP": 150000000000,"HPCh":"1500億","attributeHalf": false},
        
                                {"key":"hard惡夢石巨人一階", "name":"惡夢石巨人(一階)", "Grade": "hard", "stagetitle" : "一階" , "LV" : 230 , "Defense" : "10%", "HP": 600000000000,"HPCh":"6000億","attributeHalf": false},
                                {"key":"hard惡夢石巨人二階", "name":"惡夢石巨人(二階)", "Grade": "hard", "stagetitle" : "二階" , "LV" : 230 , "Defense" : "10%", "HP": 200000000000,"HPCh":"2000億","attributeHalf": false},
                                {"key":"hard惡夢毒菇菇", "name":"惡夢毒菇菇", "Grade": "hard", "stagetitle" : "一階" , "LV" : 230 , "Defense" : "10%", "HP": 600000000000,"HPCh":"6000億","attributeHalf": false}
        
                            ]
        
                        }
                    },
                    
                    "damageRef":{
                        "show" : false,
                        "region": "arc",
                        "List":[
                            {"damage": "10%" , "need": 0},
                            {"damage": "30%" , "need": 40},
                            {"damage": "60%" , "need": 110},
                            {"damage": "70%" , "need": 180},
                            {"damage": "80%" , "need": 255},
                            {"damage": "100%" , "need": 360},
                            {"damage": "110%" , "need": 400},
                            {"damage": "130%" , "need": 470},
                            {"damage": "150%" , "need": 540}
                        ]
        
                    },
                    "bossBonus":{
                        "show" : false,
                        "fixedItem":[
                            { "idx": 0, "key": "easy頭目點數", "Grade":"easy", "title": "頭目點數:" , "value": 30},
                            { "idx": 1, "key": "easy里程數", "Grade":"easy", "title": "里程數:" , "value": 5},
                            { "idx": 2, "key": "easy結晶價格", "Grade":"easy", "title": "結晶價格:" , "value": 48799200},
                            { "idx": 3, "key": "easyRB結晶價格", "Grade":"easy", "title": "RB結晶價格:" , "value": 243996000},
        
                            { "idx": 0, "key": "normal頭目點數", "Grade":"normal", "title": "頭目點數:" , "value": 40},
                            { "idx": 1, "key": "normal里程數", "Grade":"normal", "title": "里程數:" , "value": 5},
                            { "idx": 2, "key": "normal結晶價格", "Grade":"normal", "title": "結晶價格:" , "value": 58457600 },
                            { "idx": 3, "key": "normal結晶價格", "Grade":"normal", "title": "Rb結晶價格:" , "value": 292288000},
                            
                            { "idx": 0, "key": "hard頭目點數", "Grade":"hard", "title": "頭目點數:" , "value": 60},
                            { "idx": 1, "key": "hard里程數", "Grade":"hard", "title": "里程數:" , "value": 5},
                            { "idx": 2, "key": "hard結晶價格", "Grade":"hard", "title": "結晶價格:" , "value": 97438242},
                            // { "idx": 3, "key": "hard結晶價格", "Grade":"hard", "title": "結晶價格:" , "value": 487191210}
                            { "idx": 3, "key": "hard結晶價格", "Grade":"hard", "title": "結晶價格:" , "value": 5207}
                        ],
                        "notfixedItem":[
                            {"idx": 1, "key": "easy可疑附加方塊", "Grade":"easy","url":"可疑附加方塊.png" , "title": "可疑附加方塊:" , "value": 3},
                            {"idx": 2, "key": "easy超級藥水", "Grade":"easy","url":"超級藥水.png" , "title": "超級藥水:" , "value": 40},
                            {"idx": 3, "key": "easy十字硬幣", "Grade":"easy","url":"十字硬幣.png" , "title": "十字硬幣:" , "value": 26},
                            {"idx": 4, "key": "easy輪迴星火", "Grade":"easy","url":"150輪迴星火.png" , "title": "輪迴星火:" , "value": 150},
        
                            {"idx": 1, "key": "normal可疑附加方塊", "Grade":"normal","url":"可疑附加方塊.png" , "title": "可疑附加方塊:" , "value": 4},
                            {"idx": 2, "key": "normal超級藥水", "Grade":"normal","url":"超級藥水.png" , "title": "超級藥水:" , "value": 40},
                            {"idx": 3, "key": "normal十字硬幣", "Grade":"normal","url":"十字硬幣.png" , "title": "十字硬幣:" , "value": 26},
                            {"idx": 4, "key": "normal輪迴星火", "Grade":"normal","url":"150輪迴星火.png" , "title": "輪迴星火:" , "value": 150},
        
                            {"idx": 1, "key": "hard可疑附加方塊", "Grade":"hard","url":"可疑附加方塊.png" , "title": "可疑附加方塊:" , "value": 9},
                            {"idx": 2, "key": "hard超級藥水", "Grade":"hard","url":"超級藥水.png" , "title": "超級藥水:" , "value": 50},
                            {"idx": 3, "key": "hard十字硬幣", "Grade":"hard","url":"十字硬幣.png" , "title": "十字硬幣:" , "value": 26},
                            {"idx": 4, "key": "hard輪迴星火", "Grade":"hard","url":"150輪迴星火.png" , "title": "輪迴星火:" , "value": 150}
                        ],
                        "suuAfterItemBox":{
                            "BossLv" : true,
                            "list":[
                                { "idx":1 , "key": "easy太初", "Grade":"easy" , "item": "太初" , "url": "太初.png", "infoUrl":"太初_info.png","drop": false},
                                { "idx":2 , "key": "easy名譽(5000)", "Grade":"easy" , "item": "名譽(5000)" , "url": "名譽.png", "infoUrl":"名譽_info.png","drop": true},
                                { "idx":3 , "key": "easy小經驗", "Grade":"easy" , "item": "小經驗" , "url": "小經驗.png", "infoUrl":"小經驗_info.png","drop": true},
                                { "idx":4 , "key": "easy追加經驗", "Grade":"easy" , "item": "追加經驗" , "url": "追加經驗.png","infoUrl":"追加經驗.png", "drop": true},
                                { "idx":5 , "key": "easy閃藍", "Grade":"easy" , "item": "閃藍" , "url": "閃藍.png","infoUrl":"閃藍.png", "drop": true},
                                { "idx":6 , "key": "easy閃紅", "Grade":"easy" , "item": "閃紅" , "url": "閃紅.png","infoUrl":"閃紅.png", "drop": true},
                                { "idx":7 , "key": "easy紅火", "Grade":"easy" , "item": "紅火" , "url": "紅火.png","infoUrl":"紅火.png", "drop": false},
                                { "idx":8 , "key": "easy紫火", "Grade":"easy" , "item": "紫火" , "url": "紫火.png","infoUrl":"紫火.png", "drop": false},
                                { "idx":9 , "key": "easy黑火", "Grade":"easy" , "item": "黑火" , "url": "黑火.png","infoUrl":"黑火.png", "drop": false},
                                { "idx":10 , "key": "easy強力", "Grade":"easy" , "item": "強力" , "url": "強力.png","infoUrl":"強力.png", "drop": true},
                                { "idx":11 , "key": "easy永遠", "Grade":"easy" , "item": "永遠" , "url": "永遠.png","infoUrl":"永遠.png", "drop": true},
                                { "idx":12 , "key": "easy暗黑", "Grade":"easy" , "item": "暗黑" , "url": "暗黑.png","infoUrl":"暗黑.png", "drop": false},
                                { "idx":13 , "key": "easy優質武器", "Grade":"easy" , "item": "優質武器" , "url": "優質武器.png","infoUrl":"優質武器.png", "drop": false},
                                { "idx":14 , "key": "easy優質飾品", "Grade":"easy" , "item": "優質飾品" , "url": "優質飾品.png","infoUrl":"優質飾品.png", "drop": false},
                                { "idx":15 , "key": "easy優質寵物", "Grade":"easy" , "item": "優質寵物" , "url": "優質寵物.png","infoUrl":"優質寵物.png", "drop": false},
                                { "idx":16 , "key": "easy飾品", "Grade":"easy" , "item": "飾品" , "url": "飾品.png","infoUrl":"飾品.png", "drop": false},
                                { "idx":17 , "key": "easy混沌", "Grade":"easy" , "item": "混沌" , "url": "混沌.png","infoUrl":"混沌.png", "drop": false},
                                { "idx":18 , "key": "easy匠人", "Grade":"easy" , "item": "匠人" , "url": "匠人.png","infoUrl":"匠人.png", "drop": false},
        
                                { "idx":1 , "key": "normal太初", "Grade":"normal" , "item": "太初" , "url": "太初.png", "infoUrl":"太初_info.png","drop": false},
                                { "idx":2 , "key": "normal名譽(5000)", "Grade":"normal" , "item": "名譽(5000)" , "url": "名譽.png", "infoUrl":"名譽_info.png","drop": true},
                                { "idx":3 , "key": "normal小經驗", "Grade":"normal" , "item": "小經驗" , "url": "小經驗.png", "infoUrl":"小經驗_info.png","drop": true},
                                { "idx":4 , "key": "normal追加經驗", "Grade":"normal" , "item": "追加經驗" , "url": "追加經驗.png","infoUrl":"追加經驗.png", "drop": true},
                                { "idx":5 , "key": "normal閃藍", "Grade":"normal" , "item": "閃藍" , "url": "閃藍.png","infoUrl":"閃藍.png", "drop": true},
                                { "idx":6 , "key": "normal閃紅", "Grade":"normal" , "item": "閃紅" , "url": "閃紅.png","infoUrl":"閃紅.png", "drop": true},
                                { "idx":7 , "key": "normal紅火", "Grade":"normal" , "item": "紅火" , "url": "紅火.png","infoUrl":"紅火.png", "drop": false},
                                { "idx":8 , "key": "normal紫火", "Grade":"normal" , "item": "紫火" , "url": "紫火.png","infoUrl":"紫火.png", "drop": false},
                                { "idx":9 , "key": "normal黑火", "Grade":"normal" , "item": "黑火" , "url": "黑火.png","infoUrl":"黑火.png", "drop": false},
                                { "idx":10 , "key": "normal強力", "Grade":"normal" , "item": "強力" , "url": "強力.png","infoUrl":"強力.png", "drop": true},
                                { "idx":11 , "key": "normal永遠", "Grade":"normal" , "item": "永遠" , "url": "永遠.png","infoUrl":"永遠.png", "drop": true},
                                { "idx":12 , "key": "normal暗黑", "Grade":"normal" , "item": "暗黑" , "url": "暗黑.png","infoUrl":"暗黑.png", "drop": false},
                                { "idx":13 , "key": "normal優質武器", "Grade":"normal" , "item": "優質武器" , "url": "優質武器.png","infoUrl":"優質武器.png", "drop": false},
                                { "idx":14 , "key": "normal優質飾品", "Grade":"normal" , "item": "優質飾品" , "url": "優質飾品.png","infoUrl":"優質飾品.png", "drop": false},
                                { "idx":15 , "key": "normal優質寵物", "Grade":"normal" , "item": "優質寵物" , "url": "優質寵物.png","infoUrl":"優質寵物.png", "drop": false},
                                { "idx":16 , "key": "normal飾品", "Grade":"normal" , "item": "飾品" , "url": "飾品.png","infoUrl":"飾品.png", "drop": false},
                                { "idx":17 , "key": "normal混沌", "Grade":"normal" , "item": "混沌" , "url": "混沌.png","infoUrl":"混沌.png", "drop": false},
                                { "idx":18 , "key": "normal匠人", "Grade":"normal" , "item": "匠人" , "url": "匠人.png","infoUrl":"匠人.png", "drop": false},
        
                                { "idx":1 , "key": "hard太初", "Grade":"hard" , "item": "太初" , "url": "太初.png", "infoUrl":"太初_info.png","drop": false},
                                { "idx":2 , "key": "hard名譽(5000)", "Grade":"hard" , "item": "名譽(5000)" , "url": "名譽.png", "infoUrl":"名譽_info.png","drop": true},
                                { "idx":3 , "key": "hard小經驗", "Grade":"hard" , "item": "小經驗" , "url": "小經驗.png", "infoUrl":"小經驗_info.png","drop": true},
                                { "idx":4 , "key": "hard追加經驗", "Grade":"hard" , "item": "追加經驗" , "url": "追加經驗.png","infoUrl":"追加經驗.png", "drop": true},
                                { "idx":5 , "key": "hard閃藍", "Grade":"hard" , "item": "閃藍" , "url": "閃藍.png","infoUrl":"閃藍.png", "drop": true},
                                { "idx":6 , "key": "hard閃紅", "Grade":"hard" , "item": "閃紅" , "url": "閃紅.png","infoUrl":"閃紅.png", "drop": true},
                                { "idx":7 , "key": "hard紅火", "Grade":"hard" , "item": "紅火" , "url": "紅火.png","infoUrl":"紅火.png", "drop": true},
                                { "idx":8 , "key": "hard紫火", "Grade":"hard" , "item": "紫火" , "url": "紫火.png","infoUrl":"紫火.png", "drop": true},
                                { "idx":9 , "key": "hard黑火", "Grade":"hard" , "item": "黑火" , "url": "黑火.png","infoUrl":"黑火.png", "drop": true},
                                { "idx":10 , "key": "hard強力", "Grade":"hard" , "item": "強力" , "url": "強力.png","infoUrl":"強力.png", "drop": true},
                                { "idx":11 , "key": "hard永遠", "Grade":"hard" , "item": "永遠" , "url": "永遠.png","infoUrl":"永遠.png", "drop": true},
                                { "idx":12 , "key": "hard暗黑", "Grade":"hard" , "item": "暗黑" , "url": "暗黑.png","infoUrl":"暗黑.png", "drop": true},
                                { "idx":13 , "key": "hard優質武器", "Grade":"hard" , "item": "優質武器" , "url": "優質武器.png","infoUrl":"優質武器.png", "drop": false},
                                { "idx":14 , "key": "hard優質飾品", "Grade":"hard" , "item": "優質飾品" , "url": "優質飾品.png","infoUrl":"優質飾品.png", "drop": false},
                                { "idx":15 , "key": "hard優質寵物", "Grade":"hard" , "item": "優質寵物" , "url": "優質寵物.png","infoUrl":"優質寵物.png", "drop": false},
                                { "idx":16 , "key": "hard飾品", "Grade":"hard" , "item": "飾品" , "url": "飾品.png","infoUrl":"飾品.png", "drop": true},
                                { "idx":17 , "key": "hard混沌", "Grade":"hard" , "item": "混沌" , "url": "混沌.png","infoUrl":"混沌.png", "drop": true},
                                { "idx":18 , "key": "hard匠人", "Grade":"hard" , "item": "匠人" , "url": "匠人.png","infoUrl":"匠人.png", "drop": true}
                            ]
                            
                        },
                        "majorList":[
                            { "key": "normal蝴蝶翅膀水滴石", "Grade":"normal" , "item": "蝴蝶翅膀水滴石" ,"class":"硬幣" , "url": "蝴蝶翅膀水滴石.png", "infoUrl":"蝴蝶翅膀水滴石_info.png" , "toBonusInfohref":"露希妲硬幣商店"},
                            { "key": "hard蝴蝶翅膀水滴石", "Grade":"hard" , "item": "蝴蝶翅膀水滴石" ,"class":"硬幣" , "url": "蝴蝶翅膀水滴石.png", "infoUrl":"蝴蝶翅膀水滴石_info.png" , "toBonusInfohref":"露希妲硬幣商店"},
                            { "key": "normal暮光印記", "Grade":"normal" , "item": "暮光印記" ,"class":"臉飾" , "url": "暮光印記.png", "infoUrl":"暮光印記_info.png" , "toBonusInfohref":"黎明套組"},
                            { "key": "hard暮光印記", "Grade":"hard" , "item": "暮光印記" ,"class":"臉飾" , "url": "暮光印記.png", "infoUrl":"暮光印記_info.png" , "toBonusInfohref":"黎明套組"},
                            { "key": "hard夢幻的腰帶", "Grade":"hard" , "item": "夢幻的腰帶" ,"class":"臉飾" , "url": "夢幻的腰帶.png", "infoUrl":"夢幻的腰帶_info.png" , "toBonusInfohref":"漆黑套組"},
                            { "key": "hard露希妲機器人", "Grade":"hard" , "item": "露希妲機器人" ,"class":"機器人" , "url": "露希妲機器人.png", "infoUrl":"露希妲機器人_info.png"},
                            { "key": "hard神秘冥界幽靈武器箱", "Grade":"hard" , "item": "神秘冥界幽靈武器箱" ,"class":"選擇箱" , "url": "神秘冥界幽靈武器箱.png", "infoUrl":"神秘冥界幽靈武器箱_info.png" , "toBonusInfohref":"神秘系列武器"},
                            { "key": "hard神秘冥界幽靈防具箱", "Grade":"hard" , "item": "神秘冥界幽靈防具箱" ,"class":"選擇箱" , "url": "神秘冥界幽靈防具箱.png", "infoUrl":"神秘冥界幽靈防具箱_info.png" , "toBonusInfohref":"神秘套組"},
                            { "key": "hard露希妲床鋪", "Grade":"hard" , "item": "露希妲床鋪" ,"class":"家具" , "url": "露希妲床鋪.png", "infoUrl":"露希妲床鋪_info.png" , "toBonusInfohref":"露希妲家具展示"}
                        ]
                    },
                    "otherBonusInfo":{
                        "show" : false,
                        "majorList":[
                            {"key": "露希妲硬幣商店" , "img":["露希妲硬幣商店.png"]},
                            {"key": "神秘系列武器" , "img":["神秘系列武器.png"]},
                            {"key": "神秘套組" , "img":["神秘套組.png"]},
                            {"key": "黎明套組" , "img":["黎明套組.png"]},
                            {"key": "漆黑套組" , "img":["漆黑套組.png"]},
                            {"key": "露希妲家具展示" , "img":["露希妲床鋪實體.png"]}
                        ]
                        
        
                    }
                }, 
            }
        });
        watch(BossInfo, api=>{
            console.log("串API後的資料:",api.data);
            
            banner.value = BossInfo.data[BossNameSelected.value].banner
            GradeList.value = BossInfo.data[BossNameSelected.value].GradeList
            bosstxtData.value = BossInfo.data[BossNameSelected.value].bossIntro.bosstxt
            generalBonusFixeddata.value = BossInfo.data[BossNameSelected.value].bossBonus.fixedItem
            generalBonusnotFixeddata.value = BossInfo.data[BossNameSelected.value].bossBonus.notfixedItem
            majorListData.value = BossInfo.data[BossNameSelected.value].bossBonus.majorList
            generalListData.value = BossInfo.data[BossNameSelected.value].bossBonus.suuAfterItemBox
            damageRefTable.value = BossInfo.data[BossNameSelected.value].damageRef.region
            damageRefVal.value = BossInfo.data[BossNameSelected.value].damageRef.List
            mosData.value = BossInfo.data[BossNameSelected.value].bossData.mosInfo


        })


        watch(BossNameSelected, (bossCh)=>{
            console.log(bossCh);
            banner.value = BossInfo.data[bossCh].banner
            GradeList.value = BossInfo.data[bossCh].GradeList
            bosstxtData.value = BossInfo.data[bossCh].bossIntro.bosstxt
            generalBonusFixeddata.value = BossInfo.data[bossCh].bossBonus.fixedItem
            generalBonusnotFixeddata.value = BossInfo.data[bossCh].bossBonus.notfixedItem
            majorListData.value = BossInfo.data[bossCh].bossBonus.majorList
            generalListData.value = BossInfo.data[bossCh].bossBonus.suuAfterItemBox
            damageRefTable.value = BossInfo.data[bossCh].damageRef.region
            damageRefVal.value = BossInfo.data[bossCh].damageRef.List
            mosData.value = BossInfo.data[bossCh].bossData.mosInfo
           
            
        })

// 統合 Filter Data 的 Method
        const FilterBossNameFn = (Data ,  BossName) => {
           
            if (typeof(Data[0].bossName) === "string"){

                let result = Data.filter(item=>{
                    return item.bossName === BossName
                })
                return result
            }
            console.error("BossName篩選值有誤");


        }

        const FilterGradeFn = (Data , Grade) =>{
            // console.log("傳入的資料:", Data);
            if(Data.length === 0){
                return;

            }

            if(typeof(Data[0].Grade) === "string"){
                let result = Data.filter(item=>{
                    return item.Grade === Grade
                })
                return result
            }

            if(typeof(Data[0].Grade) === "object"){
                let result = Data.filter(item=>{
                    return item.Grade.indexOf(Grade) !==  -1;
                })
                return result
            }
            

        }



// numDisplaychange
        const numPrice = (num) => {
            const n = num + "";
            const numArr = n.split("").reverse();
            const overArr = [];
            let i = 0;
            numArr.forEach((item) => {
              i++;
              if (i > 3) {
                i = 1;
                overArr.push(",");
              }
              overArr.push(item);
            });
            overArr.reverse();
            return overArr.join("");
          };

          const numPriceChinese = (num)=>{
            const n = num + "";
            const length = n.length
            const numArr = n.split("").reverse();

            //  t4 c3 t3 c2 t2 c1 t1 -> xxxx 兆 xxxx 億 xxxx 萬 xxxx
            let Render = [];
            let t1 = []
            let t2 = []
            let t3 = []
            let t4 = []

            let c1 = []
            let c2 = []
            let c3 = []
            if(length >= 5){
                c1.push("萬")
            }
            if(length >= 9){
                c2.push("億")
            }
            if(length >= 13){
                c3.push("兆")
            }
            let i = 0;
            numArr.forEach((item) => {
                i++;
                if(i >= 1 &  i <= 4){
                    t1.push(item)
                }
                if(i >= 5 &  i <= 8){
                    t2.push(item)
                }
                if(i >= 9 &  i <= 12){
                    t3.push(item)
                }
                if(i >= 13 &  i <= 16){
                    t4.push(item)
                }
            });
            if( t1.join("") === "0000" & length >= 5 ){
                t1 = []
            }
            if(t2.join("") === "0000" & length >= 9){
                t2 = []
            }
            if(t3.join("") === "0000" & length >= 13){
                t3 = []
            }
            Render= [...t1 , ...c1 , ...t2 , ...c2 , ...t3 , ...c3 , ...t4]
            Render.reverse()
            Render = Render.join("").replace("億萬","億").replace("兆億","兆")
            return Render
        }  
        
        
        const checkImgFn = (bool)=>{
            let FalseImg = "./img/cross.png"
            let TrueImg = "./img/check.png"
            let result = ''
            return result = bool ? TrueImg : FalseImg
        }


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


        // GradeList
        const GradeList = ref(BossInfo.data[BossNameSelected.value].GradeList)


        const GradeListbool = ref(false)

        const handGradeMenu = () =>{
            GradeListbool.value = !GradeListbool.value;
        }
        const handGradeVal = (el) =>{
            GradeSelected.value = el.currentTarget.dataset.alt;
            GradeListbool.value = false;
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
        const banner = ref(BossInfo.data[BossNameSelected.value].banner)

        const bosstxtData = ref(BossInfo.data[BossNameSelected.value].bossIntro.bosstxt)

        const bosstxtRender = computed(()=>{
            const result = FilterGradeFn(bosstxtData.value, GradeSelected.value)
            return result
        })



        // BOSS名稱重新定義資料內容

        const chbossNameTest = (el) =>{
            BossNameSelected.value = el.target.dataset.bossname
            GradeSelected.value = el.target.alt
            NavBool.value = false
        }


        


        // sectionTag
        const sectionTagItem = reactive([
            {act: false , title: "BOSS入場規則"},
            {act: false , title: "BOSS資訊"},
            {act: false , title: "BOSS獎勵"},
            {act: false , title: "獎勵資訊說明"},
        ])
        const sectioncont = reactive([
            {  idx:0, section: "bossIntro", open: false},
            {  idx:1, section: "bossData", open: false},
            {  idx:2, section: "damageRef", open: false},
            {  idx:3, section: "bossBonus", open: false},
            {  idx:4, section: "otherBonusInfo", open: false}
        ])
        const handsectionTagAct = (el) =>{
            
            let result = ""

             // 處理 sectionTagBox變化
            if (el === undefined){
                result = sectionSelected.value
            }else{
                result = el.target.innerText
                sectionSelected.value = el.target.innerText;
            }

            sectionTagItem.map(item=>{
                if(result === item.title){
                    return item.act = true
                }
                return item.act = false
            })
            
            //  處理 section Render變化
            sectioncont.map(item=>{
                return item.open = false;
            })
           
            if(result === "BOSS入場規則"){
                sectioncont[0].open = true;
                return;
            }
            if(result === "BOSS資訊"){
                sectioncont[1].open = true;
                sectioncont[2].open = true;
                return;
            }
            if(result === "BOSS獎勵"){
                sectioncont[3].open = true;
                return;
            }
            if(result === "獎勵資訊說明"){
                sectioncont[4].open = true;
                return;
            }

            
            
        }

        const sectionchange = computed(()=>{
            sectionTagItem.forEach(item=>{
                item.act = item.title === sectionSelected.value ? true : false
            })
            handsectionTagAct()
        })

        // BonusBox

        const BonusBoxContData = reactive([
            { href:"露希妲硬幣商店" , setImgbool: true , careerList: false , url: "./img/store/露希妲硬幣商店.png"},
            { href:"威爾硬幣商店" , setImgbool: true , careerList: false , url: "./img/store/威爾硬幣商店.png"}
        ])


        const BonusBoxCont = ref("");        
        const BonusBoxBool = ref(false);
        const handBonusBox = (el)=> {
            BonusBoxBool.value = !BonusBoxBool.value
            if(BonusBoxBool.value){
                
                console.log(el.currentTarget.dataset.href);
                BonusBoxCont.value = el.currentTarget.dataset.href
            }
        }
        const BonusBoxContRender = computed(()=>{
            const Render  = BonusBoxContData.filter(item=>{
                return item.href === BonusBoxCont.value;
            })
            return Render
        })



        // furniture
        const furnitureData = reactive([
            {bossName: "露希妲", Grade: "hard", title: "露希妲家具展示" , url: "./img/item/露希妲床鋪實體.png"},
            {bossName: "威爾", Grade: "hard", title: "威爾家具展示" , url: "./img/item/威爾的蜘蛛網狀吊椅實體.png"},
        ])

        const furnitureRender = computed(()=>{
            const filterboss =  FilterBossNameFn(furnitureData , BossNameSelected.value)
            const result = FilterGradeFn(filterboss, GradeSelected.value)            
            return result
        })
        // store
        const storeData = reactive([
            {title: "露希妲硬幣商店" , bossName: "露希妲", Grade: ["hard","normal"],
            HowChangeRender:`
            <span>兌換方式: </span>
            <img class="icon" src="./img/store/LCD硬幣01.png" alt="BOSS水滴"> 
            <span>X9</span>
            <span class="plus">+</span> 
            <img class="icon" src="./img/store/LCD硬幣02.png" alt="怪物水滴"> 
            <span>X1</span>
            <span class="equal">=</span>
            <img class="icon" src="./img/store/LCD硬幣03.png" alt="商店硬幣">
            `,
            WhereChangeRender:`
            <span>兌換位置:</span>
            <img src="./img/store/NPC01.png" alt="村莊小地圖">
            <span class="orTxt">or</span>
            <img src="./img/store/NPC02.png" alt="村莊小地圖">
            `,
            NpcRender:`
            <span>尋找:</span>
            <img class="npc" src="./img/store/神秘硬幣NPC.png" alt="NPC圖">
            `},
        ])
        const CoinstoreRender = computed(()=>{
            // const NameFilter = storeData.filter(item=>{
            //     return item.bossName === BossNameSelected.value
            // })
            const NameFilter = FilterBossNameFn(storeData, BossNameSelected.value)
            // const GradeFilter = NameFilter.filter(item=>{
            //     return item.Grade.indexOf(GradeSelected.value) !==  -1;
            // })
            const result = FilterGradeFn(NameFilter, GradeSelected.value)
            return result           
        })
        
        // MapleSetData
        const MapleSetBool = reactive([
            {idx:0 , key : "黎明套組" ,show: false},
            {idx:1 , key : "漆黑套組" ,show: false},
            {idx:2 , key : "神秘套組" ,show: false}
        ])
        const MapleSetData = reactive([
            { idx:0 , key : "黎明套組" , bossName: "守護者天使綠水靈" , Grade : "normal"},
            { idx:0 , key : "黎明套組" , bossName: "守護者天使綠水靈" , Grade : "hard"},
            { idx:0 , key : "黎明套組" , bossName: "頓凱爾" , Grade : "normal"},
            { idx:0 , key : "黎明套組" , bossName: "頓凱爾" , Grade : "hard"},
            { idx:0 , key : "黎明套組" , bossName: "受選的賽蓮" , Grade : "normal"},
            { idx:0 , key : "黎明套組" , bossName: "受選的賽蓮" , Grade : "hard"},
            { idx:0 , key : "黎明套組" , bossName: "受選的賽蓮" , Grade : "extreme"},
            { idx:0 , key : "黎明套組" , bossName: "真希拉" , Grade : "normal"},
            { idx:0 , key : "黎明套組" , bossName: "真希拉" , Grade : "hard"},
            { idx:0 , key : "黎明套組" , bossName: "戴斯克" , Grade : "normal"},
            { idx:0 , key : "黎明套組" , bossName: "戴斯克" , Grade : "chaos"},
            { idx:0 , key : "黎明套組" , bossName: "露希妲" , Grade : "normal"},
            { idx:0 , key : "黎明套組" , bossName: "露希妲" , Grade : "hard"},
            { idx:0 , key : "黎明套組" , bossName: "威爾" , Grade : "normal"},
            { idx:0 , key : "黎明套組" , bossName: "威爾" , Grade : "hard"},

            { idx:1 , key : "漆黑套組" , bossName: "受選的賽蓮" , Grade : "extreme"},
            { idx:1 , key : "漆黑套組" , bossName: "受選的賽蓮" , Grade : "hard"},
            { idx:1 , key : "漆黑套組" , bossName: "黑魔法師" , Grade : "extreme"},
            { idx:1 , key : "漆黑套組" , bossName: "黑魔法師" , Grade : "hard"},
            { idx:1 , key : "漆黑套組" , bossName: "真希拉" , Grade : "hard"},
            { idx:1 , key : "漆黑套組" , bossName: "頓凱爾" , Grade : "hard"},
            { idx:1 , key : "漆黑套組" , bossName: "戴斯克" , Grade : "chaos"},
            { idx:1 , key : "漆黑套組" , bossName: "威爾" , Grade : "hard"},
            { idx:1 , key : "漆黑套組" , bossName: "露希妲" , Grade : "hard"},
            { idx:1 , key : "漆黑套組" , bossName: "戴米安" , Grade : "hard"},
            { idx:1 , key : "漆黑套組" , bossName: "使烏" , Grade : "hard"},

            { idx:2 , key : "神秘套組" , bossName: "露希妲" , Grade : "normal"},
            { idx:2 , key : "神秘套組" , bossName: "露希妲" , Grade : "hard"},
            { idx:2 , key : "神秘套組" , bossName: "威爾" , Grade : "normal"},
            { idx:2 , key : "神秘套組" , bossName: "威爾" , Grade : "hard"},
            { idx:2 , key : "神秘套組" , bossName: "真希拉" , Grade : "normal"},
            { idx:2 , key : "神秘套組" , bossName: "真希拉" , Grade : "hard"},
            { idx:2 , key : "神秘套組" , bossName: "頓凱爾" , Grade : "hard"},
            { idx:2 , key : "神秘套組" , bossName: "戴斯克" , Grade : "chaos"},

            { idx:3 , key : "首領Boss套組" , bossName: "梅格耐斯" , Grade : "normal"},
            { idx:3 , key : "首領Boss套組" , bossName: "梅格耐斯" , Grade : "hard"},
            { idx:3 , key : "首領Boss套組" , bossName: "皮卡啾" , Grade : "normal"},
            { idx:3 , key : "首領Boss套組" , bossName: "皮卡啾" , Grade : "chaos"},

            { idx:4 , key : "永恆套組" , bossName: "監視者卡洛斯" , Grade : "chaos"},

            { idx:5 , key : "女皇套組" , bossName: "西格諾斯" , Grade : "easy"},
            { idx:5 , key : "女皇套組" , bossName: "西格諾斯" , Grade : "normal"},
        ])
        const MapleSetShow = computed(()=>{
            
            const bossFilt = FilterBossNameFn( MapleSetData, BossNameSelected.value)
            const GradeFilt = FilterGradeFn(bossFilt,  GradeSelected.value)
            const result = GradeFilt.map(item=>{
                return item.key
            })

            MapleSetBool.forEach(item => {
              if(result.indexOf(item.key) !== -1 ){
                item.show = true
              }else{
                item.show = false
              }
            });

            handNobonusDataTxt()
            return result
        })

        const NobonusDataTxt = ref(false)
        const handNobonusDataTxt = ()=>{
            let count = 0
            MapleSetBool.forEach(item=>{
                if(item.show === true){
                    count++;
                }

                NobonusDataTxt.value = count === 0 ? true : false
            })
        }        

        // content Bar toggle
        const subtitleBar = reactive([
            {idx:0 , key:"家具展示",  act: true , where: "獎勵資訊說明"},
            {idx:1 , key:"硬幣商店",  act: true , where: "獎勵資訊說明"},
            {idx:2 , key:"神秘套組",  act: true , where: "獎勵資訊說明"},
            {idx:3 , key:"黎明套組",  act: true , where: "獎勵資訊說明"},
            {idx:4 , key:"漆黑套組",  act: true , where: "獎勵資訊說明"},
            {idx:5 , key:"基本獎勵",  act: false , where: "Boss獎勵"},
            {idx:6 , key:"重要戰利品",  act: false , where: "Boss獎勵" },
            {idx:7 , key:"基本戰利品",  act: false , where: "Boss獎勵" },
        ])

        const handsubtitleBar = (el) =>{
            subtitleBar.forEach(item=>{
                if(el.currentTarget.dataset.barkey === item.key){
                    if(item.act){
                        item.act = false
                        return
                    }
                  item.act = true
                }

            })
        }


        // generalBonus 基本獎勵數據變化
        const generalBonusFixeddata = ref(BossInfo.data[BossNameSelected.value].bossBonus.fixedItem)
        const generalBonusnotFixeddata = ref(BossInfo.data[BossNameSelected.value].bossBonus.notfixedItem)
        


        const FixedItemShow = computed(()=>{
            const filt = FilterGradeFn(generalBonusFixeddata.value, GradeSelected.value)

            const Render = filt.map(item=>{
                return {title : item.title , value : numPrice(item.value) , chvalue: numPriceChinese(item.value) }
            })
            return Render
        })

        const notFixedItemShow = computed(()=>{
            const filt = FilterGradeFn(generalBonusnotFixeddata.value, GradeSelected.value)
            const hidezeroVal = filt.filter(item=>{
                return item.value !== 0
            })
            const Render = hidezeroVal.map(item=>{
                return {url : `${ItemURL.value}${item.url}` , title : item.title ,  value : item.value}
            })
            return Render     
        })

        // majorList - 重要戰利品數據變化
        const majorListData = ref(BossInfo.data[BossNameSelected.value].bossBonus.majorList)

        
        const majorListnoData = ref(false)
        const majorListShow = computed(()=>{
            const filt = FilterGradeFn(majorListData.value, GradeSelected.value)
            const Render = filt.map(el=>{
                return {title : el.item,
                        class: el.class,
                        url: `${ItemURL.value}${el.item}.png`,
                        BonusInfoHref: el.toBonusInfohref,
                        hrefTxt: majorListHerfTxt(el),
                    }
            })
            if(Render.length === 0){
                majorListnoData.value = true;
            }else{
                majorListnoData.value = false;
            }
            return Render
        })
        const majorListHerfTxt = (el)=>{
            let txt = ""

            if(el.toBonusInfohref === `${BossNameSelected.value}硬幣商店`){
                txt = "硬幣商店"
            }
            if(el.toBonusInfohref === "黎明套組"){
                txt = "黎明套組"
            }
            if(el.toBonusInfohref === "漆黑套組"){
                txt = "漆黑套組"
            }
            if(el.toBonusInfohref === "神秘套組" | el.toBonusInfohref === "神秘系列武器"){
                txt = "神秘套組"
            }
            if(el.toBonusInfohref === `${BossNameSelected.value}家具展示`){
                txt = "家具展示"
            }

            if(el.toBonusInfohref === undefined | txt === ""){
                txt = "noBonusInfo"
            }
            return txt
        }
        const handToOtherBonusInfo = (el) =>{
            let href = ""
            // console.log(el.currentTarget.dataset.href);
            href = el.currentTarget.dataset.href
            subtitleBar.forEach(item=>{
                if(item.where === "獎勵資訊說明"){
                    item.act = true
                }

                if(item.key === href){
                    item.act = false
                }
            })
            sectionSelected.value = "獎勵資訊說明"
            handsectionTagAct()

        }
        // 基本戰利品 資料變化  suuAfterItemBox
        const generalListData = ref(BossInfo.data[BossNameSelected.value].bossBonus.suuAfterItemBox)
        // console.log(generalListData);
        // console.log(generalListData.value.BossLv);
        // console.log(generalListData.value.list);

        const generalListShow = computed(()=>{
            if(generalListData.value.BossLv){


                const Filt = FilterGradeFn(generalListData.value.list, GradeSelected.value)
                const Render = Filt.map(el=>{
                    return {url: `${ItemURL.value}${el.url}` , key: el.item ,drop: checkImgFn(el.drop)}
                })
                return Render
    
            }

            if(!generalListData.value.BossLv){
                return 'noItemRender'
            }
        })

        // 顯示 AUT 、 ARC 增傷表
        const damageRefTable = ref(BossInfo.data[BossNameSelected.value].damageRef.region)
        const damageRefVal = ref(BossInfo.data[BossNameSelected.value].damageRef.List)
        const region = ref('none')
        

        const damageRefArcShow = computed(()=>{
            let TxtModify = ''
            let can = true
            let result = [{
                region: region.value
            }]
            if(damageRefTable.value !== 'arc'){
                result[0].region = 'none'
            }
            if(damageRefTable.value === "arc"){
                region.value = "arc" ;
                result = damageRefVal.value.map(item=>{
                    TxtModify = ''
                    can = true
                    if(item.damage === "150%" & item.need <= 1320){
                        TxtModify = "以上"
                    }

                    // 針對黑魔法師增傷 遊戲中無法超過的arc值作標示
                    if(item.need > 1500){
                        can = false
                    }

                    return {region: region.value ,damage : item.damage, val : `${item.need}${TxtModify}` , cangetVal: can}
                })
            }
            
            
            
            // console.log("arc",result);
            return result

           
        })
        const damageRefAutShow = computed(()=>{
            let TxtModify = ''

            // 目前Render aut資料必要的長度
            let autlength = 32

            let result = []
            if(damageRefTable.value !== 'aut'){
                for (let i = 0; i < autlength; i++) {
                    result.push({region:"none" , val : 0})
                }
            }

            if(damageRefTable.value === "aut"){
                region.value = "aut" ;
                result = damageRefVal.value.map(item=>{
                    TxtModify = ''
                    if(item.damage === "5%"){
                        TxtModify = "以下"
                    }
                    if(item.damage === "125%"){
                        TxtModify = "以上"
                    }

                    return {stage: item.stage , region: region.value ,damage : item.damage, val : `${item.need}${TxtModify}` }
                })
            }
            
            
            
            // console.log("aut",result);
            return result

           
        })

        // mos資料顯示
        const mosData = ref(BossInfo.data[BossNameSelected.value].bossData.mosInfo)
        const mosNoData = ref(false)
        
        console.log(mosData.value);
        const mosDataShow = computed(()=>{
            mosNoData.value = mosData.value.has ? true : false

            const HalftxtFn = (txt) =>{
                let result = ''
                if( txt === '' | txt === undefined){
                    return result
                }
                if(txt !== ''){
                    console.log(txt);
                    return result =  txt
                }
            }

            if(mosNoData.value){
                const Filt = FilterGradeFn(mosData.value.info, GradeSelected.value)
                console.log(Filt);
                const Render = Filt.map(item=>{
                    return {url: `${mosURL.value}${item.name}.png`, 
                            alt: item.name, 
                            mosLv: item.LV,
                            mosHp: numPriceChinese(item.HP),
                            mosDefense: item.Defense, 
                            attributeHalf: checkImgFn(item.attributeHalf),
                            HalfTxt: HalftxtFn(item.Halftxt)
    
                }
                })
                console.log(Render);
                return Render

            }else{
                const Render = []
                console.log(Render);
                return Render
            }

        })
        
        onMounted(() => {
            const getmapleBossInfoApi = () =>{
                return axios.get("./api/mapleBossInfo.json")
            }


            
          axios.all([getmapleBossInfoApi()])
          .then((res)=>{
            BossInfo.data = res[0].data[0].data
            handLoadbool()
        })
          .catch((err)=>{
            console.error("API沒接到");
        })
        })


        return{
            // API串接資料後 才顯示畫面
            isload,
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
            handsectionTagAct,
            sectionchange,

            // BonusBox
            BonusBoxBool,
            handBonusBox,
            BonusBoxContRender,


            // BonusItem
            NobonusDataTxt,
                // furniture
            furnitureRender,
                // store
            CoinstoreRender,
                // set
            MapleSetBool,
            MapleSetShow,

            
            // content toggle
            subtitleBar,
            handsubtitleBar,

            // generalBonus 基本獎勵數據變化
            FixedItemShow,
            notFixedItemShow,

            // majorList 重要戰利品變化
            majorListnoData,
            majorListShow,
            handToOtherBonusInfo,

            // generalList 基本戰利品變化
            generalListShow,

            // 顯示 AUT 、 ARC 增傷表
            damageRefArcShow,
            damageRefAutShow,

            // 怪物資訊 Render
            mosDataShow,
            mosNoData,
            

        }



    
    }


   
}
createApp(App).mount("#app") 







