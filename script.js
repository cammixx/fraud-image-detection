document.addEventListener("DOMContentLoaded", function () {
    const uploadBox = document.querySelector(".upload-area");
    if (uploadBox) {
        uploadBox.addEventListener("click", function () {
            document.getElementById("imageInput").click();
        });
    }

    // Handle Image Upload Preview
    document.getElementById('imageInput').addEventListener('change', function (e) {
        const reader = new FileReader();
        reader.onload = function () {
            const container = document.getElementById('thumbnailContainer');
            const preview = document.getElementById('imagePreview');

            // Ensure elements exist before modifying
            if (container && preview) {
                container.style.display = 'block'; // Show thumbnail
                preview.src = reader.result;
                document.getElementById('fullSizePreview').src = reader.result;
            }
        };

        if (this.files.length > 0) {
            reader.readAsDataURL(this.files[0]);
        }
    });

    // Handle Form Submission (Fake API Call for Now)
    document.getElementById('uploadForm').addEventListener('submit', async function (e) {
        e.preventDefault();

        const submitButton = document.querySelector('button[type="submit"]');
        submitButton.innerHTML = '<span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span> Analyzing...';
        submitButton.disabled = true;

        // Simulated API call
        const formData = new FormData(this);
        const result = {
            is_fraud: Math.random() > 0.5,
            confidence: (Math.random() * 100).toFixed(2)
        };

        const resultContainer = document.getElementById('resultContainer');
        const resultText = document.getElementById('resultText');

        // Ensure elements exist before modifying
        if (resultContainer && resultText) {
            resultContainer.style.display = 'block';
            if (result.is_fraud) {
                resultContainer.className = 'result-box bg-danger text-white';
                resultText.textContent = `AI-generated (${result.confidence}% confidence)`;
            } else {
                resultContainer.className = 'result-box bg-success text-white';
                resultText.textContent = `Authentic (${result.confidence}% confidence)`;
            }
        }

        // Reset button state
        submitButton.innerHTML = 'Analyze Image';
        submitButton.disabled = false;
    });
});
