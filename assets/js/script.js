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
    duplicates.forEach(file => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${file.name}</td>
            <td>${(file.size / 1024).toFixed(2)} KB</td>
            <td>
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-external-link"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path><polyline points="15 3 21 3 21 9"></polyline><line x1="10" y1="14" x2="21" y2="3"></line>
                </svg>
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-x">
                    <line x1="18" y1="6" x2="6" y2="18"></line>
                    <line x1="6" y1="6" x2="18" y2="18"></line>
                </svg>
            </td>
        `;
        duplicatesBody.appendChild(row);
    });

    // Ajouter les lignes de fichiers uniques
    uniqueFiles.forEach(file => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${file.name}</td>
            <td>${(file.size / 1024).toFixed(2)} KB</td>
            <td>
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-external-link"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path><polyline points="15 3 21 3 21 9"></polyline><line x1="10" y1="14" x2="21" y2="3"></line>
                </svg>
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-x">
                    <line x1="18" y1="6" x2="6" y2="18"></line>
                    <line x1="6" y1="6" x2="18" y2="18"></line>
                </svg>
            </td>
        `;
        uniqueFilesBody.appendChild(row);
    });
}

// Fonction pour afficher ou masquer le bouton Show Unique Files
function toggleShowUniqueFilesButton(show) {
    const button = document.getElementById('showUniqueFilesButton');
    button.style.display = show ? 'inline-block' : 'none';
}

// Gestion de la sélection du dossier
document.getElementById('folderInput').addEventListener('change', function(event) {
    const fileInput = event.target;

    if (fileInput.files.length > 0) {
        const folderName = fileInput.files[0].webkitRelativePath.split('/')[0];

        if (folderName.toLowerCase() === 'mods') {
            const files = Array.from(fileInput.files);
            const fileNames = new Map();
            let duplicates = [];
            let uniqueFiles = [];

            files.forEach(file => {
                const fileName = file.name;

                if (fileNames.has(fileName)) {
                    // Ajouter le fichier aux doublons si déjà rencontré
                    if (!duplicates.some(f => f.name === fileName)) {
                        duplicates.push(file);
                    }
                    uniqueFiles = uniqueFiles.filter(f => f.name !== fileName);
                } else {
                    // Ajouter le fichier aux fichiers uniques
                    fileNames.set(fileName, file);
                    uniqueFiles.push(file);
                }
            });

            // Afficher les résultats dans les tableaux
            displayResults(duplicates, uniqueFiles);

            document.getElementById('folderPath').textContent = `Selected Folder: ${folderName}`;
            toggleShowUniqueFilesButton(true); // Afficher le bouton
        } else {
            // Afficher un message d'erreur si le dossier n'est pas nommé "mods"
            document.getElementById('folderPath').textContent = 'Error: The selected folder must be named "mods".';
            document.getElementById('duplicatesBody').innerHTML = '';
            document.getElementById('uniqueFilesBody').innerHTML = '';
            toggleShowUniqueFilesButton(false); // Masquer le bouton
        }
    } else {
        // Afficher un message si aucun dossier n'est sélectionné
        document.getElementById('folderPath').textContent = 'No folder selected';
        document.getElementById('duplicatesBody').innerHTML = '';
        document.getElementById('uniqueFilesBody').innerHTML = '';
        toggleShowUniqueFilesButton(false); // Masquer le bouton
    }
});

// Gestion du clic sur le bouton pour sélectionner le dossier
document.getElementById('selectFolderButton').addEventListener('click', function() {
    document.getElementById('folderInput').click();
});

document.getElementById('showUniqueFilesButton').addEventListener('click', function() {
    const uniqueFilesBody = document.getElementById('uniqueFiles');
    const statusImage = document.getElementById('statusImage');
    const statusImageHidden = document.getElementById('statusImageHidden');

    if (uniqueFilesBody.style.display === 'none') {
        uniqueFilesBody.style.display = 'table-row-group';
        statusImage.style.display = 'block'; // Affiche l'image pour l'état visible
        statusImageHidden.style.display = 'none'; // Cache l'image pour l'état caché
    } else {
        uniqueFilesBody.style.display = 'none';
        statusImage.style.display = 'none'; // Cache l'image pour l'état visible
        statusImageHidden.style.display = 'block'; // Affiche l'image pour l'état caché
    }
});