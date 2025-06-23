document.addEventListener("DOMContentLoaded", () => {
    const menuConfig = document.getElementById("menuConfig");
    const menuFuel = document.getElementById("menuFuel");
        const menuFuel2 = document.getElementById("menuFuel2");
    const menuMotores = document.getElementById("menuMotores");

    // Manejar la navegación del menú
    menuConfig.addEventListener("click", () => {
        window.location.href = "car_configuration.html";
    });

    menuFuel.addEventListener("click", () => {
        window.location.href = "fuel_management.html";
    });
    menuFuel2.addEventListener("click", () => {
        window.location.href = "fuel_management-2.html";
    });
    menuMotores.addEventListener("click", () => {
        window.location.href = "motores.html";
    });
});