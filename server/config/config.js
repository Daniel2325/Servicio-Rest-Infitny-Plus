// =================
// PUERTO
// =================
process.env.PORT = process.env.PORT || 3000;

process.env.NODE_ENV = process.env.NODE_ENV || 'dev';
//Base de datos
let urlDB;
if (process.env.NODE_ENV === 'dev') {
    urlDB = 'mongodb+srv://info-user:XLynvHKw6snQZWPh@cluster0.r16tc.mongodb.net/informacion'
} else {
    urlDB = 'mongodb+srv://info-user:XLynvHKw6snQZWPh@cluster0.r16tc.mongodb.net/informacion'
}
process.env.urlDB = urlDB;
