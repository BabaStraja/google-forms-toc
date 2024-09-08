// Function to create and insert the modal
function createModal() {
    const modal = document.createElement('div');
    modal.id = 'toc-modal';
    modal.style.display = 'none';
    
    fetch(chrome.runtime.getURL('modal.html'))
        .then(response => response.text())
        .then(data => {
            modal.innerHTML = data;
            document.body.appendChild(modal);
            generateTableOfContents();
            setupEventListeners();
        });
}

// Function to generate the table of contents
function generateTableOfContents() {
    const tocList = document.getElementById('toc-list');
    tocList.innerHTML = ''; // Clear existing content
    
    // Add form title to the top of the list
    const formTitleElement = document.querySelector('div[aria-label="Form title"]');
    if (formTitleElement) {
        const listItem = document.createElement('li');
        const link = document.createElement('a');
        const formTitle = formTitleElement.textContent.trim();
        link.textContent = formTitle || 'Form Title';
        link.href = '#';
        link.onclick = (e) => {
            e.preventDefault();
            formTitleElement.scrollIntoView({ behavior: 'smooth' });
        };
        listItem.appendChild(link);
        tocList.appendChild(listItem);
    }
    
    // Add section titles
    const sections = document.querySelectorAll('div[aria-label="Section title (optional)"]');
    
    sections.forEach((section, index) => {
        const listItem = document.createElement('li');
        const link = document.createElement('a');
        const sectionTitle = section.textContent.trim();
        link.textContent = sectionTitle || `Section ${index + 1}`;
        link.href = '#';
        link.onclick = (e) => {
            e.preventDefault();
            section.scrollIntoView({ behavior: 'smooth' });
        };
        listItem.appendChild(link);
        tocList.appendChild(listItem);
    });
}

// Function to toggle the modal visibility
function toggleModal() {
    const modal = document.getElementById('toc-modal');
    const toggleButton = document.getElementById('toggle-toc-button');
    if (modal.style.display === 'none' || modal.style.display === '') {
        modal.style.display = 'block';
        toggleButton.classList.add('modal-open');
    } else {
        modal.style.display = 'none';
        toggleButton.classList.remove('modal-open');
    }
}

// Function to set up event listeners
function setupEventListeners() {
    const toggleButton = document.createElement('button');
    toggleButton.textContent = 'Table of Contents';
    toggleButton.id = 'toggle-toc-button';
    document.body.appendChild(toggleButton);

    toggleButton.onclick = toggleModal;

    const closeButton = document.getElementById('close-toc-button');
    if (closeButton) {
        closeButton.onclick = toggleModal;
    }

    // Add keyboard shortcut
    document.addEventListener('keydown', function(event) {
        // Check if the active element is the body (i.e., no specific element is focused)
        if (event.key === 't' && !event.ctrlKey && !event.altKey && !event.metaKey && document.activeElement === document.body) {
            event.preventDefault(); // Prevent the 't' from being typed
            toggleModal();
        }
    });
}

// Run the script when the page is fully loaded
window.addEventListener('load', createModal);