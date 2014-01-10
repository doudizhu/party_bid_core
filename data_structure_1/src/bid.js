function bid(name) {
    this.name = name
    this.biddings = []
}

bid.create_new_bid = function (activity_name) {
    var activities = _.map(JSON.parse(localStorage.activities), function (num) {
        if (num.name == activity_name) {
            var index = num.bids.length + 1
            var bid_name = new bid('竞价' + index)
            num.bids.push(bid_name)
        }
        return num
    })
    localStorage.activities = JSON.stringify(activities)
}

function transform_bids_to_view_model(activity_name) {
    return _.find(JSON.parse(localStorage.activities),function (num) {
        return num.name == activity_name
    }).bids
}

function transform_biddings_to_view_model(activity_name, bid_name) {
    var bidding = bid.get_bidding(activity_name, bid_name)
    var unique_bidding = bid.get_unique_bidding(bidding)
    if (unique_bidding) {
        return unique_bidding
    }
}
bid.get_bidding = function (activity_name, bid_name) {
    return _.find(transform_bids_to_view_model(activity_name),function (num) {
        return num.name == bid_name
    }).biddings
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





