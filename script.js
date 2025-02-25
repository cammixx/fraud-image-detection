document.getElementById('imageInput').addEventListener('change', function(e) {
    const reader = new FileReader();
    reader.onload = function() {
        const preview = document.getElementById('imagePreview');
        preview.src = reader.result;
        preview.style.display = 'block';
        
        // Set full size preview source
        document.getElementById('fullSizePreview').src = reader.result;
    }
    reader.readAsDataURL(e.target.files[0]);
});

document.getElementById('uploadForm').addEventListener('submit', async function(e) {
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
    
    resultContainer.style.display = 'block';
    if (result.is_fraud) {
        resultContainer.className = 'result-box bg-danger text-white';
        resultText.textContent = `AI-generated (${result.confidence}% confidence)`;
    } else {
        resultContainer.className = 'result-box bg-success text-white';
        resultText.textContent = `Authentic (${result.confidence}% confidence)`;
    }

    submitButton.innerHTML = 'Analyze Image';
    submitButton.disabled = false;
});
