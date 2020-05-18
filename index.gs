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
  const validOptions = SpreadsheetApp.getActiveRange().getDataValidation().getCriteriaValues()[0].getValues().map(value => value[0]);

  const cellData = SpreadsheetApp.getActiveRange().getCell(1, 1).getValue();
  const selectedOptions = cellData.split(',').map(str => str.trim());
  
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
