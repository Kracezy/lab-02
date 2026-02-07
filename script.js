document.addEventListener('DOMContentLoaded', () => {
    const contactForm = document.getElementById('contact-form');
    const formMessage = document.getElementById('form-message-success');

    const saveToLocalStorage = (data) => {
        const existingSubmissions = JSON.parse(localStorage.getItem('contact_submissions')) || [];
        const submissionWithDate = { ...data, submittedAt: new Date().toLocaleString() };
        existingSubmissions.push(submissionWithDate);
        localStorage.setItem('contact_submissions', JSON.stringify(existingSubmissions));
    };

    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const formData = new FormData(this);
            const data = Object.fromEntries(formData.entries());
            saveToLocalStorage(data);

            if (formMessage) {
                formMessage.textContent = `Submission saved successfully!`;
                formMessage.classList.remove('opacity-0');
                formMessage.classList.add('opacity-100', 'bg-blue-100', 'text-blue-800', 'text-center');
                setTimeout(() => formMessage.classList.replace('opacity-100', 'opacity-0'), 3000);
            }

            this.reset();
            renderSubmissions();
        });
    }

    function renderSubmissions() {
        const submissions = JSON.parse(localStorage.getItem('contact_submissions')) || [];
        const tableList = document.getElementById('submissions-list-table');
        const cardList = document.getElementById('submissions-list-cards');
        const emptyState = document.getElementById('empty-state');

        if (submissions.length === 0) {
            if (emptyState) emptyState.classList.remove('hidden');
            if (tableList) tableList.innerHTML = '';
            if (cardList) cardList.innerHTML = '';
            return;
        }

        if (emptyState) emptyState.classList.add('hidden');

        if (tableList) {
            tableList.innerHTML = submissions.reverse().map(entry => `
                <tr class="border-b border-gray-100">
                    <td class="px-6 py-4 text-xs font-mono text-gray-400">${entry.submittedAt}</td>
                    <td class="px-6 py-4 font-bold text-gray-800">${entry.name}</td>
                    <td class="px-6 py-4 text-gray-600">${entry.number}</td>
                    <td class="px-6 py-4 text-blue-600">${entry.email}</td>
                    <td class="px-6 py-4 text-gray-600">${entry.message}</td>
                </tr>
            `).join('');
        }

        if (cardList) {
            cardList.innerHTML = submissions.reverse().map(entry => `
                <div class="bg-white border border-gray-200 rounded-xl p-4 shadow-md mb-4">
                    <p class="text-xs text-gray-400 mb-2">Timestamp: ${entry.submittedAt}</p>
                    <p class="font-bold text-gray-800">Name: ${entry.name}</p>
                    <p class="text-gray-600">Contact Number: ${entry.number}</p>
                    <p class="text-blue-600">Email: ${entry.email}</p>
                    <p class="text-gray-600 mt-2">Message: ${entry.message}</p>
                </div>
            `).join('');
        }
    }

    renderSubmissions();
});
