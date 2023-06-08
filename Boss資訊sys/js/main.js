const {createApp, ref, reactive, computed, watch } = Vue

const App = {
    setup(){

        const GradeImg = reactive(
            {
                "easy" : {
                    "src" : "./img/boss/grade_easy.png",
                    "srcAct" : "./img/boss/grade_easy_act.png",
                    "alt" : "簡單"
                },
                "normal" : {
                    "src" : "./img/boss/grade_normal.png",
                    "srcAct" : "./img/boss/grade_normal_act.png",
                    "alt" : "普通"
                },
                "hard" : {
                    "src" : "./img/boss/grade_hard.png",
                    "srcAct" : "./img/boss/grade_hard_act.png",
                    "alt" : "困難"
                },
                "chaos" : {
                    "src" : "./img/boss/grade_chaos.png",
                    "srcAct" : "./img/boss/grade_chaos_act.png",
                    "alt" : "混沌"
                },
                "extreme" : {
                    "src" : "./img/boss/grade_extreme.png",
                    "srcAct" : "./img/boss/grade_extreme_act.png",
                    "alt" : "極限"
                },
            }

        );

        const BossInfo = reactive(
            {
                "露希妲" :{
                    "easy" :{
                        "bossIntro":{

                        },
                        "bossData":{

                        },
                        "damageRef":{

                        },
                        "bossBonus":{
                        },
                        "otherBonusInfo":{

                        },
                    },
                    "normal" :{

                    },
                    "hard" :{

                    },
                },
                "威爾" :{

                },

                
            }
        );
        




        const NavArr = reactive("");
        
        const NavBool = ref(false);

        const handNavBool = () =>{
            NavBool.value = !NavBool.value;
        }
        const NavWidth = computed(()=>{
            return NavBool.value ? 0 : "-500px";
        })

        const NavPageidx = ref(1);
        const handNavPage = (el) =>{
            if(el.target.id === "backbtn"){
                NavPageidx.value = 1;
                return;
            }
            if(el.target.id === "nextbtn"){
                NavPageidx.value = 2;
                return;
            }
            

        }
        const NavPagecont = computed(()=>{
            let html = ""
            if(NavPageidx.value === 1){
                return html = `
                <li class="infoItem">
                            
                <span class="bossImg">
                        <img src="./img/boss/list_殘暴炎魔.png" alt="">
                </span>

                <span class="bossGrade">
                    <span class="GradeItem"><img class="GradeImg" data-bossname="殘暴炎魔" src="./img/boss/grade_easy.png" alt="easy"></span>
                    <span class="GradeItem"><img class="GradeImg" data-bossname="殘暴炎魔" src="./img/boss/grade_normal.png" alt="normal"></span>
                    <span class="GradeItem"><img class="GradeImg" data-bossname="殘暴炎魔" src="./img/boss/grade_chaos.png" alt="chaos"></span>
                </span>
            </li>
            <li class="infoItem">
                
                <span class="bossImg">
                        <img src="./img/boss/list_梅格耐斯.png" alt="">
                </span>

                <span class="bossGrade">
                    <span class="GradeItem"><img class="GradeImg" data-bossname="梅格耐斯" src="./img/boss/grade_easy.png" alt="easy"></span>
                    <span class="GradeItem"><img class="GradeImg" data-bossname="梅格耐斯" src="./img/boss/grade_normal.png" alt="normal"></span>
                    <span class="GradeItem"><img class="GradeImg" data-bossname="梅格耐斯" src="./img/boss/grade_hard.png" alt="hard"></span>
                </span>
            </li>
            <li class="infoItem">
                
                <span class="bossImg">
                        <img src="./img/boss/list_希拉.png" alt="">
                </span>

                <span class="bossGrade">
                    <span class="GradeItem"><img class="GradeImg" data-bossname="希拉" src="./img/boss/grade_normal.png" alt="normal"></span>
                    <span class="GradeItem"><img class="GradeImg" data-bossname="希拉" src="./img/boss/grade_hard.png" alt="hard"></span>
                </span>
            </li>
            <li class="infoItem">
                
                <span class="bossImg">
                        <img src="./img/boss/list_森蘭丸.png" alt="">
                </span>

                <span class="bossGrade">
                    <span class="GradeItem"><img class="GradeImg" data-bossname="森蘭丸" src="./img/boss/grade_normal.png" alt="normal"></span>
                    <span class="GradeItem"><img class="GradeImg" data-bossname="森蘭丸" src="./img/boss/grade_chaos.png" alt="chaos"></span>

                </span>
            </li>
            <li class="infoItem">
                
                <span class="bossImg">
                        <img  src="./img/boss/list_卡翁.png" alt="">
                </span>

                <span class="bossGrade">
                    <span class="GradeItem"><img class="GradeImg" data-bossname="卡翁" src="./img/boss/grade_normal.png" alt="normal"></span>
                </span>
            </li>
            <li class="infoItem">
                
                <span class="bossImg">
                        <img src="./img/boss/list_拉圖斯.png" alt="">
                </span>

                <span class="bossGrade">
                    <span class="GradeItem"><img class="GradeImg" data-bossname="拉圖斯" src="./img/boss/grade_easy.png" alt="easy"></span>
                    <span class="GradeItem"><img class="GradeImg" data-bossname="拉圖斯" src="./img/boss/grade_normal.png" alt="normal"></span>
                    <span class="GradeItem"><img class="GradeImg" data-bossname="拉圖斯" src="./img/boss/grade_hard.png" alt="hard"></span>
                </span>
            </li>
            <li class="infoItem">
                
                <span class="bossImg">
                        <img src="./img/boss/list_比艾樂.png" alt="">
                </span>

                <span class="bossGrade">
                    <span class="GradeItem"><img class="GradeImg" data-bossname="比艾樂" src="./img/boss/grade_normal.png" alt="normal"></span>
                    <span class="GradeItem"><img class="GradeImg" data-bossname="比艾樂" src="./img/boss/grade_chaos.png" alt="chaos"></span>
                </span>
            </li>
            <li class="infoItem">
                
                <span class="bossImg">
                        <img src="./img/boss/list_斑斑.png" alt="">
                </span>

                <span class="bossGrade">
                    <span class="GradeItem"><img class="GradeImg" data-bossname="斑斑" src="./img/boss/grade_normal.png" alt="normal"></span>
                    <span class="GradeItem"><img class="GradeImg" data-bossname="斑斑" src="./img/boss/grade_chaos.png" alt="chaos"></span>
                </span>
            </li>
            <li class="infoItem">
                
                <span class="bossImg">
                        <img src="./img/boss/list_血腥皇后.png" alt="">
                </span>

                <span class="bossGrade">
                    <span class="GradeItem"><img class="GradeImg" data-bossname="血腥皇后" src="./img/boss/grade_normal.png" alt="normal"></span>
                    <span class="GradeItem"><img class="GradeImg" data-bossname="血腥皇后" src="./img/boss/grade_chaos.png" alt="chaos"></span>
                </span>
            </li>
            <li class="infoItem">
                
                <span class="bossImg">
                        <img src="./img/boss/list_貝倫.png" alt="">
                </span>

                <span class="bossGrade">
                    <span class="GradeItem"><img class="GradeImg" data-bossname="貝倫" src="./img/boss/grade_normal.png" alt="normal"></span>
                    <span class="GradeItem"><img class="GradeImg" data-bossname="貝倫" src="./img/boss/grade_chaos.png" alt="chaos"></span>
                </span>
            </li>
            <li class="infoItem">
                
                <span class="bossImg">
                        <img src="./img/boss/list_凡雷恩.png" alt="">
                </span>

                <span class="bossGrade">
                    <span class="GradeItem"><img class="GradeImg" data-bossname="凡雷恩" src="./img/boss/grade_easy.png" alt="easy"></span>
                    <span class="GradeItem"><img class="GradeImg" data-bossname="凡雷恩" src="./img/boss/grade_normal.png" alt="normal"></span>
                    <span class="GradeItem"><img class="GradeImg" data-bossname="凡雷恩" src="./img/boss/grade_hard.png" alt="hard"></span>
                </span>
            </li>
            <li class="infoItem">
                
                <span class="bossImg">
                        <img src="./img/boss/list_闇黑龍王.png" alt="">
                </span>

                <span class="bossGrade">
                    <span class="GradeItem"><img class="GradeImg" data-bossname="闇黑龍王" src="./img/boss/grade_easy.png" alt="easy"></span>
                    <span class="GradeItem"><img class="GradeImg" data-bossname="闇黑龍王" src="./img/boss/grade_normal.png" alt="normal"></span>
                    <span class="GradeItem"><img class="GradeImg" data-bossname="闇黑龍王" src="./img/boss/grade_chaos.png" alt="chaos"></span>
                </span>
            </li>
            <li class="infoItem">
                
                <span class="bossImg">
                        <img src="./img/boss/list_阿卡伊農.png" alt="">
                </span>

                <span class="bossGrade">
                    <span class="GradeItem"><img class="GradeImg" data-bossname="阿卡伊農" src="./img/boss/grade_easy.png" alt="easy"></span>
                    <span class="GradeItem"><img class="GradeImg" data-bossname="阿卡伊農" src="./img/boss/grade_normal.png" alt="normal"></span>
                </span>
            </li>
            <li class="infoItem">
                
                <span class="bossImg">
                        <img src="./img/boss/list_皮卡啾.png" alt="">
                </span>

                <span class="bossGrade">
                    <span class="GradeItem"><img class="GradeImg" data-bossname="皮卡啾" src="./img/boss/grade_normal.png" alt="normal"></span>
                    <span class="GradeItem"><img class="GradeImg" data-bossname="皮卡啾" src="./img/boss/grade_chaos.png" alt="chaos"></span>
                </span>
            </li>
            <li class="infoItem">
                
                <span class="bossImg">
                        <img src="./img/boss/list_西格諾斯.png" alt="">
                </span>

                <span class="bossGrade">
                    <span class="GradeItem"><img class="GradeImg" data-bossname="西格諾斯" src="./img/boss/grade_easy.png" alt="easy"></span>
                    <span class="GradeItem"><img class="GradeImg" data-bossname="西格諾斯" src="./img/boss/grade_normal.png" alt="normal"></span>
                </span>
            </li>
            <li class="infoItem">
                
                <span class="bossImg">
                        <img src="./img/boss/list_使烏.png" alt="">
                </span>

                <span class="bossGrade">
                    <span class="GradeItem"><img class="GradeImg" data-bossname="使烏" src="./img/boss/grade_normal.png" alt="normal"></span>
                    <span class="GradeItem"><img class="GradeImg" data-bossname="使烏" src="./img/boss/grade_hard.png" alt="hard"></span>
                </span>
            </li>
            <li class="infoItem">
                
                <span class="bossImg">
                        <img src="./img/boss/list_戴米安.png" alt="">
                </span>

                <span class="bossGrade">
                    <span class="GradeItem"><img class="GradeImg" data-bossname="戴米安" src="./img/boss/grade_normal.png" alt="normal"></span>
                    <span class="GradeItem"><img class="GradeImg" data-bossname="戴米安" src="./img/boss/grade_hard.png" alt="hard"></span>
                </span>
            </li>


                `
            }
            if(NavPageidx.value === 2){
                return html = `
                <li class="infoItem">
                            
                <span class="bossImg">
                        <img src="./img/boss/list_殘暴炎魔.png" alt="">
                </span>

                <span class="bossGrade">
                    <span class="GradeItem"><img class="GradeImg" data-bossname="殘暴炎魔" src="./img/boss/grade_easy.png" alt="easy"></span>
                    <span class="GradeItem"><img class="GradeImg" data-bossname="殘暴炎魔" src="./img/boss/grade_normal.png" alt="normal"></span>
                    <span class="GradeItem"><img class="GradeImg" data-bossname="殘暴炎魔" src="./img/boss/grade_chaos.png" alt="chaos"></span>
                </span>
            </li>
                `

            }
        })

        return{
            // NavOpen
            NavBool,
            NavWidth,
            handNavBool,
            // NavPage
            handNavPage,
            NavPageidx,
            NavPagecont,
            // 
        }

    
    },
    onMounted() {

    },
    updated() {
        const Bossselected = ref("露希妲");
        const SectionSelected = ref("bossIntro");
        const Gradeselected  = ref("hard");

        let GradeImg = document.getElementsByClassName("GradeImg")

        const getBossinfoVal = (el) =>{
            Gradeselected.value = el.target.alt;
            Bossselected.value = el.target.dataset.bossname;
            // console.log(`boss名稱: ${Gradeselected.value}`);
            // console.log(`boss難度: ${Bossselected.value}`);
        }
        for (let i = 0; i < GradeImg.length; i++) {
            GradeImg[i].addEventListener("click",getBossinfoVal)
            
        }        
    },
    
}

createApp(App).mount("#app")     