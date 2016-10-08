if (module.hot) {
    module.hot.accept();
}

import '../../../client-src/js/pages/base.js'

let TypeModel = function(types) {
    var arrTypes = $.map(types, function(value, index) {
        return [value];
    });
    
    let self = this;
    self.types = ko.observableArray(arrTypes);
    self.isNext = ko.observable(isnext)
 
    self.addType = function() {
        let strTitle = $('#newGoodName').val()
        if(strTitle != ""){
            let intCate = $('#newGoodType option:selected').val()
            $.ajax({
                method: "POST",
                url: "/product-types",
                data: { name: strTitle, category: intCate }
            })
            .done(function(respones) {
                self.types.unshift({
                    id: respones.id,
                    name: respones.name,
                    category: respones.category
                });
                alert('商品分类添加成功！')
            })
            .fail(function(respones){
                
            })
        }
        $('#newGoodName').val("")
    };
 
    self.remove = function(type) {
        $.ajax({
            method: "DELETE",
            url: "/product-types/" + type.id
        })
        .done(function(respones) {
            self.types.remove(type);
        })
        .fail(function(respones){
                
        })        
    };
    self.edit = (type) => {
        $('#editTitle').foundation('open');
        let typeEdit = ko.utils.arrayFirst(self.types(), function(item) {
            return type.id === item.id;
        });
        $('#editText').val(typeEdit.name)
        $('#editId').val(typeEdit.id)
        $('#editCata').val(typeEdit.category)
    };

    self.save = function() {
        let saveId = $('#editId').val()
        let saveName = $('#editText').val()
        let saveCata = $('#editCata').val()
        $.ajax({
            method: "PUT",
            url: "/product-types/" + saveId,
            data: { name: saveName, category: saveCata }
        })
        .done(function(respones) {
            let typeEdit = ko.utils.arrayFirst(self.types(), function(item) {
                return parseInt(respones.id) === item.id;
            });
            let text = {
                id:respones.id,
                name:respones.name,
                category:respones.category
            }
            self.types.splice(self.types.indexOf(typeEdit), 1, text)
            $('#editTitle').foundation('close');
        })
        .fail(function(respones){
                
        })
        //alert("Could now transmit to server: " + ko.utils.stringifyJson(self.gifts));
        // To actually transmit to server as a regular form post, write this: ko.utils.postJson($("form")[0], self.gifts);
    };

    self.more = function() {
        pageno = pageno + 1
        $.ajax({
            method: "GET",
            url: "/product-types?number=" + pageno,
            dataType: "json"
        })
        .done(function(respones) {
            let types = $.map(respones.productTypes, function(value, index) {
                return [value];
            });
            for(let type of types){
                self.types.push(type)
            }
            self.isNext(respones.moreInfo)
        })
    }
};

let viewModel = new TypeModel(data)
ko.applyBindings(viewModel)
