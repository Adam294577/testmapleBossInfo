
    let spark_level = 
        {
            T3 : 97.36,
            T4 : 98.86,
            T5 : 99.44,
            T6 : 99.77,
            T7 : 100,
        }
    let equipment_cont = ['str','dex','int','luk','str_dex','str_int','str_luk','dex_int','dex_luk'
    ,'int_luk','hp','mp','等級減少','防禦力','攻擊力','魔力','move','jump','全屬']

    let weapon_content = []

    let equipment_160_result ={
        str : 11,
        dex : 11,
        int : 11,
        luk : 11,
        str_dex : 5,
        str_int : 5,
        str_luk : 5,
        dex_int : 5,
        dex_luk : 5,
        int_luk : 5,
        T3hp : 1440,   
        T3mp : 1440,   
        等級減少 : 5,
        防禦力 : 9,
        攻擊力 : 1,
        魔力 : 1,
        move : 1,
        jump : 1,
        全屬 : 1,
    }

    let test_arr = ['T3luk', 'T3str_dex', 'T3str_luk' , 'T4全屬']
    // let test_arr = merge_lv_cont()
    // fin result  +63str +  15dex  + 15luk +4全屬


    

    function equipment_content_dice(){
        let newarr =[]

        while( newarr.length < 4 ){

            let num = Math.floor(Math.random() * equipment_cont.length)

            if (newarr.indexOf(equipment_cont[num]) !== -1){
                num = Math.floor(Math.random() * equipment_cont.length)
            }else if(newarr.indexOf(equipment_cont[num]) === -1) {
                newarr.push(equipment_cont[num])
            }
        }
        return newarr

    }
    let equipment_content_result = equipment_content_dice()
    console.log(equipment_content_result)
    



    function spark_level_dice(){
        let num = 0
        let num_result = []

        for (let i = 0; i < 4; i++) {
            num = Math.floor(Math.random()*10000)/100
            num_result.push(num)
            
        }
        // console.log(num_result)    

        function show_lv(val){

            let str_result = []

            str_result = num_result.map(function(lv){
                // console.log(lv)
                if(lv <= spark_level.T3 ){
                   return  'T3'
                }
                if( lv > spark_level.T3 && lv <= spark_level.T4 ){
                   return  'T4'
                }
                if( lv > spark_level.T4 && lv <= spark_level.T5 ){
                   return  'T5'
                }
                if( lv > spark_level.T5 && lv <= spark_level.T6 ){
                   return  'T6'
                }
                if( lv > spark_level.T6 && lv <= spark_level.T7 ){
                   return  'T7'
                }



            })
            val = str_result
            return val
        }
        return show_lv()

        
    }
    let lv_result = spark_level_dice()

    console.log(lv_result)

    function merge_lv_cont(){
        let ans = []
        let i = -1
        ans =  lv_result.map(lv => {
            i++
            return lv + equipment_content_result[i]
        });
        return ans
    }
    // console.log(merge_lv_cont())

    let fin_arr = merge_lv_cont()

    // console.log(fin_arr)

    function fin_result(){
        
        let equipment_str = 0
        let equipment_dex = 0
        let equipment_int = 0
        let equipment_luk = 0
        let equipment_hp = 0
        let equipment_mp = 0
        let equipment_lv = 0
        let equipment_defence = 0
        let equipment_att = 0
        let equipment_magic = 0
        let equipment_move = 0
        let equipment_jump = 0
        let equipment_all = 0

        function caculate_160_Attributes(){
            fin_arr.forEach(function(item){
                if (item === 'T3str' ){
                    equipment_str +=27
                }
                if (item === 'T4str' ){
                    equipment_str +=36
                }
                if (item === 'T5str' ){
                    equipment_str +=45
                }
                if (item === 'T6str' ){
                    equipment_str +=54
                }
                if (item === 'T7str' ){
                    equipment_str +=63
                }
                if (item === 'T3dex' ){
                    equipment_dex +=27
                }
                if (item === 'T4dex' ){
                    equipment_dex +=36
                }
                if (item === 'T5dex' ){
                    equipment_dex +=45
                }
                if (item === 'T6dex' ){
                    equipment_dex +=54
                }
                if (item === 'T7dex' ){
                    equipment_dex +=63
                }
                if (item === 'T3int' ){
                    equipment_int +=27
                }
                if (item === 'T4int' ){
                    equipment_int +=36
                }
                if (item === 'T5int' ){
                    equipment_int +=45
                }
                if (item === 'T6int' ){
                    equipment_int +=54
                }
                if (item === 'T7int' ){
                    equipment_int +=63
                }
                if (item === 'T3luk' ){
                    equipment_luk +=27
                }
                if (item === 'T4luk' ){
                    equipment_luk +=36
                }
                if (item === 'T5luk' ){
                    equipment_luk +=45
                }
                if (item === 'T6luk' ){
                    equipment_luk +=54
                }
                if (item === 'T7luk' ){
                    equipment_luk +=63
                }
                if (item === 'T3str_dex'){
                    equipment_str += 15
                    equipment_dex += 15
                }
                if (item === 'T3str_luk'){
                    equipment_str += 15
                    equipment_luk += 15
                }
                if (item === 'T3str_int'){
                    equipment_str += 15
                    equipment_int += 15
                }
                if (item === 'T3dex_int'){
                    equipment_dex += 15
                    equipment_int += 15
                }
                if (item === 'T3dex_luk'){
                    equipment_dex += 15
                    equipment_luk += 15
                }
                if (item === 'T3int_luk'){
                    equipment_int += 15
                    equipment_luk += 15
                }
                if (item === 'T3全屬'){
                    equipment_all += 3
                }
                if (item === 'T4全屬'){
                    equipment_all += 4
                }
                if (item === 'T5全屬'){
                    equipment_all += 5
                }
                if (item === 'T6全屬'){
                    equipment_all += 6
                }
                if (item === 'T7全屬'){
                    equipment_all += 7
                }
                
            })
            
            
            console.log('str' +":"+ equipment_str)
            console.log('dex' +":"+ equipment_dex)
            console.log('int' +":"+ equipment_int)
            console.log('luk' +":"+ equipment_luk)
            console.log('全屬' +":"+ equipment_all)
        }
        caculate_160_Attributes()

   



    }
    fin_result()


    
    
    



    
