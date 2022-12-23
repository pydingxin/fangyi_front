// -----------------------------------------------------
// api接口

function make_formdata(o){
    var fd = new FormData();
    for(var i in o){
        fd.append(i, o[i]);
    }
    return fd;
}

function post_api(apiname, jdata, process_json){
    // 测试1
    let testing=false;
    let url= (testing? `http://localhost/api/`: `http://10.178.79.130/api/`) +apiname;


    //mock
    // let url=`https://mock.presstime.cn/mock/6386cade9fbe4a005b2f075a/example/api/`+apiname;
    
    fetch(url,{
            method:"POST",
            // headers: testing?{Authorization:"Basic ZGluZ3hpbjpkYXBpbmd5aTg5MA=="}:{},
            body:make_formdata(jdata),
            mode: 'cors',
        }
        ).then(response => response.json())
        .then(data => process_json(data));  
}

function is_post_api_input_valid(input_name, input_value){
    const s= input_value;
    console.log(`校验 ${input_name} ${input_value}`);
    switch(input_name){
        case 'card_no':
            return s.length==18? true: false;
        case 'dt':
            return (s.length==19 && (s[4]+s[7]+s[10]+s[13]+s[16])=='-- ::')? true: false;
    }
}

// o={
//   'card_no':"371326199003120012",
//   'ldt':"2022-11-15 00:00:00",
//   'rdt':"2022-11-21 00:00:00"
// }
// p={
//   'name':"鑫盛酒家",
//   'ldt':"2022-11-15 00:00:00",
//   'rdt':"2022-11-21 00:00:00"
// }

// post_api('sample_info',o, console.log)
// post_api('resident_info',o, console.log)
// post_api('same_tube',o, console.log)
// post_api('visitor_record',o, console.log)
// post_api('place_visitor_record', p,console.log)


// -----------------------------------------------------
// json保存为excel文件

function JSONToExcelConvertor(JSONData, FileName, numTxtCols=["CardNo",'CardNumber'],title=false, filter=false){
    // JSONData必须是个数组
    // numTxtCols 规定了哪些数字列其实是文本，在前面加上'，比如身份证号，防止显示不出来
    if (!JSONData || JSONData.length==0){
        console.log("json数据异常:",JSONData);
        return;
    }

    //转化json为object
    var arrData = typeof JSONData != 'object' ? JSON.parse(JSONData) : JSONData;
    var excel = "<table>";
    //设置表头  
    var row = "<tr>";
    if (title) {
        //使用标题项
        for (var i in title) {
            row += "<th align='center'>" + title[i] + '</th>';
        }
    }
    else {
        //不使用标题项
        for (var i in arrData[0]) {
            row += "<th align='center'>" + i + '</th>';
        }
    }
    excel += row + "</tr>";
    //设置数据  
    for (var i = 0; i < arrData.length; i++) {
        var row = "<tr>";
        for (var index in arrData[i]) {
            //判断是否有过滤行
            if (filter) {
                if (filter.indexOf(index) == -1) {
                    var value = arrData[i][index] == null ? "" : arrData[i][index];
                    row += '<td>' + value + '</td>';
                }
            }
            else {
                let numIsTxt = (numTxtCols.indexOf(index) >=0);
                var value = arrData[i][index] == null ? "" : arrData[i][index];
                row += "<td align='center'>" + (numIsTxt?"'":'') + value + "</td>";
            }
        }
        excel += row + "</tr>";
    }
    excel += "</table>";

    //下面是构建文件的代码
    var excelFile = "<html xmlns:o='urn:schemas-microsoft-com:office:office' xmlns:x='urn:schemas-microsoft-com:office:excel' xmlns='http://www.w3.org/TR/REC-html40'>";
    excelFile += '<meta http-equiv="content-type" content="application/vnd.ms-excel; charset=UTF-8">';
    excelFile += '<meta http-equiv="content-type" content="application/vnd.ms-excel';
    excelFile += '; charset=UTF-8">';
    excelFile += "<head>";
    excelFile += "<!--[if gte mso 9]>";
    excelFile += "<xml>";
    excelFile += "<x:ExcelWorkbook>";
    excelFile += "<x:ExcelWorksheets>";
    excelFile += "<x:ExcelWorksheet>";
    excelFile += "<x:Name>";
    excelFile += "查询结果";
    excelFile += "</x:Name>";
    excelFile += "<x:WorksheetOptions>";
    excelFile += "<x:DisplayGridlines/>";
    excelFile += "</x:WorksheetOptions>";
    excelFile += "</x:ExcelWorksheet>";
    excelFile += "</x:ExcelWorksheets>";
    excelFile += "</x:ExcelWorkbook>";
    excelFile += "</xml>";
    excelFile += "<![endif]-->";
    excelFile += "</head>";
    excelFile += "<body>";
    excelFile += excel;
    excelFile += "</body>";
    excelFile += "</html>";
    var uri = 'data:application/vnd.ms-excel;charset=utf-8,' + encodeURIComponent(excelFile);
    //创建一个a标签
    var link = document.createElement("a");
    //给a标签一个路径
    link.href = uri;
    //为了防止这个a标签显示在视图上，需要先把他隐藏
    link.style = "visibility:hidden";
    //为文件添加后缀名，告诉他这是一个ex文件
    link.download = FileName + ".xls";
    //把a标签添加到body上
    document.body.appendChild(link);
    //触发a标签，等于访问这个文件地址，实现文件下载
    link.click();
    //文件下载完毕后删除a标签，以免对DOM产生冗余
    document.body.removeChild(link);
} 


export default {
    post_api: post_api,
    JSONToExcelConvertor:JSONToExcelConvertor,
    is_post_api_input_valid:is_post_api_input_valid,
}