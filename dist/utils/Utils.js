"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Utils = void 0;
class Utils {
    static validateRegisterFields(fields) {
        const { userName, email, password, confirmPassword } = fields;
        const isValid = {};
        if (!userName) {
            isValid.userName = 'User name cannot be empty!';
        }
        if (!password) {
            isValid.password = 'Password cannot be empty!';
        }
        if (!confirmPassword) {
            isValid.confirmPassword = 'Confirm password cannot be empty!';
        }
        if (password && confirmPassword && password !== confirmPassword) {
            isValid.confirmPassword = 'Passwords do not match!';
        }
        if (!email) {
            isValid.email = 'Email cannot be empty!';
        }
        else {
            if (email && !Utils.emailRegEx.test(email)) {
                isValid.email = 'Invalid email address entered!';
            }
        }
        return isValid;
    }
    static validateLoginInput(userName, password) {
        const isValid = {};
        if (!userName) {
            isValid.userName = 'User name cannot be empty!';
        }
        if (!password) {
            isValid.password = 'Password cannot be empty!';
        }
        return isValid;
    }
}
exports.Utils = Utils;
Utils.emailRegEx = /^((([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+(\.([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+)*)|((\x22)((((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(([\x01-\x08\x0b\x0c\x0e-\x1f\x7f]|\x21|[\x23-\x5b]|[\x5d-\x7e]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(\\([\x01-\x09\x0b\x0c\x0d-\x7f]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))))*(((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(\x22)))@((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))$/i;
//# sourceMappingURL=Utils.js.map