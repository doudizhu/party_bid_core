function SignUp(name, phone) {
    this.name = name
    this.phone = phone
}

SignUp.render_sign_ups = function (second_activity) {
    return _.find(JSON.parse(localStorage.activities),function (num) {
        return num.name == second_activity
    }).sign_ups || []
}

SignUp.get_activity_current = function(){
    return _.find(JSON.parse(localStorage.activities),function(num){
        return num.name == localStorage.current_activity
    })
}
SignUp.judge_repeat_phone = function(name,phone){
    var current_activity = SignUp.get_activity_current()
    if(!_.find(current_activity.sign_ups,function(num){
        return num.phone == phone
    })){
        return SignUp.save_sign_up(name,phone)
    }
}
SignUp.save_sign_up = function(name,phone){
    var current_sign = new SignUp(name,phone)
    var current_activity = SignUp.get_activity_current()
    var activity_list = _.map(JSON.parse(localStorage.activities),function(num){
        if(num.name == current_activity.name){
            num.sign_ups.push(current_sign)
        }
        return num
    })
    localStorage.activities = JSON.stringify(activity_list)
}









