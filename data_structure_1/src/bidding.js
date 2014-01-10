function Bidding(name, phone, price) {
    this.name = name
    this.phone = phone
    this.price = price
}

Bidding.judge_repeat_phone = function (price, phone) {
    if (!_.find(Bidding.get_bids_current().biddings, function (num) {
        return num.phone == phone
    })) {
        return Bidding.save_bid(price, phone)
    }
}
Bidding.get_name = function (phone) {
    var sign = _.find(SignUp.get_activity_current().sign_ups, function (num) {
        return num.phone == phone
    })
    if (sign) {
        return sign.name
    }
}
Bidding.get_bids_current = function () {
    return _.find(SignUp.get_activity_current().bids, function (num) {
        return num.name == localStorage.current_bid
    })
}

Bidding.save_bid = function (price, phone) {
    var activity_list = _.map(JSON.parse(localStorage.activities), function (activity) {
        if (activity.name == localStorage.current_activity) {
            Bidding.save_bidding(activity, price, phone)
        }
        return activity
    })
    localStorage.activities = JSON.stringify(activity_list)
}
Bidding.save_bidding = function (activity, price, phone) {
    _.map(activity.bids, function (num) {
        if (num.name == localStorage.current_bid) {
            var current_biding = new Bidding(Bidding.get_name(phone), phone, price)
            num.biddings.push(current_biding)
        }
        return num
    })
}