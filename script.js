document.getElementById("uploadBox").addEventListener("click", function() {
    document.getElementById("imageInput").click();
});

document.getElementById("imageInput").addEventListener("change", function(event) {
    const file = event.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function(e) {
            const previewImg = document.getElementById("previewImg");
            previewImg.src = e.target.result;
            previewImg.classList.remove("d-none");
        };
        reader.readAsDataURL(file);
    }
});

document.getElementById("analyzeButton").addEventListener("click", function() {
    const fileInput = document.getElementById("imageInput").files[0];
    if (!fileInput) {
        alert("Please select an image first.");
        return;
    }

    const formData = new FormData();
    formData.append("image", fileInput);

    fetch("/upload", {  // Ensure this matches the backend endpoint
        method: "POST",
        body: formData
    })
    .then(response => response.json())
    .then(data => {
        document.getElementById("result").innerText = `Result: ${data.message}`;
    })
    .catch(error => {
        console.error("Error:", error);
        document.getElementById("result").innerText = "Error processing the image.";
    });
});
