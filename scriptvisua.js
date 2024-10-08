document.addEventListener('DOMContentLoaded', () => {
    const arrayContainer = document.getElementById('array-container');
    const startSortButton = document.getElementById('start-sort');
    let array = [];

    // Generate random array
    function generateArray() {
        array = [];
        for (let i = 0; i < 50; i++) {
            array.push(Math.floor(Math.random() * 300) + 10);
        }
        renderArray();
    }

    // Render the array as bars
    function renderArray() {
        arrayContainer.innerHTML = '';
        for (let i = 0; i < array.length; i++) {
            const bar = document.createElement('div');
            bar.classList.add('array-bar');
            bar.style.height = `${array[i]}px`;
            bar.style.width = '20px';
            arrayContainer.appendChild(bar);
        }
    }

    // Merge Sort implementation with visualization
    async function mergeSort(array, start, end) {
        if (start < end) {
            const mid = Math.floor((start + end) / 2);
            await mergeSort(array, start, mid);
            await mergeSort(array, mid + 1, end);
            await merge(array, start, mid, end);
        }
    }

    async function merge(array, start, mid, end) {
        const n1 = mid - start + 1;
        const n2 = end - mid;
        const left = new Array(n1);
        const right = new Array(n2);

        for (let i = 0; i < n1; i++) {
            left[i] = array[start + i];
        }
        for (let i = 0; i < n2; i++) {
            right[i] = array[mid + 1 + i];
        }

        let i = 0, j = 0, k = start;
        while (i < n1 && j < n2) {
            if (left[i] <= right[j]) {
                array[k] = left[i];
                i++;
            } else {
                array[k] = right[j];
                j++;
            }
            k++;
            renderArray();
            await sleep(50);
        }

        while (i < n1) {
            array[k] = left[i];
            i++;
            k++;
            renderArray();
            await sleep(50);
        }

        while (j < n2) {
            array[k] = right[j];
            j++;
            k++;
            renderArray();
            await sleep(50);
        }
    }

    // Helper function to pause execution
    function sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    startSortButton.addEventListener('click', async () => {
        startSortButton.disabled = true;
        await mergeSort(array, 0, array.length - 1);
        startSortButton.disabled = false;
    });

    generateArray();
});
