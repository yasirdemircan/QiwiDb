![alt text](https://github.com/yasirdemircan/QiwiDb/raw/master/logo/qiwi.png)
# QiwiDb
 Simple NodeJS database that focuses on easy use and hobby projects
## Usage
### Global Object Name : qiwiDb

### workspace : string
Indicates the current workspace (document) can be modified by the select function.
Default value: null

### setup() : function
Only needed for first use prepares the folder structure.
returns (void)

### select(Document Name : string) : function
Selects a document to work on. Must be used before any function after creating a document.
returns (void)

### createDoc(Document Name : string) : function
Creates an empty document.
returns (void)

### read() : function *Debug*
Returns the whole database in JSON format.
returns (JSON)

### list() : function *Debug*
Logs the whole database to the console.
returns (void)

### updateDoc(Data Object : Object) : function
Adds the given object to the selected document.
returns (void)

### addRec(Record Name : string) : function
Adds a record to the selected document with only a name property same as the argument given.
returns (void)

### updateRec(Record Name : string , Record Field : string , Value : variable) : function
Updates the record field with the given value.
returns (void)

### updateRecNested(Record Name : string , Record Field : string , Nested Field : string/int , Value : variable , Is integer : boolean) : function
Updates a nested property in the record field.
returns (void)

### getRecordByName(Record Name : string) : function
Returns a record object by the given name.
returns (JSON)

### getIndexByName(Record Name : string) : function
Returns the index of the given record in the document.
returns (int)

### deleteRecord(Record Name : string) : function
Deletes a record in the selected document.
returns (void)

### getWhere(Record Field : string , Operation Type : string , Search Value : variable) : function
Operation Type Supported (["<",">","=",">=","<="] for int "=" for string)
Filters document and returns data according to the search value.
returns (Array)

### getWhereNested(Record Field : string , Nested Field : string, Operation Type : string , Search Value : variable) : function
Operation Type Supported (["<",">","=",">=","<="] for int "=" for string)
Filters nested fields of a record and returns data according to the search value.
returns (Array)

