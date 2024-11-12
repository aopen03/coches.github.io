document.addEventListener("DOMContentLoaded", () => {
    const motorForm = document.getElementById("motorForm");
    const bujiaForm = document.getElementById("bujiaForm");
    const motorSelect = document.getElementById("motorSelect");
    const motorList = document.getElementById("motorList");
    const bujiaHistory = document.getElementById("bujiaHistory");
    const addMotorBtn = document.getElementById("addMotorBtn"); // Botón para mostrar el formulario de añadir motor
    const addMotorSection = document.getElementById("addMotorSection"); // Sección del formulario de añadir motor





    // Evento para mostrar/ocultar el formulario de añadir motor
    addMotorBtn.addEventListener("click", () => {
        // Alterna la visibilidad de la sección de añadir motor
        if (addMotorSection.style.display === "none") {
            addMotorSection.style.display = "block"; // Muestra la sección
            addMotorBtn.textContent = "Cerrar";
        } else {
            addMotorSection.style.display = "none"; // Oculta la sección
            addMotorBtn.textContent = "Agregar motor";

        }
    });

    loadMotors();
    loadMotorOptions();
    loadBujiaHistory();

    motorForm.addEventListener("submit", (e) => {
        e.preventDefault();
        
        const motorName = document.getElementById("motorName").value.trim();
        const litrosBujia = document.getElementById("litrosBujia").value.trim();
        const motorLiters = document.getElementById("motorLiters").value.trim();

        if (!motorName  || !motorLiters) {
            alert("Por favor, completa todos los campos del motor.");
            return;
        }

        const motor = {
            name: motorName,
            liters: parseFloat(motorLiters),
            bujiaLiters: [litrosBujia]
        };

        saveMotor(motor);
        motorForm.reset();
        loadMotors();
        loadMotorOptions();
        addMotorSection.style.display = "none"; // Oculta el formulario tras añadir el motor
    });

    bujiaForm.addEventListener("submit", (e) => {
        e.preventDefault();
        const selectedMotorName = motorSelect.value;
        const bujiaLiters = parseFloat(document.getElementById("bujiaLiters").value.trim());
        const motorLiters= parseFloat(document.getElementById("motorLiters").value.trim());
        if (!selectedMotorName || isNaN(bujiaLiters)) {
            alert("Por favor, selecciona un motor y especifica los litros de entrenamiento.");
            return;
        }

        addBujiaLiters(selectedMotorName, bujiaLiters, motorLiters);
        bujiaForm.reset();
        loadBujiaHistory();
        loadMotors();
    });

    motorSelect.addEventListener("change", () => {
        const selectedMotorName = motorSelect.value;
        if (selectedMotorName) {
            loadMotorDetails(selectedMotorName);
        } else {
            clearMotorDetails();
        }
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
                <strong>${motor.name}</strong><br>
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
            option.textContent = `${motor.name} `;
            motorSelect.appendChild(option);
        });
    }

    function addBujiaLiters(motorName, bujiaLiters, motorLiters) {
        let motors = JSON.parse(localStorage.getItem("motors")) || [];
        const motor = motors.find(m => m.name === motorName);
        
        if (motor) {
            motor.bujiaLiters.push(bujiaLiters);
            motor.motorLiters=motorLiters;
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
                    <strong>${motor.name}</strong> - Entrenamiento ${index + 1}: ${liters} litros
                `;
                bujiaHistory.appendChild(historyItem);
            });
        });
    }

    function loadMotorDetails(motorName) {
        let motors = JSON.parse(localStorage.getItem("motors")) || [];
        const motor = motors.find(m => m.name === motorName);

        if (motor) {
            document.getElementById("motorLiters").value = motor.liters;
            bujiaHistory.innerHTML = "";

            motor.bujiaLiters.forEach((liters, index) => {
                const historyItem = document.createElement("div");
                historyItem.classList.add("history-item");
                historyItem.innerHTML = `
                    Entrenamiento ${index + 1}: ${liters} litros
                `;
                bujiaHistory.appendChild(historyItem);
            });
        }
    }

    function clearMotorDetails() {
        document.getElementById("motorLiters").value = "";
        bujiaHistory.innerHTML = "";
    }
});
