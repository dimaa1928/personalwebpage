const express = require('express');
const mongoose = require('mongoose');

const app = express();
const port = 3000;

// استبدال "YourMongoDBConnectionString" بسلسلة الاتصال الخاصة بك
mongoose.connect('mongodb://localhost:27017/C:\Users\al_th\OneDrive\Desktop\tranning course\day5', { useNewUrlParser: true, useUnifiedTopology: true });

const Schema = mongoose.Schema;
const dataSchema = new Schema({
    // تحديد هيكل البيانات
    name: String,
});

const DataModel = mongoose.model('Data', dataSchema);

app.get('/', async (req, res) => {
    // الحصول على البيانات من MongoDB وإرسالها إلى الصفحة HTML
    const data = await DataModel.find();
    res.send(`
        <html>
            <body>
                <h1>Data from MongoDB</h1>
                <ul>
                    ${data.map(item => `<li>${item.name} - ${item.age}</li>`).join('')}
                </ul>
            </body>
        </html>
    `);
});

app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});
