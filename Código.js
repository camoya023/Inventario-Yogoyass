function doGet() {
  return HtmlService.createTemplateFromFile('home').evaluate();
}

function include(filename) {
  return HtmlService.createHtmlOutputFromFile(filename).getContent();
}

function getProveedoresPage() {
  return HtmlService.createHtmlOutputFromFile('proveedores').getContent();
}

function guardarProveedor(nombreEmpresa, nombreContacto, numeroMovil, direccion, ciudad, email, cuentaBancaria, fechaString) {
  const sheetName = "proveedores";
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  let sheet = ss.getSheetByName(sheetName);

  // Verificar si la hoja existe; si no, crearla y agregar encabezados
  if (!sheet) {
    sheet = ss.insertSheet(sheetName);
    sheet.appendRow(["ID", "Nombre de la empresa", "Nombre del contacto", "Número de móvil", "Dirección", "Ciudad", "Email", "Cuenta Bancaria", "Fecha de Creación"]);
  } else if (sheet.getLastRow() === 0) { 
    // Si la hoja existe pero está vacía, agregar los encabezados
    sheet.appendRow(["ID", "Nombre de la empresa", "Nombre del contacto", "Número de móvil", "Dirección", "Ciudad", "Email", "Cuenta Bancaria", "Fecha de Creación"]);
  }

  // Obtener el último ID y crear uno nuevo consecutivo
  const lastRow = sheet.getLastRow();
  let nuevoID = "CO0001";
  if (lastRow > 1) {
    const lastID = sheet.getRange(lastRow, 1).getValue();
    const lastNumber = parseInt(lastID.replace("CO", ""), 10);
    nuevoID = "CO" + ("000" + (lastNumber + 1)).slice(-4);
  }

  // Agregar la nueva fila con los datos del proveedor
  const newRow = [nuevoID, nombreEmpresa || "", nombreContacto || "", numeroMovil || "", direccion || "", ciudad || "", email || "", cuentaBancaria || "", fechaString || ""];
  sheet.appendRow(newRow);
}

// Código Apps Script
function buscarProveedores(query) {
  const queryInMinus = query.toLowerCase()
  const hoja = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('proveedores');
  const datos = hoja.getDataRange().getValues(); // Obtener todos los datos de la hoja
  const resultados = [];
  for (let i = 1; i < datos.length; i++) { // Comenzar desde 1 para omitir encabezados
    console.log(datos[i])
    //const id = datos[i][0]
    //const nombre = datos[i][1]
    const [id, empresa, contacto, movil] = datos[i]; // Cambia esto según tus columnas
    // Comprobar si la consulta está en el ID, Empresa o Móvil
    if (id.toString().toLowerCase().includes(queryInMinus) || empresa.toString().toLowerCase().includes(queryInMinus) || movil.toString().includes(queryInMinus) || contacto.toString().toLowerCase().includes(queryInMinus)) {
        resultados.push({ id: id, empresa: empresa, contacto: contacto, movil: movil });
    }
}



  return resultados; // Devuelve los resultados encontrados
}