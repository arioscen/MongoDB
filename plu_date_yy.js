var count = 0;
var bulk = db.plu_date_yy.initializeUnorderedBulkOp();
var total = db.plu_date.count()
var number = 0
db.plu_date.find().forEach(function(e){
	number += 1;
	var plu_no = e.PLU_NO;
	var date = e.date;
	var sum = e.sum;
	var year = e.date.split("-")[0];
	count += 1;
	if (number == total){
		bulk.insert({"plu_no":plu_no, "date":date, "sum":sum,"year":year});
		bulk.execute();
	}else if (count <= 10000){
		bulk.insert({"plu_no":plu_no, "date":date, "sum":sum,"year":year});
	}else{
		bulk.execute();
		bulk = db.plu_date_yy.initializeUnorderedBulkOp();
		bulk.insert({"plu_no":plu_no, "date":date, "sum":sum,"year":year});
		count = 1;
	};
})
