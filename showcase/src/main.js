var qiwiDb = require('./qiwiDb').qiwiDb;

const customTitlebar = require('custom-electron-titlebar');
window.addEventListener('DOMContentLoaded', () => {
    new customTitlebar.Titlebar({
        backgroundColor: customTitlebar.Color.fromHex('#64798A')

    })
});


qiwiDb.setup();
qiwiDb.select("config");


try {
    var x = qiwiDb.getRecordByName("notfirsttime")["notfirsttime"]
    console.log(x);
} catch (e) {
    console.log(e.message);
    qiwiDb.createDoc("config");
    qiwiDb.addRec("notfirsttime");
    qiwiDb.createDoc("docnames");
    qiwiDb.updateRec("notfirsttime", "notfirsttime", true);
}

function getDbVer() {

    alert(qiwiDb.version)
}

function listPop(param) {
    if (param == 0) {
        let docnames = qiwiDb.read();
        let select = document.getElementById("docs");
        select.innerHTML = "";
        let opts = select.options;

        docnames.init.forEach(option =>
            opts.add(
                new Option(Object.keys(option)[0], Object.keys(option)[0], true)
            )

        );
    } else if (param == 1) {
        let docs = document.getElementById("docs");
        let recs = document.getElementById("recs");
        let defdoc = qiwiDb.select(docs.value);
        let doc2recs = qiwiDb.read(docs.value);
        recs.innerHTML = "";
        let opts = recs.options;

        doc2recs.init.forEach(option =>
            opts.add(
                new Option(Object.keys(option)[0], Object.keys(option)[0], true)
            )

        );

    }


}



window.onload = function () {
    qiwiDb.select("docnames");
    console.log(qiwiDb.read("docnames"))
    listPop(0);
    listPop(1);
}

function createDoc() {
    let dcname = document.getElementById("docname").value;
    qiwiDb.createDoc(dcname);
    qiwiDb.select("docnames");
    qiwiDb.addRec(dcname);
    listPop(0);
}

function createRec() {
    let rcname = document.getElementById("recname").value;
    let optdcname = document.getElementById("docs").value;
    qiwiDb.select(optdcname);
    qiwiDb.addRec(rcname);
    console.warn("Added empty record : " + rcname + " to " + optdcname);
    listPop(1);
}

function removeRec() {
    let delname = document.getElementById("delname").value;
    let optdcname = document.getElementById("docs").value;
    qiwiDb.select(optdcname);
    qiwiDb.deleteRecord(delname);
    console.warn("Deleted record successfully!");
    listPop(1);
}

function addProp() {
    let rec2add = document.getElementById("recs").value;
    let dc2mod = document.getElementById("docs").value;
    let prop = document.getElementById("prop").value;
    let propval = document.getElementById("propval").value;
    qiwiDb.select(dc2mod);
    console.log(rec2add, prop, propval);
    qiwiDb.updateRec(rec2add, prop, propval);
    console.warn("Property added successfully!");
}
/*{title:"Favourite Color", field:"col"},
	 	{title:"Date Of Birth", field:"dob", sorter:"date", hozAlign:"center"},*/

function tableAll() {
    let dcname = document.getElementById("docs").value;
    var temp_keynames = [];
    var keynames;
    var cols = [];
    qiwiDb.select(dcname);
    let dbdata = qiwiDb.read().init;
    let tabledata = []
    dbdata.forEach(function (el) {
        tabledata.push(qiwiDb.getRecordByName(Object.keys(el)))
    })
    tabledata.forEach(function (el) {
        Object.keys(el).forEach(function (el2) {
            temp_keynames.push(el2)
        })

    })
    keynames = [...new Set(temp_keynames)];
    keynames.forEach(function (col) {
        cols.push({
            title: col,
            field: col
        })
    })




    var table = new Tabulator("#table", {
        height: 250, // set height of table (in CSS or here), this enables the Virtual DOM and improves render speed dramatically (can be any valid css height value)
        data: tabledata, //assign data to table
        layout: "fitColumns", //fit columns to width of table (optional)
        columns: cols,
        rowClick: function (e, row) { //trigger an alert message when the row is clicked

        },
        pagination: "local",
        paginationSize: 8
    });

}

function queryTable() {
    let dcname = document.getElementById("docs").value;
    let qkey = document.getElementById("qkey").value;
    let qval = document.getElementById("qval").value;
    let optype = document.getElementById("optype").value;
    var dbdata;
    qiwiDb.select(dcname);
    if (qkey.includes(".")) {
        let qkeysplit = qkey.split(".");
        let qkey1 = qkeysplit[0];
        let qkey2 = qkeysplit[1];
        if (parseInt(qval)) {
            dbdata = qiwiDb.getWhereNested(qkey1, qkey2, optype, parseInt(qval));
        } else {
            dbdata = qiwiDb.getWhereNested(qkey1, qkey2, optype, qval);
        }

    } else {
        if (parseInt(qval)) {
            dbdata = qiwiDb.getWhere(qkey, optype, parseInt(qval));
        } else {
            dbdata = qiwiDb.getWhere(qkey, optype, qval);
        }

    }


    //let dbdata = qiwiDb.read().init;
    /*
    dbdata.forEach(function(el){
        tabledata.push(qiwiDb.getRecordByName(Object.keys(el)[0]))
    })*/
    let tabledata = []
    dbdata.forEach(function (el) {
        tabledata.push(el);
    })



    console.log(tabledata);

    var table = new Tabulator("#table", {
        height: 205, // set height of table (in CSS or here), this enables the Virtual DOM and improves render speed dramatically (can be any valid css height value)
        data: tabledata, //assign data to table
        layout: "fitColumns", //fit columns to width of table (optional)
        columns: [ //Define Table Columns
            {
                title: "Name",
                field: "name",
                width: 150
            },
            {
                title: qkey.toUpperCase(),
                field: qkey,
                hozAlign: "left"
            }
 	]
    });

}
