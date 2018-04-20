export class UserAgent {
    static getUA() {
        return navigator ? navigator.userAgent : '';
    }

    static isMobile() {
        return typeof window.orientation !== 'undefined';
    }

    static isChromeOS() {
        return UserAgent.getUA().match(/CtiOS/i);
    }

    static isFirefoxOS() {
        return UserAgent.getUA().match(/FxiOS/i);
    }

    static isTrident() {
        return UserAgent.getUA().match(/trident/i);
    }

    static isEdge() {
        return UserAgent.getUA().match(/\sedge\//i);
    }

    static is64bit() {
        return /\b(WOW64|x86_64|Win64|intel mac os x 10.(9|\d{2,}))/i.test(UserAgent.getUA());
    }
}
