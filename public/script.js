document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('convertForm');
  const inputField = document.getElementById('inputField');
  const resultDisplay = document.getElementById('result');
  const jsonResultDisplay = document.getElementById('jsonResult');

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const inputValue = inputField.value;
    if (!inputValue) {
      resultDisplay.textContent = 'Veuillez entrer une valeur à convertir.';
      jsonResultDisplay.textContent = '';
      return;
    }

    try {
      const res = await fetch(`/api/convert?input=${encodeURIComponent(inputValue)}`);
      const data = await res.json();

      if (data.error) {
        resultDisplay.textContent = `Erreur : ${data.error}`;
        jsonResultDisplay.textContent = JSON.stringify(data);
      } else if (data.string) {
        resultDisplay.textContent = data.string;
        jsonResultDisplay.textContent = JSON.stringify(data);
      } else {
        // Fallback pour les erreurs inattendues ou réponses non JSON
        if(res.status === 200 && typeof data === 'string') { // Cas où la réponse est juste une chaîne (ex: "invalid number")
            resultDisplay.textContent = data;
            jsonResultDisplay.textContent = JSON.stringify({error: data});
        } else {
            resultDisplay.textContent = 'Réponse inattendue du serveur.';
            jsonResultDisplay.textContent = JSON.stringify(data);
        }
      }
    } catch (err) {
      resultDisplay.textContent = 'Erreur de communication avec le serveur.';
      jsonResultDisplay.textContent = '';
      console.error('Fetch error:', err);
    }
  });
});