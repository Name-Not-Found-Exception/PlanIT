async function callSomeFunction() {
    const response = await fetch('/api/some-function');
    const data = await response.json();
    console.log(data.result);
  }

  async function submit() {
    let name = document.getElementById('name').value;
    let pass = document.getElementById('password').value;
    let email = document.getElementById('email').value;
    let phone = document.getElementById('phoneno').value;
    const inputdetails = {
      name:name,
      password:pass,
      email:email,
      phone:phone
    }
    //alert(inputdetails['name']);
    const response = await fetch(`/api/send-register?value=${JSON.stringify(inputdetails)}`);
    const data = await response.json();
    alert(data);
  }