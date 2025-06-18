document.addEventListener("DOMContentLoaded", () => {
    const motorForm = document.getElementById("motorForm");
    const bujiaForm = document.getElementById("bujiaForm");
    const motorSelect = document.getElementById("motorSelect");
    const motorList = document.getElementById("motorList");
    const bujiaHistory = document.getElementById("bujiaHistory");

    loadMotors();
    loadMotorOptions();
    loadBujiaHistory();

    motorForm.addEventListener("submit", (e) => {
        e.preventDefault();
        const motorName = document.getElementById("motorName").value.trim();
        const motorModel = document.getElementById("motorModel").value.trim();
        const motorLiters = document.getElementById("motorLiters").value.trim();

        if (!motorName || !motorModel || !motorLiters) {
            alert("Por favor, completa todos los campos del motor.");
            return;
        }

        const motor = {
            name: motorName,
            model: motorModel,
            liters: parseFloat(motorLiters),
            bujiaLiters: []
        };

        saveMotor(motor);
        motorForm.reset();
        loadMotors();
        loadMotorOptions();
    });

    bujiaForm.addEventListener("submit", (e) => {
        e.preventDefault();
        const selectedMotorName = motorSelect.value;
        const bujiaLiters = parseFloat(document.getElementById("bujiaLiters").value.trim());

        if (!selectedMotorName || isNaN(bujiaLiters)) {
            alert("Por favor, selecciona un motor y especifica los litros de entrenamiento.");
            return;
        }

        addBujiaLiters(selectedMotorName, bujiaLiters);
        bujiaForm.reset();
        loadBujiaHistory();
        loadMotors();
    });

    function saveMotor(motor) {
        let motors = JSON.parse(localStorage.getItem("motors")) || [];
        motors.push(motor);
        localStorage.setItem("motors", JSON.stringify(motors));
    }

    function loadMotors() {
        motorList.innerHTML = "";
        let motors = JSON.parse(localStorage.getItem("motors")) || [];
        motors.forEach(motor => {
            const motorItem = document.createElement("div");
            motorItem.classList.add("motor-item");
            motorItem.innerHTML = `
                <strong>${motor.name} (${motor.model})</strong><br>
                Litros del Motor: ${motor.liters}<br>
                Litros de Bujías: ${motor.bujiaLiters.join(", ") || "No hay registros"}
            `;
            motorList.appendChild(motorItem);
        });
    }

    function loadMotorOptions() {
        motorSelect.innerHTML = "<option value=\"\">Selecciona un Motor</option>";
        let motors = JSON.parse(localStorage.getItem("motors")) || [];
        motors.forEach(motor => {
            const option = document.createElement("option");
            option.value = motor.name;
            option.textContent = `${motor.name} (${motor.model})`;
            motorSelect.appendChild(option);
        });
    }

    function addBujiaLiters(motorName, bujiaLiters) {
        let motors = JSON.parse(localStorage.getItem("motors")) || [];
        const motor = motors.find(m => m.name === motorName);
        if (motor) {
            motor.bujiaLiters.push(bujiaLiters);
            localStorage.setItem("motors", JSON.stringify(motors));
        }
    }

    function loadBujiaHistory() {
        bujiaHistory.innerHTML = "";
        let motors = JSON.parse(localStorage.getItem("motors")) || [];
        motors.forEach(motor => {
            motor.bujiaLiters.forEach((liters, index) => {
                const historyItem = document.createElement("div");
                historyItem.classList.add("history-item");
                historyItem.innerHTML = `
                    <strong>${motor.name} (${motor.model})</strong> - Entrenamiento ${index + 1}: ${liters} litros
                `;
                bujiaHistory.appendChild(historyItem);
            });
        });
    }
});
