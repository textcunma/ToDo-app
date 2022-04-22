<!-- 単一ファイルコンポーネント -->
<!-- Java Script -->
<script>
    export default{
        name: 'MainItem',
        data() {
            return{
                checked: false
            }
        } 
    }
</script>

<!-- Vue.js 3.2からの新機能 -->
<script setup>
    import { ref } from 'vue';      // リアクティブ(値変更を監視)を利用
    const taskname=ref('');         // taskname変数(文字列)を監視
    const todos=ref([])             // todos変数(配列)を監視
    const dayvalue = ref('')        // カレンダー日付

    // addNewTodo関数
    const addNewTodo=() => {
        console.log(todos.value)
        todos.value.push({
            id: Date.now(),             // 現在の時刻
            done:false,                 // 完了したかどうかのフラグ
            content: taskname.value,    // タスク名を追加
            time: dayvalue.value,       // 時間を追加
        });
        dayvalue.value='';
        taskname.value='';              // タスク名を初期化
    }

    // removeTodo関数(1個だけindexの要素を除去)
    const removeTodo=(index) => {
        todos.value.splice(index,1);
    }

    // 要素入れ替え
    const swapList=(index,value) => {
        let tmp=todos.value[index];
        todos.value[index]=todos.value[index+value];
        todos.value[index+value]=tmp;
    }

    // markAllDone関数
    const markAllDone=() => {
        todos.value.forEach((todo) => todo.done = true);
    }

    // removeAllTodos関数
    const removeAllTodos=() =>{
        todos.value = [];
    }

    // カレンダーが参照しない箇所
    const disabledDate = (time) => {
        return time.getTime() < Date.now() - 3600 * 1000 * 24
    }

    const shortcuts = [
        {
            text: 'Today',
            value: new Date(),
        },
        {
            text: 'Tomorrow',
            value: () => {
            const date = new Date()
            date.setTime(date.getTime() + 3600 * 1000 * 24)
            return date
            },
        },
        {
            text: 'Next week',
            value: () => {
            const date = new Date()
            date.setTime(date.getTime() + 3600 * 1000 * 24 * 7)
            return date
            },
        },
    ]

    const timeSort=() => {
        todos.value.sort(function(a,b){
            if(a.time<b.time) return -1;
            if(a.time > b.time) return 1;
            return 0;
        });
    }
</script>

<!-- HTML -->
<template>
    <div>
        <el-form @submit.prevent="addNewTodo" id="inputarea">
            <el-input v-model="taskname" name="taskname" placeholder="タスクを入力"></el-input>   <!-- v-model:双方向バインディング -->
            <el-date-picker v-model="dayvalue" 
                            type="date" 
                            placeholder="日付を選択"
                            :shortcuts="shortcuts"
                            format="YYYY/MM/DD" 
                            value-format="YYYY-MM-DD" 
                            :disabled-date="disabledDate"/>
            
        </el-form>
        <el-button @click="addNewTodo" id="addBtn">追加</el-button>     <!-- ボタンが押されたらaddNewTodo関数を実行 -->
        <div>
            <el-button @click="markAllDone">全て完了</el-button>    <!-- ボタンが押されたらmarkAllDone関数を実行 -->
            <el-button @click="removeAllTodos">全て削除</el-button> <!-- ボタンが押されたらremoveAllTodos関数を実行 -->
            <el-button @click="timeSort">時間でソート</el-button> <!-- ボタンが押されたらtimeSort関数を実行 -->
        </div>

        <!-- タスクが追加されるごとに生成 -->
        <ul>
            <li v-for="(todo, index) in todos" :key="todo.id" class="todo">
                <h3 :class="{ done: todo.done }" @click="taskDone(todo)">{{todo.content}}</h3>
                
                <div class="ope">
                    <h5 :class="{ done: todo.done }" @click="taskDone(todo)">{{todo.time}}</h5>
                    <div class="ope">
                          <input type="checkbox" id="checkbox" v-model="todo.done" />
                          <label id="checklabel" for="checkbox">{{ todo.done ? '完': '未'}}</label>  <!-- todo.done=trueの場合に「完了」 --> 
                    </div>
                    <el-button @click="removeTodo(index)">削除</el-button>  <!-- ボタンが押されたらremoveTodo関数を実行 -->
                    <el-button @click="swapList(index,-1)" v-if="index != 0">↑</el-button>  <!-- ボタンが押されたら上に移動 -->
                    <el-button @click="swapList(index,1)" v-if="index != todos.length-1">↓</el-button>  <!-- ボタンが押されたら下に移動 -->
                </div>
            </li>
        </ul>
    </div>
</template>

<!-- CSS -->
<style scoped>
    #inputarea{
        width:30vw;
        margin: 0 auto;
        display: flex;
        justify-content: center;
        align-items: center;
        
    }
    h3{
        width:10vw;
    }
    h5{
        width:5vw;
    }
    li {
        width: 30vw;
        margin: 0 auto;
        display: flex;
        list-style: none;
        overflow-x: auto;
    }
    .ope{
        display: flex;
        justify-content: center;
        align-items: center;
    }
    #checklabel{
        width:3vw;
        font-size: large;
    }
    input[type=checkbox] {
        transform: scale(1.5);
        margin: 0 6px 0 0;
    }
    #addBtn{
        margin: 1vh;
    }
</style>