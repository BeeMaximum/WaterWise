document.addEventListener('DOMContentLoaded', function() {
    const areaSelect = document.getElementById('area');
    const clientSelect = document.getElementById('clients');

    const clientsByArea = {
        zone_1: ['Jhessa', 'Mary Jane', 'Risa'],
        zone_2: ['Anna', 'James', 'Linda'],
        zone_3: ['John', 'Doe', 'Smith']
    };

    function updateClients() {
        const selectedArea = areaSelect.value;
        const clients = clientsByArea[selectedArea] || [];

        // Clear the current options
        clientSelect.innerHTML = '';

        // Add the "Select All" option
        const selectAllOption = document.createElement('option');
        selectAllOption.value = 'select_all';
        selectAllOption.textContent = 'Select All';
        clientSelect.appendChild(selectAllOption);

        // Add the new options
        clients.forEach(client => {
            const option = document.createElement('option');
            option.value = client.toLowerCase().replace(' ', '_');
            option.textContent = client;
            clientSelect.appendChild(option);
        });
    }

    // Initialize the client options
    updateClients();

    // Update clients when the area changes
    areaSelect.addEventListener('change', updateClients);

    // Handle "Select All" functionality
    clientSelect.addEventListener('change', function() {
        if (clientSelect.value === 'select_all') {
            clientSelect.querySelectorAll('option').forEach(option => {
                option.selected = true;
            });
        }
    });
});
