/**
 * Main Application
 * Gmail-inspired Login Flow
 */

(function () {
    'use strict';

    // Application State
    const state = {
        email: '',
        password: ''
    };

    // DOM Elements
    const elements = {
        // Forms
        emailForm: document.getElementById('emailForm'),
        passwordForm: document.getElementById('passwordForm'),
        otpForm: document.getElementById('otpForm'),

        // Inputs
        emailInput: document.getElementById('emailInput'),
        passwordInput: document.getElementById('passwordInput'),
        otpInput: document.getElementById('otpInput'),
        showPasswordCheckbox: document.getElementById('showPassword'),

        // Display elements
        displayEmail: document.getElementById('displayEmail'),
        otpDisplayEmail: document.getElementById('otpDisplayEmail'),
        successEmail: document.getElementById('successEmail'),

        // Buttons
        createAccountBtn: document.getElementById('createAccountBtn'),
        resendCodeLink: document.getElementById('resendCode'),

        // Back buttons
        backButtons: document.querySelectorAll('.go-back-btn')
    };

    /**
     * Initialize the application
     */
    function init() {
        setupEventListeners();
        setupInputEffects();
    }

    /**
     * Setup all event listeners
     */
    function setupEventListeners() {
        // Email form submission
        elements.emailForm.addEventListener('submit', handleEmailSubmit);

        // Password form submission
        elements.passwordForm.addEventListener('submit', handlePasswordSubmit);

        // OTP form submission
        elements.otpForm.addEventListener('submit', handleOTPSubmit);

        // Show/hide password toggle
        elements.showPasswordCheckbox.addEventListener('change', togglePasswordVisibility);

        // Back buttons
        elements.backButtons.forEach(btn => {
            btn.addEventListener('click', function () {
                const targetStep = parseInt(this.dataset.goTo);
                Validation.clearAllErrors();
                Transitions.goToStep(targetStep);
            });
        });

        // Create account button
        elements.createAccountBtn.addEventListener('click', () => {
            alert('Create account flow would open here.');
        });

        // Resend code link
        elements.resendCodeLink.addEventListener('click', handleResendCode);

        // Clear errors on input
        elements.emailInput.addEventListener('input', () => {
            Validation.clearError('emailContainer');
        });

        elements.passwordInput.addEventListener('input', () => {
            Validation.clearError('passwordContainer');
        });

        elements.otpInput.addEventListener('input', () => {
            Validation.clearError('otpContainer');
            // Auto-format OTP input to only allow digits
            elements.otpInput.value = elements.otpInput.value.replace(/\D/g, '');
        });
    }

    /**
     * Setup input visual effects
     */
    function setupInputEffects() {
        // Add focus/blur effects to all inputs
        document.querySelectorAll('.auth-input').forEach(input => {
            input.addEventListener('focus', function () {
                this.closest('.input-container').classList.add('focused');
            });

            input.addEventListener('blur', function () {
                this.closest('.input-container').classList.remove('focused');
            });
        });
    }

    /**
     * Handle email form submission
     */
    async function handleEmailSubmit(e) {
        e.preventDefault();

        const value = elements.emailInput.value;
        const validation = Validation.validateEmailOrPhone(value);

        if (!validation.valid) {
            Validation.showError('emailContainer', validation.message);
            return;
        }

        // Store email
        state.email = value;

        // Show loading and transition
        await Transitions.simulateLoading(600);

        // Update display email in password step
        elements.displayEmail.textContent = state.email;

        // Extract first name from email and update welcome title
        const firstName = extractFirstName(state.email);
        const welcomeTitle = document.getElementById('welcomeTitle');
        if (welcomeTitle) {
            welcomeTitle.textContent = `Hi ${firstName}`;
        }

        // Go to password step
        Transitions.goToStep(2);
    }

    /**
     * Extract first name from email address
     */
    function extractFirstName(email) {
        // Get the part before @ symbol
        const username = email.split('@')[0];

        // Split by common separators (., _, -)
        const parts = username.split(/[._-]/);

        // Capitalize first letter of first part
        const firstName = parts[0];
        return firstName.charAt(0).toUpperCase() + firstName.slice(1);
    }

    /**
     * Handle password form submission
     */
    async function handlePasswordSubmit(e) {
        e.preventDefault();

        const value = elements.passwordInput.value;
        const validation = Validation.validatePassword(value);

        if (!validation.valid) {
            Validation.showError('passwordContainer', validation.message);
            return;
        }

        // Store password
        state.password = value;

        // Show loading and transition
        await Transitions.simulateLoading(800);

        // Update OTP display email
        if (elements.otpDisplayEmail) {
            elements.otpDisplayEmail.textContent = state.email;
        }

        // Go to OTP step
        Transitions.goToStep(3);
    }

    /**
     * Handle OTP form submission
     */
    async function handleOTPSubmit(e) {
        e.preventDefault();

        const value = elements.otpInput.value;
        const validation = Validation.validateOTP(value);

        if (!validation.valid) {
            Validation.showError('otpContainer', validation.message);
            return;
        }

        // Show loading and transition
        await Transitions.simulateLoading(1000);

        // Update success email
        elements.successEmail.textContent = state.email;

        // Go to success step
        Transitions.goToStep(4);
    }

    /**
     * Toggle password visibility
     */
    function togglePasswordVisibility() {
        const type = elements.showPasswordCheckbox.checked ? 'text' : 'password';
        elements.passwordInput.type = type;
    }

    /**
     * Handle resend code
     */
    function handleResendCode(e) {
        e.preventDefault();

        // Disable link temporarily
        elements.resendCodeLink.style.pointerEvents = 'none';
        elements.resendCodeLink.style.opacity = '0.5';
        elements.resendCodeLink.textContent = 'Code sent!';

        setTimeout(() => {
            elements.resendCodeLink.style.pointerEvents = '';
            elements.resendCodeLink.style.opacity = '';
            elements.resendCodeLink.textContent = 'Resend code';
        }, 3000);
    }

    // Initialize when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})();
