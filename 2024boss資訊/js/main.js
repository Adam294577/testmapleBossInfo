
window.onload = () =>{

    const {createApp, ref, reactive, computed, watch, onMounted , onUpdated} = Vue
    const App = {

        setup(){
            const BossNameData = reactive({is:[]})
            const BossNavCont = ref({is:[]})
            const BossNavContBool = ref(false)
            const handBossNavCont  = (el= null , key) =>{
                if(key ==='close') return BossNavContBool.value = false
                let data = BossNameData.is.data
                let result = data[key]
                BossNavCont.value.is = result
                BossNavContBool.value = true
                // console.log(BossNavCont.value.is);
            }
            const nowBossRender = ref({name:"巴洛古",difficulty:"簡單"})
            const handNowBossRender = (el= null , key, difficulty)=>{
                nowBossRender.value.name = key
                nowBossRender.value.difficulty = difficulty
                BossNavContBool.value = false
                window.scrollTo({top:0})
                // console.log('現在難度:',nowBossRender.value.difficulty);
            }
            const BossDifficultyData = reactive({is:[]})

            const handBossDifficulty = ()=>{
                let data = BossDifficultyData.is.data
                data = data.filter(item=>{
                    if(item.bossName === nowBossRender.value.name) return item
                })
                let nowIdx = 0
                console.log(data[0].Difficulty.length);
                if(data[0].Difficulty.length === 1) return  console.log('只有1個 不會變難度');
                data[0].Difficulty.forEach(item=>{
                    if(item.is === nowBossRender.value.difficulty){
                        nowIdx = item.idx
                    }
                })
                console.log(nowIdx);
                if(data[0].Difficulty.length -1 === nowIdx){
                    nowIdx = 0
                }else{
                    nowIdx++
                }
                nowBossRender.value.difficulty = data[0].Difficulty[nowIdx].is
            }
            
            onMounted(()=>{
                const api = axios.create({
                    baseURL: './api/',
                  });
    
                async function GetBossNameApi(){
                    try{
                        const res = await api.get('bossData.json')
                        BossNameData.is = res.data
                    }catch{
                        console.error('沒接到 bossName Api');
                    }
                }
                async function GetBossDifficultyDataApi(){
                    try{
                        const res = await api.get('bossDifficulty.json')
                        BossDifficultyData.is = res.data
                        console.log(BossDifficultyData.is);
                    }catch{
                        console.error('沒接到 bossDifficulty Api');
                    }
                }
                GetBossNameApi()
                GetBossDifficultyDataApi()
            })
            return{
                handBossNavCont,
                BossNavCont,
                BossNavContBool,
                nowBossRender,
                handNowBossRender,

                handBossDifficulty,
            }   
        },

    }
    createApp(App).mount("#app")     

}


