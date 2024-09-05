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
// Fonction pour afficher les résultats dans les tableaux
function displayResults(duplicates, uniqueFiles) {
    const duplicatesBody = document.getElementById('duplicatesBody');
    const uniqueFilesBody = document.getElementById('uniqueFilesBody');

    // Vider les corps des tableaux avant de les remplir
    duplicatesBody.innerHTML = '';
    uniqueFilesBody.innerHTML = '';

    console.log('Displaying results:');
    console.log('Duplicates:', duplicates);
    console.log('Unique files:', uniqueFiles);

    // Ajouter les lignes de doublons
    duplicates.forEach(file => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${file.name}</td>
            <td>${(file.size / 1024).toFixed(2)} KB</td>
            <td>
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-eye" viewBox="0 0 16 16">
                  <path d="M8 3.5a5.5 5.5 0 0 1 5.473 4.621A5.5 5.5 0 0 1 8 13.5a5.5 5.5 0 0 1-5.473-5.379A5.5 5.5 0 0 1 8 3.5zM8 5.5a3.5 3.5 0 0 0-3.486 3A3.5 3.5 0 0 0 8 11.5a3.5 3.5 0 0 0 3.486-3A3.5 3.5 0 0 0 8 5.5z"/>
                </svg>
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-x" viewBox="0 0 16 16">
                  <path d="M1.5 0.5a.5.5 0 0 1 .707 0L8 6.293 14.793.5a.5.5 0 0 1 .707.707L8.707 7l6.793 6.793a.5.5 0 0 1-.707.707L8 7.707 1.5 14.5a.5.5 0 0 1-.707-.707L6.293 8 1.5 2.207A.5.5 0 0 1 1.5 0.5z"/>
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
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-eye" viewBox="0 0 16 16">
                  <path d="M8 3.5a5.5 5.5 0 0 1 5.473 4.621A5.5 5.5 0 0 1 8 13.5a5.5 5.5 0 0 1-5.473-5.379A5.5 5.5 0 0 1 8 3.5zM8 5.5a3.5 3.5 0 0 0-3.486 3A3.5 3.5 0 0 0 8 11.5a3.5 3.5 0 0 0 3.486-3A3.5 3.5 0 0 0 8 5.5z"/>
                </svg>
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-x" viewBox="0 0 16 16">
                  <path d="M1.5 0.5a.5.5 0 0 1 .707 0L8 6.293 14.793.5a.5.5 0 0 1 .707.707L8.707 7l6.793 6.793a.5.5 0 0 1-.707.707L8 7.707 1.5 14.5a.5.5 0 0 1-.707-.707L6.293 8 1.5 2.207A.5.5 0 0 1 1.5 0.5z"/>
                </svg>
            </td>
        `;
        uniqueFilesBody.appendChild(row);
    });
}

// Gestion de la sélection du dossier
document.getElementById('folderInput').addEventListener('change', function(event) {
    const fileInput = event.target;

    console.log('Folder input changed:', fileInput.files);

    if (fileInput.files.length > 0) {
        const folderName = fileInput.files[0].webkitRelativePath.split('/')[0];
        console.log('Folder name:', folderName);

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
