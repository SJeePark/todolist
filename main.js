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
let taskList = []
addButton.addEventListener("click", addTask)

function addTask(){
    let task = {
        id: randomIDGenerate(),
        taskContent: taskInput.value,
        isComplete: false
    }
    taskList.push(task);
    console.log(taskList);
    render();
}

function render() {
    let resultHTML = '';
    for(let i = 0; i < taskList.length; i++) {
        if(taskList[i].isComplete == true) {
            resultHTML += `<div class="task">
            <div class="task-done">${taskList[i].taskContent}</div>
            <div>
                <button onclick = "toggleComplete('${taskList[i].id}')">Check</button>
                <button onclick = "deleteTask()">Delete</button>
            </div>
        </div>`;
        } else {
            resultHTML += `<div class="task">
            <div>${taskList[i].taskContent}</div>
                <div>
                    <button onclick = "toggleComplete('${taskList[i].id}')">Check</button>
                    <button onclick = "deleteTask()">Delete</button>
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

function deleteTask(){
    console.log("삭제")
}

function randomIDGenerate(){
    return '_' + Math.random().toString(36).substr(2, 9);
}