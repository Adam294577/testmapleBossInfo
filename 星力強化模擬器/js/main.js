
window.onload = () =>{

    const {createApp, ref, reactive, computed, watch, onMounted , onUpdated} = Vue
    const App = {

        setup(){
            // 楓幣台幣 input限制
            const NTDtransMaplecoin = ref("")
            const MaplecointransPoint = ref("")
            const equipcost = ref("")
            const starcost = ref("")
            const InputNumOnly = (el)=>{
                el.target.value = el.target.value.replace(/[^0-9]/g, "");
            }
            // 星力上升 下降 破壞的機率
            const starRate = reactive({data:[
                {idx:12, failed: 0.6 ,success: 0.4 ,destroyed: 0, drop:false },
                {idx:13, failed: 0.65 ,success: 0.35 ,destroyed: 0, drop:false },
                {idx:14, failed: 0.7 ,success: 0.3 ,destroyed: 0, drop:false },
                {idx:15, failed: 0.595 ,success: 0.3 ,destroyed: 0.105, drop:false },
                {idx:16, failed: 0.56 ,success: 0.3 ,destroyed: 0.14, drop:true },
                {idx:17, failed: 0.49 ,success: 0.3 ,destroyed: 0.21, drop:true },
                {idx:18, failed: 0.42 ,success: 0.3 ,destroyed: 0.28, drop:true },
                {idx:19, failed: 0.42 ,success: 0.3 ,destroyed: 0.28, drop:true },
                {idx:20, failed: 0.35 ,success: 0.3 ,destroyed: 0.35, drop:false },
                {idx:21, failed: 0.35 ,success: 0.3 ,destroyed: 0.35, drop:true },
                {idx:22, failed: 0.388 ,success: 0.03 ,destroyed: 0.582, drop:true },
                {idx:23, failed: 0.392 ,success: 0.02 ,destroyed: 0.588, drop:true },
                {idx:24, failed: 0.396 ,success: 0.01 ,destroyed: 0.594, drop:true },
            ]})            

            // 裝備、策略選擇
            const equipSelected = ref("請選擇")
            const strategySelected = ref({key:"請選擇",idx:-1})
            const strategyListBool = ref(false)
            // 偷20裝備清單
            const equipList = reactive({data:[
                {key:"請選擇",act: true},
                {key:"必防爆的裝備",act: false},
                {key:"神秘武器類",act: false},
                {key:"神秘防具類",act: false},
                {key:"航海防具類",act: false},
                {key:"波賽頓飾品",act: false},
                {key:"強力魔性戒指",act: false},
                {key:"魔性戒指",act: false},
                {key:"頂培系列",act: false},
              
            ]})
            const strategyData = reactive({data:[
                {use: [20,22,23,24,25], idx:-1, key:"請選擇",act: true},
                {use: [20], idx:0, key:"每炸裝，皆12星開始點楓幣、楓點", noDestroyed: false,  FailedStart: 12, costPoint: 9, act: true},
                {use: [20], idx:1, key:"每炸裝，皆先丟14星捲，隨後都丟9楓點", noDestroyed: false,  FailedStart: 14, costPoint: 9, act:false},
                {use: [20], idx:2, key:"每炸裝，皆先丟15星捲，隨後都丟9楓點", noDestroyed: false,  FailedStart: 15, costPoint: 9, act:false},
                {use: [20], idx:3, key:"每炸裝，皆先丟16星捲，隨後都丟9楓點", noDestroyed: false,  FailedStart: 16, costPoint: 9, act:false},
                {use: [20], idx:4, key:"每炸裝，皆先丟17星捲，隨後都丟9楓點", noDestroyed: false,  FailedStart: 17, costPoint: 9, act:false},
                {use: [20], idx:5, key:"每炸裝，皆先丟18星捲，隨後都丟9楓點", noDestroyed: false,  FailedStart: 18, costPoint: 9, act:false},
                {use: [20,22,23,24,25], idx:6, key:"皆使用50楓點去執行", noDestroyed: true, costPoint: 50, act:false},
                {use: [23,24,25], idx:7, key:"皆使用追加/突破1星 30%去執行", noDestroyed: true, act:false},
                {use: [23,24,25], idx:8, key:"皆使用追加/突破1星 50%去執行", noDestroyed: true, act:false},
            ]})            
            const equipListBool = ref(false)
            const handequipSelected = (el)=>{
                console.log(el.currentTarget.innerText);
                if(!equipListBool.value){
                    equipListBool.value = true;
                    return;
                }
                
                equipList.data = equipList.data.map(item=>{
                   if(el.currentTarget.innerText === item.key){
                    equipSelected.value = item.key;
                    if(equipSelected.value === "必防爆的裝備"){
                        strategySelected.value.key = "皆使用50楓點去執行";
                        strategySelected.value.idx = 6;
                        equipcost.value = 0;
                    }
                    return {key:item.key,act: true}
                   }else{
                    return {key:item.key,act: false}
                   }
                   
                })
                equipListBool.value = false
                
            }
            const strategyRender = computed(()=>{
                let Filt = [];
                if(equipSelected.value === "必防爆的裝備"){
                    Filt.push({key:"皆使用50楓點去執行" , act: true})
                }else{
                    Filt = strategyData.data.filter(item=>{
                        if(item.use.indexOf(starAim.value) !== -1){
                            return {key:item.key , act: item.act}
                        }
                    })

                }
                return Filt

            })
            // 目標星力
            const starAim = ref(20)
            const starBegin = ref(12)
            handstarAim = (el = null)=>{

                if(el === null){
                    return
                }                
                starAim.value = Number(el.currentTarget.dataset.aim);
                console.log(starAim.value);
                if(starAim.value === 20){
                    starBegin.value = 12;
                    return
                }
                if(starAim.value === 22){
                    starBegin.value = 20;
                    return
                }else{
                    starBegin.value = 22;
                }                

            }
            // 衝22以上的裝備數
            const equipItem = ref(1)

            
            const handstarBegin = (el = null) =>{
                if(el === null){
                    return
                }
                console.log(el.currentTarget.dataset.begin);
                starBegin.value = Number(el.currentTarget.dataset.begin);
            }            
            // activtyStarBtn
            const activtyStarBtn = ref(true)
            const handstrategy = (el)=>{
                console.log(el.currentTarget.innerText);
                console.log(el.currentTarget.innerText );
                if(el.currentTarget.innerText === '皆使用50楓點去執行'){
                    return;
                }
                if(!strategyListBool.value){
                    strategyListBool.value = true;
                    return;
                }
                
                strategyRender.value = strategyRender.value.map(item=>{
                   if(el.currentTarget.innerText === item.key){
                    strategySelected.value.key = item.key;
                    strategySelected.value.idx = item.idx
                    return {key:item.key,act: true}
                   }else{
                    return {key:item.key,act: false}
                   }
                   
                })
                strategyListBool.value = false
            }





            const checkList = () =>{

            }
  
            const ansArrRender = ref([
                // {idx:0, total:0 , sucT:0}
            ])
            // 演算區
            let ClickTime = 0
            let goalsucT = 0
            const handStarResult = ()=>{
                ClickTime++;
                // check表單
                checkList()
                 //    星力運算
                let dice = 0;
                let sucT = 0;
                let failedT = 0;
                let desT = 0;
                let nowStar = starBegin.value
                let aim = starAim.value
                let strategy = strategyData.data.filter(item=>{
                    return item.idx === strategySelected.value.idx
                }) 
                console.log(strategy); 
                // 若連續失敗2次 下次一定成功 
                let feverTime = 0   
           
                let i = 0
                while (nowStar !== aim) {
                    i++;
                    console.log("執行第",i,"次");
                    if(i === 30000){
                        break;
                    }

                    // 每次執行時 套用的機率
                    let rate = starRate.data.filter(item=>{
                        return item.idx === nowStar;
                    })
                    // 決定是否套用防爆效果演算
                    if(strategy[0].noDestroyed){
                        rate[0].destroyed = 0
                        console.log("套用防爆");
                    }
                    // 決定是否套用活動100%效果
                    if(activtyStarBtn){

                    }
                                   

                   
                dice = Number((Math.random() * 1).toFixed(3))
                    // console.log("dice",dice);
                    // console.log("成功/破壞",rate[0].success , Number(rate[0].success+rate[0].destroyed).toFixed(2));

                // activtysuccess
                if(activtyStarBtn & nowStar===15){
                    console.log("套用活動100%");
                    feverTime = 0
                    sucT++;
                    nowStar++;
                    console.log("目前星力",nowStar);
                    continue;
                }

                // fever success
                if(feverTime ==2){
                    console.log("套用fever");
                    feverTime = 0
                    sucT++;
                    nowStar++;
                    console.log("目前星力",nowStar);
                    continue;
                }
                // success
                if(dice <= rate[0].success){
                    sucT++;
                    nowStar++;
                    feverTime = 0
                    console.log("up");
                    console.log("目前星力",nowStar);
                    
                    continue;
                }
                // destroyed
                if(dice <= Number(rate[0].success+rate[0].destroyed).toFixed(2)){
                    desT++;
                    nowStar = strategy[0].FailedStart;
                    console.log("des");
                    feverTime = 0
                    console.log("目前星力",nowStar);
                    continue;
                }
                // failed
                if(rate[0].drop){
                    failedT++;
                    feverTime++;
                    nowStar--;
                    console.log("down");
                    console.log("目前星力",nowStar);
                }else{
                    failedT++;
                    feverTime++;
                    console.log("keep");
                    console.log("目前星力",nowStar);

                }                      
     
            
                }
            //    test
                if(nowStar === aim){
                    goalsucT++;
                }

                // 金錢花費運算
                const costPoint = strategy[0].costPoint
                const costPointTatal = costPoint * i
                console.log("共花費",costPointTatal,"楓點");
                ansArrRender.value.push({idx: ClickTime, total: costPointTatal, sucT: goalsucT})

 
                
            }




            // result
            const AnsMaplecoin = ref("");
            const AnsPoint = ref("");
            const AnsNTD = ref("");

            onMounted(()=>{
                handstarAim()
                handstarBegin()
            })
            return{
                // 楓幣台幣 input限制
                NTDtransMaplecoin,
                MaplecointransPoint,
                equipcost,
                starcost,
                InputNumOnly,
                // 裝備選擇
                equipSelected,
                equipList,
                handequipSelected,
                equipListBool,
                // strategyData
                strategyListBool,
                strategySelected, 
                strategyRender,
                handstrategy,
                // 目標星力
                starAim,
                handstarAim,
                starBegin,
                handstarBegin,                
                // 衝22以上的裝備數
                equipItem,    

                handStarResult,
                // activtyStarBtn
                activtyStarBtn,
                // test
                ansArrRender,
            }   
        },

    }
    createApp(App).mount("#app")     

}


