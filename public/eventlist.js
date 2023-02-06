async function getList(){
    const response = await fetch('/api/getevents');
    const data = await response.json();
    //console.log(data.message[0]['name']);
    
    const events = data;
    console.log(data);
    events.forEach(i => {

        console.log(i['title']);
        var table= document.getElementById("eventtable");
        table.innerHTML += "<tr><td> " + i['title'] + "</td><td>"
         +i['location'] + "</td><td>"
         +i['date'] + "</td><td>"
         +i['time'] + "</td><td><img width =100 src = \"http://localhost:3000/uploads/"
         +i['image']['filename'] + "\"></td></tr>";
         

    //      <tr>
    //      <td>Event 1</td>
    //      <td>Location 1</td>
    //      <td>2023-03-01</td>
    //      <td>19:00</td>
    //      <td><img src="image1.jpg" height="50"></td>
    //    </tr>
    });
}
getList();