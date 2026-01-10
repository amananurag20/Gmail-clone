/**
 * Transitions Module
 * Handles step transitions with animations
 */

const Transitions = {
    currentStep: 1,
    isTransitioning: false,

    /**
     * Go to a specific step
     */
    goToStep(targetStep) {
        if (this.isTransitioning || targetStep === this.currentStep) return;

        this.isTransitioning = true;
        const currentStepEl = document.getElementById(`step${this.currentStep}`);
        const targetStepEl = document.getElementById(`step${targetStep}`);

        if (!currentStepEl || !targetStepEl) {
            this.isTransitioning = false;
            return;
        }

        // Add exiting class to current step
        currentStepEl.classList.add('exiting');

        // After animation, switch steps
        setTimeout(() => {
            currentStepEl.classList.remove('active', 'exiting');
            targetStepEl.classList.add('active');
            this.currentStep = targetStep;
            this.isTransitioning = false;

            // Focus first input in new step
            const firstInput = targetStepEl.querySelector('.auth-input');
            if (firstInput) {
                setTimeout(() => firstInput.focus(), 100);
            }
        }, 200);
    },

    /**
     * Show loading bar
     */
    showLoading() {
        const loadingBar = document.getElementById('loadingBar');
        loadingBar.classList.add('active');
    },

    /**
     * Hide loading bar
     */
    hideLoading() {
        const loadingBar = document.getElementById('loadingBar');
        loadingBar.classList.remove('active');
        loadingBar.style.width = '0';
    },

    /**
     * Simulate async operation with loading
     */
    async simulateLoading(duration = 800) {
        this.showLoading();
        return new Promise(resolve => {
            setTimeout(() => {
                this.hideLoading();
                resolve();
            }, duration);
        });
    }
};

// Make available globally
window.Transitions = Transitions;
