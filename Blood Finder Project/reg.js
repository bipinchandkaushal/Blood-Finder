let url = "http://localhost:8080/bm/signup";
let name = document.querySelector('.fullname');
let email = document.querySelector('.email');
let pass = document.querySelector('.password');
let mob = document.querySelector('.mob');
let btn = document.querySelector('.submit');

btn.addEventListener("click", async (event) =>{
    event.preventDefault();
    const userDetails = {
        user: name.value,
        email: email.value,
        password: pass.value,
        mob: mob.value,
    }
    try {
        let getresponse = await fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(userDetails)
        })
        if (getresponse.ok) {
            console.log("Working");
        }
        else {
            console.log("Not working");
        }
    }
    catch (error) {
        console.log("error : " + error);
    }
});
