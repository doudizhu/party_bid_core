function SignUp(name, phone) {
    this.name = name
    this.phone = phone
}

SignUp.render_sign_ups = function () {
    var activities = JSON.parse(localStorage.activities)
    return activities[localStorage.current_activity].sign_ups
}

SignUp.sms_to_obj = function (json_message) {
    var SMSObj;
    _.each(json_message.messages, function (message) {
        SMSObj = {
            'text': message.message,
            'phone': message.phone
        }
    })
    return SMSObj
}

SignUp.judge_repeat_phone = function (name, phone) {
    if (!_.find(SignUp.render_sign_ups(), function (num) {
        return num.phone == phone
    })) {
        return SignUp.save_sign_up(name, phone)
    }
}
SignUp.save_sign_up = function (name, phone) {
    var current_sign = new SignUp(name,phone)
    var activities = JSON.parse(localStorage.activities)
    activities[localStorage.current_activity].sign_ups.push(current_sign)
    localStorage.activities = JSON.stringify(activities)
}


