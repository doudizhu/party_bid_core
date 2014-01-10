function Bid(name) {
    this.name = name
    this.activity_id = localStorage.current_activity
    this.biddings = []
}

Bid.create_new_bid = function () {
    var index = Bid.render_bids().length + 1
    var bid_name = '竞价' + index
    localStorage.current_bid = bid_name
    var bids = JSON.parse(localStorage.bids)
    bids.push(new Bid(bid_name))
    localStorage.bids = JSON.stringify(bids)
}

Bid.render_bids = function () {
    return _.filter(JSON.parse(localStorage.bids), function (num) {
        return num.activity_id == localStorage.current_activity
    })
}

