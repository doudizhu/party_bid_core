function SignUp(name,phone){
    this.name = name
    this.phone = phone
    this.activity_id = localStorage.current_activity
}

SignUp.prototype.create = function(){
    var sign = JSON.parse(localStorage.sign_ups)
    sign.push(this)
    localStorage.sign_ups = JSON.stringify(sign)
}

SignUp.render_sign_ups = function(activity,bid){
    return _.filter(JSON.parse(localStorage.sign_ups),function(num){
       return num.activity_id == activity
    })
}

SignUp.judge_repeat_phone = function(name, phone){
    if(!_.find(SignUp.render_sign_ups(localStorage.current_activity,localStorage.current_bid),function(num){
        return num.phone = phone
    })){
        new SignUp(name,phone).create()
    }
}

