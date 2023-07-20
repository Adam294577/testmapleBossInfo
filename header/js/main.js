
window.onload = () =>{

    const {createApp, ref, reactive, computed, watch, onMounted , onUpdated} = Vue
    const App = {

        setup(){
            // Activitybool
            const Activitybool = ref(false)
            const handActivitybool = () =>{
                Activitybool.value = !Activitybool.value
            }
            // ActivityTag
            const ActivityTagData = ref([
                {key:"黃金蘋果" ,class: "goldAppleTag" , url: "./img/黃金蘋果.png", act: true},
                {key:"時尚隨機箱" ,class: "fashionTag" , url: "./img/時尚隨機箱.png", act: false},
                {key:"皇家美髮券" ,class: "dressingTag" , url: "./img/皇家美髮券.png", act: false},
                {key:"寵物隨機箱" ,class: "petTag" , url: "./img/寵物隨機箱.png", act: false},
                {key:"萌獸卡牌包" ,class: "cuteMosTag" , url: "./img/萌獸卡牌包.png", act: false},
                {key:"月光水晶" ,class: "crystalTag" , url: "./img/月光水晶.png", act: false},
                {key:"魔法畫框" ,class: "frameTag" , url: "./img/魔法畫框.png", act: false}
            ])
            const ActivitySelected = ref([{key:"黃金蘋果", url: "./img/黃金蘋果_banner.png"}])

            const handActivityTag = (el) =>{
                let target = el.currentTarget.dataset.tag
                ActivityTagData.value = ActivityTagData.value.map(item=>{
                    if(target === item.key){
                        ActivitySelected.value[0].key = item.key;
                        ActivitySelected.value[0].url = `./img/${item.key}_banner.png`;
                        console.log(ActivitySelected.value[0].key );
                        console.log(ActivitySelected.value[0].url );
                        return {key: item.key ,class: item.class , url: item.url , act: true}
                    }else{
                        return {key: item.key ,class: item.class , url: item.url , act: false}
                    }
                })
            }
            return{ 
                // Activitybool
                Activitybool,
                handActivitybool,                
                // ActivityTag
                ActivityTagData,
                ActivitySelected,
                handActivityTag,
            }   
        }
    }
        
    
    createApp(App).mount("#app")     

}


