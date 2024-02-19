
window.onload = () =>{

    const {createApp, ref, reactive, computed, watch, onMounted , onUpdated} = Vue
    const App = {

        setup(){
            const denfenseData = reactive({data:[40,40,40]})
            const denfenseVal = ref(0)
            
            const denfenseFn = () =>{
                denfenseData.data.forEach(item => {
                    denfenseVal.value = ( 1 - (1 - denfenseVal.value * 0.01) * (1 - item * 0.01) ) *100
                });
            }
            denfenseFn()
          
            return{
               
            }   
        },

    }
    createApp(App).mount("#app")

}


