document.addEventListener("DOMContentLoaded", () => {
    const carForm = document.getElementById("carForm");
    const carList = document.getElementById("carList");
    const carSelect = document.getElementById("carSelect");

    // Cargar coches desde localStorage
    loadCars();
    loadCarOptions();

    carForm.addEventListener("submit", (e) => {
        e.preventDefault();

        const carName = document.getElementById("carName").value.trim();
        const frontShockOil = document.getElementById("frontShockOil").value.trim();
        const rearShockOil = document.getElementById("rearShockOil").value.trim();
        const frontDiffOil = document.getElementById("frontDiffOil").value.trim();
        const centerDiffOil = document.getElementById("centerDiffOil").value.trim();
        const rearDiffOil = document.getElementById("rearDiffOil").value.trim();
        const fuelLiters = parseFloat(document.getElementById("fuelLiters").value.trim()) || 0;
        const batteryCount = parseInt(document.getElementById("batteryCount").value.trim()) || 0;

        if (!carName) {
            alert("Por favor, ingresa un nombre para el coche.");
            return;
        }

        const car = {
            carName,
            frontShockOil,
            rearShockOil,
            frontDiffOil,
            centerDiffOil,
            rearDiffOil,
            fuelLiters,
            batteryCount
        };

        saveCar(car);
        carForm.reset();
        loadCars();
        loadCarOptions();
    });

    carSelect.addEventListener("change", () => {
        const selectedCarName = carSelect.value;
        if (selectedCarName) {
            fillFormWithCarDetails(selectedCarName);
        } else {
            carForm.reset();
        }
    });

    function saveCar(car) {
        try {
            let cars = JSON.parse(localStorage.getItem("cars")) || [];
            const existingCarIndex = cars.findIndex((c) => c.carName === car.carName);
            if (existingCarIndex !== -1) {
                cars[existingCarIndex] = car;
            } else {
                cars.push(car);
            }
            localStorage.setItem("cars", JSON.stringify(cars));
        } catch (error) {
            console.error("Error al guardar el coche en localStorage", error);
        }
    }

    // Función para eliminar un coche por su nombre
    function deleteCar(carName) {
        try {
            let cars = JSON.parse(localStorage.getItem("cars")) || [];
            cars = cars.filter(car => car.carName !== carName); // Filtrar coches excepto el seleccionado
            localStorage.setItem("cars", JSON.stringify(cars));
            loadCars(); // Actualizar lista de coches
            loadCarOptions(); // Actualizar opciones en el selector
        } catch (error) {
            console.error("Error al eliminar el coche", error);
        }
    }

    function loadCars() {
        carList.innerHTML = "";
        try {
            let cars = JSON.parse(localStorage.getItem("cars")) || [];
            if (cars.length === 0) {
                carList.innerHTML = "<p>No hay coches guardados.</p>";
            } else {
                cars.forEach((car) => {
                    const carItem = document.createElement("div");
                    carItem.classList.add("car-item");
                    carItem.innerHTML = `
                        <strong>${car.carName}</strong><br>
                        Silicona Amortiguadores - Delantero: ${car.frontShockOil}, Trasero: ${car.rearShockOil}<br>
                        Silicona Diferenciales - Delantero: ${car.frontDiffOil}, Central: ${car.centerDiffOil}, Trasero: ${car.rearDiffOil}<br>
                        Litros de Combustible: ${car.fuelLiters}<br>
                        Baterías Gastadas: ${car.batteryCount}
                    `;

                    // Crear y agregar botón de eliminar
                    const deleteButton = document.createElement("button");
                    deleteButton.textContent = "Eliminar";
                    deleteButton.addEventListener("click", () => {
                        if (confirm(`¿Estás seguro de que quieres eliminar el coche ${car.carName}?`)) {
                            deleteCar(car.carName); // Llama a la función de eliminación
                        }
                    });
                    carItem.appendChild(deleteButton); // Añadir botón al elemento de coche

                    carList.appendChild(carItem);
                });
            }
        } catch (error) {
            console.error("Error al cargar los coches desde localStorage", error);
        }
    }

    function loadCarOptions() {
        carSelect.innerHTML = "<option value=\"\">Selecciona un coche</option>";
        try {
            let cars = JSON.parse(localStorage.getItem("cars")) || [];
            cars.forEach((car) => {
                const option = document.createElement("option");
                option.value = car.carName;
                option.textContent = car.carName;
                carSelect.appendChild(option);
            });
        } catch (error) {
            console.error("Error al cargar las opciones de los coches desde localStorage", error);
        }
    }

    function fillFormWithCarDetails(carName) {
        try {
            let cars = JSON.parse(localStorage.getItem("cars")) || [];
            const car = cars.find((c) => c.carName === carName);
            if (car) {
                document.getElementById("carName").value = car.carName;
                document.getElementById("frontShockOil").value = car.frontShockOil;
                document.getElementById("rearShockOil").value = car.rearShockOil;
                document.getElementById("frontDiffOil").value = car.frontDiffOil;
                document.getElementById("centerDiffOil").value = car.centerDiffOil;
                document.getElementById("rearDiffOil").value = car.rearDiffOil;
                document.getElementById("fuelLiters").value = car.fuelLiters;
                document.getElementById("batteryCount").value = car.batteryCount;
            }
        } catch (error) {
            console.error("Error al rellenar el formulario con los detalles del coche", error);
        }
    }
});

