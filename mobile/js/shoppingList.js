var shoppingListId = 0;
$(document).ready(function() {

    /**
     * Создание списка
     */
    $("#createShoppingList").on('click', function(){
        var form = $("#shoppingList-form");
        $.post(form.attr('action'), form.serializeArray(), function(e){
            var form = new formAjax();
            form.init(e.error);
            if (form.getIsValidate()) {
                window.location = '';
            } else {
                alert(form.getError());
            }
        }, 'JSON');
        return false;
    });

    $("#deleteShoppingList").on('click', function(){
        $.post('/shoppingList/delete?id=' + shoppingListId, { YII_CSRF_TOKEN: $("input[name='YII_CSRF_TOKEN']").val() }, function() {
            $("div[data-id='" + shoppingListId + "']").remove();
        });
        return false;
    });

    /**
     * Выбор списка выделение
     */
    $(document).on('click', "#shopping_lists.editing .shopping_lists_item", function(e) {
        $("#shopping_lists .shopping_lists_item").each(function() {
            $(this).removeClass("selected");
        });
        shoppingListId = $(this).attr('data-id');
        $(this).toggleClass("selected");
    });

    $('#footer .add_button').on('click',function() {
        $('#modal_window').modal({onOpen: function(){
            alert("lk");
        }});
    });
    $("#modal_window .modal_window_ok").bind('touchstart', function() {
        var input_val = $("#modal_window .input_text_wrap input").val();
        if(input_val != "") {
            $("#shoppingList-create-form > input[name='ShoppingListTpl[name]']").val(input_val);
            var form = $("#shoppingList-create-form");
            $.post(form.attr('action'), form.serializeArray(), function(e) {
                var form = new formAjax();
                form.init(e);
                if (form.getIsValidate()) {
                    window.location = '';
                } else {
                    alert(form.getError());
                }
            }, 'json');
            $(this).prev().trigger("click");
        }
    });
    $('#shopping_lists .received').on('touchstart',function() {
        $('#modal_window_receiv').modal();
    });
    $('#modal_window_receiv .simplemodal-close').bind('touchstart', function() {
        $("#shopping_lists .received").remove();
    });
    $('#modal_window_receiv .modal_window_ok').bind('touchstart', function() {
        $("#shopping_lists .received").removeClass("received").find("span").text("10");
        $(this).prev().trigger("click");
    });

    $(document).on('click', '#footer #footer_action_list .copy', function() {
        var edit_data = $("#shopping_lists .selected p");
        if (edit_data.text()=="") {
            alert('Выберите список для копирования');
        } else {
            $('#modal_window_copy').modal();
        }
    });
    $("#modal_window_copy .modal_window_ok").bind('click', function() {
        var input_val = $("#modal_window_copy .input_text_wrap input").val();
        if(input_val != "") {
            $("#shoppingList-copy-form > input[name='ShoppingListTpl[name]']").val(input_val);
            var form = $("#shoppingList-copy-form");
            var obj = $("#shopping_lists .selected");
            $.post(form.attr('action') + '/' + obj.attr('data-id'), form.serializeArray(), function(e) {
                var form = new formAjax();
                form.init(e);
                if (form.getIsValidate()) {
                    window.location = '';
                } else {
                    alert(form.getError());
                }
            }, 'json');
        }
    });
    $(document).on('click', '#footer #footer_action_list .edit', function() {
        var edit_data = $("#shopping_lists .selected p").text();
        if (edit_data=="") {
            alert('Выберите список для редактирования');
        } else {
            $('#modal_window_edit .input_text_wrap input[name="ShoppingListTpl[name]"]').val(edit_data);
            $('#modal_window_edit').modal();
        }
    });

    /**
     * Редактирование списка, кнопка ок
     */
    $('#modal_window_edit .modal_window_ok').bind('click', function() {
        var input_val = $("#modal_window_edit .input_text_wrap input[name='ShoppingListTpl[name]']").val();
        var obj = $("#shopping_lists .selected");
        var form = $("#shoppingList-update");
        $("#shoppingList-update input[name='ShoppingListTpl[name]']").val(input_val);
        $.post(form.attr('action') + '?id=' + shoppingListId, form.serializeArray(), function(e) {
            var form = new formAjax();
            form.init(e);
            if (form.getIsValidate()) {
                $('p', obj).text(input_val);
                $('.simplemodal-close').click();
                $("#footer_select_button").click();
            } else {
                alert(form.getError());
            }
        }, 'JSON');
    });
    $("#footer_action_list .delete").bind('click',function() {
        var obj = $("#shopping_lists .selected");
        if (obj.attr('data-id')===undefined) {
            alert('Выберите список для удаления');
        } else {
            var form = $("#shoppingList-delete-form");
            $.post(form.attr('action') + '/' + obj.attr('data-id'), form.serializeArray(), function(e) {
                window.location = '';
            }, 'json');
        }
    });

});