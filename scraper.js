const pup = require('puppeteer');
const express = require('express');
const cors = require('cors');
const app = express();
app.use(cors());
const port = process.env.PORT || 1000
app.listen(port)


async function getGames(url, callback)  {
    const browser = await pup.launch({headless: true, args: ['--no-sandbox', '--disable-setuid-sandbox']});
    const page = await browser.newPage();
    await page.goto(url);

    let games = await page.evaluate(() => {
        var date = new Date();
        let options = { weekday: 'long', month: 'long', day: 'numeric' };
        let dateLength = date.toLocaleString('en-US', options).length;
        let gameTable = Array.from(document.querySelectorAll('tr'));
        let gamesInfo = gameTable.map(row => {
            let date = row.parentElement.parentElement.parentElement.previousSibling.textContent.substr(0, dateLength);
            let awayTeam = row.firstChild.textContent;
            let homeTeam = row.firstChild.nextSibling.textContent;
            let time = row.firstChild.nextSibling.nextSibling.textContent;
            return {awayTeam, homeTeam, time, date};
        })
        return gamesInfo;
    })
    await browser.close();
    await callback(games);
}

async function getScores(url, callback)  {
    const browser = await pup.launch({headless: true, args: ['--no-sandbox', '--disable-setuid-sandbox']});
    const page = await browser.newPage();
    await page.goto(url);

    let scores = await page.evaluate(() => {
        // let gameCard = Array.from(document.querySelectorAll('.sb-content.competitors.live'));
        let gameCard = Array.from(document.querySelectorAll('.scoreboard-wrapper'));
        let gamesInfo = gameCard.map(card => {
            let time = card.firstElementChild.firstElementChild.firstElementChild.firstElementChild.firstElementChild.firstElementChild.textContent.replaceAll('\n', '').replaceAll('\t', '');
            let awayTeam = card.firstElementChild.firstElementChild.firstElementChild.lastElementChild.firstElementChild.firstElementChild.lastElementChild.firstElementChild.firstElementChild.lastElementChild.textContent;
            let away1 = card.firstElementChild.firstElementChild.firstElementChild.lastElementChild.firstElementChild.firstElementChild.nextElementSibling.textContent;
            let away2 = card.firstElementChild.firstElementChild.firstElementChild.lastElementChild.firstElementChild.firstElementChild.nextElementSibling.nextElementSibling.textContent;
            let away3 = card.firstElementChild.firstElementChild.firstElementChild.lastElementChild.firstElementChild.firstElementChild.nextElementSibling.nextElementSibling.nextElementSibling.textContent;
            let away4 = card.firstElementChild.firstElementChild.firstElementChild.lastElementChild.firstElementChild.firstElementChild.nextElementSibling.nextElementSibling.nextElementSibling.nextElementSibling.textContent;
            let homeTeam = card.firstElementChild.firstElementChild.firstElementChild.lastElementChild.lastElementChild.firstElementChild.lastElementChild.firstElementChild.firstElementChild.lastElementChild.textContent;
            let home1 = card.firstElementChild.firstElementChild.firstElementChild.lastElementChild.lastElementChild.firstElementChild.nextElementSibling.textContent;
            let home2 = card.firstElementChild.firstElementChild.firstElementChild.lastElementChild.lastElementChild.firstElementChild.nextElementSibling.nextElementSibling.textContent;
            let home3 = card.firstElementChild.firstElementChild.firstElementChild.lastElementChild.lastElementChild.firstElementChild.nextElementSibling.nextElementSibling.nextElementSibling.textContent;
            let home4 = card.firstElementChild.firstElementChild.firstElementChild.lastElementChild.lastElementChild.firstElementChild.nextElementSibling.nextElementSibling.nextElementSibling.nextElementSibling.textContent;
            return {time, awayTeam, away1, away2, away3, away4, homeTeam, home1, home2, home3, home4};
        })
        return gamesInfo;
    })
    await browser.close();
    await callback(scores);
}

app.get('/test', (req, res) => {
    res.send('TEST');
})

var x = []
var y = []


app.get('/', async (req, res) => {
    await getGames('https://www.espn.com/nba/schedule', games => {
    x = games
    res.send(x)
    }).then(console.log('good1')).catch(error => {console.log(error.message)});
})


app.get('/scores', async (req, res) => {
    await getScores('https://www.espn.com/nba/scoreboard', gameScores => {
    y = gameScores
    res.send(y)
    }).then(console.log('good2')).catch(error => {console.log(error.message)});
})

