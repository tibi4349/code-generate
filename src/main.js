function generateCodes() {
    const val = document.getElementById('userInput').value;
    if(!val) return alert("Írj be valamit!");

    // Vonalkód generálása (Code128 formátum)
    JsBarcode("#barcode", val, {
        format: "CODE128",
        lineColor: "#000",
        width: 2,
        height: 100,
        displayValue: true
    });

    // QR-kód generálása
    const qrDiv = document.getElementById("qrcode");
    qrDiv.innerHTML = ""; // Előző törlése
    new QRCode(qrDiv, {
        text: val,
        width: 128,
        height: 128
    });
}

// Vonalkód mentése PNG-ként
function downloadBarcode() {
    const svg = document.getElementById("barcode");
    const canvas = document.createElement("canvas");
    const svgData = new XMLSerializer().serializeToString(svg);
    const img = new Image();
    
    // SVG konvertálása Canvas-re, majd letöltés
    img.onload = function() {
        canvas.width = img.width;
        canvas.height = img.height;
        const ctx = canvas.getContext("2d");
        ctx.fillStyle = "white"; // Fehér háttér a vonalkód alá
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        ctx.drawImage(img, 0, 0);
        
        const link = document.createElement("a");
        link.download = "vonalkod.png";
        link.href = canvas.toDataURL("image/png");
        link.click();
    };
    img.src = "data:image/svg+xml;base64," + btoa(svgData);
}

// QR-kód mentése
function downloadQR() {
    const qrCanvas = document.querySelector("#qrcode canvas");
    if (!qrCanvas) return alert("Előbb generálj egy kódot!");
    
    const link = document.createElement("a");
    link.download = "qr-kod.png";
    link.href = qrCanvas.toDataURL("image/png");
    link.click();
}