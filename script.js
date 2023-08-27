let url = "https://api.dictionaryapi.dev/api/v2/entries/en/"
let x = ""; // Just for test on the console

const changeInDom= (response) => {
    console.log(response);
    console.log(`Word = ${response.word}`);
    console.log(`Word = ${response.meanings[0].definitions[0].definition}`);
    const node = document.createElement("p");
    const node2 = document.createElement("p");
    const node3 = document.createElement("p");
    let text = `Word : ${response.word}`;
    let text2 = `Meaning = ${response.meanings[0].definitions[0].definition} `;
    let syno = "Synonyms are : \t";
    // for (let i=0;i< of response.meanings[0].definitions) {
    //     text2 += `${defination}  ,   `;
    // }
    for (syn of x[0].meanings[0].synonyms) {
        syno += `${syn} , `;
    }
    const textnode = document.createTextNode( text );
    const textnode2 = document.createTextNode( text2 );
    const textnode3 = document.createTextNode( syno );
    node.appendChild(textnode);
    node2.appendChild(textnode2);
    node3.appendChild(textnode3);
    node.className = "m-3";
    node2.className = "m-3";
    node3.className = "m-3";
    node3.innerHTML += `<hr>`
    document.getElementById("meaning").appendChild(node);
    document.getElementById("meaning").appendChild(node2);
    document.getElementById("meaning").appendChild(node3);
}


document.getElementById("searchBtn").addEventListener("click", function(event){
    event.preventDefault()
    let userInput = document.getElementById("searchText").value;
    userInput = userInput.trim();
    userInput = userInput.replace(' ','+');
    fetch(url+ userInput)
    .then((response) => {return response.json();})
    .then((value) => {
        x = value;
        changeInDom(x[0])
    })
    .catch((error) => {
        console.log(error) 
        // Loading Screen
        document.getElementById("meaning").innerHTML = `
        <br>
        <div class="spinner-border text-primary m-2" role="status">
        <span class="sr-only">  🙂   </span>
        <br>
      </div>`
    })
    document.getElementById("searchText").value = ""
});
