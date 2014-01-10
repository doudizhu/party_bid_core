function bid(price, phone) {
    this.price = price
    this.phone = phone
}

function transform_bids_to_view_model(current_activity_id) {
    return JSON.parse(localStorage.activities)[current_activity_id].bids
}

function transform_biddings_to_view_model(current_activity_id, current_bid_id) {
    var bidding = JSON.parse(localStorage.activities)[current_activity_id].biddings[current_bid_id]
    var unique_bidding = bid.get_unique_bidding(bidding)
    if (unique_bidding) {
        unique_bidding[0]['name'] = bid.get_name(current_activity_id,unique_bidding[0].phone)
        return unique_bidding
    }
}

bid.get_unique_bidding = function (bidding) {
    var group = _.groupBy(bidding, function (num) {
        return num.price
    })
    var sort = _.sortBy(group, function (num) {
        return num.price
    })
    return _.find(sort, function (num) {
        return num.length == 1
    })
}

bid.get_name = function(activity,phone){
    return _.find(JSON.parse(localStorage.activities)[activity].sign_ups,function(num){
        return num.phone == phone
    }).name
}
