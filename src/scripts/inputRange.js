
document.addEventListener('DOMContentLoaded', (event) => {
    document.getElementById('priceRange').oninput = function () {
        document.getElementById('priceValue').textContent = `R$${this.value},00`;
    };
});
export function applyInputRangeStyle() {
    const inputRange = document.querySelector("#priceRange");

    inputRange.addEventListener("input", (event) => {
        const currentInputValue = event.target.value;
        const runnableTrackProgress = (currentInputValue / inputRange.max) * 100;

        inputRange.style.background = `linear-gradient(to right, var(--brand-1) ${runnableTrackProgress}%, var(--grey-5) ${runnableTrackProgress}%)`;
    });
}
