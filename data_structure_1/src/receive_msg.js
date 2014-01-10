function SMS(phone, type, value) {
    this.phone = phone
    this.type = type
    this.value = value
}

function notify_sms_received(json_message) {
    _.each(json_message.messages, function (num) {
        new SMS(num.phone,num.message.substr(0, 2).toUpperCase(),num.message.substr(2).trim()).start()
    })
}

SMS.prototype.start = function () {
    if (this.bm() == false) {
        this.jj();
    }
}

SMS.prototype.bm = function () {
    if (this.type == 'BM' && localStorage.is_signing_up == 'true') {
        return SignUp.judge_repeat_phone(this.value, this.phone)
    }
    return false
}

SMS.prototype.jj = function (){
    if(this.type == 'JJ' && !isNaN(this.value) && localStorage.is_bidding == 'true' && Bidding.get_name(this.phone)){
        return Bidding.judge_repeat_phone(this.value, this.phone)
    }
}

//function notify_sms_received(json_message) {
//    var SMSObj = sms_to_obj(json_message)
//    var flag = SMSObj.text.substr(0, 2).toUpperCase()
//    var phone = SMSObj.phone
//    if (flag == "BM") {
//        var name = SMSObj.text.substr(2).trim()
//        return process_sign_up_message(name, phone)
//    }
//    var price = SMSObj.text.substr(2).trim()
//    if (flag == 'JJ' && !isNaN(price)) {
//        return process_bid_message(price, phone)
//    }
//}
//
//function sms_to_obj(json_message) {
//    var SMSObj;
//    _.each(json_message.messages, function (message) {
//        SMSObj = {
//            'text': message.message,
//            'phone': message.phone
//        }
//    })
//    return SMSObj
//}
//
//function process_sign_up_message(name, phone) {
//    if (localStorage.is_signing_up == 'true') {
//        return SignUp.judge_repeat_phone(name, phone)
//    }
//}
//
//function process_bid_message(price, phone) {
//    if (localStorage.is_bidding == 'true' && Bidding.get_name(phone)) {
//        return Bidding.judge_repeat_phone(price, phone)
//    }
//}