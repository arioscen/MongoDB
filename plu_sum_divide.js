var bulk = db.plu_sum_divide.initializeUnorderedBulkOp();
var total = db.plu_date_yy.count()
var number = 0;
var count = 0;
db.plu_date_yy.find().forEach(function(e){
    number += 1;
    var plu_no = e.plu_no;
    var date = e.date;
    var year = e.year;
    var n = e.sum;
    var m = 0;
    var rate;
    db.plu_year.find().forEach(function(f){
        if (plu_no == f.plu_no && year == f.year){
            m = f.sum;
            return false;
        }
    })
    if (m != 0){
        rate = n/m;
        rate = rate.toFixed(5)
        bulk.insert({"plu_no":plu_no, "date":date, "rate":rate})
        count += 1;
        if(number == total){
            bulk.execute();
        }else if(count >= 10000){
            bulk.execute();
            bulk = db.plu_sum_divide.initializeUnorderedBulkOp();
            count = 0;
        }
    }
})