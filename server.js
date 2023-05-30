const express = require('express');
const symptomsFunctions = require('./Api/Calendar/symptoms_api')
const registerFunctions = require('./Api/register_api')
const diaryFunctions = require('./Api/Calendar/diary_api')
const medicineFunctions = require('./Api/Calendar/medicine_api')
const periodHistoryFunctions = require('./Api/Calendar/period_history_api')

const app = express();
app.use(express.json())

// Register Paths

app.use('/peride_api/users', registerFunctions.router)

// Calendar - Period History Paths 

app.use('/peride_api/period_history', periodHistoryFunctions.router)

// Calendar - Symptoms Paths

app.use('/peride_api/symptoms', symptomsFunctions.router)

// Calendar - Diary Paths

app.use('/peride_api/diaries', diaryFunctions.router)

// Calendar - Medicine Paths

app.use('/peride_api/medicines', medicineFunctions.router)

const port = process.env.PORT || 3000
app.listen(port, () => console.log(`Listening on port ${port}.`))

