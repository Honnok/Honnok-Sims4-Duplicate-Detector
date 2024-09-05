// Sélection des éléments du menu et de la boîte de survol
var button_s = document.querySelectorAll(".MenuBox>ul>li");
var svg_s = document.querySelectorAll(".MenuBox>ul>li>svg");
var HoverBox_s = document.getElementsByClassName("HoverBox")[0];

function clearTag(id) {
    for (let item of svg_s) {
        if (item === svg_s[id]) {
            continue;
        }
        item.style.color = "#6e6c6c";
    }
}

function Action_s(Index, Top) {
    HoverBox_s.style.top = Top;
    HoverBox_s.style.animation = `Effect_${Index} 250ms 1`;
    svg_s[Index].style.color = "white";
    clearTag(Index);
}

button_s.forEach((button, index) => {
    button.addEventListener("mouseover", function() {
        // Vérifie si l'élément survolé contient une image
        if (!button.querySelector('img')) {
            Action_s(index, `${20 + index * 67}px`);
        }
    });
});

// Fonction pour afficher les résultats dans les tableaux
function displayResults(duplicates, uniqueFiles) {
    const duplicatesBody = document.getElementById('duplicatesBody');
    const uniqueFilesBody = document.getElementById('uniqueFilesBody');

    // Vider les corps des tableaux avant de les remplir
    duplicatesBody.innerHTML = '';
    uniqueFilesBody.innerHTML = '';

    // Ajouter les lignes de doublons
    duplicates.forEach(fileName => {
        const row = document.createElement('tr');
        row.innerHTML = `<td>${fileName}</td>`;
        duplicatesBody.appendChild(row);
    });

    // Ajouter les lignes de fichiers uniques
    uniqueFiles.forEach(fileName => {
        const row = document.createElement('tr');
        row.innerHTML = `<td>${fileName}</td>`;
        uniqueFilesBody.appendChild(row);
    });
}

// Gestion de la sélection du dossier
document.getElementById('folderInput').addEventListener('change', function(event) {
    const fileInput = event.target;

    if (fileInput.files.length > 0) {
        const folderName = fileInput.files[0].webkitRelativePath.split('/')[0];

        if (folderName.toLowerCase() === 'mods') {
            const files = Array.from(fileInput.files);
            const fileNames = new Map();
            const duplicates = new Set();
            const uniqueFiles = new Set();

            files.forEach(file => {
                const fileName = file.name;

                if (fileNames.has(fileName)) {
                    // Ajouter le fichier aux doublons si déjà rencontré
                    duplicates.add(fileName);
                    uniqueFiles.delete(fileName);
                } else {
                    // Ajouter le fichier aux fichiers uniques
                    fileNames.set(fileName, file);
                    uniqueFiles.add(fileName);
                }
            });

            // Afficher les résultats dans les tableaux
            displayResults(Array.from(duplicates), Array.from(uniqueFiles));

            document.getElementById('folderPath').textContent = `Selected Folder: ${folderName}`;
        } else {
            // Afficher un message d'erreur si le dossier n'est pas nommé "mods"
            document.getElementById('folderPath').textContent = 'Error: The selected folder must be named "mods".';
            document.getElementById('duplicatesBody').innerHTML = '';
            document.getElementById('uniqueFilesBody').innerHTML = '';
        }
    } else {
        // Afficher un message si aucun dossier n'est sélectionné
        document.getElementById('folderPath').textContent = 'No folder selected';
        document.getElementById('duplicatesBody').innerHTML = '';
        document.getElementById('uniqueFilesBody').innerHTML = '';
    }
});

// Gestion du clic sur le bouton pour sélectionner le dossier
document.getElementById('selectFolderButton').addEventListener('click', function() {
    document.getElementById('folderInput').click();
});
