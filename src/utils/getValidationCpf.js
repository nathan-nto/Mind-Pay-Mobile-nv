import { cpf, cnpj } from 'cpf-cnpj-validator';

export function getValidationCpf(cpfField) {
  const regexCpfRaw = /[^a-z0-9]/gi;
  console.log(cpfField);
  const CPFValidation = cpfField.replace(regexCpfRaw, '');
  if (cpf.isValid(CPFValidation)) {
    return CPFValidation;
  } else {
    return '0';
  }
}

export function getMaskCpf(cpfField) {
  return cpfField.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/g, '$1.$2.$3-$4');
}