
window.onload = () =>{

    const {createApp, ref, reactive, computed, watch, onMounted , onUpdated} = Vue
    const App = {

        setup(){
            // 無條件進位公式
            const roundDown = function( num, decimal ) { return Math.floor( ( num + Number.EPSILON ) * Math.pow( 10, decimal ) ) / Math.pow( 10, decimal ); }
            // 無視防禦計算公式
            const defenceData = reactive({data:[40,40,40]})
            const defenceVal = ref(0)
            
            const defenceFn = () =>{
                defenceData.data.forEach(item => {
                    defenceVal.value = ( 1 - (1 - defenceVal.value * 0.01) * (1 - item * 0.01) ) * 100
                });
            }
            // 職業資料
            const jobData = reactive({data:[]})
            const jobImgData = reactive({url:[]})
            const ImportJobImg = ()=>{
                let num = 53
                for (let i = 1; i <= num; i++) {
                    jobImgData.url.push({idx: i , url:`./img/jobdata/${i}.png`})
                }
            }

            // 職業篩選器
            const fiveJobList = reactive({data:[
                {idx:0, job:"00", key:"無篩選"},
                {idx:1, job:"01", key:"劍士"},
                {idx:2, job:"02", key:"法師"},
                {idx:3, job:"03", key:"弓箭手"},
                {idx:4, job:"04", key:"盜賊"},
                {idx:5, job:"05", key:"海盜"}
            ]})
            const fiveJobIs= ref([{idx:0, job:"00", key:"無篩選"}])
            const fiveJobListBool = ref(false)
            const handfiveJobList =  (el) =>{
                if(!fiveJobListBool.value){
                    fiveJobListBool.value = true
                }else{
                    let key = el.currentTarget.innerText;

                    let i  = 0
                    fiveJobList.data.forEach(item=>{
                        if(item.key === key){
                            i++
                        }
                    })
                    if(i === 0) {
                        fiveJobListBool.value = false;
                        return
                    }

                    
                    fiveJobIs.value = fiveJobList.data.filter(item=>{
                        if(item.key === key)  return item
                    })
                    // console.log(fiveJobIs.value);
                    fiveJobListBool.value = false;

                }

            }
            ImportJobImg()
            // 職業類別篩選器
            const jobCategoryList = reactive({data:[
                {idx:0 , act: true, category:"all" ,key:"無篩選"},
                {idx:1 , act: false, category:"adv" ,key:"冒險家"},
                {idx:2 , act: false, category:"royal" ,key:"皇家騎士團"},
                {idx:3 , act: false, category:"hero" ,key:"楓葉英雄"},
                {idx:4 , act: false, category:"rebel" ,key:"末日反抗軍"},
                {idx:5 , act: false, category:"rap" ,key:"雷普族"},
                {idx:6 , act: false, category:"nova" ,key:"超新星"},
                {idx:7 , act: false, category:"anima" ,key:"阿尼瑪"},
                {idx:8 , act: false, category:"jap" ,key:"曉之陣"},
                {idx:9 , act: false, category:"others" ,key:"其他"},
            ]})
            const jobCategoryIs = ref([{idx:0 ,act:true , category:"all" ,key:"無篩選"},])
            const jobCategoryBool = ref(false)
            const handjobCategory = (el) =>{
                if(!jobCategoryBool.value){
                    jobCategoryBool.value = true;
                }else{
                    let key = el.currentTarget.innerText;
                    let i  = 0

                    jobCategoryList.data.forEach(item=>{
                        if(item.key === key){
                            i++
                        }
                    })
                    if(i === 0) {
                        jobCategoryBool.value = false;
                        return
                    }                    

                    jobCategoryIs.value = jobCategoryList.data.filter(item=>{
                        if(item.key === key) return item
                    })
                    jobCategoryIs.value[0].act = true;
                    jobCategoryBool.value = false;
                    jobCategoryList.data.forEach(item=>{
                        item.act = false;
                        if( item.key === jobCategoryIs.value[0].key){
                            item.act = true;
                        }
                    })
                }

            }
            const jobRender = computed(()=>{
                const allJob = jobData.data
                const aim = CreateAim.value

                const FiltfiveJob = allJob.filter(item=>{
                    if(fiveJobIs.value[0].job === '00'){
                        return jobData.data
                    }
                    if(fiveJobIs.value[0].job === '01'){
                        return item.job === '01'
                    }
                    if(fiveJobIs.value[0].job === '02'){
                        return item.job === '02'
                    }
                    if(fiveJobIs.value[0].job === '03'){
                        return item.job === '03'
                    }
                    if(fiveJobIs.value[0].job === '04'){
                        return item.job === '04'
                    }
                    if(fiveJobIs.value[0].job === '05'){
                        return item.job === '05'
                    }
                })

                // 傑諾包含海盜職，另外新增
                if(fiveJobIs.value[0].job === '05'){
                    FiltfiveJob.push({"idx":34 ,"act": false,"weaponRef":1.3125, "mainStats":["str","dex","luk"], "subStats":[], "key":"傑諾" , "job":"04", "category":"rebel"})
                }



                const FiltJobCategory = FiltfiveJob.filter(item=>{
                    if(jobCategoryIs.value[0].category === 'all'){
                        return item
                    }
                    if(jobCategoryIs.value[0].category === 'adv'){
                        return item.category === 'adv'
                    }
                    if(jobCategoryIs.value[0].category === 'royal'){
                        return item.category === 'royal'
                    }
                    if(jobCategoryIs.value[0].category === 'hero'){
                        return item.category === 'hero'
                    }
                    if(jobCategoryIs.value[0].category === 'rebel'){
                        return item.category === 'rebel'
                    }
                    if(jobCategoryIs.value[0].category === 'rap'){
                        return item.category === 'rap'
                    }
                    if(jobCategoryIs.value[0].category === 'anima'){
                        return item.category === 'anima'
                    }
                    if(jobCategoryIs.value[0].category === 'nova'){
                        return item.category === 'nova'
                    }
                    if(jobCategoryIs.value[0].category === 'jap'){
                        return item.category === 'jap'
                    }
                    if(jobCategoryIs.value[0].category === 'others'){
                        return item.category === 'others'
                    }
                })

                return FiltJobCategory
            })
            const handFinJobIs = (el) =>{
                let key = el.currentTarget.innerText;
                FinJobIs.value = jobData.data.filter(item=>{
                    if(item.key === key){
                        return item
                    }
                })
            }
            // step1 選擇的職業
            const FinJobIs = ref([{"idx":1 , "weaponRef":1.3,"mainStats":["str"], "subStats":["dex"], "key":"英雄(單手)" , "job":"01", "category":"adv"}])
            const FinJobUrl = computed(()=>{
                const RenderImg = jobImgData.url.filter(item=>{
                    if(item.idx === FinJobIs.value[0].idx){
                        return item
                    }
                })
                return RenderImg[0].url
            })
            const CreateAim = ref("boss")
            const handCreateAim = (el) =>{
                let key = el.target.dataset.aim 
                if(key === "boss"){
                    CreateAim.value = "exp"
                    return
                }
                if(key === "exp"){
                    CreateAim.value= "boss"
                    return
                }
            }

            // step2 potion choose
            const potionImg = ref('')
            const checkStep2 = ref(false)



            const DiffStatsWay = ref('')
            const handPotionWay =  (el) =>{
                let key = el.currentTarget.dataset.way 
                
                checkStep2.value = false
                if(key === "5%"){
                    potionImg.value = '5%秘藥圖'
                    DiffStatsWay.value = 0.05
                }
                if(key === "10%"){
                    potionImg.value = '10%秘藥圖'
                    DiffStatsWay.value = 0.1
                }
                if(key === "50"){
                    potionImg.value = '+50秘藥圖'
                    DiffStatsWay.value = 50
                }
                if(key === "60"){
                    potionImg.value = '+60秘藥圖'
                    DiffStatsWay.value = 60
                }
                console.log(key);
                console.log(DiffStatsWay.value);
            }


            // step3 battleField
            const battleFieldData = reactive({data:[]})
            const mainBattleStats = reactive({data:[]})
            const subBattleStats = reactive({data:[]})
            const ZenonBattleStats = ref([{key:"傑諾",lv:"SS" , val: 40}])

            const BattleStatsShow = ref([])

            const BattleListRender = computed(()=>{
                let mainStats = FinJobIs.value[0].mainStats
                let subStats = FinJobIs.value[0].subStats
                let mainArr = []
                let subArr = []
                BattleStatsShow.value = []





                // render list
                if(mainStats.indexOf('str') !== -1){
                    battleFieldData.data.forEach(item=>{
                        if(item.stats === "str")
                        mainArr.push(item)
                    })
                    BattleStatsShow.value.push("str")
                }
                if(mainStats.indexOf('dex') !== -1){
                    battleFieldData.data.forEach(item=>{
                        if(item.stats === "dex")
                        mainArr.push(item)
                    })
                    BattleStatsShow.value.push("dex")

                }
                if(mainStats.indexOf('int') !== -1){
                    battleFieldData.data.forEach(item=>{
                        if(item.stats === "int")
                        mainArr.push(item)
                    })
                    BattleStatsShow.value.push("int")
                }
                if(mainStats.indexOf('luk') !== -1){
                    battleFieldData.data.forEach(item=>{
                        if(item.stats === "luk")
                        mainArr.push(item)
                    })
                    BattleStatsShow.value.push("luk")
                }

                mainBattleStats.data = mainArr
                
                if(subStats.indexOf('str') !== -1){
                    battleFieldData.data.forEach(item=>{
                        if(item.stats === "str")
                        subArr.push(item)
                    })
                    BattleStatsShow.value.push("str")
                }
                if(subStats.indexOf('dex') !== -1){
                    battleFieldData.data.forEach(item=>{
                        if(item.stats === "dex")
                        subArr.push(item)
                    })
                    BattleStatsShow.value.push("dex")
                }
                if(subStats.indexOf('int') !== -1){
                    battleFieldData.data.forEach(item=>{
                        if(item.stats === "int")
                        subArr.push(item)
                    })
                    BattleStatsShow.value.push("int")
                }
                if(subStats.indexOf('luk') !== -1){
                    battleFieldData.data.forEach(item=>{
                        if(item.stats === "luk")
                        subArr.push(item)
                    })
                    BattleStatsShow.value.push("luk")
                }

                subBattleStats.data = subArr

                // show value
                if(FinJobIs.value[0].key === "傑諾"){
                    BattleStatsShow.value = "zenon"
                }
                
                if(BattleStatsShow.value[0] === "str" && BattleStatsShow.value[1] === "dex"){
                    BattleStatsShow.value = "strdex"
                }
                if(BattleStatsShow.value[0] === "int" && BattleStatsShow.value[1] === "luk"){
                    BattleStatsShow.value = "intluk"
                }
                if(BattleStatsShow.value[0] === "dex" && BattleStatsShow.value[1] === "str"){
                    BattleStatsShow.value = "dexstr"
                }
                if(BattleStatsShow.value[0] === "luk" && BattleStatsShow.value[1] === "dex"){
                    if(BattleStatsShow.value.length === 2 ){
                        BattleStatsShow.value = "lukdex"
                    }else{
                       
                    }
                
                }
                if(BattleStatsShow.value[0] === "luk" && BattleStatsShow.value[1] === "str"){
                    BattleStatsShow.value = "lukdexstr"
                }
                return 5207
    
            }) 


            const BattleStatsStr = ref(680)
            const BattleStatsDex = ref(440)
            const BattleStatsInt = ref(640)
            const BattleStatsLuk = ref(520)
            
            const handZenonBattleStats = (Lv) =>{
                if( Lv === 'SS'){
                    ZenonBattleStats.value[0].lv = "SSS"
                    ZenonBattleStats.value[0].val = 50
                    return
                }
                if( Lv === 'SSS'){
                    ZenonBattleStats.value[0].lv = "-"
                    ZenonBattleStats.value[0].val = 0
                    return
                }
                if( Lv === '-'){
                    ZenonBattleStats.value[0].lv = "B"
                    ZenonBattleStats.value[0].val = 5
                    return
                }
                if( Lv === 'B'){
                    ZenonBattleStats.value[0].lv = "A"
                    ZenonBattleStats.value[0].val = 10
                    return
                }
                if( Lv === 'A'){
                    ZenonBattleStats.value[0].lv = "S"
                    ZenonBattleStats.value[0].val = 20
                    return
                }
                if( Lv === 'S'){
                    ZenonBattleStats.value[0].lv = "SS"
                    ZenonBattleStats.value[0].val = 40
                    return
                }                
            }
            const handBattleStats = (el) =>{
                let Lv = el.currentTarget.dataset.battlelv
                let key = el.currentTarget.dataset.battlejob

                // 改變戰地等級
                if(key !== '傑諾'){
                    let mainArr = []
                    let subArr = []
                    mainArr = mainBattleStats.data.filter(item=>{
                        if(item.key === key){
                            return item
                        }
                    })
                    mainArr.forEach(item=>{
                        if(item.lv === 'SS'){
                            item.lv = "SSS"
                            item.val = 100
                            return
                        }
                        if(item.lv === 'SSS'){
                            item.lv = "-"
                            item.val = 0
                            return
                        }
                        if(item.lv === '-'){
                            item.lv = "B"
                            item.val = 10
                            return
                        }
                        if(item.lv === 'B'){
                            item.lv = "A"
                            item.val = 20
                            return
                        }
                        if(item.lv === 'A'){
                            item.lv = "S"
                            item.val = 40
                            return
                        }
                        if(item.lv === 'S'){
                            item.lv = "SS"
                            item.val = 80
                            return
                        }
                    })
                    subArr = subBattleStats.data.filter(item=>{
                        if(item.key === key){
                            return item
                        }
                    })
                    subArr.forEach(item=>{
                        if(item.lv === 'SS'){
                            item.lv = "SSS"
                            item.val = 100
                            return
                        }
                        if(item.lv === 'SSS'){
                            item.lv = "-"
                            item.val = 0
                            return
                        }
                        if(item.lv === '-'){
                            item.lv = "B"
                            item.val = 10
                            return
                        }
                        if(item.lv === 'B'){
                            item.lv = "A"
                            item.val = 20
                            return
                        }
                        if(item.lv === 'A'){
                            item.lv = "S"
                            item.val = 40
                            return
                        }
                        if(item.lv === 'S'){
                            item.lv = "SS"
                            item.val = 80
                            return
                        }
                    })
                }

                if(key === '傑諾'){
                    handZenonBattleStats(Lv)
                }



                // 演算戰地增幅
                BattleStatsStr.value = 0
                BattleStatsDex.value = 0
                BattleStatsInt.value = 0
                BattleStatsLuk.value = 0

                mainBattleStats.data.forEach(item=>{
                    if(item.stats === 'str'){
                        BattleStatsStr.value += item.val
                    }
                    if(item.stats === 'dex'){
                        BattleStatsDex.value += item.val
                    }
                    if(item.stats === 'int'){
                        BattleStatsInt.value += item.val
                    }
                    if(item.stats === 'luk'){
                        BattleStatsLuk.value += item.val
                    }
                }) 
                subBattleStats.data.forEach(item=>{
                    if(item.stats === 'str'){
                        BattleStatsStr.value += item.val
                    }
                    if(item.stats === 'dex'){
                        BattleStatsDex.value += item.val
                    }
                    if(item.stats === 'int'){
                        BattleStatsInt.value += item.val
                    }
                    if(item.stats === 'luk'){
                        BattleStatsLuk.value += item.val
                    }
                }) 

               
                BattleStatsStr.value += ZenonBattleStats.value[0].val
                BattleStatsDex.value += ZenonBattleStats.value[0].val
                BattleStatsLuk.value += ZenonBattleStats.value[0].val
            }
            const BattleStatsReset = ()=>{
                BattleStatsStr.value = 680
                BattleStatsDex.value = 440
                BattleStatsInt.value = 640
                BattleStatsLuk.value = 520      
                mainBattleStats.data.forEach(item=>{
                    item.lv = 'SS'
                    item.val = 80
                })     
                subBattleStats.data.forEach(item=>{
                    item.lv = 'SS'
                    item.val = 80
                })    
                ZenonBattleStats.value[0].lv = "SS"
                ZenonBattleStats.value[0].val = 40
            }
            // step4 finish others data 
           
            

            const StatsShow = ref('')


            const StatsIsThree = ref(false)


            
            const step4Result = reactive({data:[
                {idx:0 , check: true , hint:"1" , key:"等級" , val: 281},
                {idx:1 , check: true , hint:"2" , key:"攻擊力" , val: 5207},
                {idx:2 , check: true , hint:"3a" , key:"裝備%攻" , val: 100},
                {idx:3 , check: true , hint:"3b" , key:"萌獸%攻" , val: 14},
                {idx:4 , check: true , hint:"4" , key:"總傷" , val: 77},
                {idx:5 , check: true , hint:"5boss" , key:"B傷" , val: 477},
                {idx:6 , check: true , hint:"7" , key:"終傷" , val: 110.23},
                {idx:7 , check: true , hint:"8" , key:"爆傷" , val: 99},
                {idx:8 , check: true , hint:"6" , key:"無視" , val: 99},
                {idx:9 , check: true , hint:"9" , key:"arc符數" , val: 1320},
                {idx:10, check: true  , hint:"10" , key:"aut符數" , val: 0},
                {idx:11, check: true  , hint:"11" , key:"startPt" , val: [{"str":7},{"dex":27},{"int":207},{"luk":277},]},
                {idx:12, check: true  , hint:"12" , key:"extremePt" , val: [{"str":0},{"dex":0},{"int":0},{"luk":0},]},
                {idx:13, check: true  , hint:"13" , key:"PotentialPt" , val: [{"str":0},{"dex":0},{"int":0},{"luk":0},]},
                {idx:14, check: true  , hint:["14a","14b","14c"] , key:"jewelrySet" , val: [{"漆黑":0},{"頂培":0},{"黎明":0}]},
                {idx:15, check: true  , hint:["15a","15b","15c"] , key:"armorSet" , val: [{"永恆":0},{"神秘":0},{"航海":0}]},
                {idx:16, check: true  , hint:"5exp_a" , key:"一般怪物傷-戰地" , val: 0},
                {idx:17, check: true  , hint:"5exp_b" , key:"一般怪物傷-內潛能" , val: 0},
                {idx:18, check: true  , hint:"5exp_c" , key:"一般怪物傷-極限" , val: 0},
                {idx:19 , check: true , hint:"16" , key:"arc主屬" , val: 14400},
                {idx:20 , check: true , hint:"17" , key:"aut主屬" , val: 0},
                {idx:21, check: true  , hint:"18" , key:"吃藥後主屬" , val: [{"str":7},{"dex":27},{"int":207},{"luk":277},]},
                {idx:22 , check: true , hint:"3c" , key:"技能%攻" , val: 14},
            ]})
 
  
            const step4CheckList = ref([
                {key:"等級", idx: 0 , hint:'1' ,check: true},
                {key:"攻擊力", idx: 1 , hint:'2' ,check: true},
                {key:"裝備%攻", idx: 2 , hint:'3a' ,check: true},
                {key:"萌獸%攻", idx: 3 , hint:'3b' ,check: true},
                {key:"總傷", idx: 4 , hint:'4' ,check: true},
                {key:"B傷", idx: 5 , hint:'5boss' ,check: true},
                {key:"一般怪物傷-戰地", idx: 6 , hint:'5exp_a' ,check: true},
                {key:"一般怪物傷-極限", idx: 7 , hint:'5exp_b' ,check: true},
                {key:"一般怪物傷-內潛能", idx: 8 , hint:'5exp_c' ,check: true},
                {key:"無視", idx: 9 , hint:'6' ,check: true},
                {key:"終傷", idx: 10 , hint:'7' ,check: true},
                {key:"爆傷", idx: 11 , hint:'8' ,check: true},
                {key:"arc符數", idx: 12 , hint:'9' ,check: true},
                {key:"aut符數", idx: 13 , hint:'10' ,check: true},
                {key:"startPt_str", idx: 14 , hint:'11a' ,check: true},
                {key:"startPt_dex", idx: 15 , hint:'11b' ,check: true},
                {key:"startPt_int", idx: 16 , hint:'11c' ,check: true},
                {key:"startPt_luk", idx: 17 , hint:'11d' ,check: true},
                {key:"extremePt_str", idx: 18 , hint:'12a' ,check: true},
                {key:"extremePt_dex", idx: 19 , hint:'12b' ,check: true},
                {key:"extremePt_int", idx: 20 , hint:'12c' ,check: true},
                {key:"extremePt_luk", idx: 21 , hint:'12d' ,check: true},
                {key:"PotentialPt_str", idx: 22 , hint:'13a' ,check: true},
                {key:"PotentialPt_dex", idx: 23 , hint:'13b' ,check: true},
                {key:"PotentialPt_int", idx: 24 , hint:'13c' ,check: true},
                {key:"PotentialPt_luk", idx: 25 , hint:'13d' ,check: true},
                {key:"jewelrySet_漆黑", idx: 26 , hint:'14a' ,check: true},
                {key:"jewelrySet_頂培", idx: 27 , hint:'14b' ,check: true},
                {key:"jewelrySet_黎明", idx: 28 , hint:'14c' ,check: true},
                {key:"armorSet_永恆", idx: 29 , hint:'15a' ,check: true},
                {key:"armorSet_神秘", idx: 30 , hint:'15b' ,check: true},
                {key:"armorSet_航海", idx: 31 , hint:'15c' ,check: true},
                {key:"arc主屬", idx: 32 , hint:'16' ,check: true},
                {key:"aut主屬", idx: 33 , hint:'17' ,check: true},
                {key:"吃藥後str", idx: 34 , hint:'18a' ,check: true},
                {key:"吃藥後dex", idx: 35 , hint:'18b' ,check: true},
                {key:"吃藥後int", idx: 36 , hint:'18c' ,check: true},
                {key:"吃藥後luk", idx: 37 , hint:'18d' ,check: true},
                {key:"技能%攻", idx: 38 , hint:'3c' ,check: true},
            ])
            const hintImg = ref("./img/step4/1.png")
            const HintImgRender = (el) =>{
                let hintIdx =  el.currentTarget.dataset.hint
                hintImg.value = `./img/step4/${hintIdx}.png`
            }

            const step4Check_Blur = (el) =>{
                let checkidx = el.currentTarget.dataset.hint
                handCheckList(checkidx)
            }

            const handCheckList = (idx)=>{
                let num = 0

                if(idx === "1"){
                    step4CheckList.value[0].check = false
                    step4Result.data[0].check = false
                    if(step4Result.data[0].val === ''){
                        console.error('不得為空值');
                        return
                    }
                    num = Number(step4Result.data[0].val)
                    if(isNaN(num)){
                        console.error('非數字');
                        return
                    }                    
                    if(Math.floor(num) !== num){
                        console.error('輸入非整數');
                        return
                    }
                    if(num > 300){
                        console.error('輸入非等級範圍');
                        return
                    }
                    if(num <= 0){
                        console.error('輸入非等級範圍');
                        return
                    }
                    step4CheckList.value[0].check = true
                    step4Result.data[0].check = true
                }
                if(idx === "2"){
                    step4CheckList.value[1].check = false
                    step4Result.data[1].check = false
                    if(step4Result.data[1].val === ''){
                        console.error('不得為空值');
                        return
                    }
                    num = Number(step4Result.data[1].val)
                    if(isNaN(num)){
                        console.error('非數字');
                        return
                    }                      
                    if(Math.floor(num) !== num){
                        console.error('輸入非整數');
                        return
                    }
                    if(num < 0){
                        console.error('攻擊力非負數');
                        return
                    }
                    step4CheckList.value[1].check = true
                    step4Result.data[1].check = true
                }
                if(idx === "3a"){
                    step4CheckList.value[2].check = false
                    step4Result.data[2].check = false
                    if(step4Result.data[2].val === ''){
                        console.error('不得為空值');
                        return
                    }
                    num = Number(step4Result.data[2].val)
                    if(isNaN(num)){
                        console.error('非數字');
                        return
                    }                      
                    if(Math.floor(num) !== num){
                        console.error('輸入非整數');
                        return
                    }
                    if(num < 0){
                        console.error('%攻擊力非負數');
                        return
                    }
                    step4CheckList.value[2].check = true
                    step4Result.data[2].check = true
                }
                if(idx === "3b"){
                    step4CheckList.value[3].check = false
                    step4Result.data[3].check = false
                    if(step4Result.data[3].val === ''){
                        console.error('不得為空值');
                        return
                    }
                    num = Number(step4Result.data[3].val)
                    if(isNaN(num)){
                        console.error('非數字');
                        return
                    }                      
                    if(Math.floor(num) !== num){
                        console.error('輸入非整數');
                        return
                    }
                    if(num < 0){
                        console.error('%攻擊力非負數');
                        return
                    }                    
                    step4CheckList.value[3].check = true
                    step4Result.data[3].check = true
                }
                if(idx === "3c"){
                    step4CheckList.value[38].check = false
                    step4Result.data[22].check = false
                    if(step4Result.data[22].val === ''){
                        console.error('不得為空值');
                        return
                    }
                    num = Number(step4Result.data[22].val)
                    if(isNaN(num)){
                        console.error('非數字');
                        return
                    }                      
                    if(Math.floor(num) !== num){
                        console.error('輸入非整數');
                        return
                    }
                    if(num < 0){
                        console.error('%攻擊力非負數');
                        return
                    }                    
                    step4CheckList.value[38].check = true
                    step4Result.data[22].check = true
                }
                if(idx === "4"){
                    step4CheckList.value[4].check = false
                    step4Result.data[4].check = false
                    if(step4Result.data[4].val === ''){
                        console.error('不得為空值');
                        return
                    }
                    num = Number(step4Result.data[4].val)
                    if(isNaN(num)){
                        console.error('非數字');
                        return
                    }                      
                    if(Math.floor(num) !== num){
                        console.error('總傷非整數');
                        return
                    }
                    if(num < 0){
                        console.error('總傷非負數');
                        return
                    }                    
                    step4CheckList.value[4].check = true
                    step4Result.data[4].check = true
                }
                if(idx === "5boss"){
                    step4CheckList.value[5].check = false
                    step4Result.data[5].check = false
                    if(step4Result.data[5].val === ''){
                        console.error('不得為空值');
                        return
                    }
                    num = Number(step4Result.data[5].val)
                    if(isNaN(num)){
                        console.error('非數字');
                        return
                    }                      
                    if(Math.floor(num) !== num){
                        console.error('輸入非整數');
                        return
                    }
                    if(num < 0){
                        console.error('B傷非負數');
                        return
                    }  
                    step4CheckList.value[5].check = true
                    step4Result.data[5].check = true
                }
                const checkStep4_hint5exp = (idx) =>{
                    let checkidx = idx
                    let num = 0
                    
                    if(checkidx === "5exp_a"){
                        step4CheckList.value[6].check = false
                        step4Result.data[16].check = false
                        if(step4Result.data[16].val === ''){
                            console.error('不得為空值');
                            return
                        }
                        num = Number(step4Result.data[16].val)
                        if(isNaN(num)){
                            console.error('非數字');
                            return
                        }                      
                        if(num > 40){
                            console.error('超過戰地格子數');
                            return
                        }
                        if(num < 0){
                            console.error('不得為負數');
                            return
                        }
                        if(Math.floor(num) !== num){
                            console.error('輸入非整數or非數字');
                            return
                        }
                        step4Result.data[16].check = true
                        step4CheckList.value[6].check = true
                    }
                    if(checkidx === "5exp_b"){
                        
                        step4CheckList.value[7].check = false
                        step4Result.data[17].check = false
                        if(step4Result.data[17].val === ''){
                            console.error('不得為空值');
                            return
                        }
                        num = Number(step4Result.data[17].val)
                        if(isNaN(num)){
                            console.error('非數字');
                            return
                        }                      
                        if(num > 20){
                            console.error('超過內潛能%數');
                            return
                        }
                        if(num < 0){
                            console.error('不得為負數');
                            return
                        }
                        if(Math.floor(num) !== num){
                            console.error('輸入非整數');
                            return
                        }
                        step4CheckList.value[7].check = true
                        step4Result.data[17].check = true
                    }
                    if(checkidx === "5exp_c"){
                        step4Result.data[18].check = false
                        step4CheckList.value[8].check = false   
                        if(step4Result.data[18].val === ''){
                            console.error('不得為空值');
                            return
                        }
                        num = Number(step4Result.data[18].val)
                        if(isNaN(num)){
                            console.error('非數字');
                            return
                        }                      
                        if(num > 15){
                            console.error('超過極限點數');
                            return
                        }
                        if(num < 0){
                            console.error('不得為負數');
                            return
                        }
                        if(Math.floor(num) !== num){
                            console.error('輸入非整數or非數字');
                            return
                        }
                        step4CheckList.value[8].check = true
                        step4Result.data[18].check = true
                       
                    }
                }                
                if(idx === "5exp_a" || idx === "5exp_b" || idx === "5exp_c"){
                    checkStep4_hint5exp(idx)
                    return
                }      
                if(idx === "6"){
                    step4CheckList.value[9].check = false
                    step4Result.data[8].check = false
                    if(step4Result.data[8].val === ''){
                        console.error('不得為空值');
                        return
                    }
                    num = Number(step4Result.data[8].val)
                    num.toFixed(2)
                    if(isNaN(num)){
                        console.error('非數字');
                        return
                    }                    
                    if(num < 0 ){
                        console.error('無視範圍:0~100');
                        return
                    }
                    if(num > 100 ){
                        console.error('無視範圍:0~100');
                        return
                    }
                    step4Result.data[8].check = true
                    step4CheckList.value[9].check = true
                }          
                if(idx === "7"){
                    step4CheckList.value[10].check = false
                    step4Result.data[6].check = false
                    if(step4Result.data[6].val === ''){
                        console.error('不得為空值');
                        return
                    }
                    num = Number(step4Result.data[6].val)
                    num.toFixed(2)
                    if(isNaN(num)){
                        console.error('非數字');
                        return
                    }
                    if(num < 0 ){
                        console.error('終傷不得為負');
                        return
                    }
                    step4Result.data[6].check = true
                    step4CheckList.value[10].check = true
                }          
                if(idx === "8"){
                    step4CheckList.value[11].check = false
                    step4Result.data[7].check = false
                    if(step4Result.data[7].val === ''){
                        console.error('不得為空值');
                        return
                    }
                    num = Number(step4Result.data[7].val)
                    num.toFixed(2)
                    if(isNaN(num)){
                        console.error('非數字');
                        return
                    }
                    if(num < 0 ){
                        console.error('爆傷不得為負');
                        return
                    }
                    step4Result.data[7].check = true
                    step4CheckList.value[11].check = true
                }          
                if(idx === "9"){
                    step4CheckList.value[12].check = false
                    step4Result.data[9].check = false
                    if(step4Result.data[9].val === ''){
                        console.error('不得為空值');
                        return
                    }
                    num = Number(step4Result.data[9].val)
                    if(isNaN(num)){
                        console.error('非數字');
                        return
                    }
                    if(num < 0 ){
                        console.error('非ARC符文範圍');
                        return
                    }
                    step4Result.data[9].check = true
                    step4CheckList.value[12].check = true
                }          
                if(idx === "16"){
                    step4CheckList.value[32].check = false
                    step4Result.data[19].check = false
                    if(step4Result.data[19].val === ''){
                        console.error('不得為空值');
                        return
                    }
                    num = Number(step4Result.data[19].val)
                    if(isNaN(num)){
                        console.error('非數字');
                        return
                    }
                    if(num < 0 ){
                        console.error('非ARC主屬範圍');
                        return
                    }
                    if(num > 14400 ){
                        console.error('非ARC主屬範圍');
                        return
                    }
                    step4Result.data[19].check = true
                    step4CheckList.value[32].check = true
                }          
                if(idx === "10"){
                    step4CheckList.value[13].check = false
                    step4Result.data[10].check = false
                    if(step4Result.data[10].val === ''){
                        console.error('不得為空值');
                        return
                    }
                    num = Number(step4Result.data[10].val)
                    if(isNaN(num)){
                        console.error('非數字');
                        return
                    }
                    if(num < 0 ){
                        console.error('非Aut符文範圍');
                        return
                    }
                    step4CheckList.value[13].check = true
                    step4Result.data[10].check = true
                }          
                if(idx === "17"){
                    step4CheckList.value[33].check = false
                    step4Result.data[20].check = false
                    if(step4Result.data[20].val === ''){
                        console.error('不得為空值');
                        return
                    }
                    num = Number(step4Result.data[20].val)
                    if(isNaN(num)){
                        console.error('非數字');
                        return
                    }
                    if(num < 0 ){
                        console.error('非Aut主屬範圍');
                        return
                    }
                    step4Result.data[20].check = true
                    step4CheckList.value[33].check = true
                } 
                const checkStep4_hint11 = (idx) =>{
                    let checkidx = idx
                    if(checkidx === "11a"){
                        step4Result.data[11].check = false
                        step4CheckList.value[14].check = false
                        if(step4Result.data[11].val[0].str === ''){
                            console.error('不得為空值');
                            return
                        }
                        num = Number(step4Result.data[11].val[0].str)
                        if(isNaN(num)){
                            console.error('非數字');
                            return
                        }                      
                        if(Math.floor(num) !== num){
                            console.error('輸入非整數');
                            return
                        }
                        if(num < 0){
                            console.error('主屬無負數');
                            return
                        }                    
                        step4Result.data[11].check = true
                        step4CheckList.value[14].check = true
                        return
                    }
                    if(checkidx === "11b"){
                        step4Result.data[11].check = false
                        step4CheckList.value[15].check = false
                        if(step4Result.data[11].val[1].dex === ''){
                            console.error('不得為空值');
                            return
                        }
                        num = Number(step4Result.data[11].val[1].dex)
                        if(isNaN(num)){
                            console.error('非數字');
                            return
                        }                      
                        if(Math.floor(num) !== num){
                            console.error('輸入非整數');
                            return
                        }
                        if(num < 0){
                            console.error('主屬無負數');
                            return
                        } 
                        step4Result.data[11].check = true
                        step4CheckList.value[15].check = true
                        return
                    }
                    if(checkidx === "11c"){
                        step4Result.data[11].check = false
                        step4CheckList.value[16].check = false
                        if(step4Result.data[11].val[2].int === ''){
                            console.error('不得為空值');
                            return
                        }
                        num = Number(step4Result.data[11].val[2].int)
                        if(isNaN(num)){
                            console.error('非數字');
                            return
                        }                      
                        if(Math.floor(num) !== num){
                            console.error('輸入非整數');
                            return
                        }
                        if(num < 0){
                            console.error('主屬無負數');
                            return
                        } 
                        step4Result.data[11].check = true
                        step4CheckList.value[16].check = true
                        return
                    }
                    if(checkidx === "11d"){
                        step4Result.data[11].check = false
                        step4CheckList.value[17].check = false
                        if(step4Result.data[11].val[3].luk === ''){
                            console.error('不得為空值');
                            return
                        }
                        num = Number(step4Result.data[11].val[3].luk)
                        if(isNaN(num)){
                            console.error('非數字');
                            return
                        }                      
                        if(Math.floor(num) !== num){
                            console.error('輸入非整數');
                            return
                        }
                        if(num < 0){
                            console.error('主屬無負數');
                            return
                        } 
                        step4Result.data[11].check = true
                        step4CheckList.value[17].check = true
                        return
                    }
                }                    
                if(idx === "11a" || idx === "11b" || idx === "11c" || idx === "11d"){
                    checkStep4_hint11(idx)
                    return
                }   
                const checkStep4_hint18 = (idx) =>{
                    let checkidx = idx
                    if(checkidx === "18a"){
                        step4Result.data[21].check = false
                        step4CheckList.value[34].check = false
                        if(step4Result.data[21].val[0].str === ''){
                            console.error('不得為空值');
                            return
                        }
                        num = Number(step4Result.data[21].val[0].str)
                        if(isNaN(num)){
                            console.error('非數字');
                            return
                        }                      
                        if(Math.floor(num) !== num){
                            console.error('輸入非整數');
                            return
                        }
                        if(num < 0){
                            console.error('主屬無負數');
                            return
                        }                    
                        step4Result.data[21].check = true
                        step4CheckList.value[34].check = true
                        return
                    }
                    if(checkidx === "18b"){
                        step4Result.data[21].check = false
                        step4CheckList.value[35].check = false
                        if(step4Result.data[21].val[1].dex === ''){
                            console.error('不得為空值');
                            return
                        }
                        num = Number(step4Result.data[21].val[1].dex)
                        if(isNaN(num)){
                            console.error('非數字');
                            return
                        }                      
                        if(Math.floor(num) !== num){
                            console.error('輸入非整數');
                            return
                        }
                        if(num < 0){
                            console.error('主屬無負數');
                            return
                        } 
                        step4Result.data[21].check = true
                        step4CheckList.value[35].check = true
                        return
                    }
                    if(checkidx === "18c"){
                        step4Result.data[21].check = false
                        step4CheckList.value[36].check = false
                        if(step4Result.data[21].val[2].int === ''){
                            console.error('不得為空值');
                            return
                        }
                        num = Number(step4Result.data[21].val[2].int)
                        if(isNaN(num)){
                            console.error('非數字');
                            return
                        }                      
                        if(Math.floor(num) !== num){
                            console.error('輸入非整數');
                            return
                        }
                        if(num < 0){
                            console.error('主屬無負數');
                            return
                        } 
                        step4Result.data[21].check = true
                        step4CheckList.value[36].check = true
                        return
                    }
                    if(checkidx === "18d"){
                        step4Result.data[21].check = false
                        step4CheckList.value[37].check = false
                        if(step4Result.data[21].val[3].luk === ''){
                            console.error('不得為空值');
                            return
                        }
                        num = Number(step4Result.data[21].val[3].luk)
                        if(isNaN(num)){
                            console.error('非數字');
                            return
                        }                      
                        if(Math.floor(num) !== num){
                            console.error('輸入非整數');
                            return
                        }
                        if(num < 0){
                            console.error('主屬無負數');
                            return
                        } 
                        step4Result.data[21].check = true
                        step4CheckList.value[37].check = true
                        return
                    }                    

                }
                if(idx === "18a" || idx === "18b" || idx === "18c" || idx === "18d"){
                    checkStep4_hint18(idx)
                    return
                }                  

                const checkStep4_hint12 = (idx) =>{
                    let checkidx = idx
                    if(checkidx === "12a"){
                        step4Result.data[12].check = false
                        step4CheckList.value[18].check = false
                        if(step4Result.data[12].val[0].str === ''){
                            console.error('不得為空值');
                            return
                        }
                        num = Number(step4Result.data[12].val[0].str)
                        if(isNaN(num)){
                            console.error('非數字');
                            return
                        }                      
                        if(Math.floor(num) !== num){
                            console.error('輸入非整數');
                            return
                        }
                        if(num > 15){
                            console.error('非極限點數範圍');
                            return
                        }
                        if(num < 0){
                            console.error('非極限點數範圍');
                            return
                        }
                        step4Result.data[12].check = true
                        step4CheckList.value[18].check = true
                        return
                    }
                    if(checkidx === "12b"){
                        step4Result.data[12].check = false
                        step4CheckList.value[19].check = false
                        if(step4Result.data[12].val[1].dex === ''){
                            console.error('不得為空值');
                            return
                        }
                        num = Number(step4Result.data[12].val[1].dex)
                        if(isNaN(num)){
                            console.error('非數字');
                            return
                        }                      
                        if(Math.floor(num) !== num){
                            console.error('輸入非整數');
                            return
                        }
                        if(num > 15){
                            console.error('非極限點數範圍');
                            return
                        }
                        if(num < 0){
                            console.error('非極限點數範圍');
                            return
                        }
                        step4Result.data[12].check = true
                        step4CheckList.value[19].check = true
                        return
                    }
                    if(checkidx === "12c"){
                        step4Result.data[12].check = false
                        step4CheckList.value[20].check = false
                        if(step4Result.data[12].val[2].int === ''){
                            console.error('不得為空值');
                            return
                        }
                        num = Number(step4Result.data[12].val[2].int)
                        if(isNaN(num)){
                            console.error('非數字');
                            return
                        }                      
                        if(Math.floor(num) !== num){
                            console.error('輸入非整數');
                            return
                        }
                        if(num > 15){
                            console.error('非極限點數範圍');
                            return
                        }
                        if(num < 0){
                            console.error('非極限點數範圍');
                            return
                        }
                        step4Result.data[12].check = true
                        step4CheckList.value[20].check = true
                        return
                    }
                    if(checkidx === "12d"){
                        step4Result.data[12].check = false
                        step4CheckList.value[21].check = false
                        if(step4Result.data[12].val[3].luk === ''){
                            console.error('不得為空值');
                            return
                        }
                        num = Number(step4Result.data[12].val[3].luk)
                        if(isNaN(num)){
                            console.error('非數字');
                            return
                        }                      
                        if(Math.floor(num) !== num){
                            console.error('輸入非整數');
                            return
                        }
                        if(num > 15){
                            console.error('非極限點數範圍');
                            return
                        }
                        if(num < 0){
                            console.error('非極限點數範圍');
                            return
                        }
                        step4Result.data[12].check = true
                        step4CheckList.value[21].check = true
                        return
                    }
                }                                  
                if(idx === "12a" || idx === "12b" || idx === "12c" || idx === "12d"){
                    checkStep4_hint12(idx)
                    return
                }   
                const checkStep4_hint13 = (idx)=>{
                    let checkidx = idx
                    if(checkidx === "13a"){
                        step4Result.data[13].check = false
                        step4CheckList.value[22].check = false
                        if(step4Result.data[13].val[0].str === ''){
                            console.error('不得為空值');
                            return
                        }
                        num = Number(step4Result.data[13].val[0].str)
                        if(isNaN(num)){
                            console.error('非數字');
                            return
                        }                      
                        if(Math.floor(num) !== num){
                            console.error('輸入非整數');
                            return
                        }
                        if(num < 0){
                            console.error('主屬無負數');
                            return
                        }                    
                        step4Result.data[13].check = true
                        step4CheckList.value[22].check = true
                        return
                    }
                    if(checkidx === "13b"){
                        step4Result.data[13].check = false
                        step4CheckList.value[23].check = false
                        if(step4Result.data[13].val[1].dex === ''){
                            console.error('不得為空值');
                            return
                        }
                        num = Number(step4Result.data[13].val[1].dex)
                        if(isNaN(num)){
                            console.error('非數字');
                            return
                        }                      
                        if(Math.floor(num) !== num){
                            console.error('輸入非整數');
                            return
                        }
                        if(num < 0){
                            console.error('主屬無負數');
                            return
                        } 
                        step4Result.data[13].check = true
                        step4CheckList.value[23].check = true
                        return
                    }
                    if(checkidx === "13c"){
                        step4Result.data[13].check = false
                        step4CheckList.value[24].check = false
                        if(step4Result.data[13].val[2].int === ''){
                            console.error('不得為空值');
                            return
                        }
                        num = Number(step4Result.data[13].val[2].int)
                        if(isNaN(num)){
                            console.error('非數字');
                            return
                        }                      
                        if(Math.floor(num) !== num){
                            console.error('輸入非整數');
                            return
                        }
                        if(num < 0){
                            console.error('主屬無負數');
                            return
                        } 
                        step4Result.data[13].check = true
                        step4CheckList.value[24].check = true
                        return
                    }
                    if(checkidx === "13d"){
                        step4Result.data[13].check = false
                        step4CheckList.value[25].check = false
                        if(step4Result.data[13].val[3].luk === ''){
                            console.error('不得為空值');
                            return
                        }
                        num = Number(step4Result.data[13].val[3].luk)
                        if(isNaN(num)){
                            console.error('非數字');
                            return
                        }                      
                        if(Math.floor(num) !== num){
                            console.error('輸入非整數');
                            return
                        }
                        if(num < 0){
                            console.error('主屬無負數');
                            return
                        } 
                        step4Result.data[13].check = true
                        step4CheckList.value[25].check = true
                        return
                    }                
                }
                if(idx === "13a" || idx === "13b" || idx === "13c" || idx === "13d"){
                    checkStep4_hint13(idx)
                    return
                } 
                const checkStep4_hint14 = (idx)=>{
                    let checkidx = idx
                    if(checkidx === "14a"){
                        step4Result.data[14].check = false
                        step4CheckList.value[26].check = false
                        if(step4Result.data[14].val[0]['漆黑'] === ''){
                            console.error('不得為空值');
                            return
                        }
                        num = Number(step4Result.data[14].val[0]['漆黑'])
                        if(isNaN(num)){
                            console.error('非數字');
                            return
                        }   
                        if(num > 9){
                            console.error('非漆黑set');
                            return
                        }                   
                        if(num < 0){
                            console.error('非漆黑set');
                            return
                        }                   
                        step4CheckList.value[26].check = true
                        step4Result.data[14].check = true
                    }
                    if(checkidx === "14b"){
                        step4Result.data[14].check = false
                        step4CheckList.value[27].check = false
                        if(step4Result.data[14].val[1]['頂培'] === ''){
                            console.error('不得為空值');
                            return
                        }
                        num = Number(step4Result.data[14].val[1]['頂培'])
                        if(isNaN(num)){
                            console.error('非數字');
                            return
                        }   
                        if(num > 4){
                            console.error('非頂培set');
                            return
                        }                   
                        if(num < 0){
                            console.error('非頂培set');
                            return
                        }                   
                        step4CheckList.value[27].check = true
                        step4Result.data[14].check = true
    
                    }
                    if(checkidx === "14c"){
                        step4Result.data[14].check = false
                        step4CheckList.value[28].check = false
                        if(step4Result.data[14].val[2]['黎明'] === ''){
                            console.error('不得為空值');
                            return
                        }
                        num = Number(step4Result.data[14].val[2]['黎明'])
                        if(isNaN(num)){
                            console.error('非數字');
                            return
                        }   
                        if(num > 4){
                            console.error('非頂培set');
                            return
                        }                   
                        if(num < 0){
                            console.error('非頂培set');
                            return
                        }                   
                        step4CheckList.value[28].check = true
                        step4Result.data[14].check = true
                    }    
                }                     
                if(idx === "14a" || idx === "14b" || idx === "14c"){
                    checkStep4_hint14(idx)
                    return
                }
                const checkStep4_hint15 = (idx)=>{
                    let checkidx = idx
                    if(checkidx === "15a"){
                        step4Result.data[15].check = false
                        step4CheckList.value[29].check = false
                        if(step4Result.data[15].val[0]['永恆'] === ''){
                            console.error('不得為空值');
                            return
                        }
                        num = Number(step4Result.data[15].val[0]['永恆'])
                        if(isNaN(num)){
                            console.error('非數字');
                            return
                        }   
                        if(num > 6 || num < 0){
                            console.error('非永恆set');
                            return
                        }                   
                        step4CheckList.value[29].check = true
                        step4Result.data[15].check = true
                        return
                    }
                    if(checkidx === "15b"){
                        step4CheckList.value[30].check = false
                        if(step4Result.data[15].val[1]['神秘'] === ''){
                            console.error('不得為空值');
                            return
                        }
                        num = Number(step4Result.data[15].val[1]['神秘'])
                        if(isNaN(num)){
                            console.error('非數字');
                            return
                        }   
                        if(num > 8 || num < 0){
                            console.error('非神秘set');
                            return
                        }                                  
                        step4CheckList.value[30].check = true
                        step4Result.data[15].check = true
                        return
                    }
                    if(checkidx === "15c"){
                        step4CheckList.value[31].check = false
                        if(step4Result.data[15].val[2]['航海'] === ''){
                            console.error('不得為空值');
                            return
                        }
                        num = Number(step4Result.data[15].val[2]['航海'])
                        if(isNaN(num)){
                            console.error('非數字');
                            return
                        }   
                        if(num > 8 || num < 0){
                            console.error('非航海set');
                            return
                        }                   
                        step4CheckList.value[31].check = true
                        step4Result.data[15].check = true
                        return
                    }
                }                   
                if(idx === "15a" || idx === "15b" || idx === "15c"){
                    checkStep4_hint15(idx)
                    return
                }
            }
            
            

            const RenderStep4Result = computed(()=>{
                StatsShow.value = BattleStatsShow.value
                StatsIsThree.value = false

                let idx0 = step4Result.data[0].val
                let idx1 = step4Result.data[1].val

                let idx2 = step4Result.data[2].val
                let idx3 = step4Result.data[3].val
                let idx22 = step4Result.data[22].val


                let idx4 = step4Result.data[4].val
                let idx5 = step4Result.data[5].val
                let idx6 = step4Result.data[6].val
                let idx7 = step4Result.data[7].val
                let idx8 = step4Result.data[8].val
                let idx9 = step4Result.data[9].val
                let idx10 = step4Result.data[10].val
                
              
                let idx11Str = step4Result.data[11].val[0].str
                
                let idx11Dex = step4Result.data[11].val[1].dex
                let idx11Int = step4Result.data[11].val[2].int
                let idx11Luk = step4Result.data[11].val[3].luk

                let idx21Str = step4Result.data[21].val[0].str
                let idx21Dex = step4Result.data[21].val[1].dex
                let idx21Int = step4Result.data[21].val[2].int
                let idx21Luk = step4Result.data[21].val[3].luk
               
                let idx12Str = step4Result.data[12].val[0].str
                let idx12Dex = step4Result.data[12].val[1].dex
                let idx12Int = step4Result.data[12].val[2].int
                let idx12Luk = step4Result.data[12].val[3].luk

                let idx13Str = step4Result.data[13].val[0].str
                let idx13Dex = step4Result.data[13].val[1].dex
                let idx13Int = step4Result.data[13].val[2].int
                let idx13Luk = step4Result.data[13].val[3].luk

                let idx14J1 = step4Result.data[14].val[0]['漆黑']
                let idx14J2 = step4Result.data[14].val[1]['頂培']
                let idx14J3 = step4Result.data[14].val[2]['黎明']

                let idx15A1 = step4Result.data[15].val[0]['永恆']
                let idx15A2 = step4Result.data[15].val[1]['神秘']
                let idx15A3 = step4Result.data[15].val[2]['航海']

                let idx16 = step4Result.data[16].val
                let idx17 = step4Result.data[17].val
                let idx18 = step4Result.data[18].val

                let idx19 = step4Result.data[19].val
                let idx20 = step4Result.data[20].val


                  // 把user選項以外的 目的、 職業的屬性 回傳值為0 
                  if(CreateAim.value === 'boss'){
                    step4Result.data[16].val = 0
                    step4Result.data[17].val = 0
                    step4Result.data[18].val = 0                    
                  }
                  if(CreateAim.value === 'exp'){
                    step4Result.data[5].val = 0
                  }
                  if(StatsShow.value === "strdex" || StatsShow.value === "dexstr"){
                    step4Result.data[11].val[2].int = 0
                    step4Result.data[11].val[3].luk = 0    
                    step4Result.data[21].val[2].int = 0
                    step4Result.data[21].val[3].luk = 0    
                    step4Result.data[12].val[2].int = 0
                    step4Result.data[12].val[3].luk = 0
                    step4Result.data[13].val[2].int = 0
                    step4Result.data[13].val[3].luk = 0                                                       
                  }
                  if(StatsShow.value === "intluk"){
                    step4Result.data[11].val[0].str = 0
                    step4Result.data[11].val[1].dex = 0
                    step4Result.data[21].val[0].str = 0
                    step4Result.data[21].val[1].dex = 0
                    step4Result.data[12].val[0].str = 0
                    step4Result.data[12].val[1].dex = 0
                    step4Result.data[13].val[0].str = 0
                    step4Result.data[13].val[1].dex = 0
                  }
                  if(StatsShow.value === "lukdex"){
                    step4Result.data[11].val[0].str = 0
                    step4Result.data[11].val[2].int = 0
                    step4Result.data[21].val[0].str = 0
                    step4Result.data[21].val[2].int = 0
                    step4Result.data[12].val[0].str = 0
                    step4Result.data[12].val[2].int = 0
                    step4Result.data[13].val[0].str = 0
                    step4Result.data[13].val[2].int = 0
                  }
                  if(StatsShow.value === "lukdexstr" || StatsShow.value === "zenon"){
                    step4Result.data[11].val[2].int = 0                  
                    step4Result.data[21].val[2].int = 0                  
                    step4Result.data[12].val[2].int = 0                  
                    step4Result.data[13].val[2].int = 0        
                    StatsIsThree.value = true          
                  }


                // console.log('開發檢查資料用:',step4Result.data);
                return 5207
            })
            const step4ResultReset = ()=>{
                step4Result.data[0].val = ''
                step4Result.data[1].val = ''
                step4Result.data[2].val = ''
                step4Result.data[3].val = ''
                step4Result.data[4].val = ''
                step4Result.data[5].val = ''
                step4Result.data[6].val = ''
                step4Result.data[7].val = ''
                step4Result.data[8].val = ''
                step4Result.data[9].val = ''
                step4Result.data[10].val = ''
                step4Result.data[11].val[0].str = ''
                step4Result.data[11].val[1].dex = ''
                step4Result.data[11].val[2].int = ''
                step4Result.data[11].val[3].luk = ''
                step4Result.data[12].val[0].str = ''
                step4Result.data[12].val[1].dex = ''
                step4Result.data[12].val[2].int = ''
                step4Result.data[12].val[3].luk = ''
                step4Result.data[13].val[0].str = ''
                step4Result.data[13].val[1].dex = ''
                step4Result.data[13].val[2].int = ''
                step4Result.data[13].val[3].luk = ''
                step4Result.data[14].val[0]['漆黑'] = ''
                step4Result.data[14].val[1]['頂培'] = ''
                step4Result.data[14].val[2]['黎明'] = ''
                step4Result.data[15].val[0]['永恆'] = ''
                step4Result.data[15].val[1]['神秘'] = ''
                step4Result.data[15].val[2]['航海'] = ''
                step4Result.data[16].val = ''
                step4Result.data[17].val = ''
                step4Result.data[18].val = ''
                step4Result.data[19].val = ''
                step4Result.data[20].val = ''
                step4Result.data[21].val[0].str = ''
                step4Result.data[21].val[1].dex = ''
                step4Result.data[21].val[2].int = ''
                step4Result.data[21].val[3].luk = ''
                step4Result.data[22].val = ''

                step4Result.data.forEach(item=>{
                    item.check = true
                })
                step4CheckList.value.forEach(item=>{
                    item.check = true
                })
            }

            // step5 check & save data

            
            
            // 最後用到的 data
            // FinJobIs、 CreateAim 、 DiffStatsWay、 BattleStatsStr...  、 step4Result 、 
            
            const FinCreatedata = ref({data:[
                {name:"職業",idx: 0 , key:"Job" , is : ""},
                {name:"武器係數",idx: 1 , key:"Weapon_ref" , is : 0},
                {name:"等級",idx: 2 , key:"Level" , is : 0},
                {name:"總攻擊力",idx: 3 , key:"Atk" , is : 0},
                {name:"%攻擊力",idx: 4 , key:"Per_atk" , is : 0},
                {name:"%總傷害",idx: 5 , key:"Per_damage" , is : 0},
                {name:"%Boss傷害",idx: 6 , key:"Per_boss" , is : 0},
                {name:"%無視防禦",idx: 7 , key:"Per_ignore" , is : 0},
                {name:"被動%終傷",idx: 8 , key:"Passive_per_findamage" , is : 0},
                {name:"%爆擊傷害",idx: 9 , key:"Per_critical" , is : 0},
                {name:"ARC符數",idx: 10 , key:"Arc" , is : 0},
                {name:"AUT符數",idx: 11 , key:"Aut" , is : 0},
                {name:"無吃%力量值",idx: 12 , key:"Unique_str" , is : 0},
                {name:"無吃%敏捷值",idx: 13 , key:"Unique_dex" , is : 0},
                {name:"無吃%智力值",idx: 14 , key:"Unique_int" , is : 0},
                {name:"無吃%幸運值",idx: 15 , key:"Unique_luk" , is : 0},
                {name:"有吃%力量值",idx: 16 , key:"Eat_str" , is : 0},
                {name:"有吃%敏捷值",idx: 17 , key:"Eat_dex" , is : 0},
                {name:"有吃%智力值",idx: 18 , key:"Eat_int" , is : 0},
                {name:"有吃%幸運值",idx: 19 , key:"Eat_luk" , is : 0},
                {name:"%STR",idx: 20 , key:"Per_str" , is : 0},
                {name:"%DEX",idx: 21 , key:"Per_dex" , is : 0},
                {name:"%INT",idx: 22 , key:"Per_int" , is : 0},
                {name:"%LUK",idx: 23 , key:"Per_luk" , is : 0},
                {name:"漆黑set數",idx: 24 , key:"Black_set" , is : 0},
                {name:"頂培set數",idx: 25 , key:"Pelord_set" , is : 0},
                {name:"黎明set數",idx: 26 , key:"Dawn_set" , is : 0},
                {name:"永恆set數",idx: 27 , key:"Eternal_set" , is : 0},
                {name:"神秘set數",idx: 28 , key:"Mystical_set" , is : 0},
                {name:"航海set數",idx: 29 , key:"Nautical_set" , is : 0},
                {name:"%一般怪物傷害",idx: 30 , key:"Per_normal_damage" , is : 0},
                {name:"顯示的屬性",idx: 31 , key:"StatsShow" , is : ""},
                {name:"ARC屬性",idx: 32 , key:"Arc_Stats" , is : 0},
                {name:"AUT屬性",idx: 33 , key:"Aut_Stats" , is : 0},
                {name:"吃%攻擊力值",idx: 34 , key:"Unique_atk" , is : 0},
                {name:"建立用途",idx: 35 , key:"file_aim" , is : ""},
                {name:"屬性無視",idx: 36 , key:"Attr_ignore" , is : 5},
            ]})

            // 吃%主屬 、裝備%主屬的演算
            const strCalculate = (key) =>{
                if(StatsShow.value === "intluk") return 0
                if(StatsShow.value === "lukdex") return 0
                let start_stats = step4Result.data[11].val[0].str
                let use_potion_stats = step4Result.data[21].val[0].str
                let unique_stats = FinCreatedata.value.data[12].is
                let eat_val = 0
                let per_val = 0
                per_val = per_stats_Fn(start_stats,use_potion_stats,DiffStatsWay.value)    
                eat_val = eat_stats_Fn(start_stats,unique_stats,per_val)        
                if(key === 'Eat_str') return eat_val
                if(key === 'Per_str') return per_val
            }   
            const dexCalculate = (key) =>{
                if(StatsShow.value === "intluk") return 0
                let start_stats = step4Result.data[11].val[1].dex
                let use_potion_stats = step4Result.data[21].val[1].dex
                let unique_stats = FinCreatedata.value.data[13].is
                let eat_val = 0
                let per_val = 0
                per_val = per_stats_Fn(start_stats,use_potion_stats,DiffStatsWay.value)    
                eat_val = eat_stats_Fn(start_stats,unique_stats,per_val)                    
                if(key === 'Eat_dex') return eat_val
                if(key === 'Per_dex') return per_val
            }
            const intCalculate = (key) =>{
                if(StatsShow.value === "strdex") return 0
                if(StatsShow.value === "dexstr") return 0
                if(StatsShow.value === "zenon") return 0
                if(StatsShow.value === "lukdex") return 0
                if(StatsShow.value === "lukdexstr") return 0
                let start_stats = step4Result.data[11].val[2].int
                let use_potion_stats = step4Result.data[21].val[2].int
                let unique_stats = FinCreatedata.value.data[14].is
                let eat_val = 0
                let per_val = 0
                per_val = per_stats_Fn(start_stats,use_potion_stats,DiffStatsWay.value)    
                eat_val = eat_stats_Fn(start_stats,unique_stats,per_val)        
                if(key === 'Eat_int') return eat_val
                if(key === 'Per_int') return per_val
            }
            const lukCalculate = (key) =>{
                if(StatsShow.value === "strdex") return 0
                if(StatsShow.value === "dexstr") return 0
                let start_stats = step4Result.data[11].val[3].luk
                let use_potion_stats = step4Result.data[21].val[3].luk
                let unique_stats = FinCreatedata.value.data[15].is
                let eat_val = 0
                let per_val = 0
                per_val = per_stats_Fn(start_stats,use_potion_stats,DiffStatsWay.value)    
                eat_val = eat_stats_Fn(start_stats,unique_stats,per_val)                 
                if(key === 'Eat_luk') return eat_val
                if(key === 'Per_luk') return per_val
            }
        // 使用秘藥增幅 公式  (僅限於使用 "+屬性"  ， 無法使用"+%屬性" )
            const per_stats_Fn= (start,usepotion,diff) =>{
                // per_val
                //  裝備%數 = (主屬性+藥水增幅後 - 主屬性前 /  藥水增幅 ) -1 
                return  roundDown(((usepotion - start ) / diff) -1, 2)
            }
            const eat_stats_Fn= (start,unique,perStats) =>{
                // eat_val
                //  吃裝備%數屬性值 = [(主屬性前 - 無吃裝備%屬性值) / ( 1 + 裝備%數 )] 
                return  roundDown((start - unique) / ( 1 + perStats ),2)
            }

            const handFinCreatedata = () =>{
                // 職業
                FinCreatedata.value.data[0].is = FinJobIs.value[0].key
                // 武器係數
                FinCreatedata.value.data[1].is = FinJobIs.value[0].weaponRef
                // 等級
                FinCreatedata.value.data[2].is = step4Result.data[0].val
                // 總攻擊力
                FinCreatedata.value.data[3].is = step4Result.data[1].val
                // %攻擊力 = 裝備%物 + 萌獸%物 + 被動職業技能%物
                FinCreatedata.value.data[4].is = roundDown( (step4Result.data[2].val + step4Result.data[3].val + step4Result.data[22].val)  , 2)
                // 吃%攻擊值
                FinCreatedata.value.data[34].is = roundDown(FinCreatedata.value.data[3].is / (1 + FinCreatedata.value.data[4].is *0.01), 2)
                // 總傷害
                FinCreatedata.value.data[5].is = step4Result.data[4].val
                // B傷
                FinCreatedata.value.data[6].is = step4Result.data[5].val
                // 無視
                FinCreatedata.value.data[7].is = step4Result.data[8].val
                // 終傷
                FinCreatedata.value.data[8].is = step4Result.data[6].val
                // 爆傷
                FinCreatedata.value.data[9].is = step4Result.data[7].val
                // arc 、 arc主屬
                FinCreatedata.value.data[10].is = step4Result.data[9].val
                FinCreatedata.value.data[32].is = step4Result.data[19].val
                // aut 、 aut主屬
                FinCreatedata.value.data[11].is = step4Result.data[10].val
                FinCreatedata.value.data[33].is = step4Result.data[20].val
                // 非吃裝備%主屬 = 極限 + 內潛能 + 戰地  
                FinCreatedata.value.data[12].is = 30 * step4Result.data[12].val[0].str + step4Result.data[13].val[0].str + BattleStatsStr.value
                FinCreatedata.value.data[13].is = 30 * step4Result.data[12].val[1].dex + step4Result.data[13].val[1].dex + BattleStatsDex.value
                FinCreatedata.value.data[14].is = 30 * step4Result.data[12].val[2].int + step4Result.data[13].val[2].int + BattleStatsInt.value
                FinCreatedata.value.data[15].is = 30 * step4Result.data[12].val[3].luk + step4Result.data[13].val[3].luk + BattleStatsLuk.value
                // 非吃裝備%主屬 += arc主屬 + aut主屬
                if(StatsShow.value === 'strdex'){
                    FinCreatedata.value.data[12].is += step4Result.data[19].val + step4Result.data[20].val
                }
                if(StatsShow.value === 'dexstr'){
                    FinCreatedata.value.data[13].is += step4Result.data[19].val + step4Result.data[20].val
                }
                if(StatsShow.value === 'intluk'){
                    FinCreatedata.value.data[14].is += step4Result.data[19].val + step4Result.data[20].val
                }
                if(StatsShow.value === 'lukdex' || StatsShow.value === 'lukdexstr'){
                    FinCreatedata.value.data[15].is += step4Result.data[19].val + step4Result.data[20].val
                }
                if(StatsShow.value === 'zenon'){
                    FinCreatedata.value.data[12].is += step4Result.data[19].val + step4Result.data[20].val
                    FinCreatedata.value.data[13].is += step4Result.data[19].val + step4Result.data[20].val
                    FinCreatedata.value.data[15].is += step4Result.data[19].val + step4Result.data[20].val
                }

                FinCreatedata.value.data[16].is = strCalculate("Eat_str")
                FinCreatedata.value.data[17].is = dexCalculate("Eat_dex")
                FinCreatedata.value.data[18].is = intCalculate("Eat_int")
                FinCreatedata.value.data[19].is = lukCalculate("Eat_luk")
                FinCreatedata.value.data[20].is = strCalculate("Per_str")
                FinCreatedata.value.data[21].is = dexCalculate("Per_dex")
                FinCreatedata.value.data[22].is = intCalculate("Per_int")
                FinCreatedata.value.data[23].is = lukCalculate("Per_luk")

                FinCreatedata.value.data[24].is = step4Result.data[14].val[0]['漆黑']
                FinCreatedata.value.data[25].is = step4Result.data[14].val[1]['頂培']
                FinCreatedata.value.data[26].is = step4Result.data[14].val[2]['黎明']
                FinCreatedata.value.data[27].is = step4Result.data[15].val[0]['永恆']
                FinCreatedata.value.data[28].is = step4Result.data[15].val[1]['神秘']
                FinCreatedata.value.data[29].is = step4Result.data[15].val[2]['航海']
              

                // 一般怪物增傷 = 戰地 + 內潛能 + 極限  + (金字塔稱號)
                FinCreatedata.value.data[30].is = step4Result.data[16].val + step4Result.data[17].val + cal_extremePt(step4Result.data[18].val)
                FinCreatedata.value.data[31].is = StatsShow.value

                // 建立用途
                FinCreatedata.value.data[35].is = CreateAim.value
                console.log("最後建立好的資料:",FinCreatedata.value.data);

                

            }


            const cal_extremePt = (pt)=>{
                if(pt <= 5){
                    return pt * 3
                }
                if(pt > 5){
                    return pt * 3 + (pt - 5)
                }
            }
         

            // step control
            const nowStep = ref(1)
            const stepPrevBool = ref(false)
            const stepNextBool = ref(true)
            const stepSaveBool = ref(false)

            const handStep2 = ()=>{
                if(DiffStatsWay.value !== '' && nowStep.value >= 3) return
                if(nowStep.value === 2){
                    DiffStatsWay.value = ''
                }
                if(DiffStatsWay.value === '' && nowStep.value === 3){
                    console.warn('沒選擇秘藥')
                    checkStep2.value = true
                    nowStep.value = 2 
                    return
                }
            }
            const handStep3 = () =>{
                if(nowStep.value === 5) return
                // 初始化step4的值
                step4ResultReset()
            }
            
            const handStep4 = ()=>{
                if(nowStep.value !== 5) return
                let i  = 0

                step4CheckList.value.forEach(item=>{
                    handCheckList(item.hint)
                    if(!item.check) i++;
                })
                if(i !== 0){
                    nowStep.value = 4
                    return
                }
                handFinCreatedata()
                saveDataToTxtFile(FinCreatedata.value)
                // 引導至 模擬器
                calculateUrl.value = true
            }
            const calculateUrl = ref(false)
            const saveDataToTxtFile = (obj) =>{
                 const formattedData = obj.data.map(item => `${item.key}: ${item.is}`).join('\n');
                 const blob = new Blob([formattedData], { type: 'text/plain' });
                 const a = document.createElement('a');
                 a.href = URL.createObjectURL(blob);
                 a.download = 'mapledata.txt'; 
                 a.click();
                 URL.revokeObjectURL(a.href);                    
            }

            const stepReset = () =>{
                nowStep.value = 1
                stepPrevBool.value = false
                stepNextBool.value = true
                stepSaveBool.value = false
                checkStep2.value = false
                calculateUrl.value = false
                
                // step3 恢復戰地預設值
                BattleStatsReset()
                // step4 初始化
                step4ResultReset()

            }

            const handNowStep = (el) =>{
                if(nowStep.value < 1  || nowStep.value > 5) return

                let key = el.currentTarget.innerText
                if(key === "back"){
                    stepReset()
                    return
                }
                if(key === "next"){
                    nowStep.value++
                }
                if(key === "save"){
                    nowStep.value = 5
                }
                handStep2()
                handStep3()
                handStep4()

                stepPrevBool.value = true
                stepNextBool.value = true
                stepSaveBool.value = false

                if(nowStep.value === 1 ){
                    stepPrevBool.value = false
                }
                if(nowStep.value === 4 ){
                    stepNextBool.value = false
                    stepSaveBool.value = true
                }
            }
            




            onMounted(()=>{
                const mapleJobApi = ()=>{
                    return axios.get("./api/mapleJob.json")
                }
                const battleFieldApi = () =>{
                    return axios.get("./api/battleFieldStats.json")
                }
                axios.all([mapleJobApi(),battleFieldApi()]).then(res=>{
                    jobData.data = res[0].data.data;
                    battleFieldData.data = res[1].data.data;
                }
                )
                .catch(err=>{
                    console.error("沒接到api");
                })
              
            })
            

          
            return{
                // 職業篩選器
                fiveJobIs,
                fiveJobList,
                fiveJobListBool,
                handfiveJobList,
                // 職業類別篩選器
                jobCategoryBool,
                jobCategoryIs,
                jobCategoryList,
                handjobCategory,
                jobRender,
                // step1 選擇的職業
                FinJobIs,
                FinJobUrl,
                CreateAim,
                handCreateAim,
                handFinJobIs,
                // step2 測試主屬方法 
                checkStep2,
                // step3 戰地主屬計算
                BattleListRender,
                handBattleStats,
                handPotionWay,
                mainBattleStats,
                subBattleStats,     
                BattleStatsStr,
                BattleStatsDex,
                BattleStatsInt,
                BattleStatsLuk,    
                ZenonBattleStats,   
                BattleStatsReset,       
                BattleStatsShow,
                DiffStatsWay,
                // step4 其他資料輸入
                RenderStep4Result,
                step4Result,
                StatsIsThree,
                StatsShow,
                hintImg,
                HintImgRender,
                step4CheckList,
                step4Check_Blur,
                // step5  create check 

                // save data to txt

                // step control
                nowStep,
                stepPrevBool,
                stepNextBool,
                stepSaveBool,
                handNowStep,       
                calculateUrl,                     
               
            }   
        },

    }

    createApp(App).mount("#app")

}

