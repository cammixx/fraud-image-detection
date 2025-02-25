// Load results from localStorage
document.addEventListener('DOMContentLoaded', () => {
    const imageData = localStorage.getItem('analysisImage');
    const result = JSON.parse(localStorage.getItem('analysisResult'));
    
    if (!imageData || !result) {
        alert('No analysis data found!');
        window.location.href = 'index.html';
        return;
    }

    document.getElementById('resultPreview').src = imageData;
    
    const statusElement = document.getElementById('resultStatus');
    const confidenceElement = document.getElementById('resultConfidence');
    
    confidenceElement.textContent = `Confidence: ${result.confidence}%`;
    
    if (result.is_fraud) {
        statusElement.textContent = 'AI-Generated Content Detected';
        statusElement.className = 'text-danger';
    } else {
        statusElement.textContent = 'Authentic Content';
        statusElement.className = 'text-success';
    }
});
