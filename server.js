var nodemailer = require("nodemailer");

var smtpTransport = nodemailer.createTransport("SMTP",{
    service: "Gmail",
    auth: {
        user: "qqq@gmail.com",
        pass: "qqq"
    }
});

var express = require('express');
var app = express();

app.use(express.static(__dirname + "/public"));
app.use(express.bodyParser());
app.use(express.methodOverride());



app.post('/calc',function(req,res){
	mailOptions = {
    	from: "Грузоперевозки52.рф ✔ <gruzoperevozky52@gmail.com>",
    	to: "juhnowski@gmail.com, gruzoperevozky52@gmail.com"+", "+req.body.job_email_contacts,
    	subject: "Калькулятор ✔",
    	text: "Спасибо, что заинтересовались нашими услугами. Мы свяжемся с Вами в ближайшее время по указанной в заявке контактной информации.", // plaintext body
    	html: "<h1>Калькулятор</h1>"+
    	      "<strong>Email:</strong><p>"+req.body.calc_email+"</p>"+
    	      "<strong>Телефон:</strong><p>"+req.body.calc_phone+"</p><br>"+
    	      "<strong>Данные по перевозке</strong><br>"+
    	      "<strong>Расстояние,км.:</strong><p>" + req.body.calc_path + "</p><br>"+
    	      "<strong>Тип груза:</strong><p>" + req.body.calc_item_type + "</p><br>"+
    	      "<strong>Вес груза:</strong><p>" + req.body.calc_item_w + "</p><br>"+
    	      "<strong>Объем груза:</strong><p>" + req.body.calc_item_v + "</p><br>"+
    	      "<strong>Температурный:</strong><p>" + req.body.calc_item_t + "</p><br>"+
    	      "<strong>Способ погрузки:</strong><p>" + req.body.calc_item_s + "</p><br>"+
    	      "<strong>Тип машины:</strong><p>" + req.body.calc_car + "</p><br>"+
    	      "<strong>Желаемая стоимость:</strong><p>" + req.body.calc_cost + "</p><br>"+
    	      "<strong>Примечание:</strong><p>" + req.body.calc_description + "</p><br>"+
    	      "<h6>Спасибо, что заинтересовались нашими услугами. Мы свяжемся с Вами в " +
    	      "ближайшее время по указанной в заявке контактной информации."+
    	      "</h6><br>ООО Группа Компаний ГазРос</br><br><br>"
	}

	smtpTransport.sendMail(mailOptions, function(error, response){
    	if(error){
        	console.log(error);
    	}else{
        	console.log("Запрос на уточнение стоимости заказа принят."); //response.message
    	}

//    	smtpTransport.close(); // shut down the connection pool, no more messages
	});
	res.send('Запрос на уточнение стоимости заказа принят.');
});

app.post('/zakaz',function(req,res){
	mailOptions = {
    	from: "Грузоперевозки52.рф ✔ <gruzoperevozky52@gmail.com>",
    	to: "juhnowski@gmail.com, gruzoperevozky52@gmail.com"+", "+req.body.zakaz_email,
    	subject: "Заказ ✔",
    	text: "Спасибо, что заинтересовались нашими услугами. Мы свяжемся с Вами в ближайшее время по указанной в заявке контактной информации.", // plaintext body
    	html: "<h4>Заявка на грузоперевозку</h4>"+
    	      "<h5>Клиент:</h5><h6>" + req.body.client + "</h6>"+
    	      "<h5>Представитель клиента:</h5><h6>" + req.body.client_name + "</h6>"+
    	      "<h5>1.Маршрут следования</h5><h6>"+req.body.path+"</h6>" +
    	      "<h5>2.Условия перевозки</h5>" +
    	      "<h5>2.1 Адрес погрузки:</h5><h6>" + req.body.from_address + "</h6>" +
    	      "<h5>2.1.1 Дата и время:</h5><h6>" + req.body.from_date_time + "</h6>" +
    	      "<h5>2.1.2 Имя контактного лица:</h5><h6>" + req.body.from_name + "</h6>" +
    	      "<h5>2.1.3 Тел. контактного лица:</h5><h6>" + req.body.from_phone + "</h6>" +
    	      "<h5>2.2 Адрес доставки:</h5><h6>" + req.body.to_address + "</h6>" +
    	      "<h5>2.2.1 Дата и время:</h5><h6>" + req.body.to_date_time + "</h6>" +
    	      "<h5>2.2.2 Имя контактного лица:</h5><h6>" + req.body.to_name + "</h6>" +
    	      "<h5>2.2.3 Тел. контактного лица:</h5><h6>" + req.body.to_phone + "</h6>" +
    	      "<h5>2.3 Наименование груза:</h5><h6>" + req.body.item_name + "</h6>" +
    	      "<h5>2.3.1 Вес груза,кг.:</h5><h6>" + req.body.item_w + "</h6>" +
    	      "<h5>2.3.2 Объем груза:</h5><h6>" + req.body.item_v + "</h6>" +
    	      "<h5>2.3.3 Температурный режим:</h5><h6>" + req.body.item_t + "</h6>" +
    	      "<h5>2.3.4 Способ погрузки:</h5><h6>" + req.body.item_s + "</h6>" +
    	      "<h5>2.4 Тип машины:</h5><h6>" + req.body.car + "</h6>" +
    	      "<h5>2.5 Стоимость, руб.:</h5><h6>" + req.body.cost + "</h6>" +
    	      "<h5>2.6 Примечание:</h5><h6>" + req.body.description + "</h6>" +
    	      "<br>Спасибо, что решили воспользоваться нашими услугами. Мы свяжемся с Вами в " +
    	      "ближайшее время по указанной в заявке контактной информации."+
    	      "<br><b>ООО Группа Компаний ГазРос</b></br>"
	}

	smtpTransport.sendMail(mailOptions, function(error, response){
    	if(error){
        	console.log(error);
    	}else{
        	console.log("Заказ принят. Бланк заказа был выслан по электронной почте на указанный Вами адрес."); //response.message
    	}

//    	smtpTransport.close(); // shut down the connection pool, no more messages
	});
	res.send('Заказ принят. Бланк заказа был выслан по электронной почте на указанный Вами адрес.');
});

app.use(function(err,req,res,next){
	console.error(err.stack);
	res.send(500,'У нас что-то сломалось. Ваша заявка важна для нас. Пожалуйста позвоните по телефону +7-908-154-20-43');
});

var server = app.listen(4003, function(){
	console.log("GazRos_Rabota: Listening on port %d", server.address().port);
});
