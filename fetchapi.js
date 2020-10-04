
window.onload = function () {
    let url = 'https://salty-plateau-83302.herokuapp.com/http://arena.siesgst.ac.in/api/contests';
    fetch(url, {
        method: 'GET',
        mode : 'cors',
        headers: {
            'Accept': 'application/vnd.arena+json;version=1',
        }
    }).then((res) => res.json())
        .then((data) => {
            let srmTable = document.getElementById("srmTable").getElementsByTagName('tbody')[0];
            let otherTable = document.getElementById("otherTable").getElementsByTagName('tbody')[0];
            let srm = data.filter(function (element) {
                return element.code.substring(0,3) == 'SRM';
            });
            let others = data.filter(function (element) {
                return element.code.substring(0, 3) !== 'SRM';
            });
            srm.forEach(contest => {
                var row = srmTable.insertRow(0);
                row.insertCell(0).innerHTML = `<a href='http://arena.siesgst.ac.in/contest/${contest.code}'>${contest.name}</a>`;
                let output = ''
                contest.contestAdmin.forEach(admin => {
                    output += `${admin.name}<br>`
                });
                row.insertCell(1).innerHTML = output;
                let startTime = new Date(contest.startsAt);
                let endTime = new Date(contest.endsAt);
                row.insertCell(2).innerHTML = startTime.toString();
                row.insertCell(3).innerHTML = Math.floor(endTime - startTime) / (1000 * 3600) + ' hours ';
            });
            others.forEach(contest => {
                var row = otherTable.insertRow(0);
                row.insertCell(0).innerHTML = `<a href='http://arena.siesgst.ac.in/contest/${contest.code}'>${contest.name}</a>`;
                let output = ''
                contest.contestAdmin.forEach(admin => {
                    output += `${admin.name}<br>`
                });
                row.insertCell(1).innerHTML = output;
                let startTime = new Date(contest.startsAt);
                let endTime = new Date(contest.endsAt);
                row.insertCell(2).innerHTML = startTime.toString();
                row.insertCell(3).innerHTML = Math.floor(endTime - startTime) / (1000 * 3600) + ' hours ';
            });
        }).catch((error) => console.log(error));
}