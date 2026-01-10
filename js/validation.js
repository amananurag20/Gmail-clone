/**
 * Validation Module
 * Handles all form validation logic
 */

const Validation = {
    // Email regex pattern
    emailPattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,

    // Phone regex pattern (basic)
    phonePattern: /^[\d\s\-\+\(\)]{10,}$/,

    /**
     * Validate email or phone input
     */
    validateEmailOrPhone(value) {
        const trimmed = value.trim();

        if (!trimmed) {
            return { valid: false, message: 'Enter an email or phone number' };
        }

        // Check if it looks like a phone number
        if (/^[\d\s\-\+\(\)]/.test(trimmed)) {
            if (this.phonePattern.test(trimmed)) {
                return { valid: true, message: '' };
            }
            return { valid: false, message: 'Enter a valid phone number' };
        }

        // Validate as email
        if (!this.emailPattern.test(trimmed)) {
            return { valid: false, message: 'Enter a valid email address' };
        }

        return { valid: true, message: '' };
    },

    /**
     * Validate password
     */
    validatePassword(value) {
        if (!value) {
            return { valid: false, message: 'Enter a password' };
        }

        if (value.length < 1) {
            return { valid: false, message: 'Enter a password' };
        }

        return { valid: true, message: '' };
    },

    /**
     * Validate OTP code
     */
    validateOTP(value, correctCode = '123456') {
        const trimmed = value.trim();

        if (!trimmed) {
            return { valid: false, message: 'Enter the verification code' };
        }

        if (!/^\d{6}$/.test(trimmed)) {
            return { valid: false, message: 'Enter a 6-digit code' };
        }

        if (trimmed !== correctCode) {
            return { valid: false, message: 'Wrong code. Try again.' };
        }

        return { valid: true, message: '' };
    },

    /**
     * Show error on input container
     */
    showError(containerId, message) {
        const container = document.getElementById(containerId);
        const errorEl = container.querySelector('.input-error');

        container.classList.add('error');
        errorEl.textContent = message;
        errorEl.classList.add('visible');

        // Focus the input
        const input = container.querySelector('.auth-input');
        if (input) input.focus();
    },

    /**
     * Clear error from input container
     */
    clearError(containerId) {
        const container = document.getElementById(containerId);
        const errorEl = container.querySelector('.input-error');

        container.classList.remove('error');
        errorEl.textContent = '';
        errorEl.classList.remove('visible');
    },

    /**
     * Clear all errors
     */
    clearAllErrors() {
        document.querySelectorAll('.input-container').forEach(container => {
            container.classList.remove('error');
            const errorEl = container.querySelector('.input-error');
            if (errorEl) {
                errorEl.textContent = '';
                errorEl.classList.remove('visible');
            }
        });
    }
};

// Make available globally
window.Validation = Validation;
