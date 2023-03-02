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

////




////

const express = require('express');
const app = express();
const { createClient } = require('@supabase/supabase-js')
const supabase = createClient(
    'https://ojrbirzktvctdfiwrota.supabase.co',
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9qcmJpcnprdHZjdGRmaXdyb3RhIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTY3Njc4Mzk0MCwiZXhwIjoxOTkyMzU5OTQwfQ.2QC-jb4RICVuZtvVFgleJmPXXJs-tBfrm979L888PaA'
)

/*
all apis 
https://ipl-node.vercel.app/
getForYearRange/2008/2015
pomForTeam/pune
getwinnerbywickets/pune
getWinnerByRuns/pune
city=Mumbai
cities
year/2010
teamaswin/pune
teamloose/pune
pom
team/pune
*/
app.get('/', async function (req, res) {
    const data = await supabase
        .from('iplmatches')
        .select('*')
        ;
    res.send(
        data
    );
});
// /city=:city with =
// /city/:city with slash
// :fruitName&:fruitColor
// /city=:city/name=:name

// 



// getForYearRange

app.get('/getForYearRange/:syear/:eyear', async function (req, res) {
    // const  d = req.params.team;
    // const exactTeamname = await supabase.from('iplmatches').select('team1').textSearch('team1', req.params.team, {
    //     type: 'websearch',
    //     config: 'english'
    // }).limit(1);
    // console.log("teamname " + exactTeamname.data.at(0).team1);

    // const teamnamevar = exactTeamname.data.at(0).team1;
    // {startyear:"2008-01-01",endyear:"2009-12-01"}

    const startyear = req.params.syear + "-01-01";
    const endyear = req.params.eyear + "-12-31";
    const data = await supabase.rpc('getyearr', { "startyear": startyear, "endyear": endyear });
    res.send(
        {
            data
        }
    );
});
app.get('/pomForTeam/:team', async function (req, res) {
    // const  d = req.params.team;
    const exactTeamname = await supabase.from('iplmatches').select('team1').textSearch('team1', req.params.team, {
        type: 'websearch',
        config: 'english'
    }).limit(1);
    console.log("teamname " + exactTeamname.data.at(0).team1);

    const teamnamevar = exactTeamname.data.at(0).team1;
    const data = await supabase.rpc('pomforfeam', { "teamname": teamnamevar });
    res.send(
        {
            data
        }
    );
});



app.get('/getwinnerbywickets/:team', async function (req, res) {
    // const  d = req.params.team;
    const exactTeamname = await supabase.from('iplmatches').select('team1').textSearch('team1', req.params.team, {
        type: 'websearch',
        config: 'english'
    }).limit(1);
    console.log("teamname " + exactTeamname.data.at(0).team1);

    const teamnamevar = exactTeamname.data.at(0).team1;
    const data = await supabase.rpc('getwinnerbywickets', { "teamname": teamnamevar });
    res.send(
        {
            data
        }
    );
});
app.get('/getWinnerByRuns/:team', async function (req, res) {
    // const  d = req.params.team;
    const exactTeamname = await supabase.from('iplmatches').select('team1').textSearch('team1', req.params.team, {
        type: 'websearch',
        config: 'english'
    }).limit(1);
    console.log("teamname " + exactTeamname.data.at(0).team1);

    const teamnamevar = exactTeamname.data.at(0).team1;
    const data = await supabase.rpc('getwinnerbyruns', { "teamname": teamnamevar });
    res.send(
        {
            data
        }
    );
});


// getWinnerByRuns
app.get('/city=:city/:name?', async function (req, res) {
    console.log("name is " + req.params.name + "ff" + req.params.city)
    const data = await supabase
        .from('iplmatches')
        .select('*').eq('city', req.params.city);
    res.send(
        data
    );
});

app.get('/cities', async function (req, res) {
    const data = await supabase
        .from('iplmatches')
        .select(
            "city"
            // '*', { count: 'exact', head: true }
        );
    console.log("datatat ");
    supabase
    res.send(
        data

    );

});


app.get('/year/:date', async function (req, res) {
    const d = req.params.date;
    const l = d.split("-");
    const nthElement = (arr, n = 0) =>
        (n === -1 ? arr.slice(n) : arr.slice(n, n + 1))[0];
    console.log("listsplit " + d + "  :::  " + l + " yerar" + nthElement(l, 0));
    const data = await supabase
        .from('iplmatches')
        .select(
            "*"
        ).textSearch('date', req.params.date, {
            type: 'websearch',
            config: 'english'
        });

    res.send(

        data

    );

});
app.get('/teamaswin/:team', async function (req, res) {
    // const  d = req.params.team;
    const exactTeamname = await supabase.from('iplmatches').select('team1').textSearch('team1', req.params.team, {
        type: 'websearch',
        config: 'english'
    }).limit(1);
    console.log("teamname " + exactTeamname.data.at(0).team1);

    const teamname = exactTeamname.data.at(0).team1;
    const data = await supabase
        .from('iplmatches')
        .select(
            "*"
        ).eq("winner", teamname);
    res.send(
        {
            data
        }
    );
});
app.get('/cities/', async function (req, res) {
    const data = await supabase.rpc('get_citiess', {});

    res.send(
        { data }
    );

});
app.get('/teamloose/:team', async function (req, res) {
    const d = req.params.team;
    const exactTeamname = await supabase.from('iplmatches').select('team1').textSearch('team1', req.params.team, {
        type: 'websearch',
        config: 'english'

    }).limit(1);
    const teamnamevar = exactTeamname.data.at(0).team1;

    const data = await supabase.rpc('get_looser_team', { teamname: teamnamevar });

    res.send(
        { data }
    );

});
app.get('/teampair/:team1/:team2', async function (req, res) {
     const exactTeamname1 = await supabase.from('iplmatches').select('team1').textSearch('team1', req.params.team1, {
        type: 'websearch',
        config: 'english'

    }).limit(1);
    const teamnamevar1 = exactTeamname1.data.at(0).team1;

         const exactTeamname2 = await supabase.from('iplmatches').select('team2').textSearch('team2', req.params.team2, {
        type: 'websearch',
        config: 'english'

    }).limit(1);
    const teamnamevar2 = exactTeamname2.data.at(0).team2;
    const d = await supabase.rpc('teampair',{"team1name":teamnamevar1, "team2name":teamnamevar2})
    res.send(
        d
    );
});
app.get('/team/:team', async function (req, res) {

    const d = await supabase.from('iplmatches').select('*');
    res.send(
        d
    );
    // const d = req.params.team;
    // const exactTeamname = await supabase.from('iplmatches').select('team1').textSearch('team1', req.params.team, {
    //     type: 'websearch',
    //     config: 'english'

    // }).limit(1);
    // const teamnamevar = exactTeamname.data.at(0).team1;

    // const data = await supabase.rpc('get_for_team', {teamname:teamnamevar});

    // res.send(
    //     { data }
    // );

    // console.log("teamname "+exactTeamname.data.at(0).team1);
    //   ;
    //   const fil ='team2.eq.'+teamname+',team1.eq.Pune Warriors';
    //   console.log("fil is ["+fil+"]");
    // const   data = await supabase
    //     .from('iplmatches')
    //     .select (
    //        "*"
    //     ).or(fil)

    //       ;





});
app.post('/add', async function (req, res) {
    await supabase
        .from('iplmatches').insert(data);
    res.send(
        "data posted added"
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
    console.log("it is just log")
});



/*

   // .textSearch('winner', req.params.team, {
        //     type:'websearch',
        //     config: 'english'
        //   });

        //    const data =  await supabase .rpc('get_ipl')


//      const obj = JSON.parse(JSON.stringify(data));

  
// const  map = new Map(Object.entries(JSON.parse(JSON.stringify(data))));

//      for (let i = 0; i < data.data.length; i++) {
//         const element = data.data.at(i);
      
        
//         console.log("json obh=j  "  + typeof(element)+   " o bj "+element.team2);
//      }

//      const  nmap = new  Map(Object.entries(JSON.parse(JSON.stringify(map.get("data")))));

//     console.log("mapp "+ nmap.entries);
//      var objt = Object.fromEntries(map);
// var jsonString = JSON.stringify(objt);

// const newobj = JSON.parse(jsonString);
// const   data = await supabase
        
//     .rpc('get_planets');
*/