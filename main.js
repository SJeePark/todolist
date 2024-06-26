//유저가 값을 입력한다
//+버튼을 클릭하면 할일이 추가된다.
// 유저가 delete 버튼을 누르면 할일이 삭제
// check 버튼을 누르면 할일이 끝나면서 밑줄이 간다
// 진행중 끝남 탭을 누르면, 언더바 이동
// 끝남 탭은, 끝난 아이템만, 진행중 탭은 진행중이 아이템만 나오게
// 전체탭을 누르면 다시 전체 아이템으로 돌아옴

/// 1 check 버튼을 클릭하는 순간 true, false
// 2 true면 끝난 걸로 간주하고 밑줄 보여주기
// 3 false 이면 안끝난 걸로 간주하고 그대로

let taskInput = document.getElementById("task-input");
let addButton = document.getElementById("add-button");
let tabs = document.querySelectorAll(".task-tabs div");
let underLine = document.getElementById("under-line");
let taskList = []
let filterList = []
let mode='all'

addButton.addEventListener("click", addTask)



for(let i=1; i<tabs.length;i++){
    tabs[i].addEventListener("click", function(event){
        filter(event)});
    tabs[i].addEventListener("click",(event)=>
    lineIndicator(event));
}
console.log(tabs)

function addTask(){
    let task = {
        id: randomIDGenerate(),
        taskContent: taskInput.value,
        isComplete: false
    }
    taskList.push(task);
    console.log(taskList);
    render();
    addButton.disabled=true;
}

function render() {
    // 1.내가 선택한 탭에 따라서
    let list = []
    if(mode == 'all'){
        list = taskList;
    } else if(mode == "ongoing" || mode === "done"){
        list = filterList;
    }
    // 2. 리스트를 달리 보여준다. 

    let resultHTML = '';
    for(let i = 0; i < list.length; i++) {
        if(list[i].isComplete == true) {
            resultHTML += `<div class="task">
            <div class="task-done">${list[i].taskContent}</div>
            <div>
                <button onclick = "toggleComplete('${list[i].id}')">Done
                </button>
                <button onclick = "deleteTask('${list[i].id}')">Delete</button>
            </div>
        </div>`;
        } else {
            resultHTML += `<div class="task">
            <div>${list[i].taskContent}</div>
                <div>
                    <button onclick = "toggleComplete('${list[i].id}')">Check</button>
                    <button onclick = "deleteTask('${list[i].id}')">Delete</button>
                </div>
            </div>`;
        }

    }
    document.getElementById("task-board").innerHTML = resultHTML;
}

function toggleComplete(id) {
    for(let i = 0; i < taskList.length; i++) {
        if(taskList[i].id == id) {
            taskList[i].isComplete = !taskList[i].isComplete;
            break;
        }
    }
    render();
    console.log(taskList);
     
}

function deleteTask(id){
    for(let i=0;i<taskList.length;i++){
        if(taskList[i].id==id){
            taskList.splice(i, 1)
            break;
        }
    }
    render();
}

function filter(event){
    console.log("filter", event.target.id);
    mode = event.target.id
    filterList = []
    if(mode === "all"){
        //전체 리스트를 보여준다.
        render()
    } else if(mode === "ongoing"){
        //진행 중이 아이템을 보여준다. 
        // task.isComplete=false
        for(let i=0;i<taskList.length;i++){
            if(taskList[i].isComplete === false){
                filterList.push(taskList[i]);
            }
        }
        render();
        console.log('진행', filterList)
    } else if(mode==="done"){
        // 끝나는 케이스
        // task.isComplete=true
        for(let i=0;i<taskList.length;i++){
            if(taskList[i].isComplete === true){
                filterList.push(taskList[i]);
            }
        }
        render()
    }
}

function randomIDGenerate(){
    return '_' + Math.random().toString(36).substr(2, 9);
}

// function enterKey(e){ //엔터키이벤트
//     if(e.keyCode==13){
//         addTask();
//     }
// }

// 인풋값 초기화
addButton.addEventListener("click", function(){ //클릭초기화
    taskInput.value="";     
}); 
function enterPress(e){ //엔터키초기화 함수
    if(e.keyCode==13){
        taskInput.value=""; 
    }
}

//인풋 공백이면 addButton 미동작 
//(이 부분은 모르겠어서 코알누 코드에서 따왔습니다ㅠㅠ)
function inputDisabled(){
    taskInput.addEventListener("keyup",function(event){
        if (taskInput.value !== ""){
            addButton.disabled = false;
        } else {
            addButton.disabled = true;
        }
    })
}
inputDisabled()
addButton.disabled = true;

function enterKey(event){
    if(event.keyCode==13){
        addTask();
    }
}

function lineIndicator(e){
    underLine.style.left = e.currentTarget.offsetLeft + "px";
    underLine.style.width = e.currentTarget.offsetWidth + "px";
    underLine.style.top = e.currentTarget.offsetTop + e.currentTarget.offsetHeight -3 + "px";
}