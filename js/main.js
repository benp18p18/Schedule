$(function() {
    var db;
    
    function saveData(data) {
        db = data;
        afterload(db);
    }
    
    $.getJSON('https://1a2982e3-aa7f-450b-81a7-69d2386116ca-bluemix.cloudant.com/schedule/_all_docs?include_docs=true', function(data){
        saveData(data); 
    });
    
    
    
})

function afterload(db) {
    ko.components.register('line-details', {
        viewModel: function(params) {
            this.idValue = params.id + "_" + params.line + "_" + params.day
            this.idTarget = "#" + this.idValue
            //alert(params.value)
        },
        template:
        '<p><a class="btn btn-primary" data-toggle="collapse" data-bind="attr: { \'data-target\': idTarget,\
        \'aria-controls\':  idTarget}"\ aria-expanded="false" >Docs</a></p>\
        <div class=\"collapse multi-collapse\" data-bind=\"attr: { id: idValue }\">\
        <div class=\"card card-body line-info\">\
        <p>Planagram:  <a href = "https://en.wikipedia.org/wiki/Test" target = "_blank">https://en.wikipedia.org/wiki/Test</a></p>\
        </div>\
        </div>\
        '
    });
    
    ko.components.register('line-shifts', {
        viewModel: function (params){
            var self = this;
            self.id = params.id + "_" + params.line + "_" + params.day;
            self.name = params.name;
            var index = parseInt(params.num) + parseInt(params.shift);
            self.WO = db.rows[index].doc.WO;
            self.JDE = db.rows[index].doc.JDE;
            self.DUR = db.rows[index].doc.DUR;
            self.Description = db.rows[index].doc.Description;
        },
        template: 
        '\
        <h4 data-bind="text: name" ></h4>\
        <form class="form-inline line-info">\
        <label class="mr-sm-2 mt-2" for="inlineFormInput">WO #</label>\
        <input type="text" class="form-control mb-2 mr-sm-2 mb-sm-0 mt-2" id="inlineFormInput" data-bind="value: WO">\
        \
        <label class="mr-sm-2 mt-2" for="inlineFormInputGroup">JDE #</label>\
        <div class="input-group mb-2 mr-sm-2 mb-sm-0 mt-2">\
        <input type="text" class="form-control" id="inlineFormInputGroup" data-bind="attr: {placeholder: JDE}"}">\
        </div>\
        \
        <label class="mr-sm-2 mt-2" for="inlineFormInputGroup">Duracell #</label>\
        <div class="input-group mb-2 mr-sm-2 mb-sm-0 mt-2">\
        <input type="text" class="form-control" id="inlineFormInputGroup" data-bind="attr: {placeholder: DUR}">\
        </div>\
        \
        <label class="mr-sm-2 mt-2" for="inlineFormInputGroup">Description</label>\
        <div class="input-group mb-5 mr-sm-5 mb-sm-0 mt-2">\
        <input type="text" class="form-control" id="inlineFormInputGroup" data-bind="attr: {placeholder:  Description}">\
        </div>\
        </form>\
        <hr>\
        ',
    });
    
    function Lines(name, id, num) {
        this.name = name;
        this.id = id;
        this.num = num;
    }
    
    function Shifts(name, id, num) {
        this.name = name;
        this.id = id;
        this.shift = num;
    }
    
    function LinesModel() {
        this.lines = [
            new Lines('ATL 51', 'ATL51', '0'),
            // new Lines('ATL 52', 'ATL52'),
            // new Lines('ATL 53', 'ATL53'), 
            // new Lines('ATL 54', 'ATL54'), 
            // new Lines('ATL 55', 'ATL55'), 
            // new Lines('ATL 56', 'ATL56'),  
        ];
        this.shifts = [
            new Shifts('1st Shift', 'Shift1', '0'),
            new Shifts('2nd Shift', 'Shift2', '1'),
            new Shifts('3rd Shift', 'Shift3', '2'),
        ]
    }
    
    ko.applyBindings(new LinesModel());
};        