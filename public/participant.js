async function getList(){
    const response = await fetch('/api/getparticipants');
    const data = await response.json();
    const participants = data;
    console.log(data);
    var table= document.getElementById("table");
    if(data.length==0){
        table.innerHTML += "No participants yet";
    }
    else{
    table.innerHTML +=`<tr>
    <th>Name</th>
    <th>Email</th>
    <th>Phone Number</th>
    </tr>`;
    participants.forEach(i => {
        //console.log(i['image']['filename']);
        console.log(i['name']);
        table= document.getElementById("table");
        table.innerHTML += `<tr>
        <td>${i['name']}</td>
        <td>${i['email']}</td>
        <td>${i['phone']}</td>
        </tr>`;

});

}}
getList();