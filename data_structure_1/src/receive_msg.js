function notify_sms_received(json_message) {
    var SMSObj = SignUp.sms_to_obj(json_message)
    var flag = SMSObj.text.substr(0, 2).toUpperCase()
    var phone = SMSObj.phone
    if (flag == "BM") {
        var name = SMSObj.text.substr(2).trim()
        return process_sign_up_message(name, phone)
    }
    var price = SMSObj.text.substr(2).trim()
    if (flag == 'JJ' && !isNaN(price)) {
        return process_bid_message(price, phone)
    }
}

function process_sign_up_message(name, phone) {
    if (localStorage.is_signing_up == 'true') {
        return SignUp.judge_repeat_phone(name, phone)
    }
}

function process_bid_message(price, phone) {
    if (localStorage.is_bidding == 'true' && Bidding.get_name(phone)) {
        return Bidding.judge_repeat_phone(price, phone)
    }
}