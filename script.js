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

            // Store the full-size image in the modal
            document.getElementById("fullSizeImage").src = e.target.result;

            // Enable Analyze button
            document.getElementById("analyzeButton").disabled = false;
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

    // Display loading message
    document.getElementById("result").innerText = "Analyzing... Please wait.";

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

// Open Full-Size Image in Modal
function openFullSizeImage() {
    document.getElementById("imageModal").style.display = "flex";
}

// Close Modal
function closeModal() {
    document.getElementById("imageModal").style.display = "none";
}
