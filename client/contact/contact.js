//const ContactSchema = require(".../database/contact_scheme");

const submitBtn = document.querySelector('.submit');

submitBtn.addEventListener('click', async() => {

    console.log("kliknuto");
    const nameInput = document.querySelector('.nameInpt');
    const emailInput = document.querySelector('.emailInpt');
    const phoneInput = document.querySelector('.phoneInpt');
    const messageInput = document.querySelector('.msgInpt');

    const name = nameInput.value;
    const email = emailInput.value;
    const phone = phoneInput.value;
    const message = messageInput.value;


    if (name == "" || email == "" || phone == "" || message == "") {
        alert("Popunite kako treba!");
        return;
    } else {

        const resp = await axios.post("/api/contact", {
            name: '',
            email: '',
            phone: '',
            message: '',
        });
        console.log(resp.data);
        location.reload();

    }
});