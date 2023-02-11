async function getList(){
    const response = await fetch('/api/getparticipants');
    const data = await response.json();
    const participants = data;
    console.log(data);

    participants.forEach(i => {
        //console.log(i['image']['filename']);
        console.log(i['name']);
        var table= document.getElementById("table");
        table.innerHTML += `<tr>
        <td>${i['name']}</td>
        <td>${i['email']}</td>
        <td>${i['phone']}</td>
        </tr>`;
        var buttons = document.getElementsByTagName("button");
for (var i = 0; i < buttons.length; i++) {
    buttons[i].addEventListener("click", function(e) {
        console.log(this.id);
        register(this.id);
    });
}
});

}
getList();