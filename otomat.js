class otomat {

    constructor(listState, alphabet, startState, endState, changeState) {
        this.listState = listState;
        this.alphabet = alphabet;
        this.startState = startState;
        this.endState = endState;
        this.changeState = changeState;

        this.formatData();
    }

    formatData(){
        this.changeState = this.changeState.replace(/[\n]/g, '')
        let listChange = this.changeState.split(';')
        listChange.pop();
    
        const newChangeState = listChange.map(el => {
            el = el.replace(/[\s()!y]/g, '');
            return el.replace(/[,=!y]/g, '-').split('-');
        });
    
        const newEndState = this.endState.replace(/[\s{}!y]/g, '').split(',');
        // const newStringCheck = this.stringCheck.split('').reverse();
        
        this.endState = newEndState;
        this.changeState = newChangeState;
    }

    checkString(arrayString){
        let start = this.startState
        let stateEnd = start;
        let result = '', 
        // let changes = changeState.replace(/[\n]/g, '')
        // changes = changeState.split(';')
        // changes.pop();
        this.handle(start, arrayString);
    }

    handle(state, arrayString){
        let next = arrayString[arrayString.length - 1];
        let array = this.changeState;
        console.log(array, state, next);
        let index = array.findIndex(el => el[0]==state&&el[1]==next)
        let item = array[index]
        if(item) { 
            console.log(item, item[2]);
            result = result + ChangeStateMes[index] + '\n';
            stateEnd = item[2];
            arrayString.pop();
            handle(item[2], arrayString, otomat)
        } else {
            if(otomat.endState.includes(stateEnd) && !arrayString.length){
                console.log('ket thuc');
                result = `Otomat CHẤP NHẬN xâu ký tự ${stringCheck} với trạng thái kết thúc ${stateEnd} \n${result}`
                return;
                }
            else {
                console.log('loi')
                result = `Otomat KHÔNG CHẤP NHẬN xâu ký tự ${stringCheck}. Dừng tại trạng thái ${stateEnd} \n${result}`
                return;
            }
        }
    }
}