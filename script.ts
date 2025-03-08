type TaxBracket = {
  min: number;
  max: number;
  rate: number;
};

const taxBrackets: TaxBracket[] = [
  { min: 0, max: 150000, rate: 0 },
  { min: 150001, max: 500000, rate: 0.1 },
  { min: 500001, max: 1000000, rate: 0.15 },
  { min: 1000001, max: 2000000, rate: 0.2 },
  { min: 2000001, max: 5000000, rate: 0.25 },
  { min: 5000001, max: 10000000, rate: 0.3 },
  { min: 10000001, max: Infinity, rate: 0.35 }
];

const personalDeduction = 60000;

function calculateTax(income: number, deductions: number = 0): number {
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
document.getElementById("tax-form")?.addEventListener("submit", function(event) {
  event.preventDefault();
  
  const income = parseFloat((document.getElementById("income") as HTMLInputElement).value);
  const deductions = parseFloat((document.getElementById("deductions") as HTMLInputElement).value);
  
  const tax = calculateTax(income, deductions);
  
  const resultElement = document.getElementById("result");
  if (resultElement) {
    resultElement.innerHTML = `ภาษีที่ต้องจ่าย: ${tax.toLocaleString()} บาท`;
  }
});

// จับเหตุการณ์เมื่อกดปุ่มเคลียร์ข้อมูล
document.getElementById("clear-button")?.addEventListener("click", function() {
  // รีเซ็ตค่าฟอร์ม
  (document.getElementById("income") as HTMLInputElement).value = '';
  (document.getElementById("deductions") as HTMLInputElement).value = '';
  
  // ลบผลลัพธ์ที่คำนวณออก
  const resultElement = document.getElementById("result");
  if (resultElement) {
    resultElement.innerHTML = '';
  }
});
