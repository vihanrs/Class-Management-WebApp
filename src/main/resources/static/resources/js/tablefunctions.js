// create funtion for fill data into table 
const fillDataIntoTable=(tableID,dataList,displayProperty,editButtonFunction,deleteButtonFunction,printButtonFunction,buttonVisibility = true)=>{
    //create variable for store table body
    const tableBody = tableID.children[1];
     tableBody.innerHTML = '';
     dataList.forEach((item,ind) => {
        const tr = document.createElement('tr');
        
        const tdIndex = document.createElement('td');
        tdIndex.innerText = parseInt(ind)+1;
        tr.appendChild(tdIndex);

        for (const itemOb of displayProperty) {
            const td = document.createElement('td');
           // td.innerText = item.number;
           if(itemOb.datatype == 'String'){
            if(dataList[ind][itemOb.property] == null){
                td.innerText = '-';
            }else{
                td.innerText = dataList[ind][itemOb.property];
            }
           }else if(itemOb.datatype == 'function'){
            td.innerHTML = itemOb.property(dataList[ind]);
           }
            tr.appendChild(td);
        }
        

        const tdButton = document.createElement('td');

        const buttonEdit = document.createElement('button');
        buttonEdit.className = 'btn btn-outline-warning';
        buttonEdit.innerHTML = '<i class = "fa-solid fa-edit"></i>Edit';

        buttonEdit.onclick = () =>{
            console.log("Edit Event" + item.id);
            editButtonFunction(item,ind);
        }

        const buttonDelete = document.createElement('button');
        buttonDelete.className = 'btn btn-outline-danger ms-1 me-1';
        buttonDelete.innerHTML = '<i class = "fa-solid fa-trash"></i>Delete';
        
        buttonDelete.onclick = () =>{
            // console.log("Delete Event" + item.id);
            deleteButtonFunction(item,ind);
        }
        
        const buttonPrint = document.createElement('button');
        buttonPrint.className = 'btn btn-outline-info';
        buttonPrint.innerHTML = '<i class = "fa-solid fa-print"></i>Print';
        
        buttonPrint.onclick = () =>{
            console.log("Print Event" + item.id);
            printButtonFunction(item,ind);
        }

        if(buttonVisibility){
        tdButton.appendChild(buttonEdit);
        tdButton.appendChild(buttonDelete);
        // tdButton.appendChild(buttonPrint);
        tr.appendChild(tdButton);
        }

        tableBody.appendChild(tr);
     });
}
