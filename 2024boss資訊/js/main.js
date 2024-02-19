
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
                console.log(BossNavCont.value.is);
            }
            const nowBossRender = ref({name:"守護天使綠水靈",difficulty:"普通"})
            const handNowBossRender = (el= null , key, difficulty)=>{
                nowBossRender.value.name = key
                nowBossRender.value.difficulty = difficulty
                BossNavContBool.value = false
                console.log('現在難度:',nowBossRender.value.difficulty);
            }
            onMounted(()=>{
                const api = axios.create({
                    baseURL: './api/',
                  });
    
                async function GetBossNameApiData(){
                    try{
                        const res = await api.get('bossData.json')
                        BossNameData.is = res.data
                    }catch{
                        console.error('沒接到 bossName Api');
                    }
                }
                GetBossNameApiData()
            })
            return{
                handBossNavCont,
                BossNavCont,
                BossNavContBool,
                nowBossRender,
                handNowBossRender,
            }   
        },

    }
    createApp(App).mount("#app")     

}


