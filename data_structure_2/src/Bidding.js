function bidding() {
}

bidding.create_new_bid = function (activities_id) {
    var activities = JSON.parse(localStorage.activities)
    var index = activities[activities_id].bids.length + 1
    var bid_name = '竞价' + index
    activities[activities_id].bids.push(bid_name)
    activities[activities_id].biddings[bid_name] = []
    localStorage.activities = JSON.stringify(activities)
    localStorage.current_bid = bid_name
}

bidding.get_name = function (phone) {
    var sign = _.find(JSON.parse(localStorage.activities)[localStorage.current_activity].sign_ups, function (num) {
        return num.phone == phone
    })
    if (sign) {
        return sign.name
    }
}

bidding.judge_repeat_phone = function (price, phone) {
    if (!_.find(JSON.parse(localStorage.activities)[localStorage.current_activity].biddings[localStorage.current_bid], function (num) {
        return num.phone == phone
    })) {
        return bidding.save_bid(price, phone);
    }
}

bidding.save_bid = function (price, phone) {
    var current_bidding = new bid(price, phone)
    var activities = JSON.parse(localStorage.activities)
    activities[localStorage.current_activity].biddings[localStorage.current_bid].push(current_bidding)
    localStorage.activities = JSON.stringify(activities);
}