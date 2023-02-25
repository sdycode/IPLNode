// const express =require('express');


// const app = express();

// app.get('/', async function (req,res ) {

//     res.send("hello akash");


// });
// app.post('/name/:id', async function (req,res ) {

//     res.send("hello akash"+req.params);


// });
// app.listen(5000, ()=>{

//     console.log("akasjdhfjdhfkjdfsh")
// });

const express = require('express');


const app = express();


const { createClient } = require('@supabase/supabase-js')
const supabase = createClient(
    'https://ojrbirzktvctdfiwrota.supabase.co',
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9qcmJpcnprdHZjdGRmaXdyb3RhIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTY3Njc4Mzk0MCwiZXhwIjoxOTkyMzU5OTQwfQ.2QC-jb4RICVuZtvVFgleJmPXXJs-tBfrm979L888PaA'
)





app.get('/', async function (req, res) {
    const data = await supabase
        .from('iplmatches')
        .select('*')
        .limit(10);
    res.send(
        data

    );


});
app.get('/city/:city', async function (req, res) {
    const data = await supabase
        .from('iplmatches')
        .select('*').eq('city', req.params.city);
        
    res.send(
        data

    );


});

app.get('/pom', async function (req, res) {
    const data = await supabase
        .from('iplmatches')
        .select('player_of_match');
        
    res.send(
        data

    );


});

app.listen(5000, () => {

    console.log("akasjdhfjdhfkjdfsh")
});
