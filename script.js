// Image preview handling
document.getElementById('imageInput').addEventListener('change', function(e) {
    const reader = new FileReader();
    reader.onload = function() {
        const preview = document.getElementById('imagePreview');
        preview.src = reader.result;
        preview.style.display = 'block';
    }
    reader.readAsDataURL(e.target.files[0]);
});

// Form submission handling
document.getElementById('uploadForm').addEventListener('submit', async function(e) {
    e.preventDefault();
    
    // Show loading state
    const submitButton = document.querySelector('button[type="submit"]');
    submitButton.innerHTML = '<span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span> Analyzing...';
    submitButton.disabled = true;

    // Backend integration point (replace with actual fetch call)
    const formData = new FormData(this);
    
    // Simulated response - replace this with actual API call
    // const response = await fetch('/api/analyze', {
    //     method: 'POST',
    //     body: formData
    // });
    // const result = await response.json();
    
    // Simulated result for demonstration
    const result = {
        is_fraud: Math.random() > 0.5, // Random result for demo
        confidence: (Math.random() * 100).toFixed(2)
    };

    // Display results
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

    // Reset button
    submitButton.innerHTML = 'Analyze Image';
    submitButton.disabled = false;
});
