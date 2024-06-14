document.addEventListener('DOMContentLoaded', function() {
    var clients = {
        "Upper Langcangan": [
            { name: "Jhessa", address: "Upper Langcangan", mobile: "09123456789", meter: "987456" },
            { name: "Mary Jane", address: "Upper Langcangan", mobile: "0398765432", meter: "546789" },
            { name: "Risa", address: "Upper Langcangan", mobile: "0365432789", meter: "2385487" },
        ],
        "Lower Langcangan": [
            { name: "John Doe", address: "Lower Langcangan", mobile: "09123456789", meter: "123456" },
            { name: "Jane Doe", address: "Lower Langcangan", mobile: "0398765432", meter: "654321" },
            { name: "Jhessa", address: "Upper Langcangan", mobile: "09123456789", meter: "987456" },
            { name: "Mary Jane", address: "Upper Langcangan", mobile: "0398765432", meter: "546789" },
            { name: "Risa", address: "Upper Langcangan", mobile: "0365432789", meter: "2385487" }
        ],
        "East Side": [
            { name: "Alice", address: "East Side", mobile: "0923456789", meter: "234567" },
            { name: "b", address: "Lower Langcangan", mobile: "09123456789", meter: "123456" },
            { name: "c", address: "Lower Langcangan", mobile: "0398765432", meter: "654321" },
            { name: "x", address: "Upper Langcangan", mobile: "09123456789", meter: "987456" },
            { name: "va", address: "Upper Langcangan", mobile: "0398765432", meter: "546789" },
            { name: "Risa", address: "Upper Langcangan", mobile: "0365432789", meter: "2385487" },
            { name: "John Doe", address: "Lower Langcangan", mobile: "09123456789", meter: "123456" },
            { name: "Jane Doe", address: "Lower Langcangan", mobile: "0398765432", meter: "654321" },
            { name: "a", address: "Upper Langcangan", mobile: "09123456789", meter: "987456" },
            { name: "Mary Jane", address: "Upper Langcangan", mobile: "0398765432", meter: "546789" },
            { name: "Risa", address: "Upper Langcangan", mobile: "0365432789", meter: "2385487" }
        ],
        "West Side": [
            { name: "Bob", address: "West Side", mobile: "0934567890", meter: "345678" },
            { name: "Jhessa", address: "Upper Langcangan", mobile: "09123456789", meter: "987456" },
            { name: "Mary Jane", address: "Upper Langcangan", mobile: "0398765432", meter: "546789" },
            { name: "Risa", address: "Upper Langcangan", mobile: "0365432789", meter: "2385487" }
        ]
    };

    var areas = {
        "Zone 1": ["Upper Langcangan", "Lower Langcangan"],
        "Zone 2": ["East Side", "West Side"]
    };

    var zoneSelect = document.getElementById('zone-select');
    var areaSelect = document.getElementById('area-select');
    var clientList = document.getElementById('client-list');
    var selectAllCheckbox = document.getElementById('select-all');
    var clientSearch = document.getElementById('client-search');

    zoneSelect.addEventListener('change', function() {
        var selectedZone = this.value;
        populateAreaSelect(selectedZone);
        updateClientList();
    });

    areaSelect.addEventListener('change', function() {
        updateClientList();
    });

    clientSearch.addEventListener('input', function() {
        updateClientList();
    });

    selectAllCheckbox.addEventListener('change', function() {
        var checkboxes = clientList.querySelectorAll('input[type="checkbox"]');
        checkboxes.forEach(function(checkbox) {
            checkbox.checked = selectAllCheckbox.checked;
        });
    });

    function populateAreaSelect(zone) {
        areaSelect.innerHTML = '<option value="">Select Area</option>';
        if (areas[zone]) {
            areas[zone].forEach(function(area) {
                var option = document.createElement('option');
                option.value = area;
                option.textContent = area;
                areaSelect.appendChild(option);
            });
            areaSelect.disabled = false;
        } else {
            areaSelect.disabled = true;
        }
    }

    function updateClientList() {
        var selectedArea = areaSelect.value;
        var searchQuery = clientSearch.value.toLowerCase();
        clientList.innerHTML = '';

        if (selectedArea && clients[selectedArea]) {
            var filteredClients = clients[selectedArea].filter(function(client) {
                return client.name.toLowerCase().includes(searchQuery);
            });

            filteredClients.forEach(function(client) {
                var row = document.createElement('tr');

                var selectCell = document.createElement('td');
                var selectCheckbox = document.createElement('input');
                selectCheckbox.type = 'checkbox';
                selectCell.appendChild(selectCheckbox);
                row.appendChild(selectCell);

                var nameCell = document.createElement('td');
                nameCell.textContent = client.name;
                row.appendChild(nameCell);

                var addressCell = document.createElement('td');
                addressCell.textContent = client.address;
                row.appendChild(addressCell);

                var mobileCell = document.createElement('td');
                mobileCell.textContent = client.mobile;
                row.appendChild(mobileCell);

                var meterCell = document.createElement('td');
                meterCell.textContent = client.meter;
                row.appendChild(meterCell);

                clientList.appendChild(row);
            });
        }
    }

    // Initial population of the client list based on default selections
    updateClientList();
});
