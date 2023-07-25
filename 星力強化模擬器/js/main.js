
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

            // 裝備星力策略選擇
            const equipSelected = ref("請選擇")
            const starSelected = ref("請選擇")
            const strategySelected = ref("請選擇")

            // 衝22以上的裝備數
            const equipItem = ref(1)


            return{
                // 楓幣台幣 input限制
                NTDtransMaplecoin,
                MaplecointransPoint,
                equipcost,
                starcost,
                InputNumOnly,
                // 裝備星力選擇
                equipSelected,
                starSelected,  
                strategySelected,   
                // 衝22以上的裝備數
                equipItem         
            }   
        },

    }
    createApp(App).mount("#app")     

}


