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
            rearDiffOil
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
                        Silicona Diferenciales - Delantero: ${car.frontDiffOil}, Central: ${car.centerDiffOil}, Trasero: ${car.rearDiffOil}
                    `;
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
            }
        } catch (error) {
            console.error("Error al rellenar el formulario con los detalles del coche", error);
        }
    }
});