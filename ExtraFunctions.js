// JavaScript source code
var MathExtra = {
    repeat: function (value, min, max) {
        if (value > max) {
            value = min;
        }
        else if (value < min) {
            value = max;
        }
    }
}