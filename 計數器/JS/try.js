window.onload = () => {
    let numobj = {
        img:[
            '../num/z0.png',
            '../num/z1.png',
            '../num/z2.png',
            '../num/z3.png',
            '../num/z4.png',
            '../num/z5.png',
            '../num/z6.png',
            '../num/z7.png',
            '../num/z8.png',
            '../num/z9.png',
        ]
        
    }
    let min_ten = document.getElementById("min_ten")
    let min_dit = document.getElementById("min_dit")
    let sec_ten = document.getElementById("sec_ten")
    let sec_dit = document.getElementById("sec_dit")

    let start_min_ten = 0
    let start_min_dit = 2
    let start_sec_ten = 0
    let start_sec_dit = 7

    function render_num(){
        min_ten.src = numobj.img[start_min_ten]
        min_dit.src = numobj.img[start_min_dit]
        sec_ten.src = numobj.img[start_sec_ten]
        sec_dit.src = numobj.img[start_sec_dit]
    }
    render_num()

    setInterval(()=>{ countFn() },1000)


    let countFn = () =>{

        if(start_sec_dit !== 0){
            start_sec_dit--;
            render_num();
            return;
        }
        if (start_sec_dit === 0 & start_sec_ten !== 0){
            start_sec_ten--;
            start_sec_dit = 9;
            render_num();
            return;
        }
        if (start_sec_ten === 0 &  start_min_dit !== 0 ){
            start_min_dit--;
            start_sec_ten = 5;
            start_sec_dit = 9;
            render_num();
            return;
        }
        if(start_min_dit ===0 & start_min_ten !==0){
            start_min_ten--;
            start_min_dit = 9;
            start_sec_ten = 5;
            start_sec_dit = 9;
            render_num();
            return;
        }
        if (start_min_ten === 0 & start_min_dit === 0 & start_sec_ten === 0  & start_sec_dit ===0){
            window.location.reload()
        }
    }

}