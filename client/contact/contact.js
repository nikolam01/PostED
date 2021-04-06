//const ContactSchema = require(".../database/contact_scheme");
let contacts;

getContacts(); //ovde pozivamo asinhronu fiju od dole odnosno trazimo podatke od servera

async function getContacts() {

    const resp = await axios.get("/api/contacts"); //uzmi info sa te rute i console loguj je

    contacts = resp.data.contacts;

    console.log(contacts);


};

const submitBtn = document.querySelector('.submitBtn');

submitBtn.addEventListener('click', async () => {

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
    }
    const resp = await axios.post("/api/contacts", {
        name,
        email,
        phone,
        message,
    });
    console.log(resp.data);
    alert("Thank you for your submission!");
    location.reload();

});