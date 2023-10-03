const commentButton = async (event) =>{
    event.preventDefault();
    
    document.querySelector("#comment-text").style.visibility = "visible";
    document.querySelector("#submit-button").style.visibility = "visible";
}

const submitButton = async(event)=>{
    event.preventDefault();

    const message = document.querySelector('#comment-text').value.trim();
    const currentUrl = window.location.pathname;
    const review_id = currentUrl.match(/\d+/)[0];

    if(message){
        const response = await fetch("/api/comment", {
            method: "POST",
            body: JSON.stringify({message, review_id}),
            headers: {
                "Content-Type": "application/json"
            }
        });

        if (response.ok) {
            console.log(response);
            location.reload();
          } else {
            console.log("Failed to post review", response.json());
          }
    }
}

const likeButton = async(event)=>{
    event.preventDefault();
    

}

document.querySelector("#comment-button").addEventListener("click", commentButton);
document.querySelector("#submit-button").addEventListener("click", submitButton);
document.querySelector("#like-button").addEventListener("click", likeButton);