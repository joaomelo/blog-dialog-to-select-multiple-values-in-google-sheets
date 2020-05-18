function onOpen() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const multiselectMenu = {name: 'Select multiple', functionName: 'showSelectDialog'}
  ss.addMenu("My Scripts", [multiselectMenu]);
}

function showSelectDialog(){
  const template = HtmlService.createTemplateFromFile('dialog');
  template.optionsData = getOptionsFromCurrentCell();
  const html = template.evaluate();
  SpreadsheetApp.getUi().showModalDialog(html, 'Select multiple');
}

function getOptionsFromCurrentCell(){
  const validOptions = SpreadsheetApp
    .getActiveRange() // everything that is selected
    .getDataValidation() // all validation rules for that
    .getCriteriaValues()[0] // the first criteria
    .getValues() // the value for this criteria
    .map(value => value[0]); // flatten in an one dimension array

  const selectedOptions = SpreadsheetApp
    .getActiveRange()
    .getCell(1, 1) // first selected cell in the range
    .getValue()
    .split(',') // convert the cell string into an array
    .map(str => str.trim()); // remove unwanted whitespace
  
  const optionsData = validOptions.map(option => {
    return {
      value: option,
      isSelected: selectedOptions.includes(option)
    }
  })

  return optionsData;
}

function setOptionsForCurrentCell(selectedOptions){
  const cellData = (Array.isArray(selectedOptions) && selectedOptions.length > 0) ? selectedOptions.join(',') : '';
  const cell = SpreadsheetApp.getActiveRange().getCell(1, 1);
  cell.setValue(cellData);  
}
