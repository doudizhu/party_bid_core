function Bidding(price, phone) {
    this.price = price
    this.phone = phone
}

Bidding.get_name = function (activity,bid,phone) {
    var sign = _.find(SignUp.render_sign_ups(activity,bid), function (num) {
        return num.phone == phone
    })
    if (sign) {
        return sign.name
    }
}

Bidding.judge_repeat_phone = function (price, phone) {
    if (!_.find(Bidding.get_current_bid(localStorage.current_activity,localStorage.current_bid),function(num){
        return num.phone == phone
    })) {
        return Bidding.save_bidding(price, phone)
    }
}

Bidding.save_bidding = function (price, phone) {
    var bids = _.map(JSON.parse(localStorage.bids), function (num) {
        if (num.activity_id == localStorage.current_activity && num.name == localStorage.current_bid) {
            num.biddings.push(new Bidding(price, phone))
        }
        return num
    })
    localStorage.bids = JSON.stringify(bids)
}

Bidding.get_current_bid = function(current_activity,current_bid){
    return _.find(JSON.parse(localStorage.bids),function(num){
        return num.activity_id == current_activity && num.name == current_bid
    }).biddings
}

Bidding.render_biddings = function(current_activity,current_bid){
    console.log(Bidding.get_current_bid(current_activity,current_bid))
    var group = _.groupBy(Bidding.get_current_bid(current_activity,current_bid), function (num) {
        return num.price
    })
    var sort = _.sortBy(group, function (num) {
        return num.price
    })
    var bidding = _.find(sort, function (num) {
        return num.length == 1
    })
    bidding[0]['name'] = Bidding.get_name (current_activity,current_bid,bidding[0].phone)
    return bidding
}