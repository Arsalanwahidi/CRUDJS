var newId = 4
var newTest = {'name': null, 'id': newId, 'result': null}

$('#add-test').on('click', function(){
    $('.form-wrapper').removeClass('hidden')
});

$('#test-result').on('keyup', function(){
    newTest.result = $(this).val()
});

$('#test-name').on('change', function(){
    newTest.name = $(this).val()
    newId = newId +  1
    newTest.id = newId
});

$('#creat-test').on('click', function(){
    if(newTest.name == null){
        alert('Have to select a Name')
    }else if( newTest.result == null){
        alert('Have to enter a number')
    }
    else{
        addRow(newTest)
        $('#test-name').val('')
        newTest.name = null
        $('#test-result').val('')
        newTest.result = null
    }

});

var tests = [
    {'name': 'Distillation 50%', 'id': '1', 'result': '43'},
    {'name': 'Flash Point', 'id': '2', 'result': '61'},
    {'name': 'water by Karl Fischer', 'id': '3', 'result': '24'},
]

for (var i in tests){
    addRow(tests[i])
}

function addRow(obj){
    var row = `<tr scope='row' class='test-row-${obj.id}'>
                    <td id='name-${obj.id}' data-testid='${obj.id}'>${obj.name}</td>
                    <td id='result-${obj.id}' data-testid='${obj.id}'>${obj.result}</td>
                    <td>
                        <button class='btn btn-sm btn-danger' data-testid='${obj.id}' id='delete-${obj.id}'>Delete</button>
                        <button class='btn btn-sm btn-info' data-testid='${obj.id}' id='save-${obj.id}' disabled>Save</button>

                        <button class='btn btn-sm btn-danger hidden' data-testid='${obj.id}' id='cancel-${obj.id}'>Cancel</button>
                        <button class='btn btn-sm btn-primary hidden' data-testid='${obj.id}' id='confirm-${obj.id}'>Confirm</button>
                    </td>
                `
    $('#test-table').append(row)

    $(`#delete-${obj.id}`).on('click', DeleteTest)
    $(`#cancel-${obj.id}`).on('click', cancelDeletion)
    $(`#confirm-${obj.id}`).on('click', confirmDeletion)

    $(`#result-${obj.id}`).on('click', editResult)
    $(`#save-${obj.id}`).on('click', saveUpdate)
}

function editResult(){
    var testid = $(this).data('testid')

    var value = $(this).html()
    $(this).off('click')

    $(this).html(`<input type='text' class='result form-control' value='${value}' data-testid='${testid}'/>`)
    $('.result').on('keyup', function(){
        var saveBtn = $(`#save-${testid}`)
        saveBtn.prop('disabled', false)
    })
}

// function reversedOff() {
//     var testid = $(this).data('testid')
//     $(`#result-${testid}`).on('click', editResult)
// }

function saveUpdate() {
    var testid = $(this).data('testid')

    var save_value = $('.result').val()
    $(`#result-${testid}`).html(`<td id='result-${testid}' data-testid='${testid}'>${save_value}</td>`)
    // $(`.test-row-${testid}`).css('opacity', '0.9')
    $(`#save-${testid}`).prop('disabled', true)
    // $(`#result-${obj.id}`).on('click', reversedOff)
    // $(`#result-${testid}`).on('click')
}

function DeleteTest() {
    var testid = $(this).data('testid')

    var deleteBtn = $(`#delete-${testid}`)
    var saveBtn = $(`#save-${testid}`)
    var cancelBtn = $(`#cancel-${testid}`)
    var confirmBtn = $(`#confirm-${testid}`)

    deleteBtn.addClass('hidden')
    saveBtn.addClass('hidden')

    cancelBtn.removeClass('hidden')
    confirmBtn.removeClass('hidden')
    
}

function cancelDeletion() {
    var testid = $(this).data('testid')

    var deleteBtn = $(`#delete-${testid}`)
    var saveBtn = $(`#save-${testid}`)
    var cancelBtn = $(`#cancel-${testid}`)
    var confirmBtn = $(`#confirm-${testid}`)

    deleteBtn.removeClass('hidden')
    saveBtn.removeClass('hidden')

    cancelBtn.addClass('hidden')
    confirmBtn.addClass('hidden')
    
}

function confirmDeletion(){
    var testid = $(this).data('testid')

    var row = $(`.test-row-${testid}`)
    row.remove()
}



























