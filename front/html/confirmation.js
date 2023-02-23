// Je récupère l'ID dans l'URL
const params = new URLSearchParams(window.location.search);
const orderId = params.get("id");

// Je l'affiche dans mon ID correspondant dans l'HTML
function updateCommand(){
    document.querySelector('#orderId').innerText = orderId;
}

updateCommand();