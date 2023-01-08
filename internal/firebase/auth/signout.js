import { getAuth, signOut } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-auth.js";
const auth = getAuth(app);
signOut(auth).then(() => {
    window.location.href = "/portal/";
    console.log("Test");
}).catch((error) => {console.log(error)});