
window.onload = () =>{
    const {createApp, ref, reactive, computed, watch, onMounted , onUpdated} = Vue
    const App = {
        
        setup(){
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
            const roundTo = function( num, decimal ) { return Math.round( ( num + Number.EPSILON ) * Math.pow( 10, decimal ) ) / Math.pow( 10, decimal ); }              
              
            
            const guildBool = ref(false)
            const RegionIs = ref({key:'',Txt:'Buff調整'})
            const MainCalcBox = ref(true)
            const RegionBool = ref(false)
            const RegionList = reactive({data:[
                {key:'buff' , Txt: 'Buff調整'},
                {key:'compare' , Txt: '等值計算'},
                {key:'equip' , Txt: '裝備更換'},
                {key:'hyper' , Txt: '極限屬性優化'},
            ]})


            const handRegion = (el) =>{
                let key = el.currentTarget.dataset.menu
                if(key === 'open'){
                    RegionBool.value = !RegionBool.value
                    return
                }
                RegionList.data.forEach(item=>{
                    if(item.key === key){
                        RegionIs.value.key = item.key
                        RegionIs.value.Txt = item.Txt                        
                    }
                })
                if(!guildBool.value){
                    RegionIs.value.key = ''
                }
                RegionBool.value = false

            }


            const fileInputLeft = ref(null)
            const fileInputRight = ref(null)

            // 使用者載入資料點 
            const Createdata = ref({data:[
                {name:"職業",idx: 0 , key:"Job" , is :0},
                {name:"武器係數",idx: 1 , key:"Weapon_ref" , is :0},
                {name:"等級",idx: 2 , key:"Level" , is :0},
                {name:"總攻擊力",idx: 3 , key:"Atk" , is :0},
                {name:"%攻擊力",idx: 4 , key:"Per_atk" , is :0},
                {name:"%總傷害",idx: 5 , key:"Per_damage" , is :0},
                {name:"%Boss傷害",idx: 6 , key:"Per_boss" , is :0},
                {name:"%無視防禦",idx: 7 , key:"Per_ignore" , is :0},
                {name:"被動終傷",idx: 8 , key:"Passive_per_findamage" , is :0},
                {name:"%爆擊傷害",idx: 9 , key:"Per_critical" , is :0},
                {name:"ARC符數",idx: 10 , key:"Arc" , is :0},
                {name:"AUT符數",idx: 11 , key:"Aut" , is :0},
                {name:"無吃%力量值",idx: 12 , key:"Unique_str" , is :0},
                {name:"無吃%敏捷值",idx: 13 , key:"Unique_dex" , is :0},
                {name:"無吃%智力值",idx: 14 , key:"Unique_int" , is :0},
                {name:"無吃%幸運值",idx: 15 , key:"Unique_luk" , is :0},
                {name:"有吃%力量值",idx: 16 , key:"Eat_str" , is :0},
                {name:"有吃%敏捷值",idx: 17 , key:"Eat_dex" , is :0},
                {name:"有吃%智力值",idx: 18 , key:"Eat_int" , is :0},
                {name:"有吃%幸運值",idx: 19 , key:"Eat_luk" , is :0},
                {name:"%STR",idx: 20 , key:"Per_str" , is :0},
                {name:"%DEX",idx: 21 , key:"Per_dex" , is :0},
                {name:"%INT",idx: 22 , key:"Per_int" , is :0},
                {name:"%LUK",idx: 23 , key:"Per_luk" , is :0},
                {name:"漆黑set數",idx: 24 , key:"Black_set" , is :0},
                {name:"頂培set數",idx: 25 , key:"Pelord_set" , is :0},
                {name:"黎明set數",idx: 26 , key:"Dawn_set" , is :0},
                {name:"永恆set數",idx: 27 , key:"Eternal_set" , is :0},
                {name:"神秘set數",idx: 28 , key:"Mystical_set" , is :0},
                {name:"航海set數",idx: 29 , key:"Nautical_set" , is :0},
                {name:"%一般怪物傷害",idx: 30 , key:"Per_normal_damage" , is :0},
                {name:"顯示的屬性",idx: 31 , key:"StatsShow" , is : 0},
                {name:"ARC屬性",idx: 32 , key:"Arc_Stats" , is :0},
                {name:"AUT屬性",idx: 33 , key:"Aut_Stats" , is :0},
                {name:"吃%攻擊力值",idx: 34 , key:"Unique_atk" , is :0},
                {name:"建立用途",idx: 35 , key:"file_aim" , is :0},
                {name:"屬性無視",idx: 36 , key:"Attr_ignore" , is :0},
            ]})

            // 使用者操作buff變化點
            const BuffData = ref({data:[
                {name:"%STR",idx: 0 , key:"Per_str" , is : 0},
                {name:"%DEX",idx: 1 , key:"Per_dex" , is : 0},
                {name:"%INT",idx: 2 , key:"Per_int" , is : 0},
                {name:"%LUK",idx: 3 , key:"Per_luk" , is : 0},                    
                {name:"力量總增值",idx: 4 , key:"Eat_str" , is :0},
                {name:"敏捷總增值",idx: 5 , key:"Eat_dex" , is :0},
                {name:"智力總增值",idx: 6 , key:"Eat_int" , is :0},
                {name:"幸運總增值",idx: 7 , key:"Eat_luk" , is :0},                   
                {name:"吃%攻擊力值",idx: 8 , key:"Unique_atk" , is :0},
                {name:"%攻擊力",idx: 9 , key:"Per_atk" , is : 0},
                {name:"%無視防禦",idx: 10 , key:"Per_ignore" , is : 0},
                {name:"%總傷害",idx: 11 , key:"Per_damage" , is : 0},
                {name:"%Boss傷害",idx: 12 , key:"Per_boss" , is : 0},
                {name:"%一般怪物傷害",idx: 13 , key:"Per_normal_damage" , is : 0},
                {name:"%爆擊傷害",idx: 14 , key:"Per_critical" , is : 0},
                {name:"主動終傷",idx: 15 , key:"Passive_per_findamage" , is : 0},
                {name:"屬性無視",idx: 16 , key:"Attr_ignore" , is : 0},
            ]})

            // 使用者操作裝備變更 變化點
            const EquipData = ref({data:[
                {name:"%STR",idx: 0 , key:"Per_str" , is : 0},
                {name:"%DEX",idx: 1 , key:"Per_dex" , is : 0},
                {name:"%INT",idx: 2 , key:"Per_int" , is : 0},
                {name:"%LUK",idx: 3 , key:"Per_luk" , is : 0},                    
                {name:"力量總增值",idx: 4 , key:"Eat_str" , is :0},
                {name:"敏捷總增值",idx: 5 , key:"Eat_dex" , is :0},
                {name:"智力總增值",idx: 6 , key:"Eat_int" , is :0},
                {name:"幸運總增值",idx: 7 , key:"Eat_luk" , is :0},                   
                {name:"吃%攻擊力值",idx: 8 , key:"Unique_atk" , is :0},
                {name:"%攻擊力",idx: 9 , key:"Per_atk" , is : 0},
                {name:"%無視防禦",idx: 10 , key:"Per_ignore" , is : 0},
                {name:"%總傷害",idx: 11 , key:"Per_damage" , is : 0},
                {name:"%Boss傷害",idx: 12 , key:"Per_boss" , is : 0},
                {name:"%爆擊傷害",idx: 13 , key:"Per_critical" , is : 0},
                {name:"%一般怪物傷害",idx: 14 , key:"Per_normal_damage" , is : 0},
                {name:"被動終傷",idx: 15 , key:"Passive_per_findamage" , is : 0},
                {name:"永恆set數",idx: 16 , key:"Eternal_set" , is : 0},
                {name:"神秘set數",idx: 17 , key:"Mystical_set" , is :0},
                {name:"航海set數",idx: 18 , key:"Nautical_set" , is :0},
                {name:"漆黑set數",idx: 19 , key:"Black_set" , is : 0},
                {name:"頂培set數",idx: 20 , key:"Pelord_set" , is :0},
                {name:"黎明set數",idx: 21 , key:"Dawn_set" , is :  0},    
            ]})

            // 使用者曾存取裝備變更資料庫
            const EquipDatabase = reactive({
                create:[],
                delete:[],
            })   
            const EquipDatabaseRender = computed(()=>{
                let createArr = EquipDatabase.create
                let deleteArr = EquipDatabase.delete
                let newArr = []
                createArr = createArr.filter(item=>{
                    return item.used
                })
                deleteArr = deleteArr.filter(item=>{
                    return item.used
                })



                newArr = [...createArr, ...deleteArr]
                console.log("要計算的裝備清單",newArr);
                EquipData.value.data.forEach(item=>{
                    item.is = 0
                })
                for (let i = 0; i < newArr.length; i++) {
                    // 主屬、攻擊 與  %屬、%攻 、 無視防禦 會在 TotalCalculate一併處理
                    EquipData.value.data[11].is += newArr[i].info[14].is
                    EquipData.value.data[12].is += newArr[i].info[13].is
                    EquipData.value.data[13].is += newArr[i].info[12].is
                    EquipData.value.data[14].is += newArr[i].info[15].is
                    EquipData.value.data[15].is += newArr[i].info[19].is

                    // 塔戒基本數值
                    if(newArr[i].info[17].is === '塔戒更換'){
                        newArr[i].info[2].is = 4 
                        newArr[i].info[4].is = 4 
                        newArr[i].info[6].is = 4 
                        newArr[i].info[8].is = 4 
                        newArr[i].info[10].is = 4 
                    }
                    // 武器塔戒增幅
                    if(newArr[i].info[17].is === '塔戒更換' && newArr[i].info[20].is !== 0){
                        if(StatsShow.value === 'strdex'){
                            newArr[i].info[2].is = 4 +  newArr[i].info[20].is * newArr[i].info[21].is 
                        }                        
                        if(StatsShow.value === 'dexstr'){
                            newArr[i].info[4].is = 4 +  newArr[i].info[20].is * newArr[i].info[21].is 
                        }  
                        if(StatsShow.value === 'intluk'){
                            newArr[i].info[6].is = 4 +  newArr[i].info[20].is * newArr[i].info[21].is 
                        }                       
                        if(StatsShow.value === 'lukdex' || StatsShow.value === 'lukdexstr'){
                            newArr[i].info[8].is = 4 +  newArr[i].info[20].is * newArr[i].info[21].is 
                        }   
                        if(newArr[i].info[21].is ===5) return newArr[i].info[21].is  = 4   
                    }

                    if(newArr[i].info[17].is === '永恆set'){
                        if(newArr[i].mode ==='create') EquipData.value.data[16].is++
                        if(newArr[i].mode ==='delete') EquipData.value.data[16].is--
                        
                    }  
                    if(newArr[i].info[17].is === '神秘set'){
                        if(newArr[i].mode ==='create') EquipData.value.data[17].is++
                        if(newArr[i].mode ==='delete') EquipData.value.data[17].is--
                    }  
                    if(newArr[i].info[17].is === '航海set'){
                        if(newArr[i].mode ==='create') EquipData.value.data[18].is++
                        if(newArr[i].mode ==='delete') EquipData.value.data[18].is--
                        
                    }  
                    if(newArr[i].info[17].is === '漆黑set'){
                        if(newArr[i].mode ==='create') EquipData.value.data[19].is++
                        if(newArr[i].mode ==='delete') EquipData.value.data[19].is--
                        
                    }  
                    if(newArr[i].info[17].is === '頂培set'){
                        if(newArr[i].mode ==='create') EquipData.value.data[20].is++
                        if(newArr[i].mode ==='delete') EquipData.value.data[20].is--
                        
                    }  
                    if(newArr[i].info[17].is === '黎明set'){
                        if(newArr[i].mode ==='create') EquipData.value.data[21].is++
                        if(newArr[i].mode ==='delete') EquipData.value.data[21].is--
                        
                    }  
                    if(newArr[i].info[17].is === '創世武器' && newArr[i].mode ==='create'){
                        EquipData.value.data[16].is++
                        if(EquipData.value.data[17].is >= 3){
                            EquipData.value.data[17].is++
                        }
                        if(EquipData.value.data[18].is >= 3){
                            EquipData.value.data[18].is++
                        }
                    }  
                    
                }
                return newArr
            })         

            // 針對每單一裝備變更 做處理
            
            const EquipNewItem = ref({
                // create or delete
                mode: '',
                // 新裝備 or 原始裝備
                remind: '',
                order: 0,
                data:[
                    {idx:0, show: true, msg:'裝備名稱',    key:'equipName',  is:''},
                    {idx:1, show: true, msg:'%STR',        key:'Per_str',   is:0},
                    {idx:2, show: true, msg:'STR',         key:'Eat_str',   is:0},
                    {idx:3, show: true, msg:'%DEX',        key:'Per_dex',   is:0},
                    {idx:4, show: true, msg:'DEX',         key:'Eat_dex',   is:0},
                    {idx:5, show: true, msg:'%INT',        key:'Per_int',   is:0},
                    {idx:6, show: true, msg:'INT',         key:'Eat_int',   is:0},
                    {idx:7, show: true, msg:'%LUK',        key:'Per_luk',   is:0},
                    {idx:8, show: true, msg:'LUK',         key:'Eat_luk',   is:0},
                    {idx:9, show: true, msg:'%攻擊力',      key:'Per_atk', is:0},
                    {idx:10, show: true, msg:'攻擊力',      key:'Unique_atk', is:0},
                    {idx:11, show: true, msg:'%無視防禦-a',   key:'Per_ignore', is:0},
                    {idx:12, show: true, msg:'%爆擊傷害',   key:'Per_critical', is:0},
                    {idx:13, show: true, msg:'%Boss傷害',   key:'Per_boss', is:0},
                    {idx:14, show: true, msg:'%總傷害',     key:'Per_damage',   is:0},
                    {idx:15, show: true, msg:'%一般怪物傷害',   key:'Per_normal_damage', is:0},
                    {idx:16, show: true, msg:'每9等+主屬值',   key:'Lv_eat_stats', is:0},
                    {idx:17, show: true, msg:'請選擇項目',    key:'set', is:'請選擇'},
                    {idx:18, show: true, msg:'%無視防禦-b',   key:'Per_ignore', is:0},
                    {idx:19, show: true, msg:'被動終傷',   key:'Passive_per_findamage', is:0},
                    {idx:20, show: true, msg:'武器攻擊力',   key:'weapon_atk', is:0},
                    {idx:21, show: true, msg:'武器泡泡等級',   key:'weapon_atk', is:0},        
                    {idx:22, show: true, msg:'不吃%主屬',   key:'Unique_stats', is:0},        
            ]})
          

            const NewEquipbackBtn = ref('新增')


            const handEquipItem_usedBool = (el) =>{
                let order = Number(el.currentTarget.dataset.order)
                let mode = el.currentTarget.dataset.equip
                if (mode === 'create'){
                    EquipDatabase.create.forEach(item=>{
                        if(item.order === order){
                            item.used = !item.used
                           
                        }
                    })
                }
                if (mode === 'delete'){
                    EquipDatabase.delete.forEach(item=>{
                        if(item.order === order){
                            item.used = !item.used
                        }
                    })
                }
            }
            const handEquipNewItem_Show = ()=>{

                // 根據職業顯示不同要填的值
                EquipNewItem.value.data.forEach(item=>{
                    item.show = true
                    if(StatsShow.value === 'strdex' || StatsShow.value === 'dexstr'){
                        if(item.msg === "%INT") return item.show = false
                        if(item.msg === "INT") return item.show = false
                        if(item.msg === "%LUK") return item.show = false
                        if(item.msg === "LUK") return item.show = false
                    }
                    if(StatsShow.value === 'intluk'){
                        if(item.msg === "%STR") return item.show = false
                        if(item.msg === "STR") return item.show = false
                        if(item.msg === "%DEX") return item.show = false
                        if(item.msg === "DEX") return item.show = false
                    }
                    if(StatsShow.value === 'lukdex'){
                        if(item.msg === "%STR") return item.show = false
                        if(item.msg === "STR") return item.show = false
                        if(item.msg === "%INT") return item.show = false
                        if(item.msg === "INT") return item.show = false
                    }
                    if(StatsShow.value === 'lukdexstr' || StatsShow.value === 'zenon'){
                        if(item.msg === "%INT") return item.show = false
                        if(item.msg === "INT") return item.show = false
                    }

                })                  
                // 根據不同選項 顯示不同要輸入的值
                EquipNewItem.value.data.forEach(item=>{
                   if(EquipNewItem.value.data[17].is === "塔戒更換"){
                        if(item.msg === '攻擊力'){
                            item.is = 0
                            item.show = false
                        }
                        if(item.msg === 'STR') {
                            item.is =  0
                            item.show = false
                        } 
                        if(item.msg === 'DEX') {
                            item.is =  0
                            item.show = false
                        } 
                        if(item.msg === 'INT') {
                            item.is =  0
                            item.show = false
                        } 
                        if(item.msg === 'LUK') {
                            item.is =  0
                            item.show = false
                        } 
                        if(item.msg === '%STR') {
                            item.show = false
                            item.is = 0
                        }
                        if(item.msg === '%DEX') {
                            item.show = false
                            item.is = 0
                        }
                        if(item.msg === '%INT') {
                            item.show = false
                            item.is = 0
                        }
                        if(item.msg === '%LUK') {
                            item.show = false
                            item.is = 0
                        }
                        if(item.msg === '%無視防禦-a') {
                            item.show = false
                            item.is = 0
                        }
                        if(item.msg === '%無視防禦-b') {
                            item.show = false
                            item.is = 0
                        }
                        if(item.msg === '%爆擊傷害') {
                            item.show = false
                            item.is = 0
                        }
                        if(item.msg === '%總傷害') {
                            item.show = false
                            item.is = 0
                        }
                        if(item.msg === '%一般怪物傷害') {
                            item.show = false
                            item.is = 0
                        }
                        if(item.msg === '每9等+主屬值') {
                            item.show = false
                            item.is = 0
                        }
                        if(item.msg === '被動終傷') {
                            item.show = false
                            item.is = 0
                        }
                        if(item.msg === '不吃%主屬') {
                            item.show = false
                            item.is = 0
                        }
                        if(item.msg === '武器泡泡等級') return item.is = 4
                   }
                   if(EquipNewItem.value.data[17].is === "萌獸更換"){
                        if(item.msg === '%攻擊力') return item.is = 0
                        if(item.msg === '攻擊力') return item.is = 0
                        if(item.msg === 'STR')   return item.is = 0
                        if(item.msg === 'DEX')   return item.is = 0
                        if(item.msg === 'INT')   return item.is = 0
                        if(item.msg === 'LUK')   return item.is = 0                    
                        if(item.msg === '%STR')   return item.is = 0
                        if(item.msg === '%DEX')   return item.is = 0
                        if(item.msg === '%INT')   return item.is = 0
                        if(item.msg === '%LUK')   return item.is = 0                    
                        if(item.msg === '%無視防禦-a')   return item.is = 0                    
                        if(item.msg === '%無視防禦-b')   {
                            item.show = false
                            item.is = 0
                        }
                        if(item.msg === '%爆擊傷害')     {
                            item.show = false
                            item.is = 0
                        }
                        if(item.msg === '%總傷害')       {
                            item.show = false
                            item.is = 0
                        }
                        if(item.msg === '%一般怪物傷害') {
                             item.show = false
                             item.is = 0
                        }
                        if(item.msg === '每9等+主屬值')  {
                             item.show = false
                             item.is = 0
                        }
                        if(item.msg === '武器攻擊力') {
                            item.show = false
                            item.is = 0
                        }
                        if(item.msg === '武器泡泡等級') {
                            item.show = false
                            item.is = 0
                        }
                        if(item.msg === '不吃%主屬') {
                            item.show = false
                            item.is = 0
                        }

                   }
                   if(EquipNewItem.value.data[17].is !== "萌獸更換" && EquipNewItem.value.data[17].is !== "塔戒更換"){
                        // if(item.msg === '攻擊力') return 
                        // if(item.msg === 'STR') return 
                        // if(item.msg === 'DEX') return 
                        // if(item.msg === 'INT') return 
                        // if(item.msg === 'LUK') return                       
                        // if(item.msg === '%攻擊力') return 
                        // if(item.msg === '%STR') return 
                        // if(item.msg === '%DEX') return 
                        // if(item.msg === '%INT') return 
                        // if(item.msg === '%LUK') return                       
                        // if(item.msg === '%無視防禦-a') return                       
                        if(item.msg === '被動終傷'){
                            item.show = false
                            item.is = 0
                        }
                        if(item.msg === '武器攻擊力') {
                            item.show = false
                            item.is = 0
                        }
                        if(item.msg === '武器泡泡等級') {
                            item.show = false
                            item.is = 0
                        }
                   }
                  
                })         
                if(CreateAim.value !== 'exp') return EquipNewItem.value.data[15].show = false
                if(CreateAim.value !== 'boss') return EquipNewItem.value.data[13].show = false                
            }            
            const handEquipItem_delete = (el) =>{
                let order = Number(el.currentTarget.dataset.order)
                let mode = el.currentTarget.dataset.equip
                let length = 0 
                if (mode === 'create'){
                    length = EquipDatabase.create.length
                    // console.log(length);
                    for (let i = 0; i < length - order - 1; i++) {
                        EquipDatabase.create[order + i].info = EquipDatabase.create[order + i + 1].info
                    }
                    EquipDatabase.create.pop()
                }
                if (mode === 'delete'){
                    length = EquipDatabase.delete.length
                    for (let i = 0; i < length - order - 1; i++) {
                        EquipDatabase.delete[order + i].info = EquipDatabase.delete[order + i + 1].info
                    }
                    EquipDatabase.delete.pop()
                }
            }

   
            const copyEquipItem = reactive({data:[
                {idx:0, show: true, msg:'裝備名稱',    key:'equipName',  is:''},
                {idx:1, show: true, msg:'%STR',        key:'Per_str',   is:0},
                {idx:2, show: true, msg:'STR',         key:'Eat_str',   is:0},
                {idx:3, show: true, msg:'%DEX',        key:'Per_dex',   is:0},
                {idx:4, show: true, msg:'DEX',         key:'Eat_dex',   is:0},
                {idx:5, show: false, msg:'%INT',        key:'Per_int',   is:0},
                {idx:6, show: false, msg:'INT',         key:'Eat_int',   is:0},
                {idx:7, show: false, msg:'%LUK',        key:'Per_luk',   is:0},
                {idx:8, show: false, msg:'LUK',         key:'Eat_luk',   is:0},
                {idx:9, show: true, msg:'%攻擊力',      key:'Per_atk', is:0},
                {idx:10, show: true, msg:'攻擊力',      key:'Unique_atk', is:0},
                {idx:11, show: true, msg:'%無視防禦-a',   key:'Per_ignore', is:0},
                {idx:12, show: true, msg:'%爆擊傷害',   key:'Per_critical', is:0},
                {idx:13, show: true, msg:'%Boss傷害',   key:'Per_boss', is:0},
                {idx:14, show: true, msg:'%總傷害',     key:'Per_damage',   is:0},
                {idx:15, show: true, msg:'%一般怪物傷害',   key:'Per_normal_damage', is:0},
                {idx:16, show: true, msg:'每9等+主屬值',   key:'Lv_eat_stats', is:0},
                {idx:17, show: true, msg:'請選擇set',    key:'set', is:'請選擇'},
                {idx:18, show: true, msg:'%無視防禦-b',   key:'Per_ignore', is:0}, 
                {idx:19, show: true, msg:'被動終傷',   key:'Passive_per_findamage', is:0},   
                {idx:20, show: true, msg:'武器攻擊力',   key:'weapon_atk', is:0},    
                {idx:21, show: true, msg:'武器泡泡等級',   key:'weapon_atk', is:0}, 
                {idx:22, show: true, msg:'不吃%主屬',   key:'Unique_stats', is:0},        
            ]})

            const handEquipItem_create = (el) =>{
                let mode = el.currentTarget.dataset.equip
                MainCalcBox.value = false
                RegionIs.value.key = 'equipwork'
                NewEquipbackBtn.value = '新增'    

                EquipNewItem.value.data.forEach(item=>{
                    item.show = false
                    item.is = 0
                    if(item.idx === 0) return item.is = ''
                    if(item.idx === 17) return item.is = '請選擇'
                })      

                    if(mode === 'create'){
                        EquipNewItem.value.remind = '新裝備'
                        EquipNewItem.value.mode = mode
                        EquipNewItem.value.order = EquipDatabase.create.length 
                    }
                    if(mode === 'delete'){
                        EquipNewItem.value.remind = '原始裝備'
                        EquipNewItem.value.mode = mode
                        EquipNewItem.value.order = EquipDatabase.delete.length 
                    }
        
            }
            const createEquip_fin = (el) =>{
                let recover = el.currentTarget.dataset.recover 
                let mode = EquipNewItem.value.mode
                let order =  EquipNewItem.value.order
                let obj = {order: 0, used: true, mode:'',
                    info:[
                    {idx:0, show: true, msg:'裝備名稱',    key:'equipName',  is:''},
                    {idx:1, show: true, msg:'%STR',        key:'Per_str',   is:0},
                    {idx:2, show: true, msg:'STR',         key:'Eat_str',   is:0},
                    {idx:3, show: true, msg:'%DEX',        key:'Per_dex',   is:0},
                    {idx:4, show: true, msg:'DEX',         key:'Eat_dex',   is:0},
                    {idx:5, show: false, msg:'%INT',        key:'Per_int',   is:0},
                    {idx:6, show: false, msg:'INT',         key:'Eat_int',   is:0},
                    {idx:7, show: false, msg:'%LUK',        key:'Per_luk',   is:0},
                    {idx:8, show: false, msg:'LUK',         key:'Eat_luk',   is:0},
                    {idx:9, show: true, msg:'%攻擊力',      key:'Per_atk', is:0},
                    {idx:10, show: true, msg:'攻擊力',      key:'Unique_atk', is:0},
                    {idx:11, show: true, msg:'%無視防禦-a',   key:'Per_ignore', is:0},
                    {idx:12, show: true, msg:'%爆擊傷害',   key:'Per_critical', is:0},
                    {idx:13, show: true, msg:'%Boss傷害',   key:'Per_boss', is:0},
                    {idx:14, show: true, msg:'%總傷害',     key:'Per_damage',   is:0},
                    {idx:15, show: true, msg:'%一般怪物傷害',   key:'Per_normal_damage', is:0},
                    {idx:16, show: true, msg:'每9等+主屬值',   key:'Lv_eat_stats', is:0},
                    {idx:17, show: true, msg:'請選擇set',    key:'set', is:'請選擇'},
                    {idx:18, show: true, msg:'%無視防禦-b',   key:'Per_ignore', is:0},
                    {idx:19, show: true, msg:'被動終傷',   key:'Passive_per_findamage', is:0},
                    {idx:20, show: true, msg:'武器攻擊力',   key:'weapon_atk', is:0},
                    {idx:21, show: true, msg:'武器泡泡等級',   key:'weapon_atk', is:0},   
                    {idx:22, show: true, msg:'不吃%主屬',   key:'Unique_stats', is:0},      
                ]}
                RegionIs.value.key = 'equip'
                MainCalcBox.value = true
                NewItemSetListBool.value = false
                if(recover === 'Y') return

                let i  = 0
                obj.order = order
                obj.mode = mode
               
                if(mode === 'create'){
                    obj.info.forEach(item=>{
                        item.is = Number(EquipNewItem.value.data[i].is)
                        if(isNaN(item.is)){
                            item.is = EquipNewItem.value.data[i].is
                        }
                        i++;
                    })
                    EquipDatabase.create.push(obj)
                    // console.log(EquipDatabase.create);

                }
                if(mode === 'delete'){
                       obj.info.forEach(item=>{

                        item.is = Number(EquipNewItem.value.data[i].is) * -1
                        if(isNaN(item.is)){
                            item.is = EquipNewItem.value.data[i].is
                        }
                        i++;
                    })
                    EquipDatabase.delete.push(obj)
                    // console.log(EquipDatabase.delete);                    

                }
                
                
            }

            const handEquipItem_edit = (el) =>{
                let order = Number(el.currentTarget.dataset.order)
                let mode = el.currentTarget.dataset.equip
                let arr = []
                MainCalcBox.value = false
                RegionIs.value.key = 'equipwork'
                NewEquipbackBtn.value = '編輯'  
         
                if (mode === 'create'){
                    arr = EquipDatabase.create.filter(item=>{
                        if(item.order === order){
                            return item
                        }
                    })
                    // console.log('抓到的資料是...',arr[0].info);
                    let i = 0
                    EquipNewItem.value.data.forEach(item=>{
                        item.is = Number(arr[0].info[i].is) 
                        if(isNaN(item.is)){
                            item.is = arr[0].info[i].is
                        }                        
                        i++
                    })                    
                    EquipNewItem.value.remind = '新裝備'
                }
                if (mode === 'delete'){
                    let i = 0
                    arr = EquipDatabase.delete.filter(item=>{
                        
                        if(item.order === order){
                            return item
                        }
                    })
                    EquipNewItem.value.data.forEach(item=>{
                        item.is = Number(arr[0].info[i].is) * -1
                        if(isNaN(item.is)){
                            item.is = arr[0].info[i].is
                        }
                        i++
                    })                          
                    EquipNewItem.value.remind = '原始裝備'
                }

                
                // console.log(arr[0].info);
    

                EquipNewItem.value.mode = mode
                EquipNewItem.value.order = order
                handEquipNewItem_Show()

                // 多複製一份 使用者還原編輯用
                let j = 0
                copyEquipItem.data.forEach(item=>{
                    item.is =  EquipNewItem.value.data[j].is
                    j++;
                })
                // console.log(copyEquipItem.data);
            }
            const editEquip_fin = (el) =>{
                let recover = el.currentTarget.dataset.recover 
                let order = EquipNewItem.value.order
                let mode = EquipNewItem.value.mode
                RegionIs.value.key = 'equip'
                MainCalcBox.value = true
                NewItemSetListBool.value = false



                if(recover === 'Y'){
                    let i = 0
                    EquipNewItem.value.data.forEach(item=>{
                        item.is = copyEquipItem.data[i].is
                        i++;
                    })
                }

                if (mode === 'create'){
                    
                    EquipDatabase.create.forEach(item=>{
                        if(item.order === order){
                            let i  = 0
                           item.info.forEach(val=>{
                            val.is = Number(EquipNewItem.value.data[i].is)
                            if(isNaN(val.is)){
                                val.is = EquipNewItem.value.data[i].is
                            }                            
                            i++
                           }) 
                        }
                    })
                   
                }
                if (mode === 'delete'){
                    EquipDatabase.delete.forEach(item=>{
                        if(item.order === order){
                            let i  = 0
                           item.info.forEach(val=>{
                            val.is = Number(EquipNewItem.value.data[i].is) * -1
                            if(isNaN(val.is)){
                                val.is = EquipNewItem.value.data[i].is
                            }
                            i++
                           }) 
                        }
                    })
                }  

            }

            const EquipSetData = reactive({
                // 屬->攻->B、無、爆
                "永恆":[
                {minus:false, idx:0, msg:'無' ,act:false},
                {minus:false, idx:1, msg:'無' ,act:false},
                {minus:false, idx:2, msg:'40攻10B' ,act:false},
                {minus:false, idx:3, msg:'50屬40攻10B' ,act:false},
                {minus:false, idx:4, msg:'40攻10B' ,act:false},
                {minus:false, idx:5, msg:'40攻20無' ,act:false},
            ],
                "神秘":[
                {minus:false, idx:0, msg:'無' ,act:false},
                {minus:false, idx:1, msg:'無' ,act:false},
                {minus:false, idx:2, msg:'30攻10B' ,act:false},
                {minus:false, idx:3, msg:'30攻10無' ,act:false},
                {minus:false, idx:4, msg:'50屬35攻10B' ,act:false},
                {minus:false, idx:5, msg:'40攻10B' ,act:false},
                {minus:false, idx:6, msg:'30攻' ,act:false},
                {minus:false, idx:7, msg:'30攻10無' ,act:false},
            ],
                "航海":[
                {minus:false, idx:0, msg:'無' ,act:false},
                {minus:false, idx:1, msg:'無' ,act:false},
                {minus:false, idx:2, msg:'20攻10B' ,act:false},
                {minus:false, idx:3, msg:'30屬20攻10B' ,act:false},
                {minus:false, idx:4, msg:'25攻10無' ,act:false},
                {minus:false, idx:5, msg:'30攻10B' ,act:false},
                {minus:false, idx:6, msg:'20攻' ,act:false},
                {minus:false, idx:7, msg:'20攻10無' ,act:false},
            ],
                "漆黑":[
                {minus:false, idx:0, msg:'無' ,act:false},
                {minus:false, idx:1, msg:'無' ,act:false},
                {minus:false, idx:2, msg:'10屬10攻10B' ,act:false},
                {minus:false, idx:3, msg:'10屬10攻10無' ,act:false},
                {minus:false, idx:4, msg:'15屬15攻5爆' ,act:false},
                {minus:false, idx:5, msg:'15屬15攻10B' ,act:false},
                {minus:false, idx:6, msg:'15屬15攻10無' ,act:false},
                {minus:false, idx:7, msg:'15屬15攻5爆' ,act:false},
                {minus:false, idx:8, msg:'15屬15攻10B' ,act:false},
                {minus:false, idx:9, msg:'15屬15攻5爆' ,act:false},
            ],
                "頂培":[
                {minus:false, idx:0, msg:'無' ,act:false},
                {minus:false, idx:1, msg:'無' ,act:false},
                {minus:false, idx:2, msg:'20屬' ,act:false},
                {minus:false, idx:3, msg:'35攻' ,act:false},
                {minus:false, idx:4, msg:'30B30無' ,act:false},
            ],
                "黎明":[
                {minus:false, idx:0, msg:'無' ,act:false},
                {minus:false, idx:1, msg:'無' ,act:false},
                {minus:false, idx:2, msg:'10屬10攻10B' ,act:false},
                {minus:false, idx:3, msg:'10屬10攻' ,act:false},
                {minus:false, idx:4, msg:'10屬10攻10無' ,act:false},
            ],
            })



            const updateEquipSet = () =>{

                let start_Black_set =  Createdata.value.data[24].is 
                let start_Pelord_set =  Createdata.value.data[25].is
                let start_Dawn_set =    Createdata.value.data[26].is
                let start_Eternal_set =  Createdata.value.data[27].is
                let start_Mystical_set =  Createdata.value.data[28].is
                let start_Nautical_set =  Createdata.value.data[29].is

                let change_Black_set =    Createdata.value.data[24].is  + EquipData.value.data[19].is
                let change_Pelord_set =   Createdata.value.data[25].is  + EquipData.value.data[20].is
                let change_Dawn_set =     Createdata.value.data[26].is  + EquipData.value.data[21].is
                let change_Eternal_set =  Createdata.value.data[27].is  + EquipData.value.data[16].is
                let change_Mystical_set = Createdata.value.data[28].is  + EquipData.value.data[17].is
                let change_Nautical_set = Createdata.value.data[29].is  + EquipData.value.data[18].is  
                let arr = []              
                // console.log('目前神秘set',start_Mystical_set);
                // console.log('更動後神秘set',change_Mystical_set);
                // 判別更動的set有哪些
                EquipSetData['永恆'].forEach(item=>{
                    item.act = false
                    item.minus = (change_Eternal_set - start_Eternal_set < 0) ? true : false;

                    if(item.minus){
                        if(item.idx > change_Eternal_set && item.idx <= start_Eternal_set){
                            item.act = true
                            arr.push(item)
                        }
                    }else{
                        if(item.idx > start_Eternal_set && item.idx <= change_Eternal_set){
                            item.act = true
                            arr.push(item)
                        }
                    }
                    
                })
                EquipSetData['神秘'].forEach(item=>{
                    item.act = false
                    item.minus = (change_Mystical_set - start_Mystical_set < 0) ? true : false;

                    if(item.minus){
                        if(item.idx > change_Mystical_set && item.idx <= start_Mystical_set){
                            item.act = true
                            arr.push(item)
                        }
                    }else{
                        if(item.idx > start_Mystical_set && item.idx <= change_Mystical_set){
                            item.act = true
                            arr.push(item)
                        }
                    }                    
                })
                EquipSetData['航海'].forEach(item=>{
                    item.act = false
                    item.minus = (change_Nautical_set - start_Nautical_set < 0) ? true : false;

                    if(item.minus){
                        if(item.idx > change_Nautical_set && item.idx <= start_Nautical_set){
                            item.act = true
                            arr.push(item)
                        }
                    }else{
                        if(item.idx > start_Nautical_set && item.idx <= change_Nautical_set){
                            item.act = true
                            arr.push(item)
                        }
                    }                         
                })
                EquipSetData['漆黑'].forEach(item=>{
                    item.act = false
                    item.minus = (change_Black_set - start_Black_set < 0) ? true : false;
                    
                    if(item.minus){
                        if(item.idx > change_Black_set && item.idx <= start_Black_set){
                            item.act = true
                            arr.push(item)
                        }
                    }else{
                        if(item.idx > start_Black_set && item.idx <= change_Black_set){
                            item.act = true
                            arr.push(item)
                        }
                    }   
                })
                EquipSetData['頂培'].forEach(item=>{
                    item.act = false
                    item.minus = (change_Pelord_set - start_Pelord_set < 0) ? true : false;

                    if(item.minus){
                        if(item.idx > change_Pelord_set && item.idx <= start_Pelord_set){
                            item.act = true
                            arr.push(item)
                        }
                    }else{
                        if(item.idx > start_Pelord_set && item.idx <= change_Pelord_set){
                            item.act = true
                            arr.push(item)
                        }
                    }  
                })
                EquipSetData['黎明'].forEach(item=>{
                    item.act = false
                    item.minus = (change_Dawn_set - start_Dawn_set < 0) ? true : false;

                    if(item.minus){
                        if(item.idx > change_Dawn_set && item.idx <= start_Dawn_set){
                            item.act = true
                            arr.push(item)
                        }
                    }else{
                        if(item.idx > start_Dawn_set && item.idx <= change_Dawn_set){
                            item.act = true
                            arr.push(item)
                        }
                    }  
                })     

                EquipSetVal.value.data.forEach(item=>{
                    item.is = 0
                })
                // 演算全部set變化的數值
                // console.log('set計算的清單',arr);
                arr.forEach(item=>{
                    if(item.msg === '20屬'){
                        if(item.minus){
                            EquipSetVal.value.data[0].is -= 20
                        }else{
                            EquipSetVal.value.data[0].is += 20
                        }
                    }                    
                    if(item.msg === '20攻'){
                        if(item.minus){
                            EquipSetVal.value.data[1].is -= 20
                        }else{
                            EquipSetVal.value.data[1].is += 20
                        }
                    }                    
                    if(item.msg === '30攻'){
                        if(item.minus){
                            EquipSetVal.value.data[1].is -= 30
                        }else{
                            EquipSetVal.value.data[1].is += 30
                        }
                    }                    
                    if(item.msg === '35攻'){
                        if(item.minus){
                            EquipSetVal.value.data[1].is -= 35
                        }else{
                            EquipSetVal.value.data[1].is += 35
                        }
                    }     
                    if(item.msg === '10屬10攻'){
                        if(item.minus){
                            EquipSetVal.value.data[0].is -= 10
                            EquipSetVal.value.data[1].is -= 10
                        }else{
                            EquipSetVal.value.data[0].is += 10
                            EquipSetVal.value.data[1].is += 10
                        }
                    }                                   
                    if(item.msg === '20攻10B'){
                        if(item.minus){
                            EquipSetVal.value.data[1].is -= 20
                            EquipSetVal.value.data[2].is -= 10
                        }else{
                            EquipSetVal.value.data[1].is += 20
                            EquipSetVal.value.data[2].is += 10
                        }
                    }
                    if(item.msg === '40攻10B'){
                        if(item.minus){
                            EquipSetVal.value.data[1].is -= 40
                            EquipSetVal.value.data[2].is -= 10
                        }else{
                            EquipSetVal.value.data[1].is += 40
                            EquipSetVal.value.data[2].is += 10
                        }
                    }
                    if(item.msg === '30攻10B'){
                        if(item.minus){
                            EquipSetVal.value.data[1].is -= 30
                            EquipSetVal.value.data[2].is -= 10
                        }else{
                            EquipSetVal.value.data[1].is += 30
                            EquipSetVal.value.data[2].is += 10
                        }
                    }
                    if(item.msg === '50屬40攻10B'){
                        if(item.minus){
                            EquipSetVal.value.data[0].is -= 50
                            EquipSetVal.value.data[1].is -= 40
                            EquipSetVal.value.data[2].is -= 10
                        }else{
                            EquipSetVal.value.data[0].is += 50
                            EquipSetVal.value.data[1].is += 40
                            EquipSetVal.value.data[2].is += 10
                        }
                    }
                    if(item.msg === '50屬35攻10B'){
                        if(item.minus){
                            EquipSetVal.value.data[0].is -= 50
                            EquipSetVal.value.data[1].is -= 35
                            EquipSetVal.value.data[2].is -= 10
                        }else{
                            EquipSetVal.value.data[0].is += 50
                            EquipSetVal.value.data[1].is += 35
                            EquipSetVal.value.data[2].is += 10
                        }
                    }
                    if(item.msg === '30屬20攻10B'){
                        if(item.minus){
                            EquipSetVal.value.data[0].is -= 30
                            EquipSetVal.value.data[1].is -= 20
                            EquipSetVal.value.data[2].is -= 10
                        }else{
                            EquipSetVal.value.data[0].is += 30
                            EquipSetVal.value.data[1].is += 20
                            EquipSetVal.value.data[2].is += 10
                        }
                    }
                    if(item.msg === '10屬10攻10B'){
                        if(item.minus){
                            EquipSetVal.value.data[0].is -= 10
                            EquipSetVal.value.data[1].is -= 10
                            EquipSetVal.value.data[2].is -= 10
                        }else{
                            EquipSetVal.value.data[0].is += 10
                            EquipSetVal.value.data[1].is += 10
                            EquipSetVal.value.data[2].is += 10
                        }
                    }
                    if(item.msg === '15屬15攻10B'){
                        if(item.minus){
                            EquipSetVal.value.data[0].is -= 15
                            EquipSetVal.value.data[1].is -= 15
                            EquipSetVal.value.data[2].is -= 10
                        }else{
                            EquipSetVal.value.data[0].is += 15
                            EquipSetVal.value.data[1].is += 15
                            EquipSetVal.value.data[2].is += 10
                        }
                    }
                    if(item.msg === '10屬10攻10無'){
                        if(item.minus){
                            EquipSetVal.value.data[0].is -= 10
                            EquipSetVal.value.data[1].is -= 10
                            EquipSetVal.value.data[5].is  = IgnoreFn(EquipSetVal.value.data[5].is,10)
                        }else{
                            EquipSetVal.value.data[0].is += 10
                            EquipSetVal.value.data[1].is += 10
                            EquipSetVal.value.data[3].is = IgnoreFn(EquipSetVal.value.data[3].is,10)
                        }
                    }
                    if(item.msg === '15屬15攻10無'){
                        if(item.minus){
                            EquipSetVal.value.data[0].is -= 15
                            EquipSetVal.value.data[1].is -= 15
                            EquipSetVal.value.data[5].is  = IgnoreFn(EquipSetVal.value.data[5].is,10)
                        }else{
                            EquipSetVal.value.data[0].is += 15
                            EquipSetVal.value.data[1].is += 15
                            EquipSetVal.value.data[3].is = IgnoreFn(EquipSetVal.value.data[3].is,10)
                        }
                    }
                    if(item.msg === '40攻20無'){
                        if(item.minus){
                            EquipSetVal.value.data[1].is -= 40
                            EquipSetVal.value.data[5].is  = IgnoreFn(EquipSetVal.value.data[5].is, 20)
                        }else{
                            EquipSetVal.value.data[1].is += 40
                            EquipSetVal.value.data[3].is = IgnoreFn(EquipSetVal.value.data[3].is, 20)
                        }
                    }                    
                    if(item.msg === '30攻10無'){
                        if(item.minus){
                            EquipSetVal.value.data[1].is -= 30
                            EquipSetVal.value.data[5].is  = IgnoreFn(EquipSetVal.value.data[5].is,10)
                        }else{
                            EquipSetVal.value.data[1].is += 30
                            EquipSetVal.value.data[3].is = IgnoreFn(EquipSetVal.value.data[3].is, 10)
                        }
                    }                    
                    if(item.msg === '25攻10無'){
                        if(item.minus){
                            EquipSetVal.value.data[1].is -= 25
                            EquipSetVal.value.data[5].is  = IgnoreFn(EquipSetVal.value.data[5].is,10)
                        }else{
                            EquipSetVal.value.data[1].is += 25
                            EquipSetVal.value.data[3].is = IgnoreFn(EquipSetVal.value.data[3].is, 10)
                        }
                    }                    
                    if(item.msg === '20攻10無'){
                        if(item.minus){
                            EquipSetVal.value.data[1].is -= 20
                            EquipSetVal.value.data[5].is  = IgnoreFn(EquipSetVal.value.data[5].is,10)
                        }else{
                            EquipSetVal.value.data[1].is += 20
                            EquipSetVal.value.data[3].is = IgnoreFn(EquipSetVal.value.data[3].is, 10)
                        }
                    }        
                    if(item.msg === '15屬15攻5爆'){
                        if(item.minus){
                            EquipSetVal.value.data[0].is -= 15
                            EquipSetVal.value.data[1].is -= 15
                            EquipSetVal.value.data[4].is -= 5
                        }else{
                            EquipSetVal.value.data[0].is += 15
                            EquipSetVal.value.data[1].is += 15
                            EquipSetVal.value.data[4].is += 5
                        }
                    }                                
                    if(item.msg === '30B30無'){
                        if(item.minus){
                            EquipSetVal.value.data[2].is -= 30
                            EquipSetVal.value.data[5].is  = IgnoreFn(EquipSetVal.value.data[5].is, 30)
                        }else{
                            EquipSetVal.value.data[2].is += 30
                            EquipSetVal.value.data[3].is = IgnoreFn(EquipSetVal.value.data[3].is, 30)
                        }
                    }                                
                })         
                // console.log('變更的set數值',EquipSetVal.value.data);    
            }

            const EquipSetVal = ref({data:[
                {idx:0, key:'Eat_stats', name:'吃主屬總值',   is: 0},
                {idx:1, key:'Unique_atk', name:'吃%攻擊力值', is: 0},
                {idx:2, key:'Per_boss', name:'%Boss傷害',     is: 0},
                {idx:3, key:'Per_ignore', name:'%無視防禦',   is: 0},
                {idx:4, key:'Per_critical', name:'%爆擊傷害',   is: 0},
                {idx:5, key:'Per_ignore', name:'%無視防禦(負)',   is: 0},

            ]})   
            const EquipLvStats  = ref(0)

            const NewItemSetList = reactive({data:[
                {show:true, key:'seedRing', msg:'塔戒更換'},
                {show:true, key:'cutemos', msg:'萌獸更換'},
                {show:true, key:'lucky_Set', msg:'創世武器'},
                {show:true, key:'Eternal_set', msg:'永恆set'},
                {show:true, key:'Mystical_set', msg:'神秘set'},
                {show:true, key:'Nautical_set', msg:'航海set'},
                {show:true, key:'Black_set', msg:'漆黑set'},
                {show:true, key:'Pelord_set', msg:'頂培set'},
                {show:true, key:'Dawn_set', msg:'黎明set'},
                {show:true, key:'none_Set', msg:'無任何set'},                
            ]})
            const NewItemSetListBool = ref(false)

            const handNewItemSet = (el) =>{
                let key = el.currentTarget.dataset.bool
                if(key === 'open'){
                    NewItemSetListBool.value = !NewItemSetListBool.value
                    NewItemSetList.data.forEach(item=>{
                        item.show = true

                        // 不提供使用者操作刪除創世武器選項  
                        if(EquipNewItem.value.mode === 'delete' && item.msg === '創世武器'){
                            item.show = false
                        }
                    })
                }
                if(key === 'change'){
                    EquipNewItem.value.data[17].is = el.currentTarget.dataset.msg
                    EquipNewItem.value.data[17].key = el.currentTarget.dataset.key
                    NewItemSetListBool.value = false
                    handEquipNewItem_Show()


                }
            }

            // 總合 user 操作 顯示的介面
            const TotalData = ref({data:[
                {change: false,  name:"職業",idx: 0 , key:"Job" , is : "-"},
                {change: false,  name:"等級",idx: 1 , key:"Level" , is : "-"},
                {change: false,  name:"ARC符數",idx: 2 , key:"Arc" , is : "-"},
                {change: false,  name:"AUT符數",idx: 3 , key:"Aut" , is : "-"},           
                {change: false,  name:"%STR",idx: 4 , key:"Per_str" , is : "-"},
                {change: false,  name:"%DEX",idx: 5 , key:"Per_dex" , is : "-"},
                {change: false,  name:"%INT",idx: 6 , key:"Per_int" , is : "-"},
                {change: false,  name:"%LUK",idx: 7 , key:"Per_luk" , is : "-"},                    
                {change: false,  name:"Totle_STR",idx: 8 , key:"Totle_str" , is :  "-"},
                {change: false,  name:"Totle_DEX",idx: 9 , key:"Totle_dex" , is :  "-"},
                {change: false,  name:"Totle_INT",idx: 10 , key:"Totle_int" , is : "-"},
                {change: false,  name:"Totle_LUK",idx: 11 , key:"Totle_luk" , is : "-"},                              
                {change: false,  name:"總攻擊力",idx: 12 , key:"Atk" , is : "-"},
                {change: false,  name:"%攻擊力",idx: 13 , key:"Per_atk" , is :      "-"},
                {change: false,  name:"%無視防禦",idx: 14 , key:"Per_ignore" , is : "-"},
                {change: false,  name:"%總傷害",idx: 15 , key:"Per_damage" , is :   "-"},
                {change: false,  name:"%Boss傷害",idx: 16 , key:"Per_boss" , is :   "-"},
                {change: false,  name:"%一般怪物傷害",idx: 17 , key:"Per_normal_damage" , is : "-"},
                {change: false,  name:"%爆擊傷害",idx: 18 , key:"Per_critical" , is :   "-"},
                {change: false,  name:"終傷",idx: 19 , key:"Passive_per_findamage" , is: "-"},
                {change: false,  name:"屬性無視",idx: 20 , key:"Attr_ignore" , is :  "-"},
                {change: false,  name:"永恆set數",idx: 21 , key:"Eternal_set" , is : "-"},
                {change: false,  name:"神秘set數",idx: 22 , key:"Mystical_set" , is :"-"},
                {change: false,  name:"航海set數",idx: 23 , key:"Nautical_set" , is :"-"},                                     
                {change: false,  name:"漆黑set數",idx: 24 , key:"Black_set" , is : "-"},
                {change: false,  name:"頂培set數",idx: 25 , key:"Pelord_set" , is :"-"},
                {change: false,  name:"黎明set數",idx: 26 , key:"Dawn_set" , is :  "-"},
            ]})    
            
            
            const CreateAim = computed(()=>{
                return  Createdata.value.data[35].is
            })
            const StatsShow = computed(()=>{
                if(Createdata.value.data[31].is === "strdex" || Createdata.value.data[31].is === "dexstr"){
                    potionTool.custom.forEach(item=>{
                        item.show = true
                    })
                    potionTool.custom[3].show = false
                    potionTool.custom[6].show = false
                    potionTool.custom[7].show = false
                }
                if(Createdata.value.data[31].is === "intluk"){
                    potionTool.custom.forEach(item=>{
                        item.show = true
                    })
                    potionTool.custom[2].show = false
                    potionTool.custom[4].show = false
                    potionTool.custom[5].show = false
                }
                if(Createdata.value.data[31].is === "lukdex"){
                    potionTool.custom.forEach(item=>{
                        item.show = true
                    })
                    potionTool.custom[3].show = false
                    potionTool.custom[4].show = false
                    potionTool.custom[6].show = false
                }
                if(Createdata.value.data[31].is === "lukdexstr" || Createdata.value.data[31].is === "zenon"){
                    potionTool.custom.forEach(item=>{
                        item.show = true
                    })
                    potionTool.custom[3].show = false
                    potionTool.custom[6].show = false
                }
                // console.log(potionTool.custom);
                return Createdata.value.data[31].is
            })


            const BuffDataReset = ()=>{
                BuffData.value.data.forEach(item=>{
                    item.is = 0
                })
            }

            const MultPerValFn = (key) =>{
                // 單一技能 增幅多種數值透過此 Fn 去轉換
                // 但僅運算 %物 %屬相關
                let plusVal = 0
                if(key === '技能名稱'){

                }
                if(key === '狂豹獵人'){
                    BuffData.value.data[9].is += 10
                }
               
            }

 
            const MultSkillValFn = (key)=>{
                // 單一技能 增幅多種數值透過此 Fn 去轉換
                // {name:"力量總增值",idx: 4 , key:"Eat_str" , is :`+${BuffData.value.data[4].is}`},
                //     {name:"敏捷總增值",idx: 5 , key:"Eat_dex" , is :`+${BuffData.value.data[5].is}`},
                //     {name:"智力總增值",idx: 6 , key:"Eat_int" , is :`+${BuffData.value.data[6].is}`},
                //     {name:"幸運總增值",idx: 7 , key:"Eat_luk" , is :`+${BuffData.value.data[7].is}`},                   
                //     {name:"吃%攻擊力值",idx: 8 , key:"Unique_atk" , is :`+${BuffData.value.data[8].is}`},
                //     {name:"%攻擊力",idx: 9 , key:"Per_atk" , is : `+${BuffData.value.data[9].is}%`},
                //     {name:"%無視防禦",idx: 10 , key:"Per_ignore" , is : `+${BuffData.value.data[10].is}%`},
                //     {name:"%總傷害",idx: 11 , key:"Per_damage" , is :`+${BuffData.value.data[11].is}%`},
                //     {name:"%Boss傷害",idx: 12 , key:"Per_boss" , is : `+${BuffData.value.data[12].is}%`},
                //     {name:"%一般怪物傷害",idx: 13 , key:"Per_normal_damage" , is : `+${BuffData.value.data[13].is}%`},
                //     {name:"%爆擊傷害",idx: 14 , key:"Per_critical" , is : `+${BuffData.value.data[14].is}%`},
                //     {name:"主動終傷",idx: 15 , key:"Active_per_findamage" , is : `+${BuffData.value.data[15].is}%`},
                //     {name:"屬性無視",idx: 16 , key:"Attr_ignore" , is : `+${BuffData.value.data[16].is}%`},
                let plusVal = 0
                if(key === '技能名稱'){

                }
                if(key === '幻靈武具'){
                    // 16無 6終
                    BuffData.value.data[10].is = IgnoreFn(BuffData.value.data[10].is, 16)
                    BuffData.value.data[15].is = findamageFn(BuffData.value.data[15].is, 6)
                }
                if(key === '死亡印記'){
                    // 20總 10無
                    BuffData.value.data[10].is = IgnoreFn(BuffData.value.data[10].is, 10)
                    BuffData.value.data[11].is += 20
                }
                if(key === '魔劍共鳴(2層)'){
                    // 10無 10終
                    BuffData.value.data[10].is = IgnoreFn(BuffData.value.data[10].is, 10)
                    BuffData.value.data[15].is = findamageFn(BuffData.value.data[15].is, 10)

                }
                if(key === '普力特的祝福(6層)'){
                    // 50屬 22攻 22B
                    BuffData.value.data[6].is += Math.round(50 * (1 + TotalData.value.data[6].is * 0.01))
                    BuffData.value.data[7].is += Math.round(50 * (1 + TotalData.value.data[7].is * 0.01))
                    BuffData.value.data[8].is += Math.round( (1 + TotalData.value.data[13].is * 0.01) * (22) )
                    BuffData.value.data[12].is  +=  22
                }
                if(key === '超越者西格諾斯的祝福'){
                    // 30~120總傷
                    BuffData.value.data[11].is += 30
                    BuffData.value.data[11].is += RoyalQueenBuff.value
                }
                if(key === '爆擊強化'){
                    BuffData.value.data[14].is += (Skill_criticalRate.value / 2)
                }
                if(key === '鋼鐵之軀'){
                    BuffData.value.data[11].is += Skill_ironbody.value * 6
                }
                if(key === '格蘭蒂斯女神的祝福(雷普)'){
                    
                    BuffData.value.data[8].is += Math.round( (1 + TotalData.value.data[13].is * 0.01) * (Skill_Rapgoddess_after.value - Skill_Rapgoddess_before.value) )
                }
                if(key === '貫穿箭'){
                    // 15總 15無
                    BuffData.value.data[11].is += 15
                    BuffData.value.data[10].is = IgnoreFn(BuffData.value.data[10].is, 15)

                }
                
                if(key === '冒險大楓祝'){
                    // 20總傷 、 +等級的主屬*4
                    plusVal = Math.ceil((18 + TotalData.value.data[1].is * 5) * (0.16) * 4)
                    if(StatsShow.value === 'strdex'){
                        BuffData.value.data[4].is += Math.round(plusVal * (1 + TotalData.value.data[4].is * 0.01))
                    }
                    if(StatsShow.value === 'dexstr'){
                        BuffData.value.data[5].is += Math.round(plusVal * (1 + TotalData.value.data[5].is * 0.01))
                    }
                    if(StatsShow.value === 'intluk'){
                        BuffData.value.data[6].is += Math.round(plusVal * (1 + TotalData.value.data[6].is * 0.01))
                    }
                    if(StatsShow.value === 'lukdex' || StatsShow.value === 'lukdexstr'){
                        BuffData.value.data[7].is += Math.round(plusVal * (1 + TotalData.value.data[7].is * 0.01))
                    }
                    BuffData.value.data[11].is += 20

                }
                if(key === '靈魂深造'){
                    // 天破 -B+20 無+30
                    BuffData.value.data[10].is = IgnoreFn(BuffData.value.data[10].is, 30)
                    BuffData.value.data[12].is  +=  20
                }
                if(key === '龍脈的迴響'){
                    // 菈菈 沒大楓祝5%終傷 有的話11%
                    let i = 0
                    let skillArr = BuffItemMerge()
                    // console.log('菈菈已套用技能組',skillArr);
                    skillArr.forEach(item=>{
                        if(item.name === "格蘭蒂斯女神的祝福"){
                            i++
                        }
                    })
                    if(i === 1){
                        BuffData.value.data[15].is = findamageFn(BuffData.value.data[15].is, 11)
                    }else{
                        BuffData.value.data[15].is = findamageFn(BuffData.value.data[15].is, 5)
                    }
                    
                }

                if(key === "超速動能"){
                    // 皆以配戴創世武器計算攻擊力
                    let jobArr = [
                        {key:"拳霸", val : 204},
                        {key:"槍神", val : 199.2},
                        {key:"重砲指揮官", val : 278.4},
                        {key:"天使破壞者", val : 204},
                        {key:"閃雷悍將", val : 204},
                        {key:"隱月", val : 204},
                        {key:"機甲戰神", val : 199.2},
                        {key:"亞克", val : 204},
                        {key:"墨玄", val : 204},
                        {key:"傑諾", val : 204},
                    ]
                    jobArr = jobArr.filter(item=>{
                        return item.key === TotalData.value.data[0].is
                    })
                    BuffData.value.data[8].is  += Math.round( (1 + TotalData.value.data[13].is * 0.01) * (jobArr[0].val) )
                    // console.log(jobArr[0].val);              
                }
                if(key === '主教'){
                    BuffData.value.data[8].is += Math.round( (1 + TotalData.value.data[13].is * 0.01) * (50) )
                    BuffData.value.data[12].is += 10
                }
                if(key === '狂豹獵人'){
                    // 包含戰鬥指令的會心
                    BuffData.value.data[14].is += 16
                }
                if(key === '幻獸師'){
                    if(StatsShow.value === "intluk"){
                        BuffData.value.data[8].is += Math.round( (1 + TotalData.value.data[13].is * 0.01) * (90) )
                    }else{
                        BuffData.value.data[8].is += Math.round( (1 + TotalData.value.data[13].is * 0.01) * (30) )
                    }
                    BuffData.value.data[11].is += 40
                }
            }

            const buffToolConflict = (buffArr) =>{
                // 主教
                 // 若BUFF機的進階祝福為 true 實用進階祝福值為0
                if(buffTool.list[0].act){
                    buffArr.forEach(item=>{
                        if(item.name === "實用的進階祝福"){
                            item.val = 0
                        }
                    })
                }else{
                    buffArr.forEach(item=>{
                        if(item.name === "實用的進階祝福"){
                            item.val = 20
                        }
                    })
                }
                // 狂豹獵人
                 // 若BUFF機的會心為 true 實用會心值為0
                if(buffTool.list[1].act){
                    buffArr.forEach(item=>{
                        if(item.name === "實用的會心之眼"){
                            item.val = 0
                        }
                    })
                }else{
                    buffArr.forEach(item=>{
                        if(item.name === "實用的會心之眼"){
                            item.val = 8
                        }
                    })                    
                }
               
               
                return buffArr
            }
            const buffTool = reactive({list:[
                {act:false, name:'主教', type:"Mult",val:0},
                {act:false, name:'狂豹獵人', type:"Mult",val:0},
                {act:false, name:'幻獸師', type:"Mult",val:0},
            ]})
            const potionTool = reactive({list:[
                {act:false,url:"./img/buff/藥水/0.png", name:'攻擊戰地', type:"Unique_atk",val:30},
                {act:false,url:"./img/buff/藥水/1.png", name:'公會祝福', type:"Unique_atk",val:30},
                {act:false,url:"./img/buff/藥水/2.png", name:'烏勒斯天氣', type:"Unique_atk",val:30},
                {act:false,url:"./img/buff/藥水/3.png", name:'Boss秘藥(+20)', type:"Per_boss",val:20},
                {act:false,url:"./img/buff/藥水/4.png", name:'無視秘藥(+20)', type:"Per_ignore",val:20},
                {act:false,url:"./img/buff/藥水/5.png", name:'瑪瑙蘋果', type:"Unique_atk",val:100},
                {act:false,url:"./img/buff/藥水/6.png", name:'優質深海魚', type:"Per_boss",val:30},
                {act:false,url:"./img/buff/藥水/9.png", name:'MVP加持', type:"Unique_atk",val:30},
            ],
            custom:[
                { show:true, idx:0 ,act:false,url:"./img/buff/藥水/7.png", name:'馬車天氣', type:"Unique_atk",val:30, },
                { show:true, idx:1 ,act:false,url:"./img/buff/藥水/77.png", name:'名聲椅子', type:"Unique_atk",val:80, },    
                { show:true, idx:2 ,act:false,url:"./img/buff/藥水/8.png", name:'怪公紅水', type:"Unique_atk",val:30, },
                { show:true, idx:3 ,act:false,url:"./img/buff/藥水/77.png", name:'怪公藍水', type:"Unique_atk",val:30, },
                { show:true, idx:4 ,act:false,url:"./img/buff/藥水/10.png", name:'力量藥水', type:"Eat_str",val:10, },
                { show:true, idx:5 ,act:false,url:"./img/buff/藥水/10.png", name:'敏捷藥水', type:"Eat_dex",val:10, },
                { show:true, idx:6 ,act:false,url:"./img/buff/藥水/10.png", name:'智力藥水', type:"Eat_int",val:10, },
                { show:true, idx:7 ,act:false,url:"./img/buff/藥水/10.png", name:'幸運藥水', type:"Eat_luk",val:10, },
            ],
        })
            
            const gulityBuff = reactive({list:[
            {act:false,url:'./img/buff/公會/0.png', name:"公會總傷", type:"Per_damage" , val: 15},
            {act:false,url:'./img/buff/公會/1.png', name:'公會無視', type:"Per_ignore",    val:15},
            {act:false,url:'./img/buff/公會/2.png', name:'公會B傷', type:"Per_boss",     val:15},
            {act:false,url:'./img/buff/公會/3.png', name:'公會爆傷', type:"Per_critical",    val:15},
            ]})




    

            const BuffInputCheck = () =>{
                gulityBuff.list.forEach(item=>{
                    if(item.val > 15) {
                        item.val = 15
                    }
                    if(item.val < 1) {
                        item.val = 1
                    }
                })
                if(potionTool.custom[0].val > 80){
                    potionTool.custom[0].val = 80
                }
                if(potionTool.custom[0].val < 0){
                    potionTool.custom[0].val = 0
                }
                if(potionTool.custom[1].val > 80){
                    potionTool.custom[1].val = 80
                }
                if(potionTool.custom[1].val < 0){
                    potionTool.custom[1].val = 0
                }

                if(potionTool.custom[4].val > 10){
                    potionTool.custom[4].val = 10
                }
                if(potionTool.custom[4].val < 1){
                    potionTool.custom[4].val = 1
                }
                if(potionTool.custom[5].val > 10){
                    potionTool.custom[5].val = 10
                }
                if(potionTool.custom[5].val < 1){
                    potionTool.custom[5].val = 1
                }
                if(potionTool.custom[6].val > 10){
                    potionTool.custom[6].val = 10
                }
                if(potionTool.custom[6].val < 1){
                    potionTool.custom[6].val = 1
                }
                if(potionTool.custom[7].val > 10){
                    potionTool.custom[7].val = 10
                }
                if(potionTool.custom[7].val < 1){
                    potionTool.custom[7].val = 1
                }
            }
            const BuffItemMerge = () =>{
                let AllBuffArr = []
                let jobskillArr = []
                let buffToolArr = []
                let gulityArr = []
                let potionList = []
                let potionCustom = []

                jobskillArr = jobSkillRender.value.filter(item=>{
                    return item.act === true
                })
                buffToolArr = buffTool.list.filter(item=>{
                    return item.act === true
                })
                gulityArr = gulityBuff.list.filter(item=>{
                    return item.act === true
                })
                potionList = potionTool.list.filter(item=>{
                    return item.act === true
                })
                potionCustom = potionTool.custom.filter(item=>{
                    return item.act === true                        
                })
                AllBuffArr = [...jobskillArr, ...buffToolArr, ...gulityArr, ...potionList, ...potionCustom ]
                return AllBuffArr
            }
       

            // 防禦無視 屬性無視公式
            const IgnoreFn = (nowVal,plusVal) =>{
                if(plusVal > 0){
                    nowVal = ( 1 - (1 - nowVal * 0.01) * (1 - plusVal * 0.01) ) * 100
                }
                if(plusVal < 0){
                    nowVal = ( 1 - (1 - nowVal * 0.01) / (1 + plusVal * 0.01) ) * 100
                }
                
                // roundTo = function( num, decimal ) { return Math.round( ( num + Number.EPSILON ) * Math.pow( 10, decimal ) ) / Math.pow( 10, decimal ); }
                return roundTo( nowVal , 2 )
      
            } 
            //  終傷公式
            const findamageFn = (nowVal, plusVal)=>{
                nowVal = ( (1 + nowVal * 0.01 ) * (1 + plusVal * 0.01 ) -1 ) *100
                // roundTo = function( num, decimal ) { return Math.round( ( num + Number.EPSILON ) * Math.pow( 10, decimal ) ) / Math.pow( 10, decimal ); }
                return roundTo( nowVal , 2 )
            }

            const TotalDataStatus = () =>{
                TotalData.value.data.forEach(item=>{
                    item.change = false
                })
                if(TotalData.value.data[4].is  !== Math.round(Createdata.value.data[20].is * 100)){
                    TotalData.value.data[4].change = true
                }
                if(TotalData.value.data[5].is  !== Math.round(Createdata.value.data[21].is * 100)){
                    TotalData.value.data[5].change = true
                }
                if(TotalData.value.data[6].is  !== Math.round(Createdata.value.data[22].is * 100)){
                    TotalData.value.data[6].change = true
                }
                if(TotalData.value.data[7].is  !== Math.round(Createdata.value.data[23].is * 100)){
                    TotalData.value.data[7].change = true
                }
                if(TotalData.value.data[8].is  !== Math.ceil((1 + Createdata.value.data[20].is) * (Createdata.value.data[16].is) + (Createdata.value.data[12].is) )){
                    TotalData.value.data[8].change = true
                }
                if(TotalData.value.data[9].is  !== Math.ceil((1 + Createdata.value.data[21].is) * (Createdata.value.data[17].is) + (Createdata.value.data[13].is) )){
                    TotalData.value.data[9].change = true
                }
                if(TotalData.value.data[10].is  !== Math.ceil((1 + Createdata.value.data[22].is) * (Createdata.value.data[18].is) + (Createdata.value.data[14].is) )){
                    TotalData.value.data[10].change = true
                }
                if(TotalData.value.data[11].is  !== Math.ceil((1 + Createdata.value.data[23].is) * (Createdata.value.data[19].is) + (Createdata.value.data[15].is) )){
                    TotalData.value.data[11].change = true
                }
                if(TotalData.value.data[12].is  !== Createdata.value.data[3].is){
                    TotalData.value.data[12].change = true
                }
                if(TotalData.value.data[13].is  !== Createdata.value.data[4].is){
                    TotalData.value.data[13].change = true
                }
                if(Math.abs(TotalData.value.data[14].is  - Createdata.value.data[7].is) > 0.02){
                    TotalData.value.data[14].change = true
                }
                if(Math.abs(TotalData.value.data[14].is  - Createdata.value.data[7].is) < 0.02){
                    TotalData.value.data[14].is = Createdata.value.data[7].is
                }
                if(TotalData.value.data[15].is  !==  Createdata.value.data[5].is){
                    TotalData.value.data[15].change = true
                }
                if(TotalData.value.data[16].is  !==  Createdata.value.data[6].is){
                    TotalData.value.data[16].change = true
                }
                if(TotalData.value.data[17].is  !==  Createdata.value.data[30].is){
                    TotalData.value.data[17].change = true
                }
                if(TotalData.value.data[18].is  !==  Createdata.value.data[9].is){
                    TotalData.value.data[18].change = true
                }
                if(TotalData.value.data[19].is  !==  Createdata.value.data[8].is){
                    TotalData.value.data[19].change = true
                }
                if(TotalData.value.data[20].is  !==  Createdata.value.data[36].is){
                    TotalData.value.data[20].change = true
                }
                if(TotalData.value.data[21].is  !==  Createdata.value.data[27].is){
                    TotalData.value.data[21].change = true
                }
                if(TotalData.value.data[22].is  !==  Createdata.value.data[28].is){
                    TotalData.value.data[22].change = true
                }
                if(TotalData.value.data[23].is  !==  Createdata.value.data[29].is){
                    TotalData.value.data[23].change = true
                }
                if(TotalData.value.data[24].is  !==  Createdata.value.data[24].is){
                    TotalData.value.data[24].change = true
                }
                if(TotalData.value.data[25].is  !==  Createdata.value.data[25].is){
                    TotalData.value.data[25].change = true
                }
                if(TotalData.value.data[26].is  !==  Createdata.value.data[26].is){
                    TotalData.value.data[26].change = true
                }

            }

            const TotalCalculate = (buffArr,equipArr) =>{
            //  先複製最初載入的data
            TotalData.value.data.forEach(item=>{
                if(item.idx === 0) return item.is = "-"
                item.is = 0
            })
            // 職業
            TotalData.value.data[0].is  = Createdata.value.data[0].is
            // 等級
            TotalData.value.data[1].is  = Createdata.value.data[2].is
            // ARC、AUT符數
            TotalData.value.data[2].is  = Createdata.value.data[10].is
            TotalData.value.data[3].is  = Createdata.value.data[11].is
            // %STR ...
            TotalData.value.data[4].is  = Math.round(Createdata.value.data[20].is * 100)
            TotalData.value.data[5].is  = Math.round(Createdata.value.data[21].is * 100)
            TotalData.value.data[6].is  = Math.round(Createdata.value.data[22].is * 100)
            TotalData.value.data[7].is  = Math.round(Createdata.value.data[23].is * 100)
            // totalStr ...
            TotalData.value.data[8].is  =   Math.ceil((1 + Createdata.value.data[20].is) * (Createdata.value.data[16].is) + (Createdata.value.data[12].is) )
            TotalData.value.data[9].is  =   Math.ceil((1 + Createdata.value.data[21].is) * (Createdata.value.data[17].is) + (Createdata.value.data[13].is) )
            TotalData.value.data[10].is  =  Math.ceil((1 + Createdata.value.data[22].is) * (Createdata.value.data[18].is) + (Createdata.value.data[14].is) )
            TotalData.value.data[11].is  =  Math.ceil((1 + Createdata.value.data[23].is) * (Createdata.value.data[19].is) + (Createdata.value.data[15].is) )
            // %攻 總攻擊 
            TotalData.value.data[13].is  =  Createdata.value.data[4].is
            TotalData.value.data[12].is  =  Math.round((1 + TotalData.value.data[13].is * 0.01) * Createdata.value.data[34].is)
            if(isNaN(TotalData.value.data[12].is)) return TotalData.value.data[12].is = 0
           
            // 無視防禦
            TotalData.value.data[14].is  =  Createdata.value.data[7].is
            // 總傷害
            TotalData.value.data[15].is  =  Createdata.value.data[5].is
            // Boss傷害
            TotalData.value.data[16].is  =  Createdata.value.data[6].is
            // 一般怪物傷害
            TotalData.value.data[17].is  =  Createdata.value.data[30].is
            // 爆擊傷害
            TotalData.value.data[18].is  =  Createdata.value.data[9].is
            // 終傷
            TotalData.value.data[19].is  =  Createdata.value.data[8].is
            // 屬性無視
            TotalData.value.data[20].is  =  Createdata.value.data[36].is
            // 永恆、神秘、航海
            TotalData.value.data[21].is  =  Createdata.value.data[27].is
            TotalData.value.data[22].is  =  Createdata.value.data[28].is
            TotalData.value.data[23].is  =  Createdata.value.data[29].is
            // 漆黑、頂培、黎明
            TotalData.value.data[24].is  =  Createdata.value.data[24].is
            TotalData.value.data[25].is  =  Createdata.value.data[25].is
            TotalData.value.data[26].is  =  Createdata.value.data[26].is

            // 依據type類型 去累加buff能力 (無視先用arr堆疊 隨後用公式換算單一值)

            BuffDataReset()
            
            // 優先演算%主屬、%攻
            buffArr.forEach(item=>{
                if(item.type === "Per_atk"){
                    BuffData.value.data[9].is += item.val
                    return
                }
                if(item.type === "Mult"){
                    MultPerValFn(item.name)
                    return
                }
            })
            TotalData.value.data[13].is += BuffData.value.data[9].is
            BuffData.value.data[8].is  += Math.round((1 + TotalData.value.data[13].is * 0.01) * Createdata.value.data[34].is) - TotalData.value.data[12].is

          updateEquipSet()


          let equipPer_str = 0
          let equipPer_dex = 0
          let equipPer_int = 0
          let equipPer_luk = 0
          let equipPer_atk = 0

          let per_str_plus = 0
          let per_dex_plus = 0
          let per_int_plus = 0
          let per_luk_plus = 0

            equipArr.forEach(item=>{
                // %STR... %物
                equipPer_str += item.info[1].is
                equipPer_dex += item.info[3].is
                equipPer_int += item.info[5].is
                equipPer_luk += item.info[7].is
                equipPer_atk += item.info[9].is
            })
            EquipData.value.data[0].is = equipPer_str
            EquipData.value.data[1].is = equipPer_dex
            EquipData.value.data[2].is = equipPer_int
            EquipData.value.data[3].is = equipPer_luk
            EquipData.value.data[9].is = equipPer_atk

            TotalData.value.data[4].is +=  EquipData.value.data[0].is
            per_str_plus = Math.round((1 + TotalData.value.data[4].is * 0.01) * (Createdata.value.data[16].is) + (Createdata.value.data[12].is) )
            per_str_plus -= Math.round((1 + Createdata.value.data[20].is) * (Createdata.value.data[16].is) + (Createdata.value.data[12].is) )
            TotalData.value.data[8].is =   Math.round((1 + TotalData.value.data[4].is * 0.01) * (Createdata.value.data[16].is) + (Createdata.value.data[12].is) )
            EquipData.value.data[4].is =   TotalData.value.data[8].is -  Math.round((1 + Createdata.value.data[20].is) * (Createdata.value.data[16].is) + (Createdata.value.data[12].is) )

            TotalData.value.data[5].is +=  EquipData.value.data[1].is
            per_dex_plus = Math.round((1 + TotalData.value.data[5].is * 0.01) * (Createdata.value.data[17].is) + (Createdata.value.data[13].is) )
            per_dex_plus -=  Math.round((1 + Createdata.value.data[21].is) * (Createdata.value.data[17].is) + (Createdata.value.data[13].is) )
            TotalData.value.data[9].is =   Math.round((1 + TotalData.value.data[5].is * 0.01) * (Createdata.value.data[17].is) + (Createdata.value.data[13].is) )
            EquipData.value.data[5].is =   TotalData.value.data[9].is - Math.round((1 + Createdata.value.data[21].is) * (Createdata.value.data[17].is) + (Createdata.value.data[13].is) )

            TotalData.value.data[6].is +=  EquipData.value.data[2].is
            per_int_plus = Math.round((1 + TotalData.value.data[6].is * 0.01) * (Createdata.value.data[18].is) + (Createdata.value.data[14].is) )
            per_int_plus -= Math.round((1 + Createdata.value.data[22].is) * (Createdata.value.data[18].is) + (Createdata.value.data[14].is) )
            TotalData.value.data[10].is =  Math.round((1 + TotalData.value.data[6].is * 0.01) * (Createdata.value.data[18].is) + (Createdata.value.data[14].is) )
            EquipData.value.data[6].is = TotalData.value.data[10].is - Math.round((1 + Createdata.value.data[22].is) * (Createdata.value.data[18].is) + (Createdata.value.data[14].is) )

            TotalData.value.data[7].is +=  EquipData.value.data[3].is
            per_luk_plus = Math.round((1 + TotalData.value.data[7].is * 0.01) * (Createdata.value.data[19].is) + (Createdata.value.data[15].is) )
            per_luk_plus -= Math.round((1 + Createdata.value.data[23].is) * (Createdata.value.data[19].is) + (Createdata.value.data[15].is) )
            TotalData.value.data[11].is =  Math.round((1 + TotalData.value.data[7].is * 0.01) * (Createdata.value.data[19].is) + (Createdata.value.data[15].is) )
            EquipData.value.data[7].is = TotalData.value.data[11].is - Math.round((1 + Createdata.value.data[23].is) * (Createdata.value.data[19].is) + (Createdata.value.data[15].is) )


            TotalData.value.data[13].is += EquipData.value.data[9].is
            EquipData.value.data[8].is = Math.round((1 + TotalData.value.data[13].is * 0.01) * Createdata.value.data[34].is) - TotalData.value.data[12].is - BuffData.value.data[8].is


            // 等級->主屬
            TotalData.value.data[1].is
            EquipLvStats.value = 0
            equipArr.forEach(item=>{
                // Eat_str... 
                EquipData.value.data[4].is += Math.round(item.info[2].is * (1 + TotalData.value.data[4].is * 0.01))
                EquipData.value.data[5].is += Math.round(item.info[4].is * (1 + TotalData.value.data[5].is * 0.01))
                EquipData.value.data[6].is += Math.round(item.info[6].is * (1 + TotalData.value.data[6].is * 0.01))
                EquipData.value.data[7].is += Math.round(item.info[8].is * (1 + TotalData.value.data[7].is * 0.01))
                EquipData.value.data[8].is += Math.round(item.info[10].is * (1 + TotalData.value.data[13].is * 0.01))

                // 等級->主屬
                EquipLvStats.value += item.info[16].is 
            })
            // console.log('每9等+ :',EquipLvStats.value);
            if(StatsShow.value === 'strdex'){
                EquipData.value.data[4].is += Math.round(EquipLvStats.value  * (Math.floor(TotalData.value.data[1].is / 9)) * (1 + TotalData.value.data[4].is * 0.01))
            }
            if(StatsShow.value === 'dexstr'){
                EquipData.value.data[5].is += Math.round(EquipLvStats.value  * (Math.floor(TotalData.value.data[1].is / 9)) * (1 + TotalData.value.data[5].is * 0.01))
            }
            if(StatsShow.value === 'intluk'){
                EquipData.value.data[6].is += Math.round(EquipLvStats.value  * (Math.floor(TotalData.value.data[1].is / 9)) * (1 + TotalData.value.data[6].is * 0.01))
            }
            if(StatsShow.value === 'lukdex'){
                EquipData.value.data[7].is += Math.round(EquipLvStats.value  * (Math.floor(TotalData.value.data[1].is / 9)) * (1 + TotalData.value.data[7].is * 0.01))
            }
            if(StatsShow.value === 'lukdexstr'){
                EquipData.value.data[7].is += Math.round(EquipLvStats.value  * (Math.floor(TotalData.value.data[1].is / 9)) * (1 + TotalData.value.data[7].is * 0.01))
            }

            buffArr.forEach(item=>{
                let plusVal = 0
                if(item.type === "Mult"){
                    MultSkillValFn(item.name)
                    return
                }
      
                if(item.type === "Eat_Stats"){
                    BuffData.value.data[4].is += Math.round((1 + TotalData.value.data[4].is *0.01) * item.val)
                    BuffData.value.data[5].is += Math.round((1 + TotalData.value.data[5].is *0.01) * item.val)
                    BuffData.value.data[6].is += Math.round((1 + TotalData.value.data[6].is *0.01) * item.val)
                    BuffData.value.data[7].is += Math.round((1 + TotalData.value.data[7].is *0.01) * item.val)
                    return
                }
                if(item.type ==='Eat_str'){
                    if(item.name ===  '力量藥水'){
                        plusVal = item.val * 3
                        BuffData.value.data[4].is += Math.round((1 + TotalData.value.data[4].is *0.01) * plusVal)
                        return
                    }
                    BuffData.value.data[4].is += Math.round((1 + TotalData.value.data[4].is *0.01) * item.val)
                    return
                }
                if(item.type ==='Eat_dex'){
                    if(item.name ===  '敏捷藥水'){
                        plusVal = item.val * 3
                        BuffData.value.data[5].is += Math.round((1 + TotalData.value.data[5].is *0.01) * plusVal)
                        return
                    }
                    BuffData.value.data[5].is += Math.round((1 + TotalData.value.data[5].is *0.01) * item.val)
                    return
                }
                if(item.type ==='Eat_int'){
                    if(item.name ===  '智力藥水'){
                        plusVal = item.val * 3
                        BuffData.value.data[6].is += Math.round((1 + TotalData.value.data[6].is *0.01) * plusVal)
                        return
                    }
                    BuffData.value.data[6].is += Math.round((1 + TotalData.value.data[6].is *0.01) * item.val)
                    return
                }
                if(item.type ==='Eat_luk'){
                    if(item.name ===  '幸運藥水'){
                        plusVal = item.val * 3
                        BuffData.value.data[7].is += Math.round((1 + TotalData.value.data[7].is *0.01) * plusVal)
                        return
                    }
                    BuffData.value.data[7].is += Math.round((1 + TotalData.value.data[7].is *0.01) * item.val)
                    return
                }

                if(item.type === "Unique_atk"){
                    // console.log(TotalData.value.data[13].is);
                    BuffData.value.data[8].is +=  Math.round((1 + TotalData.value.data[13].is *0.01  )  * item.val)
                    return
                }
                if(item.type === "Per_damage"){
                    if(item.name === '公會總傷'){
                        plusVal = item.val * 2
                        BuffData.value.data[11].is += plusVal
                        return
                    }
                    if(item.name === '天破傳授(LV2)' && Createdata.value.data[0].is === '天使破壞者'){
                        plusVal = item.val * 2
                        BuffData.value.data[11].is += plusVal
                        return
                    }                    

                    BuffData.value.data[11].is += item.val
                    return
                    
                }
                if(item.type === "Per_boss"){
                    if(item.name === '公會B傷'){
                        plusVal = item.val * 2
                        BuffData.value.data[12].is  += plusVal
                        return
                    }
                    BuffData.value.data[12].is += item.val
                    return
                }
                if(item.type === "Per_normal_damage"){
                    BuffData.value.data[13].is += item.val
                    return
                }
                if(item.type === "Per_critical"){
                    if(item.name === '公會爆傷'){
                        plusVal = item.val * 2
                        BuffData.value.data[14].is += plusVal
                        return
                    }
                    BuffData.value.data[14].is += item.val
                    return
                }
                if(item.type === "Per_ignore"){
                    if(item.name === '公會無視'){
                        plusVal = item.val * 2
                        BuffData.value.data[10].is = IgnoreFn(BuffData.value.data[10].is, plusVal)
                        return  
                    }
                    BuffData.value.data[10].is = IgnoreFn(BuffData.value.data[10].is, item.val)
                    return
                }
                if(item.type === "Attr_ignore"){
                    BuffData.value.data[16].is = IgnoreFn(BuffData.value.data[16].is, item.val)
                    return
                }
                if(item.type === "Active_per_findamage"){
                    BuffData.value.data[15].is = findamageFn(BuffData.value.data[15].is, item.val)
                    return
                }                
            })
            
            // 根據set 更新數值
            
            EquipData.value.data[4].is += Math.round( EquipSetVal.value.data[0].is * (1 + TotalData.value.data[4].is * 0.01))
            EquipData.value.data[5].is += Math.round( EquipSetVal.value.data[0].is * (1 + TotalData.value.data[5].is * 0.01))
            EquipData.value.data[6].is += Math.round( EquipSetVal.value.data[0].is * (1 + TotalData.value.data[6].is * 0.01))
            EquipData.value.data[7].is += Math.round( EquipSetVal.value.data[0].is * (1 + TotalData.value.data[7].is * 0.01))
            EquipData.value.data[8].is +=  Math.round(EquipSetVal.value.data[1].is * (1 + TotalData.value.data[13].is * 0.01))
            EquipData.value.data[12].is += EquipSetVal.value.data[2].is
            EquipData.value.data[13].is += EquipSetVal.value.data[4].is
            EquipData.value.data[13].is = roundTo(EquipData.value.data[13].is,2)

            // 因為%屬、%攻交互影響關係 須先扣除 equipPer_stats 、 per_stats_plus  才能演算出裝備增幅
            TotalData.value.data[4].is  -= equipPer_str 
            TotalData.value.data[5].is  -= equipPer_dex 
            TotalData.value.data[6].is  -= equipPer_int 
            TotalData.value.data[7].is  -= equipPer_luk   
            TotalData.value.data[13].is -= equipPer_atk
            TotalData.value.data[8].is  += BuffData.value.data[4].is - per_str_plus 
            TotalData.value.data[9].is  += BuffData.value.data[5].is - per_dex_plus
            TotalData.value.data[10].is += BuffData.value.data[6].is - per_int_plus 
            TotalData.value.data[11].is += BuffData.value.data[7].is - per_luk_plus 
            TotalData.value.data[12].is += BuffData.value.data[8].is 
            TotalData.value.data[14].is =  IgnoreFn(TotalData.value.data[14].is, BuffData.value.data[10].is)
            TotalData.value.data[15].is += BuffData.value.data[11].is 
            TotalData.value.data[16].is += BuffData.value.data[12].is 
            TotalData.value.data[17].is += BuffData.value.data[13].is 
            TotalData.value.data[18].is += BuffData.value.data[14].is 
            TotalData.value.data[19].is =  findamageFn(TotalData.value.data[19].is, BuffData.value.data[15].is)
            TotalData.value.data[20].is += BuffData.value.data[16].is
            let BuffstandardVal  = 0 
            BuffstandardVal = equivalentFn()
            //  裝備無視計算 
            EquipData.value.data[10].is = 0
            EquipData.value.data[10].is = IgnoreFn(EquipData.value.data[10].is, EquipSetVal.value.data[3].is)
            let equipIgnoreArr = []
            let equipMinusIgnore = EquipSetVal.value.data[5].is 
            equipArr.forEach(item=>{    
                if(item.info[11].is > 0 || item.info[18].is > 0){
                    equipIgnoreArr.unshift(item.info[11].is)
                    equipIgnoreArr.unshift(item.info[18].is)
                } 
                if(item.info[11].is < 0 || item.info[18].is < 0){
                    equipIgnoreArr.push(item.info[11].is)
                    equipIgnoreArr.push(item.info[18].is)
                } 
                equipIgnoreArr = equipIgnoreArr.filter(val=>{
                    return val !== 0
                })
            })
            console.log('無視清單',equipIgnoreArr);
            equipIgnoreArr.forEach(val=>{
                if(val > 0){
                    EquipData.value.data[10].is = IgnoreFn(EquipData.value.data[10].is,val)
                }
                if(val < 0){
                    equipMinusIgnore = IgnoreFn(equipMinusIgnore, -val)
                }
               
            })
            TotalData.value.data[14].is = IgnoreFn(TotalData.value.data[14].is, EquipData.value.data[10].is)
            TotalData.value.data[14].is = IgnoreFn(TotalData.value.data[14].is, -equipMinusIgnore)

            // 無視的顯示: 讓相抵結果看起來正常
            EquipData.value.data[10].is -= equipMinusIgnore

            // 不吃%主屬值
            let Not_eat_stats = 0
            equipArr.forEach(item=>{
                Not_eat_stats += item.info[22].is
            })

            
            TotalData.value.data[4].is  +=  equipPer_str 
            TotalData.value.data[5].is  +=  equipPer_dex 
            TotalData.value.data[6].is  +=  equipPer_int 
            TotalData.value.data[7].is  +=  equipPer_luk   
            TotalData.value.data[13].is +=  equipPer_atk

            if(StatsShow.value === 'strdex'){
                EquipData.value.data[4].is  += Not_eat_stats
            }
            if(StatsShow.value === 'dexstr'){
                EquipData.value.data[5].is  += Not_eat_stats
            }
            if(StatsShow.value === 'intluk'){
                EquipData.value.data[6].is  += Not_eat_stats
            }
            if(StatsShow.value === 'lukdex' || StatsShow.value === 'lukdexstr' ){
                EquipData.value.data[7].is  += Not_eat_stats
            }
            TotalData.value.data[8].is  +=  EquipData.value.data[4].is
            TotalData.value.data[9].is  +=  EquipData.value.data[5].is 
            TotalData.value.data[10].is +=  EquipData.value.data[6].is 
            TotalData.value.data[11].is +=  EquipData.value.data[7].is 
            TotalData.value.data[12].is +=  EquipData.value.data[8].is 
            
            TotalData.value.data[15].is +=  EquipData.value.data[11].is 
            TotalData.value.data[16].is +=  EquipData.value.data[12].is
            TotalData.value.data[17].is +=  EquipData.value.data[14].is
            TotalData.value.data[18].is +=  EquipData.value.data[13].is   
            TotalData.value.data[19].is  =  Createdata.value.data[8].is
            TotalData.value.data[19].is +=  EquipData.value.data[15].is
            TotalData.value.data[19].is =   findamageFn(TotalData.value.data[19].is, BuffData.value.data[15].is)

            
            TotalData.value.data[21].is += EquipData.value.data[16].is
            TotalData.value.data[22].is += EquipData.value.data[17].is
            TotalData.value.data[23].is += EquipData.value.data[18].is
            TotalData.value.data[24].is += EquipData.value.data[19].is
            TotalData.value.data[25].is += EquipData.value.data[20].is
            TotalData.value.data[26].is += EquipData.value.data[21].is
            
            let PlusEquipstandardVal = 0
            PlusEquipstandardVal = equivalentFn()
            equipGrow.value =  handGrowVal(BuffstandardVal,PlusEquipstandardVal)
            TotalDataStatus()
            }

            const skillVersion = ref("-")

            const equipGrow = ref(0)
            const findataRender = computed(()=>{
                let buffArr = []
                BuffInputCheck()
                buffArr = BuffItemMerge()
                buffArr = buffToolConflict(buffArr)
                let equipArr = EquipDatabaseRender.value
                
                TotalCalculate(buffArr,equipArr)

                let result = 
                {total:[
                    {name:"職業",idx: 0 , key:"Job" ,  is :   TotalData.value.data[0].is, change: false},
                    {name:"等級",idx: 1 , key:"Level" , is : TotalData.value.data[1].is, change: false},
                    {name:"ARC符數",idx: 2 , key:"Arc" , is :TotalData.value.data[2].is, change: false},
                    {name:"AUT符數",idx: 3 , key:"Aut" , is :TotalData.value.data[3].is, change: false},
                    {name:"%STR",idx: 4 , key:"Per_str" , is : `${TotalData.value.data[4].is}%`, change: TotalData.value.data[4].change},
                    {name:"%DEX",idx: 5 , key:"Per_dex" , is : `${TotalData.value.data[5].is}%`, change: TotalData.value.data[5].change},
                    {name:"%INT",idx: 6 , key:"Per_int" , is : `${TotalData.value.data[6].is}%`, change: TotalData.value.data[6].change},
                    {name:"%LUK",idx: 7 , key:"Per_luk" , is : `${TotalData.value.data[7].is}%`, change: TotalData.value.data[7].change},
                    {name:"Totle_STR",idx: 8 , key:"Totle_str" , is : TotalData.value.data[8].is, change: TotalData.value.data[8].change},
                    {name:"Totle_DEX",idx: 9 , key:"Totle_dex" , is : TotalData.value.data[9].is, change: TotalData.value.data[9].change},
                    {name:"Totle_INT",idx: 10 , key:"Totle_int" , is :TotalData.value.data[10].is, change: TotalData.value.data[10].change},
                    {name:"Totle_LUK",idx: 11 , key:"Totle_luk" , is :TotalData.value.data[11].is, change: TotalData.value.data[11].change},
                    {name:"總攻擊力",idx: 12 , key:"Atk" , is :  TotalData.value.data[12].is, change: TotalData.value.data[12].change},
                    {name:"%攻擊力",idx: 13 , key:"Per_atk" , is :     `${TotalData.value.data[13].is}%`, change: TotalData.value.data[13].change},
                    {name:"%無視防禦",idx: 14 , key:"Per_ignore" , is: `${TotalData.value.data[14].is}%`, change: TotalData.value.data[14].change},
                    {name:"%總傷害",idx: 15 , key:"Per_damage" , is :  `${TotalData.value.data[15].is}%`, change: TotalData.value.data[15].change},
                    {name:"%Boss傷害",idx: 16 , key:"Per_boss" , is :  `${TotalData.value.data[16].is}%`, change: TotalData.value.data[16].change},
                    {name:"%一般怪物傷害",idx: 17 , key:"Per_normal_damage" , is :`${ TotalData.value.data[17].is}%`, change: TotalData.value.data[17].change},
                    {name:"%爆擊傷害",idx: 18 , key:"Per_critical" , is : `${TotalData.value.data[18].is}%`, change: TotalData.value.data[18].change},
                    {name:"終傷",idx: 19 , key:"Passive_per_findamage" , is : `${TotalData.value.data[19].is}%`, change: TotalData.value.data[19].change},
                    {name:"屬性無視",idx: 20 , key:"Attr_ignore" , is : `${TotalData.value.data[20].is}%`, change: TotalData.value.data[20].change},
                    {name:"永恆set數",idx: 21 , key:"Eternal_set" , is : TotalData.value.data[21].is, change: TotalData.value.data[21].change},
                    {name:"神秘set數",idx: 22 , key:"Mystical_set" , is :TotalData.value.data[22].is, change: TotalData.value.data[22].change},
                    {name:"航海set數",idx: 23 , key:"Nautical_set" , is :TotalData.value.data[23].is, change: TotalData.value.data[23].change},
                    {name:"漆黑set數",idx: 24 , key:"Black_set" , is : TotalData.value.data[24].is, change: TotalData.value.data[24].change},
                    {name:"頂培set數",idx: 25 , key:"Pelord_set" , is :TotalData.value.data[25].is, change: TotalData.value.data[25].change},
                    {name:"黎明set數",idx: 26 , key:"Dawn_set" , is :  TotalData.value.data[26].is, change: TotalData.value.data[26].change},
                ],
                buff:[
                    {name:"%STR",idx: 0 , key:"Per_str" , is : `+${BuffData.value.data[0].is}%`},
                    {name:"%DEX",idx: 1 , key:"Per_dex" , is : `+${BuffData.value.data[1].is}%`},
                    {name:"%INT",idx: 2 , key:"Per_int" , is : `+${BuffData.value.data[2].is}%`},
                    {name:"%LUK",idx: 3 , key:"Per_luk" , is : `+${BuffData.value.data[3].is}%`},                    
                    {name:"力量總增值",idx: 4 , key:"Eat_str" , is :`+${BuffData.value.data[4].is}`},
                    {name:"敏捷總增值",idx: 5 , key:"Eat_dex" , is :`+${BuffData.value.data[5].is}`},
                    {name:"智力總增值",idx: 6 , key:"Eat_int" , is :`+${BuffData.value.data[6].is}`},
                    {name:"幸運總增值",idx: 7 , key:"Eat_luk" , is :`+${BuffData.value.data[7].is}`},                   
                    {name:"吃%攻擊力值",idx: 8 , key:"Unique_atk" , is :`+${BuffData.value.data[8].is}`},
                    {name:"%攻擊力",idx: 9 , key:"Per_atk" , is : `+${BuffData.value.data[9].is}%`},
                    {name:"%無視防禦",idx: 10 , key:"Per_ignore" , is : `+${BuffData.value.data[10].is}%`},
                    {name:"%總傷害",idx: 11 , key:"Per_damage" , is :`+${BuffData.value.data[11].is}%`},
                    {name:"%Boss傷害",idx: 12 , key:"Per_boss" , is : `+${BuffData.value.data[12].is}%`},
                    {name:"%一般怪物傷害",idx: 13 , key:"Per_normal_damage" , is : `+${BuffData.value.data[13].is}%`},
                    {name:"%爆擊傷害",idx: 14 , key:"Per_critical" , is : `+${BuffData.value.data[14].is}%`},
                    {name:"主動終傷",idx: 15 , key:"Active_per_findamage" , is : `+${BuffData.value.data[15].is}%`},
                    {name:"屬性無視",idx: 16 , key:"Attr_ignore" , is : `+${BuffData.value.data[16].is}%`},
                ],
                equip:[
                    {name:"%STR",idx: 0 , key:"Per_str" , is : `${EquipData.value.data[0].is}%`},
                    {name:"%DEX",idx: 1 , key:"Per_dex" , is : `${EquipData.value.data[1].is}%`},
                    {name:"%INT",idx: 2 , key:"Per_int" , is : `${EquipData.value.data[2].is}%`},
                    {name:"%LUK",idx: 3 , key:"Per_luk" , is : `${EquipData.value.data[3].is}%`},                    
                    {name:"力量總增值",idx: 4 , key:"Eat_str" , is : `${EquipData.value.data[4].is}`},
                    {name:"敏捷總增值",idx: 5 , key:"Eat_dex" , is : `${EquipData.value.data[5].is}`},
                    {name:"智力總增值",idx: 6 , key:"Eat_int" , is : `${EquipData.value.data[6].is}`},
                    {name:"幸運總增值",idx: 7 , key:"Eat_luk" , is : `${EquipData.value.data[7].is}`},                   
                    {name:"吃%攻擊力值",idx: 8 , key:"Unique_atk" , is : `${EquipData.value.data[8].is}`},
                    {name:"%攻擊力",idx: 9 , key:"Per_atk" , is : `${EquipData.value.data[9].is}%`},
                    {name:"%無視防禦",idx: 10 , key:"Per_ignore" , is : `${EquipData.value.data[10].is}%`},
                    {name:"%總傷害",idx: 11 , key:"Per_damage" , is : `${EquipData.value.data[11].is}%`},
                    {name:"%Boss傷害",idx: 12 , key:"Per_boss" , is : `${EquipData.value.data[12].is}%`},
                    {name:"%爆擊傷害",idx: 13 , key:"Per_critical" , is : `${EquipData.value.data[13].is}%`},
                    {name:"%一般怪物傷害",idx: 14 , key:"Per_normal_damage" , is : `${EquipData.value.data[14].is}%`},
                    {name:"被動終傷",idx: 15 , key:"Passive_per_findamage" , is : `${EquipData.value.data[15].is}%`},
                    {name:"永恆set數",idx: 16 , key:"Eternal_set" , is : `${EquipData.value.data[16].is}`},
                    {name:"神秘set數",idx: 17 , key:"Mystical_set" , is :`${EquipData.value.data[17].is}`},
                    {name:"航海set數",idx: 18 , key:"Nautical_set" , is :`${EquipData.value.data[18].is}`},
                    {name:"漆黑set數",idx: 19 , key:"Black_set" , is : `${EquipData.value.data[19].is}`},
                    {name:"頂培set數",idx: 20 , key:"Pelord_set" , is :`${EquipData.value.data[20].is}`},
                    {name:"黎明set數",idx: 21 , key:"Dawn_set" , is :  `${EquipData.value.data[21].is}`},               
                ]
            }
            if(RegionIs.value.key === 'compare'){
                equivalentFn()
            }

            return result
            })
            

            // bossDefance
            const bossDefance = ref(300)
            const handbossDefance = () =>{
                if(bossDefance.value === 380) return bossDefance.value = 300
                if(bossDefance.value === 300) return bossDefance.value = 380
            }
            
            // controlList
            const controlList = reactive({data:[
                {is:0, idx:0 ,type:"str", show:true, key: "STR"},
                {is:0, idx:1 ,type:"str", show:true, key: "%STR"},
                {is:0, idx:2 ,type:"dex", show:true, key: "DEX"},
                {is:0, idx:3 ,type:"dex", show:true, key: "%DEX"},
                {is:0, idx:4 ,type:"int", show:true, key: "%INT"},
                {is:0, idx:5 ,type:"int", show:true, key: "INT"},
                {is:0, idx:6 ,type:"luk", show:true, key: "%LUK"},
                {is:0, idx:7 ,type:"luk", show:true, key: "LUK"},                
                {is:0, idx:8 ,type:"none", show:true, key: "全屬"},
                {is:0, idx:9 ,type:"must", show:true, key: "%全屬"},
                {is:0, idx:10 ,type:"must", show:true, key: "攻擊力"},
                {is:0, idx:11 ,type:"must", show:true, key: "%攻"},
                {is:0, idx:12 ,type:"must", show:true, key: "%總傷"},
                {is:0, idx:13 ,type:"must", show:true, key: "%B傷"},
                {is:0, idx:14 ,type:"must", show:true, key: "%爆傷"},
                {is:0, idx:15 ,type:"must", show:true, key: "%無視"},
            ]})
            const controlKeyIs = ref('%全屬')
            const controlKeyval = ref(0)
            const controlListBool = ref(false)

            const mustNum = computed(()=>{
                let n1 = controlKeyval.value
                if(isNaN(n1)){
                    controlKeyval.value = 0
                    alert('請輸入數字')
                }
            })
            const handcontrolList = (el) =>{
                let key = el.currentTarget.dataset.key 
                if(key === 'change'){
                    controlListBool.value = !controlListBool.value
                    return
                }
                if(key === 'cancel'){
                    controlListBool.value = false
                    return
                }
                controlList.data.forEach(item=>{
                    if(item.key === key){
                        controlKeyIs.value = key
                        controlListBool.value = false
                        controlKeyval.value = 0
                    }
                })
                
            }

            const controlListRender = computed(()=>{
                controlList.data.forEach(item=>{
                    item.show = true
                    if(item.type === 'none'){
                        item.show = false
                    }
                })

                if(StatsShow.value === 'strdex' || StatsShow.value === 'dexstr'){
                    controlList.data.forEach(item=>{
                        if(item.type ==='int' || item.type ==='luk'){
                            item.show = false
                        }
                    })
                }
                if(StatsShow.value === 'intluk'){
                    controlList.data.forEach(item=>{
                        if(item.type ==='dex' || item.type ==='str'){
                            item.show = false
                        }
                    })
                }
                if(StatsShow.value === 'lukdex'){
                    controlList.data.forEach(item=>{
                        if(item.type ==='int' || item.type ==='str'){
                            item.show = false
                        }
                    })
                }
                if(StatsShow.value === 'lukdexstr' || StatsShow.value ==='zenon'){
                    controlList.data.forEach(item=>{
                        if(item.type ==='int'){
                            item.show = false
                        }
                    })
                }
                return controlList.data
            })
            const equivalentGrow = ref(0)
            const handGrowVal = (standard,change)=>{
                // const roundTo = function( num, decimal ) { return Math.round( ( num + Number.EPSILON ) * Math.pow( 10, decimal ) ) / Math.pow( 10, decimal ); }
                return `${roundTo( ((change / standard) -1)* 100,3) }%`
            }
            // equivalent
            const equivalentFn = ()=>{
                if(StatsShow.value === 0) return
                // const roundTo = function( num, decimal ) { return Math.round( ( num + Number.EPSILON ) * Math.pow( 10, decimal ) ) / Math.pow( 10, decimal ); }
                let Total_mainStats = 0
                let Total_subStats = 0
                let Total_subStats2 = 0
                let Per_mainStats = 0
                let Per_subStats = 0
                let Per_subStats2 = 0
                let Unique_main = 0
                let Unique_sub = 0
                let Unique_sub2 = 0
                let Eat_main = 0
                let Eat_sub = 0
                let Eat_sub2 = 0
                let standardVal = 0.1
                let mainTxt = ''
                let subTxt = ''
                let subTxt2 = ''
                let Unique_atk = 0
                // 判定主屬、副屬
                if(StatsShow.value === 'strdex'){
                    Per_mainStats = TotalData.value.data[4].is
                    Per_subStats = TotalData.value.data[5].is
                    Total_mainStats = TotalData.value.data[8].is
                    Total_subStats = TotalData.value.data[9].is
                    Unique_main = Createdata.value.data[12].is
                    Unique_sub = Createdata.value.data[13].is
                    mainTxt = '%STR'
                    subTxt = '%DEX'                    
                }
                if(StatsShow.value === 'dexstr'){
                    Per_mainStats = TotalData.value.data[5].is
                    Per_subStats = TotalData.value.data[4].is
                    Total_mainStats = TotalData.value.data[9].is
                    Total_subStats = TotalData.value.data[8].is
                    Unique_main = Createdata.value.data[13].is
                    Unique_sub = Createdata.value.data[12].is
                    mainTxt = '%DEX'
                    subTxt = '%STR'
                }
                if(StatsShow.value === 'intluk'){
                    Per_mainStats = TotalData.value.data[6].is
                    Per_subStats = TotalData.value.data[7].is
                    Total_mainStats = TotalData.value.data[10].is
                    Total_subStats = TotalData.value.data[11].is
                    Unique_main = Createdata.value.data[14].is
                    Unique_sub = Createdata.value.data[15].is
                    mainTxt = '%INT'
                    subTxt = '%LUK'                       
                }
                if(StatsShow.value === 'lukdex'){
                    Per_mainStats = TotalData.value.data[7].is
                    Per_subStats = TotalData.value.data[5].is
                    Total_mainStats = TotalData.value.data[11].is
                    Total_subStats = TotalData.value.data[9].is
                    Unique_main = Createdata.value.data[15].is
                    Unique_sub = Createdata.value.data[13].is
                    mainTxt = '%LUK'
                    subTxt = '%DEX'                      
                }
                if(StatsShow.value === 'lukdexstr'){
                    Per_mainStats = TotalData.value.data[7].is
                    Per_subStats = TotalData.value.data[5].is
                    Per_subStats2 = TotalData.value.data[4].is
                    Total_mainStats = TotalData.value.data[11].is
                    Total_subStats = TotalData.value.data[9].is 
                    Total_subStats2 = TotalData.value.data[8].is
                    Unique_main = Createdata.value.data[15].is
                    Unique_sub = Createdata.value.data[13].is
                    Unique_sub2 = Createdata.value.data[12].is
                    mainTxt = '%LUK'
                    subTxt = '%DEX'                       
                    subTxt2 = '%STR'                       
                }
                if(StatsShow.value === 'zenon'){
                    // 捷諾屬性相關尚未開發
                    let zenon_per_str = TotalData.value.data[4].is
                    let zenon_per_dex = TotalData.value.data[5].is
                    let zenon_per_luk = TotalData.value.data[7].is
                    Unique_main = Createdata.value.data[12].is

                    Total_mainStats = TotalData.value.data[11].is + TotalData.value.data[9].is + TotalData.value.data[8].is
          
                }
                Eat_main = (Total_mainStats - Unique_main) / ( 1 + Per_mainStats * 0.01)
                Eat_sub = (Total_subStats - Unique_sub) / ( 1 + Per_subStats * 0.01)
                Eat_sub2 = (Total_subStats2 - Unique_sub2) / ( 1 + Per_subStats2 * 0.01)

                
                // 計算基準值
                // boss:  武器係數 *  (4 * 主屬 + 副屬) * (總攻擊) * (1 + %終傷 ) * (1.35 + 爆傷)   * (1 + 總傷 + B傷)  *  ( 1 - ( 1 - 裝備無視) * boss防禦 )  * (1 - (1- 屬性無視) * boss屬性防禦)

                // 一般怪: 武器係數 *  (4 * 主屬 + 副屬) * (總攻擊) * (1 + %終傷)  * (1.35 + 爆傷)   * (1 + 總傷 + 一般怪傷)   
                // console.log('計算時所套用的攻擊力L',TotalData.value.data[12].is);   
                standardVal *= ( 4 * Total_mainStats + Total_subStats + Total_subStats2) 
                standardVal *= TotalData.value.data[12].is
                standardVal *= roundTo((1 +  TotalData.value.data[19].is * 0.01),4)
                standardVal *= roundTo((1.35 +  TotalData.value.data[18].is * 0.01),4)
                if(CreateAim.value === 'boss'){
                    standardVal *= roundTo((1 +  (TotalData.value.data[15].is  + TotalData.value.data[16].is) * 0.01),2)
                    standardVal *= roundTo(( 1 - ( (1 -  TotalData.value.data[14].is *0.01)  * bossDefance.value * 0.01 )),4)
                }
                if(CreateAim.value === 'exp'){
                    standardVal *= roundTo((1 +  (TotalData.value.data[15].is  + TotalData.value.data[17].is) * 0.01),2)
                }
                standardVal = roundTo(standardVal,4)

                // render 對應等值
               if(RegionIs.value.key === 'compare'){
                // 總增幅 - %全屬
                let changeVal = standardVal
                controlKeyval.value = Number(controlKeyval.value)
                if(controlKeyIs.value === '%全屬'){
                    changeVal = standardVal / ( 4 * Total_mainStats + Total_subStats + Total_subStats2) 
                    Total_mainStats = Eat_main * (1 + (Per_mainStats + controlKeyval.value) *0.01) + Unique_main
                    Total_subStats = Eat_sub * (1 + (Per_subStats + controlKeyval.value) *0.01) + Unique_sub
                    Total_subStats2 = Eat_sub2 * (1 + (Per_subStats2 + controlKeyval.value) *0.01) + Unique_sub2
                    changeVal *=  ( 4 * Total_mainStats + Total_subStats + Total_subStats2) 
                }
                // 總增幅 - 全屬
                // if(controlKeyIs.value === '全屬'){
                //     changeVal = standardVal / ( 4 * Total_mainStats + Total_subStats + Total_subStats2) 
                //     Total_mainStats = (Eat_main + controlKeyval.value) * (1 + (Per_mainStats) *0.01) + Unique_main
                //     Total_subStats = (Eat_sub + controlKeyval.value) * (1 + (Per_subStats) *0.01) + Unique_sub
                //     Total_subStats2 = (Eat_sub2 + controlKeyval.value) * (1 + (Per_subStats2) *0.01) + Unique_sub2
                //     changeVal *=  ( 4 * Total_mainStats + Total_subStats + Total_subStats2) 
                // }
                // 總增幅 - %主屬
                if(controlKeyIs.value === mainTxt){
                    changeVal = standardVal / ( 4 * Total_mainStats + Total_subStats + Total_subStats2 ) 
                    Total_mainStats = Eat_main * (1 + (Per_mainStats + controlKeyval.value) *0.01) + Unique_main
                    changeVal *=  ( 4 * Total_mainStats + Total_subStats + Total_subStats2 ) 
                }
                // 總增幅 - %副屬
                if(controlKeyIs.value === subTxt){
                    changeVal = standardVal / ( 4 * Total_mainStats + Total_subStats + Total_subStats2) 
                    Total_subStats = Eat_sub * (1 + (Per_subStats + controlKeyval.value) *0.01) + Unique_sub
                    changeVal *=  ( 4 * Total_mainStats + Total_subStats + Total_subStats2) 
                }
                if(controlKeyIs.value === subTxt2){
                    changeVal = standardVal / ( 4 * Total_mainStats + Total_subStats + Total_subStats2) 
                    Total_subStats2 = Eat_sub * (1 + (Per_subStats2 + controlKeyval.value) *0.01) + Unique_sub2
                    changeVal *=  ( 4 * Total_mainStats + Total_subStats + Total_subStats2) 
                }
                // 總增幅 - 主屬
                if(controlKeyIs.value === mainTxt.slice(1)){
                    changeVal = standardVal / ( 4 * Total_mainStats + Total_subStats + Total_subStats2 ) 
                    Total_mainStats = (Eat_main + controlKeyval.value) * (1 + (Per_mainStats) *0.01) + Unique_main
                    // console.log(Total_mainStats);
                    changeVal *=  ( 4 * Total_mainStats + Total_subStats + Total_subStats2) 
                }
                // 總增幅 - 副屬
                if(controlKeyIs.value === subTxt.slice(1)){
                    changeVal = standardVal / ( 4 * Total_mainStats + Total_subStats + Total_subStats2) 
                    Total_subStats = (Eat_sub + controlKeyval.value) * (1 + (Per_subStats) *0.01) + Unique_sub
                    changeVal *=  ( 4 * Total_mainStats + Total_subStats + Total_subStats2) 
                    
                }
                if(controlKeyIs.value === subTxt2.slice(1)){
                    changeVal = standardVal / ( 4 * Total_mainStats + Total_subStats + Total_subStats2) 
                    Total_subStats2 = (Eat_sub2 + controlKeyval.value) * (1 + (Per_subStats2) *0.01) + Unique_sub2
                    changeVal *=  ( 4 * Total_mainStats + Total_subStats + Total_subStats2) 
                    
                }
                // 總增幅 - 攻擊力
                if(controlKeyIs.value === '攻擊力'){
                    Unique_atk = roundTo(TotalData.value.data[12].is / ( 1 + TotalData.value.data[13].is * 0.01),2)
                    changeVal = standardVal  / TotalData.value.data[12].is
                    changeVal *=  (controlKeyval.value + Unique_atk ) * ( 1 + TotalData.value.data[13].is * 0.01)
                }
                // 總增幅 - %攻擊力
                if(controlKeyIs.value === '%攻'){
                    Unique_atk = roundTo(TotalData.value.data[12].is / ( 1 + TotalData.value.data[13].is * 0.01),2)
                    changeVal = standardVal  / TotalData.value.data[12].is
                    changeVal *= Unique_atk  * ( 1 + (TotalData.value.data[13].is + controlKeyval.value) * 0.01)
                    
                }
                // 總增幅 - %總傷 or %B傷
                if(controlKeyIs.value === '%總傷' || controlKeyIs.value === '%B傷' ){
                    changeVal = standardVal  / roundTo((1 +  (TotalData.value.data[15].is  + TotalData.value.data[16].is) * 0.01),2)
                    changeVal *= roundTo((1 +  (controlKeyval.value + TotalData.value.data[15].is  + TotalData.value.data[16].is) * 0.01),2)
                    
                }
                // 總增幅 - %爆傷
                if(controlKeyIs.value === '%爆傷'){
                    changeVal = standardVal  / roundTo((1.35 +  TotalData.value.data[18].is * 0.01),4)
                    changeVal *= roundTo((1.35 + (controlKeyval.value +  TotalData.value.data[18].is) * 0.01),4)
                }
                // 總增幅 - %無視
                if(controlKeyIs.value === '%無視'){
                    changeVal = standardVal  / roundTo(( 1 - ( (1 -  TotalData.value.data[14].is *0.01)  * bossDefance.value * 0.01 )),4)
                    changeVal *= roundTo(( 1 - ( (1 -  IgnoreFn(TotalData.value.data[14].is,controlKeyval.value) *0.01)  * bossDefance.value * 0.01 )),4)
                }         
                
                equivalentGrow.value =  handGrowVal(standardVal,changeVal)
                controlList.data.forEach(item=>{
                    item.is = 0
                })

          
                let n = 0
                // str、dex、int、luk、%str、%dex、%int、%luk、%全屬
                if(StatsShow.value === 'strdex'){
                    Total_mainStats = TotalData.value.data[8].is
                    Total_subStats = TotalData.value.data[9].is
                    n = standardVal / ( 4 * Total_mainStats + Total_subStats ) 
                    controlList.data[0].is = roundTo(((((changeVal / n) -  Total_subStats) / 4 - Unique_main) / (1 + (Per_mainStats) *0.01) - Eat_main),2)
                    controlList.data[1].is = roundTo((((((changeVal / n) - Total_subStats) / 4 - Unique_main) * 100 / Eat_main) -100 - Per_mainStats),2)
                    controlList.data[2].is = roundTo((((changeVal / n) - 4 * Total_mainStats - Unique_sub) / (1 + (Per_subStats) *0.01) - Eat_sub),2)
                    controlList.data[3].is = roundTo(((((changeVal / n ) - 4 * Total_mainStats - Unique_sub ) * 100 /  Eat_sub) - 100 - Per_subStats ),2)
                }
                if(StatsShow.value === 'dexstr'){
                    Total_mainStats = TotalData.value.data[9].is
                    Total_subStats = TotalData.value.data[8].is
                    n = standardVal / ( 4 * Total_mainStats + Total_subStats) 
                    controlList.data[0].is = roundTo((((changeVal / n) - 4 * Total_mainStats - Unique_sub) / (1 + (Per_subStats) *0.01) - Eat_sub),2)
                    controlList.data[1].is = roundTo(((((changeVal / n ) - 4 * Total_mainStats - Unique_sub ) * 100 /  Eat_sub) - 100 - Per_subStats ),2)
                    controlList.data[2].is = roundTo(((((changeVal / n) -  Total_subStats) / 4 - Unique_main) / (1 + (Per_mainStats) *0.01) - Eat_main),2)
                    controlList.data[3].is = roundTo((((((changeVal / n) - Total_subStats) / 4 - Unique_main) * 100 / Eat_main) -100 - Per_mainStats),2)
                }
                if(StatsShow.value === 'intluk'){
                    Total_mainStats = TotalData.value.data[10].is
                    Total_subStats = TotalData.value.data[11].is
                    n = standardVal / ( 4 * Total_mainStats + Total_subStats) 
                    controlList.data[4].is = roundTo(((((changeVal / n) -  Total_subStats) / 4 - Unique_main) / (1 + (Per_mainStats) *0.01) - Eat_main),2)
                    controlList.data[5].is = roundTo((((((changeVal / n) - Total_subStats) / 4 - Unique_main) * 100 / Eat_main) -100 - Per_mainStats),2)
                    controlList.data[6].is = roundTo((((changeVal / n) - 4 * Total_mainStats - Unique_sub) / (1 + (Per_subStats) *0.01) - Eat_sub),2)
                    controlList.data[7].is = roundTo(((((changeVal / n ) - 4 * Total_mainStats - Unique_sub ) * 100 /  Eat_sub) - 100 - Per_subStats ),2)
                }
                if(StatsShow.value === 'lukdex'){
                    Total_mainStats = TotalData.value.data[11].is
                    Total_subStats = TotalData.value.data[9].is
                    n = standardVal / ( 4 * Total_mainStats + Total_subStats) 
                    controlList.data[2].is = roundTo((((changeVal / n) - 4 * Total_mainStats - Unique_sub) / (1 + (Per_subStats) *0.01) - Eat_sub),2)
                    controlList.data[3].is = roundTo(((((changeVal / n ) - 4 * Total_mainStats - Unique_sub ) * 100 /  Eat_sub) - 100 - Per_subStats ),2)
                    controlList.data[6].is = roundTo(((((changeVal / n) -  Total_subStats) / 4 - Unique_main) / (1 + (Per_mainStats) *0.01) - Eat_main),2)
                    controlList.data[7].is = roundTo((((((changeVal / n) - Total_subStats) / 4 - Unique_main) * 100 / Eat_main) -100 - Per_mainStats),2)
                }
                // controlList.data[8].is = roundTo((((changeVal / n) - Unique_sub - (1 + 0.01 * (Per_subStats)) * Eat_sub - 4 * Unique_main -   (4 + 0.04 * (Per_mainStats) ) * Eat_main) / ( (5 + 0.04 * (Per_mainStats) + 0.01 * (Per_subStats)) )),2) 
                // controlList.data[9].is  = roundTo((((changeVal / n) - Unique_sub - Eat_sub - (Eat_sub * Per_subStats * 0.01)  - 4 * Unique_main - 4 * Eat_main - (Eat_main * Per_mainStats * 0.04)) / (0.01 * Eat_sub + 0.04 * Eat_main)),2)
                controlList.data[9].is = roundTo(((changeVal / n) - ( 4 *  Unique_main + Unique_sub  ) - (4 * Eat_main + Eat_sub ) - (0.04 * Eat_main * Per_mainStats +  0.01 * Eat_sub *Per_subStats))/ ( 0.04 *  Eat_main  + 0.01 * Eat_sub) ,2)

                if(StatsShow.value === 'lukdexstr'){
                    Total_mainStats = TotalData.value.data[11].is
                    Total_subStats = TotalData.value.data[9].is
                    Total_subStats2 = TotalData.value.data[8].is
                    n = standardVal / ( 4 * Total_mainStats + Total_subStats + Total_subStats2) 
                    controlList.data[0].is = roundTo((((changeVal / n) - 4 * Total_mainStats - Total_subStats - Unique_sub2) / (1 + (Per_subStats2) *0.01) - Eat_sub2),2)
                    controlList.data[1].is = roundTo(((((changeVal / n ) - 4 * Total_mainStats - Total_subStats - Unique_sub2 ) * 100 /  Eat_sub2) - 100 - Per_subStats2 ),2)

                    controlList.data[2].is = roundTo((((changeVal / n) - 4 * Total_mainStats - Total_subStats2 - Unique_sub) / (1 + (Per_subStats) *0.01) - Eat_sub),2)
                    controlList.data[3].is = roundTo(((((changeVal / n ) - 4 * Total_mainStats - Total_subStats2 - Unique_sub ) * 100 /  Eat_sub) - 100 - Per_subStats ),2)
                    controlList.data[6].is = roundTo(((((changeVal / n) -  Total_subStats - Total_subStats2) / 4 - Unique_main) / (1 + (Per_mainStats) *0.01) - Eat_main),2)
                    controlList.data[7].is = roundTo((((((changeVal / n) - Total_subStats - Total_subStats2) / 4 - Unique_main) * 100 / Eat_main) -100 - Per_mainStats),2)
                    controlList.data[9].is = roundTo(((changeVal / n) - ( 4 *  Unique_main + Unique_sub + Unique_sub2 ) - (4 * Eat_main + Eat_sub + Eat_sub2) - (0.04 * Eat_main * Per_mainStats +  0.01 * Eat_sub *Per_subStats +  0.01 * Eat_sub2 *Per_subStats2))/ ( 0.04 *  Eat_main  + 0.01 * Eat_sub + 0.01 * Eat_sub2) ,2)
                }



                // 攻擊力、%攻
                Unique_atk = roundTo(TotalData.value.data[12].is / ( 1 + TotalData.value.data[13].is * 0.01),2)
                n = standardVal / TotalData.value.data[12].is
                controlList.data[10].is = roundTo(((changeVal / n) /  ( 1 + TotalData.value.data[13].is * 0.01) - Unique_atk),2)
                controlList.data[11].is = roundTo(((((changeVal / n) -   Unique_atk)  * 100 / Unique_atk) - TotalData.value.data[13].is),2)
                // %總傷、%B傷
                n  = standardVal  / roundTo((1 +  (TotalData.value.data[15].is  + TotalData.value.data[16].is) * 0.01),2)
                controlList.data[12].is = roundTo(((( changeVal / n ) * 100) - 100 - TotalData.value.data[15].is  - TotalData.value.data[16].is),2)
                controlList.data[13].is = controlList.data[12].is

                 // %爆傷
                n = standardVal  / roundTo((1.35 +  TotalData.value.data[18].is * 0.01),4)
                controlList.data[14].is = roundTo(((( changeVal / n ) * 100) - 135 - TotalData.value.data[18].is),2)
                // %無視
                n = standardVal  / roundTo(( 1 - ( (1 -  TotalData.value.data[14].is *0.01)  * bossDefance.value * 0.01 )),4)
                controlList.data[15].is = roundTo(100 - 100 * (((1 - (changeVal / n)) / (0.01 * bossDefance.value )) / (1 - TotalData.value.data[14].is * 0.01)),2)
               }

               return standardVal
                
            }
            
            const parseTxtFileToObjFn = (el) =>{
                let fileElement = null
                if(el.currentTarget.dataset.file === "left"){
                    fileElement = fileInputLeft.value
                }
                if(el.currentTarget.dataset.file === "right"){
                    fileElement = fileInputRight.value
                }    
                parseTxtFileToObj(fileElement)            
                // console.log('載入後角色資料', Createdata.value.data);
            }

            const parseTxtFileToObj = (el) =>{
                const file = el.files[0]; // 獲取user選擇的txt
                    let arr = []
                  if (file) {
                    const reader = new FileReader();
            
                    reader.onload = function(event) {
                      const fileContent = event.target.result;
                      const lines = fileContent.split('\n');
                      lines.forEach(line => {
                        let item = {};
                        const [key, val] = line.split(': ');
                        if (key && val) {
                          item["key"] = key
                          item["is"] = val;
                        }
                        // console.log(item);
                        arr.push(item)
                    });

                    // 從創建資料來的資訊
                    if(arr[0].key === "Job"){
                        // 確認職業名稱 並輸出版本資訊
                        skillVersion.value = 251

                        // 更新載入資料
                        guildBool.value = true
                        RegionList.data.forEach(item=>{
                            if(item.Txt === RegionIs.value.Txt){
                                RegionIs.value.key = item.key            
                            }
                        })
                        let i = 0
                        Createdata.value.data.forEach(item=>{
                            item.is = Number(arr[i].is)
                            if(isNaN(item.is)){
                                item.is = arr[i].is
                            }
                            i++
                        })
                        i = 0


                    }
                    // 曾有編輯裝備相關操作
                    else if(false){
                        // 1.更新一開始機體資料 至 Createdata
                        // 2.傳遞儲存裝備資料格式 至 EquipDatabase
                        
                    }
                    else{
                        alert("資料格式有誤")
                        arr = []
                        return
                    }
                    };
                    reader.readAsText(file);
                  } 
            }

            const jobSkill = ref({list:[]})

            const commonSkill = reactive({data:[
                {idx:0,  show:["boss","exp"], act:false, url:"./img/skill/common/all/sk0.png" ,used: ["boss_common","boss_burst","exp"],name:"實用的進階祝福" , type:"Unique_atk" , val:20},
                {idx:1,  show:["boss","exp"], act:false, url:"./img/skill/common/all/sk1.png" ,used:["boss_common","boss_burst","exp"],name:"實用的會心之眼" , type:"Per_critical" , val:8},
                {idx:2,  show:["boss"], act:false, url:"./img/skill/common/all/sk2.png" ,used:["boss_common","boss_burst"],name:"卡蒂娜傳授(LV2)" , type:"Per_boss" , val:12},
                {idx:3,  show:["boss"], act:false, url:"./img/skill/common/all/sk3.png" ,used:["boss_burst"],name:"凱殷傳授(LV2)" , type:"Per_boss" , val:17},
                {idx:4,  show:["boss","exp"], act:false, url:"./img/skill/common/all/sk4.png" ,used:["exp"],name:"伊利恩傳授(LV2)-6層" , type:"Per_damage" , val:12},
                {idx:5,  show:["boss","exp"], act:false, url:"./img/skill/common/all/sk5.png" ,used:["boss_common","boss_burst","exp"],name:"亞克傳授(LV2)-5層" , type:"Per_damage" , val:11},
                {idx:6,  show:["exp"], act:false, url:"./img/skill/common/all/sk6.png" ,used:["exp"],name:"虎影傳授(LV2)" , type:"Per_normal_damage" , val:14},
                {idx:7,  show:["exp"], act:false, url:"./img/skill/common/all/sk7.png" ,used:["exp"],name:"菈菈傳授(LV2)" , type:"Per_normal_damage" , val:11},
                {idx:8,  show:["boss"], act:false, url:"./img/skill/common/all/sk8.png" ,used:["boss_burst"],name:"天破傳授(LV2)" , type:"Per_damage" , val:45},
                {idx:9,  show:["boss","exp"], act:false, url:"./img/skill/common/all/sk9.png" ,used:["boss_burst"],name:"武公寶珠" , type:"Per_atk" , val:100},
            ]})

            const jobSkillRender = computed(()=>{
                let arr = []
                let jobfilter = []

                jobfilter = jobSkill.value.list.filter(item=>{
                    if(item.key === Createdata.value.data[0].is){
                        return item
                    }
                })
                if(jobfilter.length === 0){
                    jobfilter = [{skill:[]}]
                }
                // console.log(jobfilter);
             
                jobfilter[0].skill.forEach(item=>{
                    arr.push({name:item.name , url:item.url , used:item.used ,type:item.type, val:item.val, act:item.act, show:item.show, 
                        modify:item.modify,modifyTxt:item.modifyTxt})
                })
                commonSkill.data.forEach(item=>{
                    arr.push({name:item.name , url:item.url , used:item.used ,type:item.type, val:item.val, act:item.act, show:item.show, 
                        modify:item.modify,modifyTxt:item.modifyTxt})
                })

                arr = arr.filter(item=>{
                    console.log(CreateAim.value);
                    if(item.show.indexOf(CreateAim.value) !== -1) return item
                })
                // 特殊輸入情形時 另外顯示內容(寫很醜 之後再改)
                skillInputData.Is.forEach(item=>{
                    item.act = false
                })
                arr.forEach(item=>{
                    if(item.name === '爆擊強化' && item.act) skillInputData.Is[0].act = true
                    if(item.name === '超越者西格諾斯的祝福' && item.act) skillInputData.Is[1].act = true
                    if(item.name === '格蘭蒂斯女神的祝福(雷普)' && item.act) skillInputData.Is[2].act = true
                    if(item.name === '鋼鐵之軀' && item.act) skillInputData.Is[3].act = true
                })
                return arr
            })

            // 特殊技能輸入要使用者輸入的
            const skillInputData = reactive({Is:[
                {idx:0,key:'爆擊強化',act:false},
                {idx:1,key:'超越者西格諾斯的祝福',act:false},
                {idx:2,key:'格蘭蒂斯女神的祝福(雷普)',act:false},
                {idx:3,key:'鋼鐵之軀',act:false},
            ]})
            const skillInputTitleBool = computed(()=>{
                let data = skillInputData.Is
                
                let i = 0
                data.forEach(item=>{
                    if(item.act) i++
                })
                return i > 0 ?  true : false

            })

            // 此輸入女皇祝福的剩餘時間(越短增幅越高 輸入值1~45) 
            const RoyalQueenTimer = ref(27)
    
            const RoyalQueenBuff = computed(()=>{
                let time = RoyalQueenTimer.value
                console.log(Math.floor( (45 - time) / 4));
                let Dmgplus =  Math.floor( (45 - time) / 4) * 8
                if(Dmgplus > 80) Dmgplus = 80
                console.log('增加的總傷',Dmgplus);
                return Dmgplus
            })      
            // 此輸入爆擊強化爆率
            const Skill_criticalRate = ref(128)
            const Skill_ironbody = ref(1)
            const Skill_Rapgoddess_before = ref(288)
            const Skill_Rapgoddess_after = ref(898)

            const handMultskillAct = (el)=>{
                let key = el.currentTarget.dataset.skill

                let jobfilter = []
                
                jobfilter = jobSkill.value.list.filter(item=>{
                    if(item.key === Createdata.value.data[0].is){
                        return item
                    }
                })                

                jobfilter[0].skill.forEach(item=>{
                    if(item.used.indexOf(key) !== -1 ){
                        item.act = true
                    }else{
                        item.act = false
                    }
                })
                commonSkill.data.forEach(item=>{
                    if(item.used.indexOf(key) !== -1 ){
                        item.act = true
                    }else{
                        item.act = false
                    }
                })                

            }
            const buffToolAllAct = (el) =>{
                let key = el.currentTarget.innerText
                console.log(key);
                if(key === "全選"){
                    buffTool.list.forEach(item=>{
                        item.act = true
                    })
                }
                if(key === "全不選"){
                    buffTool.list.forEach(item=>{
                        item.act = false
                    })
                }
            }
            const gulityAllAct = (el) =>{
                let key = el.currentTarget.innerText
                console.log(key);
                if(key === "全選"){
                    gulityBuff.list.forEach(item=>{
                        item.act = true
                    })
                }
                if(key === "全不選"){
                    gulityBuff.list.forEach(item=>{
                        item.act = false
                    })
                }
            }

            const handbuffAct = (el) =>{
                let key = el.currentTarget.dataset.skill
                let jobfilter = []
                
                jobfilter = jobSkill.value.list.filter(item=>{
                    if(item.key === Createdata.value.data[0].is){
                        return item
                    }
                })                
                jobfilter[0].skill.forEach(item=>{
                    if(item.name === key){
                        item.act = !item.act
                    }                    
                })

                commonSkill.data.forEach(item=>{
                    if(item.name === key){
                        item.act = !item.act
                    }
                })

                buffTool.list.forEach(item=>{
                    if(item.name === key){
                        item.act = !item.act
                    }
                })
                potionTool.list.forEach(item=>{
                    if(item.name === key){
                        item.act = !item.act
                    }
                })
                potionTool.custom.forEach(item=>{
                    if(item.name === key){
                        item.act = !item.act
                    }
                })                
                gulityBuff.list.forEach(item=>{
                    if(item.name === key){
                        item.act = !item.act
                    }
                })                
            }
            // HyperStats System

            const HyperList = reactive({
            point:[
                {Lv:0 , next:1,     total:0},
                {Lv:1 , next:2,     total:1},
                {Lv:2 , next:4,     total:3},
                {Lv:3 , next:8,     total:7},
                {Lv:4 , next:10,    total:15},
                {Lv:5 , next:15,    total:25},
                {Lv:6 , next:20,    total:40},
                {Lv:7 , next:25,    total:60},
                {Lv:8 , next:30,    total:85},
                {Lv:9 , next:35,    total:115},
                {Lv:10 , next:50,   total:150},
                {Lv:11 , next:65,   total:200},
                {Lv:12 , next:80,   total:265},
                {Lv:13 , next:95,   total:345},
                {Lv:14 , next:110,  total:440},
                {Lv:15 , next:5207, total:550},
            ],
            subStats:[
                {dex:0 , str:0, total:0},
                {dex:1 , str:0, total:1},
                {dex:1 , str:1, total:2},
                {dex:2 , str:1, total:4},
                {dex:2 , str:2, total:6},
                {dex:3 , str:2, total:10},
                {dex:3 , str:3, total:14},
            ]
        })

            const HyperVal = ref({
                now:[
                    {show : true , idx:0 ,  key:"str", msg:"STR" , is : ''},
                    {show : true , idx:1 ,  key:"dex", msg:"DEX" , is : ''},
                    {show : true , idx:2 ,  key:"int", msg:"INT" , is : ''},
                    {show : true , idx:3 ,  key:"luk", msg:"LUK" , is : ''},
                    {show : true , idx:4 ,  key:"hp", msg:"HP" , is : ''},
                    {show : true , idx:5 ,  key:"expand", msg:"DF/TF/PP" , is : ''},
                    {show : true , idx:6 ,  key:"rate", msg:"爆擊機率" , is : ''},
                    {show : true , idx:7 ,  key:"cretical", msg:"爆擊殺傷力" , is : ''},
                    {show : true , idx:8 ,  key:"ignore", msg:"無視防禦" , is : ''},
                    {show : true , idx:9 ,  key:"damage", msg:"傷害" , is : ''},
                    {show : true , idx:10 , key:"boss", msg:"Boss傷害" , is : ''},
                    {show : true , idx:11 , key:"attr", msg:"屬性耐性" , is : ''},
                    {show : true , idx:12 , key:"atk", msg:"攻擊力" , is : ''},
                    {show : true , idx:13 , key:"exp", msg:"經驗" , is : ''},
                    {show : true , idx:14 , key:"arc", msg:"祕法符文" , is : ''},
                    {show : true , idx:15 , key:"mosdamage", msg:"一般傷害" , is : ''}, 
                ],
                best:[
                    {show : true , idx:0 ,  key:"str", msg:"STR" , is : ''},
                    {show : true , idx:1 ,  key:"dex", msg:"DEX" , is : ''},
                    {show : true , idx:2 ,  key:"int", msg:"INT" , is : ''},
                    {show : true , idx:3 ,  key:"luk", msg:"LUK" , is : ''},
                    {show : true , idx:4 ,  key:"hp", msg:"HP" , is : ''},
                    {show : true , idx:5 ,  key:"expand", msg:"DF/TF/PP" , is : ''},
                    {show : true , idx:6 ,  key:"rate", msg:"爆擊機率" , is : ''},
                    {show : true , idx:7 ,  key:"cretical", msg:"爆擊殺傷力" , is : ''},
                    {show : true , idx:8 ,  key:"ignore", msg:"無視防禦" , is : ''},
                    {show : true , idx:9 ,  key:"damage", msg:"傷害" , is : ''},
                    {show : true , idx:10 , key:"boss", msg:"Boss傷害" , is : ''},
                    {show : true , idx:11 , key:"attr", msg:"屬性耐性" , is : ''},
                    {show : true , idx:12 , key:"atk", msg:"攻擊力" , is : ''},
                    {show : true , idx:13 , key:"exp", msg:"經驗" , is : ''},
                    {show : true , idx:14 , key:"arc", msg:"祕法符文" , is : ''},
                    {show : true , idx:15 , key:"mosdamage", msg:"一般傷害" , is : ''},                    
                ],
            }) 
            const totalHyperPt = computed(()=>{
                let a0 = HyperVal.value.now[0].is
                let a1 = HyperVal.value.now[1].is
                let a2 = HyperVal.value.now[2].is
                let a3 = HyperVal.value.now[3].is
                let a4 = HyperVal.value.now[4].is
                let a5 = HyperVal.value.now[5].is
                let a6 = HyperVal.value.now[6].is
                let a7 = HyperVal.value.now[7].is
                let a8 = HyperVal.value.now[8].is
                let a9 = HyperVal.value.now[9].is
                let a10 = HyperVal.value.now[10].is
                let a11 = HyperVal.value.now[11].is
                let a12 = HyperVal.value.now[12].is
                let a13 = HyperVal.value.now[13].is
                let a14 = HyperVal.value.now[14].is
                let a15 = HyperVal.value.now[15].is

                let b0 = HyperVal.value.best[0].is
                let b1 = HyperVal.value.best[1].is
                let b2 = HyperVal.value.best[2].is
                let b3 = HyperVal.value.best[3].is
                let b4 = HyperVal.value.best[4].is
                let b5 = HyperVal.value.best[5].is
                let b6 = HyperVal.value.best[6].is
                let b7 = HyperVal.value.best[7].is
                let b8 = HyperVal.value.best[8].is
                let b9 = HyperVal.value.best[9].is
                let b10 = HyperVal.value.best[10].is
                let b11 = HyperVal.value.best[11].is
                let b12 = HyperVal.value.best[12].is
                let b13 = HyperVal.value.best[13].is
                let b14 = HyperVal.value.best[14].is
                let b15 = HyperVal.value.best[15].is
                
                // console.log('watch',HyperVal.value.best);

                let lv = TotalData.value.data[1].is
                let perLvPt = 3
                let extraPt = 0
                let j = 0
                let times = 0
                let total  = 0
                if(lv < 140) return 0
                times =  lv - 139
                for (let i = 0; i < times; i++) {
                    total += perLvPt + extraPt
                    j++
                    if(j === 10){
                        extraPt++
                        j = 0
                    }

                }
                // console.log('極限總點數:',total);
                HyperSurplus.value.data[0].is = total
                HyperSurplus.value.data[1].is = total
                HyperSurplus.value.data[2].is = total
                handHyperSurplus()
                return 5207

                
                
            })
            const HyperSurplus = ref(
                {data:[
                    {idx:0 ,key: "now", is :0},
                    {idx:1 ,key: "best", is :0},
                    {idx:2 ,key: "total", is :0},
                ]}
            )
            const handHyperSurplus = () =>{
                HyperVal.value.now.forEach(item=>{
                    if(isNaN(item.is)){
                        alert('請輸入數字')
                        item.is = ''
                    }
                    if(Number(item.is) > 15) item.is = 15
                    if(Number(item.is) === 0) HyperSurplus.value.data[0].is -= HyperList.point[0].total
                    if(Number(item.is) === 1) HyperSurplus.value.data[0].is -= HyperList.point[1].total
                    if(Number(item.is) === 2) HyperSurplus.value.data[0].is -= HyperList.point[2].total
                    if(Number(item.is) === 3) HyperSurplus.value.data[0].is -= HyperList.point[3].total
                    if(Number(item.is) === 4) HyperSurplus.value.data[0].is -= HyperList.point[4].total
                    if(Number(item.is) === 5) HyperSurplus.value.data[0].is -= HyperList.point[5].total
                    if(Number(item.is) === 6) HyperSurplus.value.data[0].is -= HyperList.point[6].total
                    if(Number(item.is) === 7) HyperSurplus.value.data[0].is -= HyperList.point[7].total
                    if(Number(item.is) === 8) HyperSurplus.value.data[0].is -= HyperList.point[8].total
                    if(Number(item.is) === 9) HyperSurplus.value.data[0].is -= HyperList.point[9].total
                    if(Number(item.is) === 10) HyperSurplus.value.data[0].is -= HyperList.point[10].total
                    if(Number(item.is) === 11) HyperSurplus.value.data[0].is -= HyperList.point[11].total
                    if(Number(item.is) === 12) HyperSurplus.value.data[0].is -= HyperList.point[12].total
                    if(Number(item.is) === 13) HyperSurplus.value.data[0].is -= HyperList.point[13].total
                    if(Number(item.is) === 14) HyperSurplus.value.data[0].is -= HyperList.point[14].total
                    if(Number(item.is) === 15) HyperSurplus.value.data[0].is -= HyperList.point[15].total
                })
                HyperVal.value.best.forEach(item=>{
                    if(Number(item.is) > 15) item.is = 15
                    if(Number(item.is) === 0) HyperSurplus.value.data[1].is -= HyperList.point[0].total
                    if(Number(item.is) === 1) HyperSurplus.value.data[1].is -= HyperList.point[1].total
                    if(Number(item.is) === 2) HyperSurplus.value.data[1].is -= HyperList.point[2].total
                    if(Number(item.is) === 3) HyperSurplus.value.data[1].is -= HyperList.point[3].total
                    if(Number(item.is) === 4) HyperSurplus.value.data[1].is -= HyperList.point[4].total
                    if(Number(item.is) === 5) HyperSurplus.value.data[1].is -= HyperList.point[5].total
                    if(Number(item.is) === 6) HyperSurplus.value.data[1].is -= HyperList.point[6].total
                    if(Number(item.is) === 7) HyperSurplus.value.data[1].is -= HyperList.point[7].total
                    if(Number(item.is) === 8) HyperSurplus.value.data[1].is -= HyperList.point[8].total
                    if(Number(item.is) === 9) HyperSurplus.value.data[1].is -= HyperList.point[9].total
                    if(Number(item.is) === 10) HyperSurplus.value.data[1].is -= HyperList.point[10].total
                    if(Number(item.is) === 11) HyperSurplus.value.data[1].is -= HyperList.point[11].total
                    if(Number(item.is) === 12) HyperSurplus.value.data[1].is -= HyperList.point[12].total
                    if(Number(item.is) === 13) HyperSurplus.value.data[1].is -= HyperList.point[13].total
                    if(Number(item.is) === 14) HyperSurplus.value.data[1].is -= HyperList.point[14].total
                    if(Number(item.is) === 15) HyperSurplus.value.data[1].is -= HyperList.point[15].total
                })
                // console.log(HyperSurplus.value.data[0].is);
                
            }
            const hyperGrowVal = ref(0)
            const handBestHyper = () =>{
                let mainStats = 0
                let subStats = 0
                let subStats2 = 0
                let Unique_atk = 0
                let standardVal  = 1
                let ignore = TotalData.value.data[14].is
                let dmg = TotalData.value.data[15].is
                let boss_dmg = TotalData.value.data[16].is
                let mos_dmg = TotalData.value.data[17].is
                let cretical_dmg = TotalData.value.data[18].is
                Unique_atk = Math.round(TotalData.value.data[12].is / (1 + TotalData.value.data[13].is * 0.01))


                if(StatsShow.value === 'strdex'){
                    mainStats = TotalData.value.data[8].is
                    subStats = TotalData.value.data[9].is
                }
                if(StatsShow.value === 'dexstr'){
                    mainStats = TotalData.value.data[9].is
                    subStats = TotalData.value.data[8].is
                }
                if(StatsShow.value === 'intluk'){
                    mainStats = TotalData.value.data[10].is
                    subStats = TotalData.value.data[11].is
                }
                if(StatsShow.value === 'lukdex'){
                    mainStats = TotalData.value.data[11].is
                    subStats = TotalData.value.data[9].is
                }
                if(StatsShow.value === 'lukdexstr'){
                    mainStats = TotalData.value.data[11].is
                    subStats = TotalData.value.data[9].is
                    subStats2 = TotalData.value.data[8].is
                }   
            // (4 * 主屬總值 + 副屬總值) * (1 + B + 總) * (1.35 + 爆) * ((1 + %物) * 吃%攻擊力) * ( 1 - ( 1 - 裝備無視) * boss防禦 )  
            let standardArr = {data:[
                {key:'主屬', is:0},
                {key:'B+總', is:0},
                {key:'爆傷', is:0},
                {key:'攻擊力', is:0},
                {key:'無視', is:0},
            ],
            compare:[
                { case:"A", key:'B總無', main:0 , sub: 0, is:0},
                // { case:"B", key:'B總攻', main:0 , sub: 0, is:0},
                // { case:"C", key:'B總屬', main:0 , sub: 0, is:0},
                // { case:"D", key:'B總爆', main:0 , sub: 0, is:0},
            ]
        }
            standardArr.data[0].is =   (4 * mainStats + subStats + subStats2) 
            standardArr.data[3].is =  roundTo((1 + TotalData.value.data[13].is * 0.01) * (Unique_atk),2)
            standardArr.data[1].is =  (1 + (dmg + boss_dmg) * 0.01)
            standardArr.data[2].is =  (1.35 + cretical_dmg * 0.01)
            standardArr.data[4].is =  roundTo(( 1 - ( 1 - ignore * 0.01) * bossDefance.value * 0.01 ),4)

            
            let MainStandardVal =   standardArr.data[1].is * standardArr.data[2].is * standardArr.data[4].is
            let SubStandardVal =    standardArr.data[0].is * standardArr.data[3].is
            let totalStandardVal = MainStandardVal * SubStandardVal 

            // B+總 、 無視 、 攻擊 、 主屬 、 爆傷
            standardArr.compare.forEach(item=>{
                if(item.key === 'B總無'){
                    item.main = standardArr.data[1].is * standardArr.data[4].is
                    item.sub = standardArr.data[2].is * standardArr.data[3].is * standardArr.data[0].is
                    item.is = roundTo(item.main * item.sub,4)
                }
                if(item.key === 'B總攻'){
                    item.main = standardArr.data[1].is * standardArr.data[3].is
                    item.sub = standardArr.data[2].is * standardArr.data[4].is * standardArr.data[0].is
                    item.is = roundTo(item.main * item.sub,4)
                }
                if(item.key === 'B總屬'){
                    item.main = standardArr.data[1].is * standardArr.data[0].is
                    item.sub = standardArr.data[2].is * standardArr.data[4].is * standardArr.data[3].is
                    item.is = roundTo(item.main * item.sub,4)
                }
                if(item.key === 'B總爆'){
                    item.main = standardArr.data[1].is * standardArr.data[2].is
                    item.sub = standardArr.data[0].is * standardArr.data[4].is * standardArr.data[3].is
                    item.is = roundTo(item.main * item.sub,4)
                }
            })

            
            console.log('原本標準值資料',standardArr.data);        
            console.log('原本標準值比較值',standardArr.compare);        
        
           // 回算計算極限皆0的狀態
            HyperVal.value.now.forEach(item=>{
                item.is = Number(item.is)
                
                if(StatsShow.value = 'strdex'){
                    if(item.key === 'str'){
                        mainStats -=  item.is * 30
                   }
                    if(item.key === 'dex'){
                        subStats -=   item.is * 30
                    }
                }
                if(StatsShow.value = 'dexstr'){
                    if(item.key === 'dex'){
                        mainStats -=  item.is * 30
                   }
                    if(item.key === 'str'){
                        subStats -=   item.is * 30
                    }
                }
                if(StatsShow.value = 'intluk'){
                    if(item.key === 'int'){
                        mainStats -=  item.is * 30
                   }
                    if(item.key === 'luk'){
                        subStats -=   item.is * 30
                    }
                }
                if(StatsShow.value = 'lukdex'){
                    if(item.key === 'luk'){
                        mainStats -=  item.is * 30
                   }
                    if(item.key === 'dex'){
                        subStats -=   item.is * 30
                    }
                }
                if(StatsShow.value = 'lukdexstr'){
                    if(item.key === 'luk'){
                        mainStats -=  item.is * 30
                   }
                    if(item.key === 'dex'){
                        subStats -=   item.is * 30
                    }
                    if(item.key === 'str'){
                        subStats2 -=   item.is * 30
                    }
                }
                if(item.key === 'boss'){
                    if(item.is <= 5){
                        boss_dmg -= item.is * 3
                    }
                    if(item.is <= 15 && item.is > 5 ){
                        boss_dmg -=  (15 + ( item.is -5 ) * 4)
                    }
                }
                if(item.key === 'mosdamage'){
                    if(item.is <= 5){
                        boss_dmg -= item.is * 3
                    }
                    if(item.is <= 15 && item.is > 5 ){
                        mos_dmg -=  (15 + ( item.is -5 ) * 4)
                    }
                }
                if(item.key === 'damage'){
                    dmg -= item.is * 3
                }
                if(item.key === 'cretical'){
                    cretical_dmg -= item.is
                }
                if(item.key === 'ignore'){
                    console.log(TotalData.value.data[14].is);
                    console.log(item.is * (-3));
                    ignore = IgnoreFn(TotalData.value.data[14].is, (item.is * (-3)))
                }
                if(item.key === 'atk'){
                    Unique_atk -= item.is * 3
                }
      
            })     
            let zeroPtArr = {data:[
                {key:'主屬', is:0},
                {key:'B+總', is:0},
                {key:'爆傷', is:0},
                {key:'攻擊力', is:0},
                {key:'無視', is:0},
            ],
        }
            zeroPtArr.data[0].is = (4 * mainStats + subStats + subStats2) 
            zeroPtArr.data[3].is = (1 + TotalData.value.data[13].is * 0.01) * (Unique_atk)
            zeroPtArr.data[1].is =  (1 + (dmg + boss_dmg) * 0.01)
            zeroPtArr.data[2].is = (1.35 + cretical_dmg * 0.01)
            zeroPtArr.data[4].is = ( 1 - ( 1 - ignore * 0.01) * bossDefance.value * 0.01 )    
            console.log('清空後的變化值:',zeroPtArr.data);  

            
            let Totalpt = HyperSurplus.value.data[2].is

            HyperVal.value.best.forEach(item=>{
                if(item.key === 'str') item.is = 0
                if(item.key === 'dex') item.is = 0
                if(item.key === 'int') item.is = 0
                if(item.key === 'luk') item.is = 0
                if(item.key === 'hp') item.is = 0
                if(item.key === 'cretical') item.is = 0
                if(item.key === 'ignore') item.is = 0
                if(item.key === 'damage') item.is = 0
                if(item.key === 'boss') item.is = 0
                if(item.key === 'atk') item.is = 0
                if(item.key === 'mosdamage') item.is = 0
            })
            HyperVal.value.best.forEach(item=>{
                if(Number(item.is) > 15) item.is = 15
                if(Number(item.is) === 0) Totalpt -= HyperList.point[0].total
                if(Number(item.is) === 1) Totalpt -= HyperList.point[1].total
                if(Number(item.is) === 2) Totalpt -= HyperList.point[2].total
                if(Number(item.is) === 3) Totalpt -= HyperList.point[3].total
                if(Number(item.is) === 4) Totalpt -= HyperList.point[4].total
                if(Number(item.is) === 5) Totalpt -= HyperList.point[5].total
                if(Number(item.is) === 6) Totalpt -= HyperList.point[6].total
                if(Number(item.is) === 7) Totalpt -= HyperList.point[7].total
                if(Number(item.is) === 8) Totalpt -= HyperList.point[8].total
                if(Number(item.is) === 9) Totalpt -= HyperList.point[9].total
                if(Number(item.is) === 10) Totalpt -= HyperList.point[10].total
                if(Number(item.is) === 11) Totalpt -= HyperList.point[11].total
                if(Number(item.is) === 12) Totalpt -= HyperList.point[12].total
                if(Number(item.is) === 13) Totalpt -= HyperList.point[13].total
                if(Number(item.is) === 14) Totalpt -= HyperList.point[14].total
                if(Number(item.is) === 15) Totalpt -= HyperList.point[15].total
            })              

   
            
                 const upList = {
                data:[
                    {lv: 0,   pt: 0},
                    {lv: 1,   pt: 1},
                    {lv: 2,   pt: 3},
                    {lv: 3,   pt: 7},
                    {lv: 4,   pt: 15},
                    {lv: 5,   pt: 25},
                    {lv: 6,   pt: 40},
                    {lv: 7,   pt: 60},
                    {lv: 8,   pt: 85},
                    {lv: 9,   pt: 115},
                    {lv: 10,  pt: 150},
                    {lv: 11,  pt: 200},
                    {lv: 12,  pt: 265},
                    {lv: 13,  pt: 345},
                    {lv: 14,  pt: 440},
                    {lv: 15,  pt: 550},
                    {lv: 16,  pt: 9999},
                ],
                subStats:[
                    {dex: 0 ,str: 0, pt: 0},
                    {dex: 1 ,str: 0, pt: 1},
                    {dex: 1 ,str: 1, pt: 2},
                    {dex: 2 ,str: 1, pt: 4},
                    {dex: 2 ,str: 2, pt: 6},
                    {dex: 3 ,str: 2, pt: 10},
                    {dex: 3 ,str: 3, pt: 14},
                ],
                 };            
                // 计算所有可能的组合
                function getAllCombinations(compareCount) {
                    const result = [];

                    // 生成所有可能的等级组合
                    const maxLv = upList.data.length - 1;

                    function generateCombinations(index, current) {
                        if (index === compareCount) {
                            result.push([...current]);
                            return;
                        }

                        for (let i = 0; i <= maxLv; i++) {
                            current.push(i);
                            generateCombinations(index + 1, current);
                            current.pop();
                        }
                    }

                    generateCombinations(0, []);
                    return result;
                }        
                // 计算特定组合的总点数    
                function calculateTotalPoints(combination) {
                let totalPoints = 0;
                for (let i = 0; i < combination.length; i++) {
                    totalPoints += upList.data[combination[i]].pt;
                }
                return totalPoints;
                }

                const allCombinations = getAllCombinations(3);
                // 计算每种组合的总点数
                const combinationsWithPoints = allCombinations.map(combination => ({
                    combination,
                    totalPoints: calculateTotalPoints(combination),
                    otherPt: Totalpt - calculateTotalPoints(combination),
                }));    
                // 过滤出总点数不超过Totalpt的组合
                let validCombinations_A = combinationsWithPoints.filter(({ totalPoints }) => totalPoints <= Totalpt);


                let bestIgnore = ignore
                let validCombinations_A_Main = validCombinations_A.map((item)=>{
                    let obj = {first:[
                        { idx:0 , key: "dmg",         lv:0  ,is:0 },
                        { idx:1 , key: "boss_dmg",    lv:0  ,is:0 },
                        { idx:2 , key: "ignore",      lv:0  ,is:0 },
                    ],
                    otherPt: 0,
                    changeVal: 0,
                   
                }
                let changeVal = 1

                obj.first[0].lv = item.combination[0]
                obj.first[1].lv = item.combination[1]
                obj.first[2].lv = item.combination[2]

                obj.first[0].is = item.combination[0] * 3
                if(item.combination[1] < 5 ){
                    obj.first[1].is = item.combination[1] * 3
                }else{
                    obj.first[1].is = (item.combination[1] - 5) * 4 + 15
                }
                obj.first[2].is = item.combination[2] * 3
                changeVal *=   (1 + (dmg  +  boss_dmg  + obj.first[0].is + obj.first[1].is )  * 0.01) 
                bestIgnore = ignore
                bestIgnore = IgnoreFn(bestIgnore,obj.first[2].is)  
                changeVal *=   ( 1 - ( 1 - bestIgnore * 0.01) * bossDefance.value * 0.01 )  

                changeVal =  roundTo((changeVal),6)
                obj.otherPt =     item.otherPt
                obj.changeVal = changeVal
                return obj                
                } )

                validCombinations_A_Main = validCombinations_A_Main.filter(item=>{
                    return item.changeVal >= standardArr.compare[0].main
                })
                validCombinations_A_Main = validCombinations_A_Main.filter(item=>{
                    return item.otherPt < 850
                })
                validCombinations_A_Main = validCombinations_A_Main.filter(item=>{
                    return item.otherPt > 100
                })
                console.log('組合A的主資料-A',validCombinations_A_Main);

                let validCombinations_A_Sub = []
                validCombinations_A_Main.forEach(item=>{
                    let arr = []
                    
                    const combinationsWithPoints_sub =  allCombinations.map(combination => ({
                        combination,
                        totalPoints: calculateTotalPoints(combination),
                        finPt: item.otherPt - calculateTotalPoints(combination),
                    }));    
                    arr  = combinationsWithPoints_sub.filter(({ totalPoints }) => totalPoints <= item.otherPt);
                    arr  = arr.filter(({ finPt }) => finPt <= 15);


                    validCombinations_A_Sub.push(arr)
                })

                
                validCombinations_A_Sub = validCombinations_A_Sub.map(item=>{
                    let obj = {second:[
                        { idx:0 , key: "stats",lv:0  ,is:0 },
                        { idx:1 , key: "atk",  lv:0  ,is:0 },
                        { idx:2 , key: "critical", lv:0  ,is:0 },
                    ],
                    finPt: 0,
                    changeVal_sec: 0,
                }
                    let Maxobj = {
                        second:[
                            { idx:0 , key: "stats",lv:0  ,is:0 },
                            { idx:1 , key: "atk",         lv:0  ,is:0 },
                            { idx:2 , key: "critical", lv:0  ,is:0 },
                        ],
                        finPt: 0,
                        changeVal_sec: 0,
                }
                let length = item.length
                for (let i = 0; i < length; i++) {
                    obj.second[0].lv = item[i].combination[0]
                    obj.second[0].is = item[i].combination[0] * 30
                    obj.second[1].lv = item[i].combination[1]
                    obj.second[1].is = item[i].combination[1] * 3
                    obj.second[2].lv = item[i].combination[2]
                    obj.second[2].is = item[i].combination[2] 
                    obj.finPt = item[i].finPt

                    obj.changeVal_sec =  zeroPtArr.data[0].is +  4 * obj.second[0].is
                    obj.changeVal_sec *= (zeroPtArr.data[3].is + (1 + TotalData.value.data[13].is * 0.01) * (obj.second[1].is))
                    obj.changeVal_sec *=  (zeroPtArr.data[2].is +  (1.35 + obj.second[2].is) * 0.01)

                    if(Maxobj.changeVal_sec < obj.changeVal_sec){
                        Maxobj.changeVal_sec = obj.changeVal_sec
                        Maxobj.finPt = obj.finPt
                        Maxobj.second[0].lv = obj.second[0].lv
                        Maxobj.second[0].is = obj.second[0].is
                        Maxobj.second[1].lv = obj.second[1].lv
                        Maxobj.second[1].is = obj.second[1].is  
                        Maxobj.second[2].lv = obj.second[2].lv
                        Maxobj.second[2].is = obj.second[2].is  
                            
                    }                
                }
 
                return Maxobj              
                })

                console.log('組合A的副資料-A',validCombinations_A_Sub);


                let bestA_Leng = validCombinations_A_Sub.length
                let bestAObj = {
                    arr:[
                        { idx:0 , key: "cretical_dmg",lv:0  ,is:0 },
                        { idx:1 , key: "dmg",         lv:0  ,is:0 },
                        { idx:2 , key: "boss_dmg",    lv:0  ,is:0 },
                        { idx:3 , key: "ignore",      lv:0  ,is:0 },                            
                        { idx:4 , key: "mainstats",   lv:0  ,is:0 },
                        { idx:5 , key: "atk",         lv:0  ,is:0 },
                        { idx:6 , key: "substats",    lv:0  ,is:0 },
                        { idx:7 , key: "substats_sec",    lv:0  ,is:0 },
                    ],
                    finPt: 0,
                    bestVal: 0,                        
                }            
                let bestBObj = {
                    arr:[
                        { idx:0 , key: "cretical_dmg",lv:0  ,is:0 },
                        { idx:1 , key: "dmg",         lv:0  ,is:0 },
                        { idx:2 , key: "boss_dmg",    lv:0  ,is:0 },
                        { idx:3 , key: "ignore",      lv:0  ,is:0 },                            
                        { idx:4 , key: "mainstats",   lv:0  ,is:0 },
                        { idx:5 , key: "atk",         lv:0  ,is:0 },
                        { idx:6 , key: "substats",    lv:0  ,is:0 },
                        { idx:7 , key: "substats_sec",    lv:0  ,is:0 },
                    ],
                    finPt: 0,
                    bestVal: 0,                        
                }            
                for (let i = 0; i < bestA_Leng; i++) {
                    let obj = {
                        arr:[
                            { idx:0 , key: "cretical_dmg",lv:0  ,is:0 },
                            { idx:1 , key: "dmg",         lv:0  ,is:0 },
                            { idx:2 , key: "boss_dmg",    lv:0  ,is:0 },
                            { idx:3 , key: "ignore",      lv:0  ,is:0 },                            
                            { idx:4 , key: "stats",       lv:0  ,is:0 },
                            { idx:5 , key: "atk",         lv:0  ,is:0 },
                        ],
                        finPt: 0,
                        bestVal: 0,                        
                    }
                    obj.arr[0].lv = validCombinations_A_Sub[i].second[2].lv
                    obj.arr[0].is = validCombinations_A_Sub[i].second[2].is
                    obj.arr[1].lv = validCombinations_A_Main[i].first[0].lv
                    obj.arr[1].is = validCombinations_A_Main[i].first[0].is
                    obj.arr[2].lv = validCombinations_A_Main[i].first[1].lv
                    obj.arr[2].is = validCombinations_A_Main[i].first[1].is
                    obj.arr[3].lv = validCombinations_A_Main[i].first[2].lv
                    obj.arr[3].is = validCombinations_A_Main[i].first[2].is
                    obj.arr[4].lv = validCombinations_A_Sub[i].second[0].lv
                    obj.arr[4].is = validCombinations_A_Sub[i].second[0].is
                    obj.arr[5].lv = validCombinations_A_Sub[i].second[1].lv
                    obj.arr[5].is = validCombinations_A_Sub[i].second[1].is
                    obj.finPt = validCombinations_A_Sub[i].finPt
                    obj.bestVal = validCombinations_A_Main[i].changeVal * validCombinations_A_Sub[i].changeVal_sec
                    // console.log(Obj);
                    if(bestAObj.bestVal < obj.bestVal){
                        bestAObj.arr[0].lv = obj.arr[0].lv
                        bestAObj.arr[0].is = obj.arr[0].is
                        bestAObj.arr[1].lv = obj.arr[1].lv
                        bestAObj.arr[1].is = obj.arr[1].is
                        bestAObj.arr[2].lv = obj.arr[2].lv
                        bestAObj.arr[2].is = obj.arr[2].is
                        bestAObj.arr[3].lv = obj.arr[3].lv
                        bestAObj.arr[3].is = obj.arr[3].is
                        bestAObj.arr[4].lv = obj.arr[4].lv
                        bestAObj.arr[4].is = obj.arr[4].is
                        bestAObj.arr[5].lv = obj.arr[5].lv
                        bestAObj.arr[5].is = obj.arr[5].is
                        bestAObj.finPt = obj.finPt
                        bestAObj.bestVal = obj.bestVal
                    }
                }

                
                HyperList.point.forEach(item=>{
                    if(StatsShow.value !== 'lukdexstr'){
                        if(bestAObj.finPt >= item.total){
                            bestAObj.arr[6].lv = item.Lv
                            bestAObj.arr[6].is = item.Lv * 30
                        }
                    }
                })

                HyperList.subStats.forEach(item=>{
                    if(StatsShow.value === 'lukdexstr'){
                        if(bestAObj.finPt >= item.total){
                            bestAObj.arr[6].lv = item.dex
                            bestAObj.arr[6].is = item.dex * 30
                            bestAObj.arr[7].lv = item.str
                            bestAObj.arr[7].is = item.str * 30
                        }
                    }
                })
                console.log('最佳組合-A',bestAObj);



                
                // 將最佳組合資訊 導入input

                HyperVal.value.best.forEach(item=>{
                    if(item.key === 'hp') item.is = 0
                    if(item.is === '') item.is = 0
                    if(StatsShow.value === 'strdex'){
                        if(item.key === 'str') item.is = bestAObj.arr[4].lv
                        if(item.key === 'dex') item.is = bestAObj.arr[6].lv
                    }
                    if(StatsShow.value === 'dexstr'){
                        if(item.key === 'dex') item.is = bestAObj.arr[4].lv
                        if(item.key === 'str') item.is = bestAObj.arr[6].lv
                    }
                    if(StatsShow.value === 'intluk'){
                        if(item.key === 'int') item.is = bestAObj.arr[4].lv
                        if(item.key === 'luk') item.is = bestAObj.arr[6].lv
                    }
                    if(StatsShow.value === 'lukdex'){
                        if(item.key === 'luk') item.is = bestAObj.arr[4].lv
                        if(item.key === 'dex') item.is = bestAObj.arr[6].lv
                    }
                    if(StatsShow.value === 'lukdexstr'){
                        if(item.key === 'luk') item.is = bestAObj.arr[4].lv
                        if(item.key === 'dex') item.is = bestAObj.arr[6].lv
                        if(item.key === 'str') item.is = bestAObj.arr[7].lv
                    }
                    if(item.key === 'cretical') item.is = bestAObj.arr[0].lv
                    if(item.key === 'ignore') item.is = bestAObj.arr[3].lv
                    if(item.key === 'damage') item.is = bestAObj.arr[1].lv
                    if(item.key === 'boss') item.is = bestAObj.arr[2].lv
                    if(item.key === 'atk') item.is = bestAObj.arr[5].lv
                    if(item.key === 'mosdamage') item.is = 0
                    HyperSurplus.value.data[1].is  = bestAObj.finPt
                }) 
                let finPtArr = {data:[
                    {key:'主屬', is:0},
                    {key:'B+總', is:0},
                    {key:'爆傷', is:0},
                    {key:'攻擊力', is:0},
                    {key:'無視', is:0},
                ]}           
                finPtArr.data[0].is = zeroPtArr.data[0].is + (4 * bestAObj.arr[4].is) + bestAObj.arr[6].is + bestAObj.arr[7].is
                finPtArr.data[3].is = zeroPtArr.data[3].is + (1 + TotalData.value.data[13].is * 0.01) * (bestAObj.arr[5].is)
                finPtArr.data[1].is = zeroPtArr.data[1].is + (bestAObj.arr[1].is + bestAObj.arr[2].is) * 0.01
                finPtArr.data[2].is = zeroPtArr.data[2].is + bestAObj.arr[0].is * 0.01
                bestIgnore = ignore
                bestIgnore = IgnoreFn(bestIgnore,bestAObj.arr[3].is)  
                finPtArr.data[4].is = ( 1 - ( 1 - bestIgnore * 0.01) * bossDefance.value * 0.01 )   
                console.log('主屬增幅',finPtArr.data[0].is / standardArr.data[0].is);      
                console.log('B+總增幅',finPtArr.data[1].is / standardArr.data[1].is);      
                console.log('爆傷增幅',finPtArr.data[2].is / standardArr.data[2].is);      
                console.log('攻擊力增幅',finPtArr.data[3].is / standardArr.data[3].is);      
                console.log('無視增幅',finPtArr.data[4].is / standardArr.data[4].is);      
                hyperGrowVal.value =  roundTo(((bestAObj.bestVal /  totalStandardVal) -1) * 100,4)
            }


            
            
            


            

            

            onMounted(()=>{

                axios.get('./api/jobSkill.json')
                .then((res)=>{
                    jobSkill.value.list =  res.data.data
                })
                .catch((err)=>{
                    console.error('沒接到技能api');
                })

            })
            return{
                // MainCalcBox
                MainCalcBox,
               

                findataRender,
                TotalData,
                StatsShow,
                CreateAim,
               
                
                skillVersion,
                guildBool,
                RegionIs,
                RegionBool,
                RegionList,
                handRegion,               

                parseTxtFileToObjFn,
                fileInputLeft,
                fileInputRight,

                jobSkillRender,
                buffTool,
                gulityBuff,
                potionTool,
                // 特殊技能顯示
                skillInputTitleBool,
                skillInputData,
                RoyalQueenTimer,
                Skill_criticalRate,
                Skill_ironbody,
                Skill_Rapgoddess_before,
                Skill_Rapgoddess_after,

                handMultskillAct,
                handbuffAct,
                buffToolAllAct,
                gulityAllAct,
                // bossDefance
                bossDefance,
                handbossDefance,

                controlListRender,
                controlListBool,
                controlKeyIs,
                controlKeyval,
                handcontrolList,
                mustNum,

                // equipwork
                EquipNewItem,
                NewItemSetList,
                NewItemSetListBool,
                NewEquipbackBtn,
                handNewItemSet,
                EquipDatabase,
                EquipDatabaseRender,
                handEquipItem_usedBool,
                handEquipItem_create,
                createEquip_fin,
                handEquipItem_edit,
                editEquip_fin,
                handEquipItem_delete,
                updateEquipSet,


                // 總增幅
                equipGrow,
                equivalentGrow,

                // hyper sys
                totalHyperPt,
                HyperVal,
                HyperSurplus,
                handBestHyper,
                hyperGrowVal

   

            }   
        },

    }
    createApp(App).mount("#app")     

}

