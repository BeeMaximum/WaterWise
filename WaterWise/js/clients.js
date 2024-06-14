document.addEventListener('DOMContentLoaded', function() {
    var clients = {
        "Zone 1": {
            "Upper Langcangan": [
                { name: "Jhessa", address: "Upper Langcangan", mobile: "09123456789", meter: "987456", status: "Active" },
                { name: "Mary Jane", address: "Upper Langcangan", mobile: "0938765412", meter: "546789", status: "Active" },
                { name: "Risa", address: "Upper Langcangan", mobile: "03585423789", meter: "2356487", status: "Active" }
            ],
            "Lower Langcangan": [
                { name: "John Doe", address: "Lower Langcangan", mobile: "09123456789", meter: "123456", status: "Inactive" },
                { name: "Jane Doe", address: "Lower Langcangan", mobile: "0398765432", meter: "654321", status: "Inactive" }
            ]
        },
        "Zone 2": {
            "East Side": [
                { name: "Alex", address: "East Side", mobile: "09129876543", meter: "123987", status: "Active" },
                { name: "Sam", address: "East Side", mobile: "09122334455", meter: "987123", status: "Active" }
            ],
            "West Side": [
                { name: "Chris", address: "West Side", mobile: "09127654321", meter: "567321", status: "Inactive" },
                { name: "Pat", address: "West Side", mobile: "09129812345", meter: "321987", status: "Inactive" },
                { name: "Chris", address: "West Side", mobile: "09127654321", meter: "567321", status: "Inactive" },
                { name: "Alex", address: "West Side", mobile: "09129876543", meter: "123987", status: "Active" },
                { name: "Sam", address: "West Side", mobile: "09122334455", meter: "987123", status: "Active" },
                { name: "Pat", address: "West Side", mobile: "09129812345", meter: "321987", status: "Inactive" },
                { name: "Chris", address: "West Side", mobile: "09127654321", meter: "567321", status: "Inactive" },
                { name: "Pat", address: "West Side", mobile: "09129812345", meter: "321987", status: "Inactive" },
                { name: "Alex", address: "West Side", mobile: "09129876543", meter: "123987", status: "Active" },
                { name: "Sam", address: "West Side", mobile: "09122334455", meter: "987123", status: "Active" },
                { name: "Chris", address: "West Side", mobile: "09127654321", meter: "567321", status: "Inactive" },
                { name: "Pat", address: "West Side", mobile: "09129812345", meter: "321987", status: "Inactive" },
                { name: "Chris", address: "West Side", mobile: "09127654321", meter: "567321", status: "Inactive" },
                { name: "Alex", address: "West Side", mobile: "09129876543", meter: "123987", status: "Active" },
                { name: "Sam", address: "West Side", mobile: "09122334455", meter: "987123", status: "Active" },
                { name: "Pat", address: "West Side", mobile: "09129812345", meter: "321987", status: "Inactive" },
                { name: "Chris", address: "West Side", mobile: "09127654321", meter: "567321", status: "Inactive" },
                { name: "Pat", address: "West Side", mobile: "09129812345", meter: "321987", status: "Inactive" },
                { name: "Alex", address: "West Side", mobile: "09129876543", meter: "123987", status: "Active" },
                { name: "Sam", address: "West Side", mobile: "09122334455", meter: "987123", status: "Active" },
                { name: "Chris", address: "West Side", mobile: "09127654321", meter: "567321", status: "Inactive" },
                { name: "Pat", address: "West Side", mobile: "09129812345", meter: "321987", status: "Inactive" },
                { name: "Chris", address: "West Side", mobile: "09127654321", meter: "567321", status: "Inactive" },
                { name: "Alex", address: "West Side", mobile: "09129876543", meter: "123987", status: "Active" },
                { name: "Sam", address: "West Side", mobile: "09122334455", meter: "987123", status: "Active" },
                { name: "Pat", address: "West Side", mobile: "09129812345", meter: "321987", status: "Inactive" },
                { name: "Chris", address: "West Side", mobile: "09127654321", meter: "567321", status: "Inactive" },
                { name: "Pat", address: "West Side", mobile: "09129812345", meter: "321987", status: "Inactive" },
                { name: "Alex", address: "West Side", mobile: "09129876543", meter: "123987", status: "Active" },
                { name: "Sam", address: "West Side", mobile: "09122334455", meter: "987123", status: "Active" }
            ]
        }
    };

    var zoneSelect = document.getElementById('zone-select');
    var areaSelect = document.getElementById('area-select');
    var clientList = document.getElementById('client-list');
    var searchInput = document.getElementById('search-client');

    zoneSelect.addEventListener('change', function() {
        var selectedZone = zoneSelect.value;
        populateAreas(selectedZone);
    });

    areaSelect.addEventListener('change', function() {
        var selectedZone = zoneSelect.value;
        var selectedArea = areaSelect.value;
        populateClients(selectedZone, selectedArea);
    });

    searchInput.addEventListener('input', function() {
        var searchValue = searchInput.value.toLowerCase();
        var selectedZone = zoneSelect.value;
        var selectedArea = areaSelect.value;
        filterClients(selectedZone, selectedArea, searchValue);
    });

    function populateAreas(zone) {
        areaSelect.innerHTML = '<option value="">Select Area</option>';
        areaSelect.disabled = true;

        if (zone && clients[zone]) {
            Object.keys(clients[zone]).forEach(function(area) {
                var option = document.createElement('option');
                option.value = area;
                option.textContent = area;
                areaSelect.appendChild(option);
            });
            areaSelect.disabled = false;
        }

        clientList.innerHTML = '';
    }

    function populateClients(zone, area) {
        clientList.innerHTML = '';

        if (zone && area && clients[zone] && clients[zone][area]) {
            clients[zone][area].forEach(function(client) {
                addClientRow(client);
            });
        }
    }

    function filterClients(zone, area, searchValue) {
        clientList.innerHTML = '';

        if (zone && area && clients[zone] && clients[zone][area]) {
            clients[zone][area].filter(function(client) {
                return client.name.toLowerCase().includes(searchValue);
            }).forEach(function(client) {
                addClientRow(client);
            });
        }
    }

    function addClientRow(client) {
        var row = document.createElement('tr');

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

        var statusCell = document.createElement('td');
        var statusSpan = document.createElement('span');
        statusSpan.className = 'status ' + client.status.toLowerCase();
        statusSpan.textContent = client.status;
        statusCell.appendChild(statusSpan);
        row.appendChild(statusCell);

        var actionCell = document.createElement('td');
        var editButton = document.createElement('button');
        editButton.className = 'edit';
        editButton.textContent = 'Edit';
        actionCell.appendChild(editButton);

        var deleteButton = document.createElement('button');
        deleteButton.className = 'delete';
        deleteButton.textContent = 'Delete';
        actionCell.appendChild(deleteButton);

        row.appendChild(actionCell);
        clientList.appendChild(row);
    }
});
