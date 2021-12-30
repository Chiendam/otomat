const $ = document.querySelector.bind(document);
const btnSubmit = $('.submit');
const btnReset = $('.reset');
const btnDefaultData = $('.defaultData');
let listState, startState, endState, changeState, stringCheck, alphabet;
let result = '';
let ChangeStateMes;
let stateEnd;

btnReset.onclick = (e) => {
    getDataForm();
    resetForm([listState, alphabet, startState, endState, changeState, stringCheck])
    $('#result').value = '';
}

btnDefaultData.onclick = (e) => {
    useDataSample();
}

btnSubmit.onclick = (e) => {
    getDataForm();
    $('#result').value = '';
    result = '';
    let check = validate([listState, alphabet, startState, endState, changeState, stringCheck])
    if(!check) {
        alert('Vui lòng nhập đầy đủ thông tin cho otomat!')
        return;
    }
    let otomat = formatInput(listState, alphabet, startState, endState, changeState, stringCheck);
    ChangeStateMes = formatToArray(changeState)
    checkString(otomat.stringCheck, otomat)
    $('#result').value = result;
};


const validate = (data) => {
    let check = true;
    data.forEach(el => {
        if(!el.replace(/[\s!y]/g, '')) {
            check = false;
            return;
        }
    });
    return check;
}

const checkString = (arrayString, otomat) => {
    let start = otomat.startState
    stateEnd = start;
    console.log(otomat);
    handle(start, arrayString, otomat);
}

const handle = (state, arrayString, otomat) => {
    console.log(otomat);
    let next = arrayString[arrayString.length - 1];
    let array = otomat.changeState;
    console.log(array, state, next);
    let index = array.findIndex(element => element[0]==state && element[1]==next)
    let item = array[index]
    if(item) { 
        result = result + ChangeStateMes[index] + '\n';
        stateEnd = item[2];
        arrayString.pop();
        handle(item[2], arrayString, otomat)
    } else {
        if(otomat.endState.includes(stateEnd) && !arrayString.length){
            result = `Otomat CHẤP NHẬN xâu ký tự ${stringCheck} với trạng thái kết thúc ${stateEnd} \n${result}`
            return;
            }
        else {
            result = `Otomat KHÔNG CHẤP NHẬN xâu ký tự ${stringCheck}. Dừng tại trạng thái ${stateEnd} \n${result}`
            return;
        }
    }
}

const formatInput = (listState, alphabet, startState, endState, changeState, stringCheck) => {
    let listChange = formatToArray(changeState)
    const newChangeState = listChange.map(el => {
        el = el.replace(/[\s()!y]/g, '');
        return el.replace(/[,=!y]/g, '-').split('-');
    });
    const newEndState = endState.replace(/[\s{}!y]/g, '').split(',');
    const newStringCheck = stringCheck.split('').reverse();
    return {
        listState, 
        alphabet, 
        startState,
        endState: newEndState,
        changeState: newChangeState,
        stringCheck: newStringCheck
    }
}

const formatToArray = (string) => {
    string = string.replace(/[\n]/g, '')
    let listChange = string.split(';')
    listChange.pop();
    return listChange;
}

const resetForm = (data) => {
    data.map(el => '');
}

const useDataSample = () => {
    $('#listState').value = "{q0, q1, q2, q3, q4, q5, q6, q7, q8, q9}";
    $('#startState').value = "q0";
    $('#endState').value = "{q6, q9}";
    $('#changeState').value = `(q0, 6) = q1;\n(q1, 3) = q2;\n(q2, 7) = q3;\n(q3, 9) = q4;\n(q4, 0) = q5;\n(q5, 5) = q6;\n(q6, H) = q7;\n(q7, V) = q8;\n(q8, N) = q9;`;
    $('#stringCheck').value = "637905";
    $('#alphabet').value = "{6, 3, 7, 9, 0, 5, H, V, N} ";
}

const getDataForm = () => {
    listState = $('#listState').value;
    startState = $('#startState').value;
    endState = $('#endState').value;
    changeState = $('#changeState').value;
    stringCheck = $('#stringCheck').value;
    alphabet = $('#alphabet').value;
}
