"use strict";
var _a, _b;
const taxBrackets = [
    { min: 0, max: 150000, rate: 0 },
    { min: 150001, max: 500000, rate: 0.1 },
    { min: 500001, max: 1000000, rate: 0.15 },
    { min: 1000001, max: 2000000, rate: 0.2 },
    { min: 2000001, max: 5000000, rate: 0.25 },
    { min: 5000001, max: 10000000, rate: 0.3 },
    { min: 10000001, max: Infinity, rate: 0.35 }
];
const personalDeduction = 60000;
function calculateTax(income, deductions = 0) {
    const taxableIncome = Math.max(income - personalDeduction - deductions, 0);
    let tax = 0;
    for (const bracket of taxBrackets) {
        if (taxableIncome > bracket.min) {
            const taxableAmount = Math.min(taxableIncome, bracket.max) - bracket.min;
            tax += taxableAmount * bracket.rate;
        }
    }
    return tax;
}
// จับเหตุการณ์เมื่อฟอร์มถูกส่ง
(_a = document.getElementById("tax-form")) === null || _a === void 0 ? void 0 : _a.addEventListener("submit", function (event) {
    event.preventDefault();
    const income = parseFloat(document.getElementById("income").value);
    const deductions = parseFloat(document.getElementById("deductions").value);
    const tax = calculateTax(income, deductions);
    const resultElement = document.getElementById("result");
    if (resultElement) {
        resultElement.innerHTML = `ภาษีที่ต้องจ่าย: ${tax.toLocaleString()} บาท`;
    }
});
// จับเหตุการณ์เมื่อกดปุ่มเคลียร์ข้อมูล
(_b = document.getElementById("clear-button")) === null || _b === void 0 ? void 0 : _b.addEventListener("click", function () {
    // รีเซ็ตค่าฟอร์ม
    document.getElementById("income").value = '';
    document.getElementById("deductions").value = '';
    // ลบผลลัพธ์ที่คำนวณออก
    const resultElement = document.getElementById("result");
    if (resultElement) {
        resultElement.innerHTML = '';
    }
});
