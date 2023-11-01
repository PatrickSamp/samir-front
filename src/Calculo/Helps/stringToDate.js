export function ConverterToDate(dateString){
    const [day, month, year] = dateString.split('/');
    return new Date(`${year}-${month}-${day}`);
} 