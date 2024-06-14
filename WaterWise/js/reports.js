document.addEventListener('DOMContentLoaded', function() {
            var clients = {
                "Zone 1": {
                    "Upper Langcangan": [
                        { name: "Jhessa", address: "Upper Langcangan", mobile: "09123456789", meter: "987456", status: "Active" },
                        { name: "Mary Jane", address: "Upper Langcangan", mobile: "0938765412", meter: "546789", status: "Active" },
                        { name: "Risa", address: "Upper Langcangan", mobile: "03585423789", meter: "2356487", status: "Active" },
                        { name: "Chris", address: "Upper Langcangan", mobile: "09127654321", meter: "567321", status: "Inactive" },
                        { name: "Pat", address: "Upper Langcangan", mobile: "09129812345", meter: "321987", status: "Inactive" },
                        { name: "Alex", address: "Upper Langcangan", mobile: "09129876543", meter: "123987", status: "Active" },
                        { name: "Sam", address: "Upper Langcangan", mobile: "09122334455", meter: "987123", status: "Active" }
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
                        { name: "Pat", address: "West Side", mobile: "09129812345", meter: "321987", status: "Inactive" }
                    ]
                }
            };

            var zoneSelect = document.getElementById('zone-select');
            var areaSelect = document.getElementById('area-select');
            var clientList = document.getElementById('client-list');
            var selectAllCheckbox = document.getElementById('select-all');
            var searchBar = document.getElementById('search-bar');

            zoneSelect.addEventListener('change', function() {
                var selectedZone = zoneSelect.value;
                populateAreas(selectedZone);
            });

            areaSelect.addEventListener('change', function() {
                var selectedZone = zoneSelect.value;
                var selectedArea = areaSelect.value;
                populateClients(selectedZone, selectedArea);
            });

            selectAllCheckbox.addEventListener('change', function() {
                var checkboxes = document.querySelectorAll('#client-list input[type="checkbox"]');
                checkboxes.forEach(function(checkbox) {
                    checkbox.checked = selectAllCheckbox.checked;
                });
            });

            searchBar.addEventListener('input', function() {
                var searchQuery = searchBar.value.toLowerCase();
                var rows = clientList.querySelectorAll('tr');
                rows.forEach(function(row) {
                    var nameCell = row.querySelector('td:nth-child(2)');
                    if (nameCell) {
                        var name = nameCell.textContent.toLowerCase();
                        row.style.display = name.includes(searchQuery) ? '' : 'none';
                    }
                });
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
                        var row = document.createElement('tr');

                        var checkboxCell = document.createElement('td');
                        var checkbox = document.createElement('input');
                        checkbox.type = 'checkbox';
                        checkboxCell.appendChild(checkbox);
                        row.appendChild(checkboxCell);

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
                        var viewButton = document.createElement('button');
                        viewButton.textContent = 'View';
                        viewButton.classList.add('view-button');
                        viewButton.dataset.clientName = client.name; // Store client name as data attribute
                        viewButton.addEventListener('click', onViewButtonClick);
                        actionCell.appendChild(viewButton);
                        row.appendChild(actionCell);

                        clientList.appendChild(row);
                    });
                }
            }

            function onViewButtonClick(event) {
                var clientName = event.target.dataset.clientName;
                var clientData = getClientDataByName(clientName); // Replace with your data retrieval logic

                // Display modal
                var modal = document.getElementById('paymentModal');
                var modalContent = modal.querySelector('.modal-content');
                var clientNameHeader = modal.querySelector('#clientName');
                var paymentBody = modal.querySelector('#paymentBody');

                // Clear previous data
                paymentBody.innerHTML = '';

                // Populate client name
                clientNameHeader.textContent = clientName;

                // Populate payment details
                clientData.forEach(function(payment) {
                    var row = document.createElement('tr');

                    var monthCell = document.createElement('td');
                    monthCell.textContent = payment.month;
                    row.appendChild(monthCell);

                    var statusCell = document.createElement('td');
                    statusCell.textContent = payment.status;
                    row.appendChild(statusCell);

                    paymentBody.appendChild(row);
                });

                // Show modal
                modal.style.display = 'block';

                // Close modal functionality
                var closeButton = modal.querySelector('.close');
                closeButton.addEventListener('click', function() {
                    modal.style.display = 'none';
                });

                // Click outside modal to close
                window.addEventListener('click', function(event) {
                    if (event.target == modal) {
                        modal.style.display = 'none';
                    }
                });
            }

            // Example function to retrieve client payment data
            function getClientDataByName(clientName) {
                // Replace with your actual data retrieval logic
                // For demonstration, returning dummy data
                var dummyData = {
                    "Jhessa": [
                        { month: "January", status: "Paid" },
                        { month: "February", status: "Paid" },
                        { month: "March", status: "Unpaid" }
                    ],
                    "Mary Jane": [
                        { month: "January", status: "Paid" },
                        { month: "February", status: "Paid" },
                        { month: "March", status: "Paid" }
                    ],
                    "Risa": [
                        { month: "January", status: "Paid" },
                        { month: "February", status: "Paid" },
                        { month: "March", status: "Paid" }
                    ],
                    "Chris": [
                        { month: "January", status: "Unpaid" },
                        { month: "February", status: "Unpaid" },
                        { month: "March", status: "Unpaid" }
                    ],
                    "Pat": [
                        { month: "January", status: "Unpaid" },
                        { month: "February", status: "Unpaid" },
                        { month: "March", status: "Unpaid" }
                    ],
                    "Alex": [
                        { month: "January", status: "Paid" },
                        { month: "February", status: "Paid" },
                        { month: "March", status: "Paid" }
                    ],
                    "Sam": [
                        { month: "January", status: "Paid" },
                        { month: "February", status: "Paid" },
                        { month: "March", status: "Paid" }
                    ],
                    "John Doe": [
                        { month: "January", status: "Unpaid" },
                        { month: "February", status: "Unpaid" },
                        { month: "March", status: "Unpaid" }
                    ],
                    "Jane Doe": [
                        { month: "January", status: "Unpaid" },
                        { month: "February", status: "Unpaid" },
                        { month: "March", status: "Unpaid" }
                    ]
                };

                return dummyData[clientName] || [];
            }
        });