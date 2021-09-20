document.addEventListener("DOMContentLoaded", function () { 
    changeText()   
    const submitForm = document.getElementById("inputBook");
 
    submitForm.addEventListener("submit", function (event) {
        event.preventDefault();
        addnewbook();
    });

    if(avaiablestorage()){
        storageupdated();
    }
});

document.addEventListener("ondatasaved", () => {
    console.log("Data berhasil diubah.");
 });

 
document.addEventListener("ondataloaded", () => {
    updatedatafromnewbook();
 });