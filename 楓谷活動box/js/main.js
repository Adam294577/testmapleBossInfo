
window.onload = () =>{

    const {createApp, ref, reactive, computed, watch, onMounted , onUpdated} = Vue
    const App = {

        setup(){
            const txt = ref(5207)
            
            return{ 
                txt
            }   
        }
    }
        
    
    createApp(App).mount("#app")     

}


