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

document.getElementById('selectFolderButton').addEventListener('click', function() {
    document.getElementById('folderInput').click();
});

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
                    duplicates.add(fileName);
                    uniqueFiles.delete(fileName);
                } else {
                    fileNames.set(fileName, file);
                    uniqueFiles.add(fileName);
                }
            });

            // Display duplicates
            const duplicatesList = document.getElementById('duplicatesList');
            duplicatesList.innerHTML = '';
            duplicates.forEach(fileName => {
                const li = document.createElement('li');
                li.textContent = fileName;
                duplicatesList.appendChild(li);
            });

            // Display unique files
            const uniqueFilesList = document.getElementById('uniqueFilesList');
            uniqueFilesList.innerHTML = '';
            uniqueFiles.forEach(fileName => {
                const li = document.createElement('li');
                li.textContent = fileName;
                uniqueFilesList.appendChild(li);
            });

            document.getElementById('folderPath').textContent = `Selected Folder: ${folderName}`;
        } else {
            document.getElementById('folderPath').textContent = 'Error: The selected folder must be named "mods".';
            document.getElementById('duplicatesList').innerHTML = '';
            document.getElementById('uniqueFilesList').innerHTML = '';
        }
    } else {
        document.getElementById('folderPath').textContent = 'No folder selected';
        document.getElementById('duplicatesList').innerHTML = '';
        document.getElementById('uniqueFilesList').innerHTML = '';
    }
});
