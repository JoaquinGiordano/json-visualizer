
class App{
    constructor(){
        this.num = 0;
        this.num2 = 0;
    }

    start(){
       this.clearTable();
       this.requestData({
            method : document.querySelector('#method_input').value.toUpperCase(),
            url : document.querySelector('#url_input').value,
            request: document.querySelector('#request_input').value.split(',')
        });
    }

    requestData({method,url,request}){

        const xhr = new XMLHttpRequest()
        xhr.open(method,url,true);
        xhr.addEventListener('load', (e) =>{
            document.querySelector('#status_p').innerHTML = `Status: ${e.target.status}`;
            const data = JSON.parse(e.target.responseText)
            this.loadTable(data, request);
        });
        xhr.send();

    }

    loadTable(data, request){
        const table = document.querySelector('#table');
        table.innerHTML += `<tr id="tr_fields"></tr>`;
        if(request[0] != '*' && request[0] != '' && request[0] != undefined){
            request.forEach((e) => {
                const tr_fields = document.querySelector('#tr_fields')
                tr_fields.innerHTML += `<th>${e}</th>`;
            });
        }else{
            request = Object.getOwnPropertyNames(data[0]);
            request.forEach((e) => {
                const tr_fields = document.querySelector('#tr_fields')
                tr_fields.innerHTML += `<th>${e}</th>`;
            });
        }        
        data.forEach((e) =>{
            table.innerHTML += `<tr class="tr_data"></tr>`;
            var tr_data = document.getElementsByClassName('tr_data')[this.num];
            request.forEach((e) => {
                let request_number = request[this.num2];
                let data_number = data[this.num];
                tr_data.innerHTML += `<td>${data_number[request_number]}</td>`;
                this.num2++;
            });
            this.num2 = 0;
            this.num++;
            
        })
        this.num = 0;
    }

    clearTable(){
        const table = document.querySelector('#table');
        table.innerHTML = ``;
        document.querySelector('#status_p').innerHTML = '';
    }
}

const app = new App();
