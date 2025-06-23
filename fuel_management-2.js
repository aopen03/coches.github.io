document.addEventListener("DOMContentLoaded", () => {
    const timeSpentMinutesInput = document.getElementById("timeSpentMinutes");
    const timeSpentSecondsInput = document.getElementById("timeSpentSeconds");
    const nitroRemainingInput = document.getElementById("nitroRemaining");
    const calculateButton = document.getElementById("calculateTime");
    const remainingTimeMinutes = document.getElementById("remainingTimeMinutes");
    const remainingTimeSeconds = document.getElementById("remainingTimeSeconds");

    // Evento para calcular el tiempo restante cuando se hace clic en el botón
    calculateButton.addEventListener("click", () => {
        const minutes = parseFloat(timeSpentMinutesInput.value) || 0;
        const seconds = parseFloat(timeSpentSecondsInput.value) || 0;
        const nitroRemaining = parseFloat(nitroRemainingInput.value);


        // Convertir minutos y segundos a un valor decimal en minutos
        const timeSpent = minutes * 60 + seconds ;

        // Calcular nitro usado (125 ml es igual a 0.125 litros)
        const nitroUsed = 125 - nitroRemaining;

        // Validar que nitroUsed sea positivo
        if (nitroUsed <= 0) {
            alert("El valor de nitro sobrante debe ser menor a 125 ml.");
            return;
        }

        const consumptionTime = (125* timeSpent)/nitroUsed;
        
        
            const minutes2 = Math.floor(consumptionTime/ 60); // Calcula los minutos
            const remainingSeconds = consumptionTime % 60; // Calcula los segundos restantes
        // Calcular la tasa de consumo (minutos por litro)
      

        // Calcular tiempo restante en función del nitro sobrante
        
        remainingTimeMinutes.textContent = minutes2; // Muestra el tiempo en minutos con 2 decimales
        remainingTimeSeconds.textContent = parseInt(Number(remainingSeconds));
    });
});
