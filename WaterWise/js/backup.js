document.addEventListener('DOMContentLoaded', function() {
    var createBackupButton = document.getElementById('create-backup');
    var backupModal = document.getElementById('backup-modal');
    var closeModal = document.querySelector('.close');
    var confirmBackup = document.getElementById('confirm-backup');
    var cancelBackup = document.getElementById('cancel-backup');
    var backupList = document.getElementById('backup-list');

    createBackupButton.addEventListener('click', function() {
        backupModal.style.display = 'block';
    });

    closeModal.addEventListener('click', function() {
        backupModal.style.display = 'none';
    });

    cancelBackup.addEventListener('click', function() {
        backupModal.style.display = 'none';
    });

    confirmBackup.addEventListener('click', function() {
        createBackup();
        backupModal.style.display = 'none';
    });

    window.addEventListener('click', function(event) {
        if (event.target == backupModal) {
            backupModal.style.display = 'none';
        }
    });

    function createBackup() {
        var now = new Date();
        var backupName = 'Backup ' + (backupList.childElementCount + 1);
        var backupDate = now.toLocaleDateString() + ' ' + now.toLocaleTimeString();
        var backupSize = (Math.random() * 50 + 10).toFixed(2) + ' MB'; // Random size between 10 and 60 MB

        var row = document.createElement('tr');

        var nameCell = document.createElement('td');
        nameCell.textContent = backupName;
        row.appendChild(nameCell);

        var dateCell = document.createElement('td');
        dateCell.textContent = backupDate;
        row.appendChild(dateCell);

        var sizeCell = document.createElement('td');
        sizeCell.textContent = backupSize;
        row.appendChild(sizeCell);

        var actionCell = document.createElement('td');
        var deleteButton = document.createElement('button');
        deleteButton.className = 'delete';
        deleteButton.textContent = 'Delete';
        deleteButton.addEventListener('click', function() {
            backupList.removeChild(row);
        });
        actionCell.appendChild(deleteButton);
        row.appendChild(actionCell);

        backupList.appendChild(row);
    }
});
