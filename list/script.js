function listar() {
    
    fetch("http://localhost:8080/form/listar",   
        {
            headers:{
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            method: "GET"
        })
        .then((res) =>  res.json())
        .then((response) => {
        let table = document.querySelector('.table');
    
        response.map(item => {
            let row = table.insertRow();
            let cellCnpjCpf = row.insertCell(0);
            let cellName = row.insertCell(1);
          
            cellCnpjCpf.innerHTML = item.cnpjCpf;
            cellName.innerHTML = item.nome;  
          })
        })
        .catch(error => console.error('Error:', error))
}

window.onload = listar();