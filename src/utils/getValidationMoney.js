export function getValidationMoney(moneyField) {
  if(moneyField.toString().indexOf(",") != -1){
    const moneyArray = moneyField.split(',');
    const money = moneyArray[0].replace(/\D/g, '');
    return parseFloat(
      `${money}${moneyArray[1][0]}.${moneyArray[1][1]}${moneyArray[1][2]}`
    );
  }
  return moneyField;
  }