/* 
 * 打印
 */

//设置页大小
var setPageContent = function (LODOP, intOrient, print_html) {
    var prt_table = $('#isTablePrint').val();
    var print_Top = "" + $('#print_Top').val();
    var print_Left = "" + $('#print_Left').val();
    var print_Right = "" + $('#print_Right').val();

    var print_Width = "" + $('#print_Width').val();
    var print_Height = "" + $('#print_Height').val();

    if (prt_table == "") prt_table = 1;

    if (print_Top == "") print_Top = '15';
    if (print_Left == "") print_Left = '10';
    if (print_Right == "") print_Right = '10';

    print_Top += 'mm';
    print_Left += 'mm';
    print_Right += 'mm';

    if (intOrient == 1) {
        //纵向打印
        LODOP.SET_PRINT_PAGESIZE(intOrient, '210mm', '297mm', '');
        if (1 == prt_table) {
            LODOP.ADD_PRINT_TABLE(print_Top, print_Left, 'RightMargin:' + print_Right, '270mm', print_html);
        } else {
            LODOP.ADD_PRINT_HTM(print_Top, print_Left, 'RightMargin:' + print_Right, print_html);
        }
    } else if (intOrient == 2) {
        //横向打印
        LODOP.SET_PRINT_PAGESIZE(intOrient, '210mm', '297mm', '');
        if (1 == prt_table) {
            LODOP.ADD_PRINT_TABLE(print_Top, print_Left, 'RightMargin:' + print_Right, '100%', print_html);
        } else {
            LODOP.ADD_PRINT_HTM(print_Top, print_Left, 'RightMargin:' + print_Right, '100%', print_html);
        }
    } else {
        LODOP.SET_PRINT_PAGESIZE(intOrient, '210mm', '5mm', '');
        if (1 == prt_table) {
            LODOP.ADD_PRINT_TABLE(print_Top, print_Left, 'RightMargin:' + print_Right, 'BottomMargin:1mm', print_html);
        } else {
            LODOP.ADD_PRINT_HTM(print_Top, print_Left, 'RightMargin:' + print_Right, 'BottomMargin:1mm', print_html);
        }
    }
}

var setNewPage = function (LODOP) {
    LODOP.NEWPAGE();
}

$(function () {
    $('#print_btn').on('click', function (event) {
        var act = $(this).attr("act");
        if (act != undefined) $('#print_Orient').val(act);
        build_print();
    });
});

//打印
var build_print = function () {
    LODOP = getLodop(document.getElementById('LODOP'), document.getElementById('LODOP_EM'));

    var prt_title = $('#print_title').text();
    var intOrient = 1;
    LODOP.PRINT_INIT(prt_title);
    if ($('#print_Orient').val() != '' && $('#print_Orient').val() != undefined) {
        intOrient = $('#print_Orient').val();
    }
    $(".print_content").each(function (i) {
        setPageContent(LODOP, intOrient, $(this).html());
        LODOP.SET_PRINT_STYLEA(0, "Vorient", 3);
        LODOP.SET_PRINT_STYLEA(0, "ItemType", 0);
        LODOP.SET_PRINT_STYLEA(0, "LinkedItem", 1);
        LODOP.SET_PRINT_STYLEA(0, "TableHeightScope", 1);
        LODOP.NEWPAGEA();
    });

    LODOP.ADD_PRINT_TEXT('1mm', 0, 'RightMargin:1mm', '20mm', prt_title);
    LODOP.SET_PRINT_STYLEA(0, "Bold", 1);
    LODOP.SET_PRINT_STYLEA(0, "Alignment", 2);
    LODOP.SET_PRINT_STYLEA(0, "FontSize", 20);
    LODOP.SET_PRINT_STYLEA(0, "ItemType", 1);
    LODOP.PREVIEW();
};

