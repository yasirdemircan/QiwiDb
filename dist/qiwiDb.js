const fs = require('fs');

var qiwiDb = {
    version : "0.0.1",
    workspace: null,
    setup: function () {
        
        try {
            fs.mkdirSync("./qiwiDb", {}, function (cb) {
                if (cb === null) {
                    console.log("dbFolder created successfully!")
                } else {
                    console.log("Setup is done already.");
                }

            })
        } catch (e) {
           console.log("Setup is done already or an error occured.")
        }
    },
    select: function (docname) {
        this.workspace = docname;
    },
    createDoc: function (docname) {
        var initObj = {
            init: []
        };
       
        fs.writeFileSync("./qiwiDb/" + docname + ".json", JSON.stringify(initObj));
    },
    read: function () {
        let rawdata = fs.readFileSync("./qiwiDb/" + this.workspace + ".json");
        var responseJSON = JSON.parse(rawdata);
        return responseJSON
    },
    list: function () {
        let listJSON = this.read(this.workspace).init;
        listJSON.forEach(function (el) {
            Object.keys(el).forEach(function (name) {
                console.log(name + ": " + JSON.stringify(el[name]))
            })
        })

    },
    updateDoc: function (data) {
        let rawdata = fs.readFileSync("./qiwiDb/" + this.workspace + ".json");
        var data2update = JSON.parse(rawdata);
        data2update.init.push(data);
        fs.writeFileSync("./qiwiDb/" + this.workspace + ".json", JSON.stringify(data2update));
    },
    addRec: function (recname) {

        let update = {

        }
        update[recname] = {
            name: recname
        };

        this.updateDoc(update);
    },
    updateRec: function (recname, field, data) {
        let updateRecData = JSON.parse(data);
        let rawdata = fs.readFileSync("./qiwiDb/" + this.workspace + ".json");
        var data2update = JSON.parse(rawdata);
        data2update.init.forEach(function (el) {
            if (el[recname]) {
                el[recname][field] = updateRecData;
            }
        })
    
        fs.writeFileSync("./qiwiDb/" + this.workspace + ".json", JSON.stringify(data2update));
    },
    getRecordByName: function (recname) {

        let rawdata = fs.readFileSync("./qiwiDb/" + this.workspace + ".json");
        let data = JSON.parse(rawdata);
        let returndata;
        data.init.forEach(function (el) {
            if (el[recname]) {
                returndata = el[recname]

            }
        })
        return returndata
    },
    getIndexByName: function (recname) {

        let rawdata = fs.readFileSync("./qiwiDb/" + this.workspace + ".json");
        let data = JSON.parse(rawdata);
        let returndata;
        data.init.forEach(function (el) {
            if (el[recname]) {
                returndata = data.init.indexOf(el);

            }
        })
        return returndata
    },
    deleteRecord: function (recname) {
        let rawdata = fs.readFileSync("./qiwiDb/" + this.workspace + ".json");
        let initialData = JSON.parse(rawdata);

        function deletedName(value) {
            return value[recname] == undefined;
        }
        let filteredArr = initialData.init.filter(deletedName);
        initialData.init = filteredArr;
        fs.writeFileSync("./qiwiDb/" + this.workspace + ".json", JSON.stringify(initialData));
    },
    updateRecNested: function (recname, field, index, value, intbool) {

        let rawdata = fs.readFileSync("./qiwiDb/" + this.workspace + ".json");
        var data2update = JSON.parse(rawdata);
        data2update.init.forEach(function (el) {
            if (el[recname]) {
                if (intbool) {
                    el[recname][field][index] = parseInt(value);
                } else {
                    el[recname][field][index] = value;
                }

            }
        })
     
        fs.writeFileSync("./qiwiDb/" + this.workspace + ".json", JSON.stringify(data2update));
    },
    getWhere: function (key, optype, value) {
        var returnArr = [];
        let listJSON = this.read(this.workspace).init;



        listJSON.forEach(function (el) {
            Object.keys(el).forEach(function (name) {
                if (optype == "=") {
                    if (el[name][key] == value) {
                        console.log("found")
                        returnArr.push(el[name])
                    }
                } else if (optype == ">") {
                    if (isNaN(value)) {
                        console.log("Greater and Lesser operators are numbers only!")
                    } else {
                        if (el[name][key] > value) {
                            returnArr.push(el[name])
                        }
                    }
                } else if (optype == "<") {
                    if (isNaN(value)) {
                        console.log("Greater and Lesser operators are numbers only!")
                    } else {
                        if (el[name][key] < value) {
                            returnArr.push(el[name])
                        }
                    }
                } else if (optype == ">=") {
                    if (isNaN(value)) {
                        console.log("Greater and Lesser operators are numbers only!")
                    } else {
                        if (el[name][key] >= value) {
                            returnArr.push(el[name])
                        }
                    }
                } else if (optype == "<=") {
                    if (isNaN(value)) {
                        console.log("Greater and Lesser operators are numbers only!")
                    } else {
                        if (el[name][key] <= value) {
                            returnArr.push(el[name])
                        }
                    }
                } else{
                    console.log("unsupported operator")
                }

            })

        })

        return returnArr


    },
    getWhereNested: function (key1, key2, optype, value) {
        var returnArr = [];
        let listJSON = this.read(this.workspace).init;



        listJSON.forEach(function (el) {
            Object.keys(el).forEach(function (name) {
                   if(!(el[name][key1] === undefined)){
                if (optype == "=") {
                 
                 if (el[name][key1][key2] == value) {
                        console.log(name,key1,key2,true);
                        returnArr.push(el[name])
                    }
                    
                   
                } else if (optype == ">") {
                    console.log(typeof(value),value)
                    if (isNaN(value)) {
                        console.log("Greater and Lesser operators are numbers only!")
                    } else {
                        if (el[name][key1][key2] > value) {
                            returnArr.push(el[name])
                        }
                    }
                } else if (optype == "<") {
                    if (isNaN(value)) {
                        console.log("Greater and Lesser operators are numbers only!")
                    } else {
                        if (el[name][key1][key2] < value) {
                            returnArr.push(el[name])
                        }
                    }
                } else if (optype == ">=") {
                    if (isNaN(value)) {
                        console.log("Greater and Lesser operators are numbers only!")
                    } else {
                        if (el[name][key1][key2] >= value) {
                            returnArr.push(el[name])
                        }
                    }
                } else if (optype == "<=") {
                    if (isNaN(value)) {
                        console.log("Greater and Lesser operators are numbers only!")
                    } else {
                        if (el[name][key1][key2] <= value) {
                            returnArr.push(el[name])
                        }
                    }
                }

                }
            })

        })

        return returnArr


    }
}


module.exports = {
   qiwiDb: qiwiDb
}

