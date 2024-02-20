
window.onload = () =>{

    const {createApp, ref, reactive, computed, watch, onMounted , onUpdated} = Vue
    const App = {

        setup(){
            const BossNameData = reactive({is:[]})
            const BossNavCont = ref({is:[]})
            const BossNavContBool = ref(false)
            const handBossNavCont  = (el= null , key) =>{
                if(key ==='close') return BossNavContBool.value = false
                let mapData = Object.groupBy(BossNameData.is.data, ({type})=>type)
                BossNavCont.value.is = mapData[key]
                BossNavContBool.value = true
                // console.log(BossNavCont.value.is);
            }

            // 不分難度的boss資訊 皆於此參數
            const nowBossRender = ref({name:"巴洛古",difficulty:"簡單",mission:"無"})

            const handNowBossRender = (el= null , key, difficulty, mission)=>{
                nowBossRender.value.name = key
                nowBossRender.value.difficulty = difficulty
                nowBossRender.value.mission = mission
                BossNavContBool.value = false
                window.scrollTo({top:0})
                // console.log('現在難度:',nowBossRender.value.difficulty);
            }
            const BossDifficultyData = reactive({is:[]})

            const handBossDifficulty = ()=>{
                let data = BossDifficultyData.is.data
                let nowIdx = 0
                data = data.filter(item=>{
                    if(item.bossName === nowBossRender.value.name) return item
                })
                if(data[0].Difficulty.length === 1) return  console.log('只有1個 不會變難度');
                data[0].Difficulty.forEach(item=>  item.is === nowBossRender.value.difficulty ? nowIdx = item.idx : null)
                if(data[0].Difficulty.length -1 === nowIdx){
                    nowIdx = 0
                }else{
                    nowIdx++
                }
                nowBossRender.value.difficulty = data[0].Difficulty[nowIdx].is
            }

            // 顯示Boss入場相關資訊
            const ShowBossRuleInfo = computed(()=>{
                const bossname = nowBossRender.value.name
                const data = BossDifficultyData.is.data ?? []
                if (data.length === 0)  return [{rule:[]}]
                let resultData = data.filter(item=>{
                    if(item.bossName === bossname) return item
                })
                return resultData[0].Difficulty
            })
            // 有分難度的boss資訊 皆於此參數
            const BossDifficultyRender = computed(()=>{
                const bossname = nowBossRender.value.name
                const difficulty = nowBossRender.value.difficulty 
                const data = BossDifficultyData.is.data ?? []
                if(data.length === 0) return data
                let result = data.filter(item=>{
                    if(item.bossName === bossname) return item
                })
                result = result[0].Difficulty.filter(item=>{
                    if(item.is === difficulty) return item
                })
                return result[0]
            })
            const ShowJoinInfo = computed(()=>{
                let key = BossDifficultyRender.value.ruleSec ?? []
                if(key.length === 0) return key
                return key[0]
            })
            const MosInfoRender = computed(()=>{
                let key = BossDifficultyRender.value.mosInfo ?? []
                if(key.length === 0) return key
                key = key.map(item=>{
                   item.key = `${item.name}${item.hp}` 
                   return item
                })
                return key              
            })
            setTimeout(()=>{
                console.log(MosInfoRender.value);
            },1000)
            // 特殊BOSS資訊處理
            const BossJoinConditionTitle = computed(()=>{
                let bossName = nowBossRender.value.name
                if(bossName === '終極巨腳怪' || bossName === '烈焰戰狼') return 'Boss入場'
                return '前置任務'
            })

            const ShowBossRuleMsg = computed(()=>{
                const bossname = nowBossRender.value.name
                let RootAbyss = ["比艾樂","血腥皇后","斑斑","貝倫"]
                let html = ""
                if(RootAbyss.includes(bossname)) html = `<span class="text-[#FF0]">備註: 混沌模式需要通關普通模式5次up</span>`
                if(bossname ==='黑魔法師') html = `<span class="text-[#FF0]">命運的碎片 = 黑暗力量氣息x1 + 心願的火焰x50</span>`
                if(bossname ==='培羅德'){
                    html = `
                    <span class="text-white">與NPC領取<span class="text-[#FF0]">培羅德墮落鑰匙仿造品</span>可入場<br>
                    頂級培羅德所掉落的<span class="text-[#FF0]">培羅德墮落鑰匙</span>可直接移動至頭部<br>
                    不過培羅德實際上沒有難度之分，而是依據被破壞的部位數量降低Boss強度</span>
                    `
                }
                return html
            })         
            
            onMounted(()=>{
                const api = axios.create({
                    baseURL: './api/',
                  });
                  
                //   不分難度的BOSS資訊來自此api
                async function GetBossNameApi(){
                    try{
                        const res = await api.get('bossData.json')
                        BossNameData.is = res.data
                    }catch{
                        console.error('沒接到 bossData Api');
                    }
                }
                //   有分難度的BOSS資訊來自此api
                async function GetBossDifficultyDataApi(){
                    try{
                        const res = await api.get('bossDifficulty.json')
                        BossDifficultyData.is = res.data
                    }catch{
                        console.error('沒接到 bossDifficulty Api');
                    }
                }
                GetBossNameApi()
                GetBossDifficultyDataApi()
            })
            return{
                // 切換Boss名稱
                handBossNavCont,
                BossNavCont,
                BossNavContBool,
                nowBossRender,
                handNowBossRender,
                // 顯示Boss入場相關資訊
                ShowBossRuleInfo,             
                ShowBossRuleMsg,
                // 切換Boss難度
                handBossDifficulty,
                // 特殊BOSS資訊處理
                BossJoinConditionTitle,
                // Boss資訊
                ShowJoinInfo,
                MosInfoRender,
            }   
        },

    }
    createApp(App).mount("#app")     

}


