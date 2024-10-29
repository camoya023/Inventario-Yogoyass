document.addEventListener('DOMContentLoaded', function () {
    const dateRangeSelect = document.getElementById('dateRange');
    const customDateInputs = document.getElementById('customDateInputs');
    const tabs = document.querySelectorAll('.tab-item');
    const tabContents = document.querySelectorAll('.tab-content');

    // Manejar la selección de rango de fechas
    dateRangeSelect.addEventListener('change', function () {
        if (this.value === 'rangoPersonalizado') {
            customDateInputs.style.display = 'flex'; // Muestra el contenedor de fechas personalizadas
        } else {
            customDateInputs.style.display = 'none'; // Oculta el contenedor si no se selecciona "rango personalizado"
        }
    });

    // Manejar el cambio de pestañas
    tabs.forEach(tab => {
        tab.addEventListener('click', function () {
            const selectedTab = this.getAttribute('data-tab');

            // Desactivar todas las pestañas
            tabs.forEach(t => t.classList.remove('active'));
            tabContents.forEach(content => content.classList.remove('active'));

            // Activar la pestaña seleccionada
            this.classList.add('active');
            document.getElementById(selectedTab).classList.add('active');
        });
    });

    // Inicializar el estado de las pestañas
    tabs[0].click(); // Abrir la pestaña "Compras" por defecto
});
