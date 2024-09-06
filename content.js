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

// Function to set up event listeners
function setupEventListeners() {
    const openButton = document.createElement('button');
    openButton.textContent = 'Table of Contents';
    openButton.id = 'open-toc-button';
    document.body.appendChild(openButton);

    const modal = document.getElementById('toc-modal');
    const closeButton = document.getElementById('close-toc-button');

    openButton.onclick = () => modal.style.display = 'block';
    closeButton.onclick = () => modal.style.display = 'none';
}

// Run the script when the page is fully loaded
window.addEventListener('load', createModal);