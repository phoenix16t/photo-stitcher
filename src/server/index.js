const express = require('express');
const app = express();

app.use(express.static(__dirname + './../../public/'));
app.set('port', 3000);
app.listen(app.get('port'), () => {
  console.log('listening on port ' + app.get('port') + '...');
});
