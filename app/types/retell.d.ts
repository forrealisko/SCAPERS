/* eslint-disable @typescript-eslint/no-explicit-any */

// Global type declaration for Retell Widget
interface RetellWidgetInterface {
    open: () => void;
    close: () => void;
}

declare global {
    interface Window {
        RetellWidget?: RetellWidgetInterface;
    }
}

export { };
