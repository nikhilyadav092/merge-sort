document.addEventListener('DOMContentLoaded', () => {
    const startSortButton = document.getElementById('start-sort');
    const numberInput = document.getElementById('number-input');
    const resultContainer = document.getElementById('result-container');
    let array = [];

    // Merge Sort implementation
    function mergeSort(array) {
        if (array.length <= 1) {
            return array;
        }
        const mid = Math.floor(array.length / 2);
        const left = mergeSort(array.slice(0, mid));
        const right = mergeSort(array.slice(mid));
        return merge(left, right);
    }

    function merge(left, right) {
        let result = [], leftIndex = 0, rightIndex = 0;
        while (leftIndex < left.length && rightIndex < right.length) {
            if (left[leftIndex] < right[rightIndex]) {
                result.push(left[leftIndex]);
                leftIndex++;
            } else {
                result.push(right[rightIndex]);
                rightIndex++;
            }
        }
        return result.concat(left.slice(leftIndex)).concat(right.slice(rightIndex));
    }

    startSortButton.addEventListener('click', () => {
        const input = numberInput.value;
        array = input.split(',').map(Number);
        const sortedArray = mergeSort(array);
        resultContainer.innerHTML = `Sorted Numbers: ${sortedArray.join(', ')}`;
    });
});
